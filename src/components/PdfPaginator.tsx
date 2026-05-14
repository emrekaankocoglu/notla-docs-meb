'use client'

import {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import clsx from 'clsx'

import { DocsHeader } from '@/components/DocsHeader'
import { Prose } from '@/components/Prose'
import { usePdfPagination } from '@/components/PdfModeContext'

// Header (sticky) and breathing room subtracted from each screen.
// Keep these in sync with the PdfHeader styling in Layout.tsx.
const PDF_HEADER_PX = 44
const VERTICAL_PADDING_PX = 64

const HEADING_TAGS = new Set(['H1', 'H2', 'H3'])
// Headings near the bottom of a screen get pushed to the next screen so
// they're never orphaned without their content.
const ORPHAN_THRESHOLD = 0.7

type PdfPaginatorProps = {
  title?: string
  children: ReactNode
}

function blockHeight(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const style = window.getComputedStyle(el)
  return (
    rect.height +
    parseFloat(style.marginTop || '0') +
    parseFloat(style.marginBottom || '0')
  )
}

export function PdfPaginator({ title, children }: PdfPaginatorProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<Array<HTMLElement | null>>([])
  const [screens, setScreens] = useState<number[][] | null>(null)
  const { setPagination } = usePdfPagination()

  const childArray = Children.toArray(children)

  // Measure + paginate. Runs after first paint and on viewport resize.
  useLayoutEffect(() => {
    let cancelled = false

    function paginate() {
      if (cancelled) return
      const root = measureRef.current
      if (!root) return

      const proseEl = root.querySelector<HTMLElement>('[data-pdf-measure-prose]')
      const headerEl = root.querySelector<HTMLElement>(
        '[data-pdf-measure-header]',
      )
      if (!proseEl) return

      const blocks = Array.from(proseEl.children) as HTMLElement[]
      if (blocks.length === 0) {
        setScreens([[]])
        return
      }

      const headerH = headerEl ? blockHeight(headerEl) : 0
      const baseAvailable = Math.max(
        200,
        window.innerHeight - PDF_HEADER_PX - VERTICAL_PADDING_PX,
      )
      const firstAvailable = Math.max(120, baseAvailable - headerH)

      const groups: number[][] = []
      let current: number[] = []
      let currentH = 0
      let isFirstScreen = true

      const cap = () => (isFirstScreen ? firstAvailable : baseAvailable)

      const flush = () => {
        if (current.length === 0) return
        groups.push(current)
        current = []
        currentH = 0
        isFirstScreen = false
      }

      blocks.forEach((el, i) => {
        const h = blockHeight(el)
        const isHeading = HEADING_TAGS.has(el.tagName)
        const isBreak = el.tagName === 'HR'

        // Treat thematic breaks (`---`) as soft page breaks. They start a
        // fresh screen and aren't rendered themselves, so authors can use
        // them to mark intended screen boundaries in markdown.
        if (isBreak) {
          flush()
          return
        }

        // Avoid orphaned headings: if we're past the threshold of cap
        // and a heading appears, send it to the next screen.
        if (
          isHeading &&
          current.length > 0 &&
          currentH > cap() * ORPHAN_THRESHOLD
        ) {
          flush()
        }

        // Doesn't fit — start a new screen, unless current is empty
        // (a single oversized block keeps its own screen).
        if (currentH + h > cap() && current.length > 0) {
          flush()
        }

        current.push(i)
        currentH += h
      })

      flush()

      const next = groups.length > 0 ? groups : [childArray.map((_, i) => i)]
      setScreens(next)
    }

    paginate()

    const onResize = () => paginate()
    window.addEventListener('resize', onResize)

    // Re-paginate after web fonts resolve (text reflow can change heights).
    if ('fonts' in document) {
      document.fonts.ready.then(paginate).catch(() => {})
    }

    // Re-paginate when images finish loading. Their natural height is 0
    // before load, which would otherwise produce too many tiny screens.
    const root = measureRef.current
    const imgs = root
      ? Array.from(root.querySelectorAll<HTMLImageElement>('img'))
      : []
    const onImgLoad = () => paginate()
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', onImgLoad, { once: true })
        img.addEventListener('error', onImgLoad, { once: true })
      }
    })

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      imgs.forEach((img) => {
        img.removeEventListener('load', onImgLoad)
        img.removeEventListener('error', onImgLoad)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childArray.length])

  // Keep total in pagination context in sync.
  useEffect(() => {
    if (screens) {
      setPagination({ current: 0, total: screens.length })
    } else {
      setPagination({ current: 0, total: 0 })
    }
  }, [screens, setPagination])

  // Track the most-visible section to drive the header counter.
  useEffect(() => {
    if (!screens) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length === 0) return
        const idx = Number(
          visible[0].target.getAttribute('data-screen-index') ?? '0',
        )
        setPagination({ current: idx })
      },
      { threshold: [0.25, 0.5, 0.75] },
    )

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [screens, setPagination])

  return (
    <>
      {/* Hidden measurement layer: rendered with the same width / styling
          as the visible content so heights match. */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10"
      >
        <div data-pdf-measure-header>
          <DocsHeader title={title} />
        </div>
        <Prose>
          <div data-pdf-measure-prose className="contents">
            {children}
          </div>
        </Prose>
      </div>

      {screens === null ? (
        // Pre-pagination first paint: render naturally so users with JS
        // disabled (or before measurement) still see the content.
        <>
          <DocsHeader title={title} />
          <Prose>{children}</Prose>
        </>
      ) : (
        screens.map((indices, screenIdx) => (
          <section
            key={screenIdx}
            ref={(el) => {
              sectionsRef.current[screenIdx] = el
            }}
            data-screen-index={screenIdx}
            className={clsx(
              'flex min-h-[calc(100dvh-2.75rem)] snap-start flex-col py-8',
              screenIdx > 0 &&
                'border-t border-dashed border-slate-200 dark:border-slate-800',
            )}
          >
            {screenIdx === 0 && <DocsHeader title={title} />}
            <Prose>{indices.map((i) => childArray[i])}</Prose>
          </section>
        ))
      )}
    </>
  )
}
