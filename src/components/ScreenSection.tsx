'use client'

import Image, { type StaticImageData } from 'next/image'
import { type ReactNode } from 'react'
import clsx from 'clsx'

const screenshotSizes = '(min-width: 1024px) 1100px, 100vw'

export type ScreenSectionProps = {
  /** Anchor id used on the heading and (optionally) by the page TOC. */
  id: string
  /** Section heading text rendered as an `<h2>`. */
  title: string
  /** Optional context paragraph rendered above the screenshot. */
  intro?: ReactNode
  /** Either a `next/image` static import or a path under `/public`. */
  image: StaticImageData | string
  /** Required when `image` is a string path; ignored for static imports. */
  imageWidth?: number
  imageHeight?: number
  /** Alt text for the screenshot. */
  alt: string
  /** Optional caption rendered below the screenshot. */
  caption?: ReactNode
  /** Section body rendered below the screenshot — bullets, callouts, etc. */
  children?: ReactNode
  className?: string
}

/**
 * One self-contained "screen" of docs: heading + screenshot + body.
 *
 * Designed to be rendered inside `<DocPage>`. Because it renders as a
 * single `<section>`, the PDF paginator treats it as one indivisible
 * block — heading, figure, and body always land on the same screen.
 */
export function ScreenSection({
  id,
  title,
  intro,
  image,
  imageWidth,
  imageHeight,
  alt,
  caption,
  children,
  className,
}: ScreenSectionProps) {
  return (
    <section className={clsx('scroll-mt-28', className)}>
      <h2 id={id}>{title}</h2>
      {intro &&
        (typeof intro === 'string' ? <p>{intro}</p> : intro)}
      <figure>
        {typeof image === 'string' ? (
          <Image
            src={image}
            alt={alt}
            width={imageWidth ?? 1600}
            height={imageHeight ?? 1000}
            unoptimized
            sizes={screenshotSizes}
          />
        ) : (
          <Image
            src={image}
            alt={alt}
            unoptimized
            sizes={screenshotSizes}
          />
        )}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
      {children}
    </section>
  )
}
