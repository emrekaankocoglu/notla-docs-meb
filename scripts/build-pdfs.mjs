#!/usr/bin/env node
/**
 * build-pdfs.mjs
 *
 * Drives the local dev server in PDF mode (?pdf=1). When fit-to-screen
 * pagination is enabled, captures one PNG per screen-snapped <section>
 * emitted by the PdfPaginator and assembles a PDF. When disabled, exports
 * the continuous browser print layout instead.
 *
 * Usage:
 *   node scripts/build-pdfs.mjs                # all pages in navigation.ts
 *   node scripts/build-pdfs.mjs /docs/foo /…   # only the listed hrefs
 *
 * Env overrides:
 *   BASE_URL     default http://localhost:3001
 *   VIEWPORT_W   default 1684 (A4 landscape @ ~144dpi)
 *   VIEWPORT_H   default 1191
 *   DPR          default 2
 *   OUT_DIR      default public/pdfs
 *   PNG_DIR      set to public/screenshots/pdf to save intermediate PNGs
 *   COMBINED     default notla-docs.pdf (set to "" to skip combined PDF)
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'
import { PDFDocument } from 'pdf-lib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3001'
const VIEWPORT = {
  width: Number(process.env.VIEWPORT_W ?? 1684),
  height: Number(process.env.VIEWPORT_H ?? 1191),
}
const DPR = Number(process.env.DPR ?? 2)
const OUT_DIR = path.resolve(ROOT, process.env.OUT_DIR ?? 'public/pdfs')
const PNG_DIR =
  process.env.PNG_DIR && process.env.PNG_DIR !== ''
    ? path.resolve(ROOT, process.env.PNG_DIR)
    : null
const COMBINED_NAME =
  process.env.COMBINED === '' ? null : (process.env.COMBINED ?? 'notla-docs.pdf')

/** Parse hrefs + titles out of src/lib/navigation.ts without touching its TS types. */
async function readNavigation() {
  const src = await fs.readFile(
    path.join(ROOT, 'src/lib/navigation.ts'),
    'utf8',
  )
  const linkRe = /\{\s*title:\s*'([^']+)',\s*href:\s*'([^']+)'\s*\}/g
  const out = []
  for (const m of src.matchAll(linkRe)) {
    out.push({ title: m[1], href: m[2] })
  }
  return out
}

function slugFromHref(href) {
  if (href === '/') return 'index'
  return href.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\//g, '-')
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

/** Wait until PDF mode is ready, then report which layout mode is active. */
async function waitForPdfLayout(page) {
  await page.waitForFunction(
    () => {
      return document.documentElement.classList.contains('pdf-mode')
    },
    { timeout: 60_000 },
  )

  const isFitScreen = await page.evaluate(() =>
    document.documentElement.classList.contains('pdf-fit-screen'),
  )
  if (!isFitScreen) return 'continuous'

  await page.waitForFunction(
    () => document.querySelectorAll('[data-screen-index]').length > 0,
    { timeout: 60_000 },
  )

  // The paginator can re-run after fonts or high-res screenshots affect
  // layout. Wait for the section signature, not just the count, to settle.
  await page.waitForFunction(
    () => {
      const sections = Array.from(
        document.querySelectorAll('[data-screen-index]'),
      )
      const signature = sections
        .map((section) => {
          return [
            section.getAttribute('data-screen-index'),
            section.scrollHeight,
            section.getBoundingClientRect().height,
          ].join(':')
        })
        .join('|')

      window.__pdfStable ??= { signature: '', hits: 0 }
      if (window.__pdfStable.signature === signature) {
        window.__pdfStable.hits += 1
      } else {
        window.__pdfStable = { signature, hits: 1 }
      }

      return sections.length > 0 && window.__pdfStable.hits >= 4
    },
    { timeout: 60_000, polling: 250 },
  )

  return 'fit-screen'
}

async function waitForFonts(page) {
  await page.evaluate(() =>
    document.fonts?.ready ? document.fonts.ready : Promise.resolve(),
  )
}

async function scrollToScreen(page, index) {
  await page.evaluate((screenIndex) => {
    const section = document.querySelector(
      `[data-screen-index="${screenIndex}"]`,
    )
    if (!section) {
      throw new Error(`Missing screen ${screenIndex}`)
    }
    section.scrollIntoView({ block: 'start', inline: 'nearest' })
  }, index)

  // Let CSS scroll-snap settle after direct DOM scrolling.
  await page.waitForTimeout(300)
}

async function waitForScreenImages(page, index) {
  await page.evaluate(async (screenIndex) => {
    const section = document.querySelector(
      `[data-screen-index="${screenIndex}"]`,
    )
    if (!section) return

    const images = Array.from(section.querySelectorAll('img'))
    await Promise.all(
      images.map(async (img) => {
        img.loading = 'eager'
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true })
            img.addEventListener('error', resolve, { once: true })
          })
        }
        if (typeof img.decode === 'function') {
          await img.decode().catch(() => {})
        }
      }),
    )
  }, index)
}

async function waitForPageImages(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'))
    await Promise.all(
      images.map(async (img) => {
        img.loading = 'eager'
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true })
            img.addEventListener('error', resolve, { once: true })
          })
        }
        if (typeof img.decode === 'function') {
          await img.decode().catch(() => {})
        }
      }),
    )
  })
}

async function captureContinuousPdf({ page, slug }) {
  await ensureDir(OUT_DIR)
  await waitForPageImages(page)

  const bytes = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
  const outFile = path.join(OUT_DIR, `${slug}.pdf`)
  await fs.writeFile(outFile, bytes)

  const pdf = await PDFDocument.load(bytes)
  const pages = pdf.getPageCount()
  console.log(`  ${pages} page(s), continuous layout`)
  console.log(`  → ${path.relative(ROOT, outFile)}`)

  return { ok: true, screens: pages, bytes }
}

async function capturePage({ context, href, slug }) {
  const page = await context.newPage()
  const url = new URL(href, BASE_URL)
  url.searchParams.set('pdf', '1')

  const res = await page.goto(url.toString(), {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  })
  const status = res?.status() ?? 0
  if (status >= 400) {
    console.warn(`  skip (HTTP ${status}): ${url}`)
    await page.close()
    return { ok: false, reason: `http_${status}` }
  }

  await waitForFonts(page)

  let layoutMode = null
  let paginationError = null
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      layoutMode = await waitForPdfLayout(page)
      paginationError = null
      break
    } catch (err) {
      paginationError = err
      if (attempt === 2) break
      console.warn(`  retrying pagination wait: ${err.message}`)
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 30_000 })
      await waitForFonts(page)
    }
  }

  if (paginationError) {
    console.warn(
      `  skip (no PdfPaginator output): ${url} — ${paginationError.message}`,
    )
    await page.close()
    return { ok: false, reason: 'no_paginator' }
  }

  if (layoutMode === 'continuous') {
    const result = await captureContinuousPdf({ page, slug })
    await page.close()
    return result
  }

  const total = await page.locator('[data-screen-index]').count()
  console.log(`  ${total} screen(s)`)

  const pdf = await PDFDocument.create()
  const pngOutDir = PNG_DIR ? path.join(PNG_DIR, slug) : null
  if (pngOutDir) await ensureDir(pngOutDir)

  for (let i = 0; i < total; i++) {
    await scrollToScreen(page, i)
    await waitForScreenImages(page, i)

    const png = await page.screenshot({
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      animations: 'disabled',
      caret: 'hide',
      type: 'png',
    })

    if (pngOutDir) {
      const name = `screen-${String(i + 1).padStart(2, '0')}.png`
      await fs.writeFile(path.join(pngOutDir, name), png)
    }

    const img = await pdf.embedPng(png)
    // PDF page dimensions = image pixel dimensions ⇒ image fills page exactly.
    const pdfPage = pdf.addPage([img.width, img.height])
    pdfPage.drawImage(img, {
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
    })
  }

  await ensureDir(OUT_DIR)
  const outFile = path.join(OUT_DIR, `${slug}.pdf`)
  const bytes = await pdf.save()
  await fs.writeFile(outFile, bytes)
  console.log(`  → ${path.relative(ROOT, outFile)}`)

  await page.close()
  return { ok: true, screens: total, bytes }
}

/** Merge per-page PDFs (in navigation order) into one combined PDF. */
async function combinePdfs(results, outPath) {
  const combined = await PDFDocument.create()
  for (const r of results) {
    if (!r.ok || !r.bytes) continue
    const src = await PDFDocument.load(r.bytes)
    const pages = await combined.copyPages(src, src.getPageIndices())
    for (const p of pages) combined.addPage(p)
  }
  if (combined.getPageCount() === 0) return false
  await fs.writeFile(outPath, await combined.save())
  return true
}

async function main() {
  const argHrefs = process.argv.slice(2).filter((a) => a.startsWith('/'))
  const nav = await readNavigation()
  const targets = argHrefs.length
    ? argHrefs.map((h) => ({ href: h, title: h }))
    : nav

  console.log(`Base URL : ${BASE_URL}`)
  console.log(`Viewport : ${VIEWPORT.width}×${VIEWPORT.height} @${DPR}x`)
  console.log(`Out dir  : ${path.relative(ROOT, OUT_DIR)}`)
  if (PNG_DIR) console.log(`PNG dir  : ${path.relative(ROOT, PNG_DIR)}`)
  console.log(`Pages    : ${targets.length}`)
  console.log('')

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DPR,
    colorScheme: 'light',
  })

  const results = []
  for (const { href, title } of targets) {
    const slug = slugFromHref(href)
    console.log(`• ${title} (${href}) → ${slug}.pdf`)
    try {
      const r = await capturePage({ context, href, slug })
      results.push({ href, slug, ...r })
    } catch (err) {
      console.error(`  ERROR: ${err.message}`)
      results.push({ href, slug, ok: false, reason: err.message })
    }
  }

  await context.close()
  await browser.close()

  const ok = results.filter((r) => r.ok).length
  const skipped = results.length - ok
  console.log('')
  console.log(`Done: ${ok} built, ${skipped} skipped.`)

  if (COMBINED_NAME && ok > 0) {
    const combinedPath = path.join(OUT_DIR, COMBINED_NAME)
    const wrote = await combinePdfs(results, combinedPath)
    if (wrote) {
      const totalPages = results.reduce(
        (n, r) => n + (r.ok ? r.screens ?? 0 : 0),
        0,
      )
      console.log(
        `Combined: ${path.relative(ROOT, combinedPath)} (${totalPages} pages)`,
      )
    }
  }

  if (skipped > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
