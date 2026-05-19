import { parse as babelParse } from '@babel/parser'
import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'
import { createLoader } from 'simple-functional-loader'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const slugify = slugifyWithCounter()

function toString(node) {
  let str =
    node.type === 'text' && typeof node.attributes?.content === 'string'
      ? node.attributes.content
      : ''
  if ('children' in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }
  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }
  if (node.type === 'heading' || node.type === 'paragraph') {
    let content = toString(node).trim()
    if (node.type === 'heading' && node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      sections.at(-1)[2].push(content)
    }
  } else if ('children' in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
    }
  }
}

/* ----------------------- TSX page extraction ----------------------- */

/** Collect plain text from any AST node, ignoring expressions we can't statically resolve. */
function nodeText(node) {
  if (!node) return ''
  if (Array.isArray(node)) return node.map(nodeText).join('')

  switch (node.type) {
    case 'JSXText':
      return node.value
    case 'StringLiteral':
      return node.value
    case 'TemplateLiteral':
      return node.quasis.map((q) => q.value.cooked ?? q.value.raw ?? '').join('')
    case 'JSXExpressionContainer':
      return nodeText(node.expression)
    case 'JSXElement':
      return node.children.map(nodeText).join('')
    case 'JSXFragment':
      return node.children.map(nodeText).join('')
    case 'BinaryExpression':
      if (node.operator === '+') {
        return nodeText(node.left) + nodeText(node.right)
      }
      return ''
    default:
      return ''
  }
}

function jsxAttr(opening, name) {
  for (const attr of opening.attributes ?? []) {
    if (attr.type !== 'JSXAttribute') continue
    const attrName = attr.name?.type === 'JSXIdentifier' ? attr.name.name : null
    if (attrName !== name) continue
    if (!attr.value) return true
    if (attr.value.type === 'StringLiteral') return attr.value.value
    return nodeText(attr.value)
  }
  return undefined
}

function jsxName(opening) {
  const n = opening?.name
  if (!n) return null
  if (n.type === 'JSXIdentifier') return n.name
  if (n.type === 'JSXMemberExpression') {
    return `${n.object?.name ?? ''}.${n.property?.name ?? ''}`
  }
  return null
}

function cleanText(s) {
  return s.replace(/\s+/g, ' ').trim()
}

function extractTsxSections(src, fallbackTitle) {
  let ast
  try {
    ast = babelParse(src, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    })
  } catch {
    return [[fallbackTitle ?? '', null, []]]
  }

  let pageTitle = fallbackTitle ?? ''

  for (const node of ast.program.body) {
    if (
      node.type !== 'ExportNamedDeclaration' ||
      node.declaration?.type !== 'VariableDeclaration'
    ) {
      continue
    }
    for (const decl of node.declaration.declarations) {
      if (decl.id?.name !== 'metadata') continue
      if (decl.init?.type !== 'ObjectExpression') continue
      for (const prop of decl.init.properties) {
        const key = prop.key?.name ?? prop.key?.value
        if (key === 'title') {
          const text = nodeText(prop.value)
          if (text) pageTitle = text
        }
      }
    }
  }

  const sections = []
  let current = [pageTitle, null, []]
  sections.push(current)

  const push = (text) => {
    const cleaned = cleanText(text)
    if (cleaned) current[2].push(cleaned)
  }

  const startSection = (title, hash) => {
    current = [cleanText(title ?? ''), hash ?? null, []]
    sections.push(current)
  }

  function walk(node) {
    if (!node) return
    if (Array.isArray(node)) {
      for (const c of node) walk(c)
      return
    }

    switch (node.type) {
      case 'JSXFragment':
        for (const child of node.children) walk(child)
        return

      case 'JSXText':
        push(node.value)
        return

      case 'JSXExpressionContainer': {
        const e = node.expression
        if (!e || e.type === 'JSXEmptyExpression') return
        if (e.type === 'StringLiteral') push(e.value)
        else if (e.type === 'TemplateLiteral') push(nodeText(e))
        else if (e.type === 'BinaryExpression') push(nodeText(e))
        else if (e.type === 'ConditionalExpression') {
          walk(e.consequent)
          walk(e.alternate)
        } else if (e.type === 'LogicalExpression') {
          walk(e.right)
        } else if (
          e.type === 'JSXElement' ||
          e.type === 'JSXFragment'
        ) {
          walk(e)
        } else if (e.type === 'CallExpression') {
          for (const arg of e.arguments) walk(arg)
        } else if (e.type === 'ArrowFunctionExpression') {
          walk(e.body)
        }
        return
      }

      case 'JSXElement': {
        const name = jsxName(node.openingElement)

        if (name === 'ScreenSection') {
          const id = jsxAttr(node.openingElement, 'id')
          const title = jsxAttr(node.openingElement, 'title')
          startSection(title, typeof id === 'string' ? id : null)
          const intro = jsxAttr(node.openingElement, 'intro')
          if (typeof intro === 'string') push(intro)
          const caption = jsxAttr(node.openingElement, 'caption')
          if (typeof caption === 'string') push(caption)
          for (const child of node.children) walk(child)
          return
        }

        if (name === 'h2' || name === 'H2') {
          const id = jsxAttr(node.openingElement, 'id')
          const headingText = node.children.map(nodeText).join('')
          startSection(headingText, typeof id === 'string' ? id : null)
          return
        }

        if (name === 'Callout') {
          const title = jsxAttr(node.openingElement, 'title')
          if (typeof title === 'string') push(title)
          for (const child of node.children) walk(child)
          return
        }

        if (name === 'Image' || name === 'img') {
          const alt = jsxAttr(node.openingElement, 'alt')
          if (typeof alt === 'string') push(alt)
          return
        }

        if (name === 'DocPage') {
          // The DocPage's own title is already captured via metadata; the
          // first implicit section uses it. Just walk children for content.
          for (const child of node.children) walk(child)
          return
        }

        for (const child of node.children) walk(child)
        return
      }

      default:
        return
    }
  }

  for (const node of ast.program.body) {
    if (node.type !== 'ExportDefaultDeclaration') continue
    const fn = node.declaration
    if (!fn) continue
    let body = null
    if (fn.type === 'FunctionDeclaration' || fn.type === 'FunctionExpression') {
      body = fn.body
    } else if (fn.type === 'ArrowFunctionExpression') {
      body = fn.body
    }
    if (!body) continue

    if (body.type === 'BlockStatement') {
      for (const stmt of body.body) {
        if (stmt.type === 'ReturnStatement' && stmt.argument) {
          walk(stmt.argument)
        }
      }
    } else {
      walk(body)
    }
  }

  return sections
}

export default function withSearch(nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let pagesDir = path.resolve('./src/app')
            this.addContextDependency(pagesDir)

            // Only index pages exposed through src/lib/navigation.ts. Anything
            // else (example/sandbox pages, archived drafts, etc.) is reachable
            // by URL but should not surface in search.
            let navPath = path.resolve('./src/lib/navigation.ts')
            this.addDependency(navPath)
            let navSrc = fs.readFileSync(navPath, 'utf8')
            let allowedHrefs = new Set()
            for (const m of navSrc.matchAll(/href:\s*['"]([^'"]+)['"]/g)) {
              allowedHrefs.add(m[1])
            }

            let files = glob.sync('**/page.{md,tsx}', { cwd: pagesDir })
            let data = files
              .map((file) => {
                let isMd = file.endsWith('.md')
                let url =
                  file === 'page.md' || file === 'page.tsx'
                    ? '/'
                    : `/${file.replace(/\/page\.(md|tsx)$/, '')}`

                if (!allowedHrefs.has(url)) {
                  return null
                }

                let src = fs.readFileSync(path.join(pagesDir, file), 'utf8')

                let sections

                if (cache.get(file)?.[0] === src) {
                  sections = cache.get(file)[1]
                } else if (isMd) {
                  let ast = Markdoc.parse(src)
                  let title =
                    ast.attributes?.frontmatter?.match(
                      /^title:\s*(.*?)\s*$/m,
                    )?.[1]
                  sections = [[title, null, []]]
                  extractSections(ast, sections)
                  cache.set(file, [src, sections])
                } else {
                  sections = extractTsxSections(src)
                  cache.set(file, [src, sections])
                }

                return { url, sections }
              })
              .filter(Boolean)

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: 'content',
                  store: ['title', 'pageTitle'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}

              for (let { url, sections } of data) {
                for (let [title, hash, content] of sections) {
                  sectionIndex.add({
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                  })
                }
              }

              export function search(query, options = {}) {
                let result = sectionIndex.search(query, {
                  ...options,
                  enrich: true,
                })
                if (result.length === 0) {
                  return []
                }
                return result[0].result.map((item) => ({
                  url: item.id,
                  title: item.doc.title,
                  pageTitle: item.doc.pageTitle,
                }))
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
