import { type Node } from '@markdoc/markdoc'

import { DocsLayoutClient } from '@/components/DocsLayoutClient'
import { collectSections } from '@/lib/sections'

export function DocsLayout({
  children,
  frontmatter: { title },
  nodes,
}: {
  children: React.ReactNode
  frontmatter: { title?: string }
  nodes: Array<Node>
}) {
  let tableOfContents = collectSections(nodes)

  return (
    <DocsLayoutClient title={title} tableOfContents={tableOfContents}>
      {children}
    </DocsLayoutClient>
  )
}
