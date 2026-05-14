#!/usr/bin/env node
/**
 * build-pdfs.mjs
 *
 * Drives the local dev server in PDF mode (?pdf=1), captures one PNG per
 * screen-snapped <section> emitted by the PdfPaginator, and assembles a
 * PDF per docs page where each PDF page is sized to exactly match the
 * captured image — so the screenshot fills the page edge-to-edge with no
 * borders or padding.
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
 *   PNG_DIR      default public/screenshots/pdf (set to "" to skip PNGs)
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
  process.env.PNG_DIR === ''
    ? null
    : path.resolve(ROOT, process.env.PNG_DIR ?? 'public/screenshots/pdf')
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

/** Wait until the PdfPaginator has produced a stable set of sections. */
async function waitForPagination(page) {
  await page.waitForFunction(
    () => {
      // @ts-ignore
      return (
        document.querySelectorAll('[data-screen-index]').length > 0 &&
        document.documentElement.classList.contains('pdf-mode')
      )
    },
    { timeout: 15_000 },
  )

  // The paginator re-runs on font load and image load events. Wait for the
  // count to be stable across two consecutive frames before capturing.
  await page.waitForFunction(
    () => {
      // @ts-ignore
      const n = document.querySelectorAll('[data-screen-index]').length
      // @ts-ignore
      window.__lastN ??= -1
      // @ts-ignore
      const stable = window.__lastN === n
      // @ts-ignore
      window.__lastN = n
      return stable && n > 0
    },
    { timeout: 10_000, polling: 250 },
  )
}

async function capturePage({ context, href, slug }) {
  const page = await context.newPage()
  const url = new URL(href, BASE_URL)
  url.searchParams.set('pdf', '1')

  const res = await page.goto(url.toString(), {
    waitUntil: 'networkidle',
    timeout: 30_000,
  })
  const status = res?.status() ?? 0
  if (status >= 400) {
    console.warn(`  skip (HTTP ${status}): ${url}`)
    await page.close()
    return { ok: false, reason: `http_${status}` }
  }

  await page.evaluate(() =>
    document.fonts?.ready ? document.fonts.ready : Promise.resolve(),
  )

  try {
    await waitForPagination(page)
  } catch (err) {
    console.warn(`  skip (no PdfPaginator output): ${url} — ${err.message}`)
    await page.close()
    return { ok: false, reason: 'no_paginator' }
  }

  const total = await page.locator('[data-screen-index]').count()
  console.log(`  ${total} screen(s)`)

  const pdf = await PDFDocument.create()
  const pngOutDir = PNG_DIR ? path.join(PNG_DIR, slug) : null
  if (pngOutDir) await ensureDir(pngOutDir)

  for (let i = 0; i < total; i++) {
    const section = page.locator(`[data-screen-index="${i}"]`)
    await section.scrollIntoViewIfNeeded()
    // Let scroll-snap settle and any in-flight image decoding finish.
    await page.waitForTimeout(150)

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
