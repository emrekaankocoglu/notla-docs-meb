'use client'

import { type ReactNode } from 'react'

import { DocsHeader } from '@/components/DocsHeader'
import { PdfPaginator } from '@/components/PdfPaginator'
import { usePdfMode } from '@/components/PdfModeContext'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { TableOfContents } from '@/components/TableOfContents'
import { type Section } from '@/lib/sections'

type DocsLayoutClientProps = {
  title?: string
  tableOfContents: Array<Section>
  children: ReactNode
}

export function DocsLayoutClient({
  title,
  tableOfContents,
  children,
}: DocsLayoutClientProps) {
  const isPdfMode = usePdfMode()

  if (isPdfMode) {
    return (
      <div className="min-w-0 flex-auto px-4 lg:pr-0 lg:pl-8 xl:px-16">
        <article>
          <PdfPaginator title={title}>{children}</PdfPaginator>
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
