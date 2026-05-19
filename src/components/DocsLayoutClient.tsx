'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { DocsHeader } from '@/components/DocsHeader'
import { PdfPaginator } from '@/components/PdfPaginator'
import { usePdfMode } from '@/components/PdfModeContext'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { TableOfContents } from '@/components/TableOfContents'
import { FIT_PDF_PAGES_TO_SCREEN } from '@/lib/pdf'
import { type Section } from '@/lib/sections'

type DocsLayoutClientProps = {
  title?: string
  tableOfContents: Array<Section>
  children: ReactNode
}

function usePreservePdfParamOnLinks(
  ref: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return
    const root = ref.current
    if (!root) return

    const rewrite = () => {
      const anchors = root.querySelectorAll<HTMLAnchorElement>('a[href]')
      anchors.forEach((a) => {
        const raw = a.getAttribute('href')
        if (!raw) return
        // Only rewrite internal absolute paths; skip hashes, externals, mailto, etc.
        if (!raw.startsWith('/')) return
        // Already has a pdf query parameter — leave it alone.
        if (/[?&]pdf=/.test(raw)) return
        const [pathAndQuery, hash = ''] = raw.split('#')
        const sep = pathAndQuery.includes('?') ? '&' : '?'
        const next = `${pathAndQuery}${sep}pdf=1${hash ? `#${hash}` : ''}`
        a.setAttribute('href', next)
      })
    }

    rewrite()

    const observer = new MutationObserver(rewrite)
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href'],
    })
    return () => observer.disconnect()
  }, [enabled, ref])
}

export function DocsLayoutClient({
  title,
  tableOfContents,
  children,
}: DocsLayoutClientProps) {
  const isPdfMode = usePdfMode()
  const articleRef = useRef<HTMLElement | null>(null)

  usePreservePdfParamOnLinks(articleRef, isPdfMode)

  if (isPdfMode) {
    return (
      <div className="min-w-0 flex-auto px-4 lg:pr-0 lg:pl-8 xl:px-16">
        <article ref={articleRef}>
          {FIT_PDF_PAGES_TO_SCREEN ? (
            <PdfPaginator title={title}>{children}</PdfPaginator>
          ) : (
            <div className="py-8">
              <DocsHeader title={title} />
              <Prose>{children}</Prose>
            </div>
          )}
        </article>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <article>
          <DocsHeader title={title} />
          <Prose>{children}</Prose>
        </article>
        <PrevNextLinks />
      </div>
      <TableOfContents tableOfContents={tableOfContents} />
    </>
  )
}
