'use client'

import Image from 'next/image'
import clsx from 'clsx'

export type MobileScreen = {
  src: string
  alt: string
  caption?: string
}

/**
 * Grid of phone-shaped screenshots. Designed for use inside `<DocPage>` and
 * Markdoc/Prose. Each image is rendered in a soft-rounded "phone frame"
 * container so iPhone-aspect screenshots look like physical devices.
 *
 * On wide screens (lg+) two images sit side-by-side; on mobile they stack.
 * Pass `single` for a centred, single-screen layout.
 */
export function MobileScreens({
  screens,
  className,
  single = false,
}: {
  screens: Array<MobileScreen>
  className?: string
  single?: boolean
}) {
  return (
    <div
      className={clsx(
        'not-prose my-8 grid gap-6',
        single
          ? 'mx-auto max-w-xs'
          : screens.length === 1
            ? 'mx-auto max-w-xs'
            : 'sm:grid-cols-2',
        className,
      )}
    >
      {screens.map((screen) => (
        <figure
          key={screen.src}
          className="mx-auto w-full max-w-[280px] sm:max-w-none"
        >
          <div className="overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            <Image
              src={screen.src}
              alt={screen.alt}
              width={1320}
              height={2868}
              sizes="(min-width: 640px) 320px, 280px"
              className="block h-auto w-full"
            />
          </div>
          {screen.caption && (
            <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
              {screen.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
