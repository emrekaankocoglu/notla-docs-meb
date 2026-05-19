'use client'

import { type ReactNode } from 'react'

import { DocsHeader } from '@/components/DocsHeader'
import { PdfPaginator } from '@/components/PdfPaginator'
import { usePdfMode } from '@/components/PdfModeContext'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { TableOfContents } from '@/components/TableOfContents'
import { FIT_PDF_PAGES_TO_SCREEN } from '@/lib/pdf'
import { type Section } from '@/lib/sections'

// Author-friendly Section/Subsection shapes. These are structurally
// compatible with the Markdoc-derived `Section` type, but only require
// the fields the renderer actually reads.
export type DocSubsection = {
  id: string
  title: string
}

export type DocSection = {
  id: string
  title: string
  children?: Array<DocSubsection>
}

type DocPageProps = {
  title?: string
  tableOfContents?: Array<DocSection>
  children: ReactNode
}

function normalize(toc: Array<DocSection> = []): Array<Section> {
  return toc.map((s) => ({
    level: 2,
    id: s.id,
    title: s.title,
    children: (s.children ?? []).map((c) => ({
      level: 3,
      id: c.id,
      title: c.title,
    })),
  })) as Array<Section>
}

/**
 * Wraps a `.tsx` doc page in the same chrome the Markdoc pages use:
 * docs header, prose styling, prev/next, on-this-page table of contents,
 * and the PDF-mode paginator. Drop-in replacement for the markdown layout.
 */
export function DocPage({
  title,
  tableOfContents = [],
  children,
}: DocPageProps) {
  const isPdfMode = usePdfMode()
  const sections = normalize(tableOfContents)

  if (isPdfMode) {
    return (
      <div className="min-w-0 flex-auto px-4 lg:pr-0 lg:pl-8 xl:px-16">
        <article>
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
      <TableOfContents tableOfContents={sections} />
    </>
  )
}
