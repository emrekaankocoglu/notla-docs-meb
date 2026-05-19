'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import { Logo, Logomark } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'
import { usePdfMode, usePdfPagination } from '@/components/PdfModeContext'
import { navigation } from '@/lib/navigation'
import { FIT_PDF_PAGES_TO_SCREEN } from '@/lib/pdf'

function buildPagesIndex() {
  return navigation.flatMap((section) =>
    section.links.map((link) => ({
      ...link,
      sectionTitle: section.title,
    })),
  )
}

function PdfHeader() {
  let pathname = usePathname()
  let pages = buildPagesIndex()
  let currentIdx = pages.findIndex((page) => page.href === pathname)
  let current = currentIdx >= 0 ? pages[currentIdx] : null
  let { current: screenIdx, total: screenTotal } = usePdfPagination()

  return (
    <header className="sticky top-0 z-50 flex h-11 flex-none items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900 print:hidden">
      <Link
        href="/"
        aria-label="Home page"
        className="flex items-center gap-3"
      >
        <Logomark className="h-7 w-auto lg:hidden" />
        <Logo className="hidden h-7 w-auto lg:block" />
      </Link>

      <div className="flex min-w-0 items-baseline gap-2 truncate text-right">
        {current?.sectionTitle && (
          <span className="font-display text-[0.7rem] font-semibold tracking-wide text-sky-500 uppercase">
            {current.sectionTitle}
          </span>
        )}
        {current?.sectionTitle && current?.title && (
          <span className="text-slate-300 dark:text-slate-600">/</span>
        )}
        <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
          {current?.title ?? 'Documentation'}
        </span>
        {screenTotal > 0 && (
          <span className="text-xs whitespace-nowrap text-slate-500 tabular-nums dark:text-slate-400">
            · sayfa {screenIdx + 1} / {screenTotal}
          </span>
        )}
      </div>
    </header>
  )
}

function StandardHeader() {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          <Logomark className="h-9 w-9 lg:hidden" />
          <Logo className="hidden h-9 w-auto fill-slate-700 lg:block dark:fill-sky-100" />
        </Link>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
        <ThemeSelector className="relative z-10" />
      </div>
    </header>
  )
}

function Header() {
  let isPdfMode = usePdfMode()
  return isPdfMode ? <PdfHeader /> : <StandardHeader />
}

export function Layout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let isHomePage = pathname === '/'
  let isPdfMode = usePdfMode()
  let shouldFitPdfPagesToScreen = isPdfMode && FIT_PDF_PAGES_TO_SCREEN

  useEffect(() => {
    let root = document.documentElement
    if (isPdfMode) {
      root.classList.add('pdf-mode')
    }
    if (shouldFitPdfPagesToScreen) {
      root.classList.add('pdf-fit-screen')
    }

    return () => {
      root.classList.remove('pdf-mode')
      root.classList.remove('pdf-fit-screen')
    }
  }, [isPdfMode, shouldFitPdfPagesToScreen])

  return (
    <div className="flex w-full flex-col">
      <Header />

      {isHomePage && !isPdfMode && <Hero />}

      <div className="relative mx-auto flex w-full flex-auto justify-center sm:px-2 lg:px-4 xl:px-6">
        <div
          className={clsx(
            'hidden lg:relative lg:block lg:flex-none',
            isPdfMode && 'print:hidden',
          )}
        >
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 right-0 bottom-0 hidden h-12 w-px bg-linear-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 right-0 bottom-0 hidden w-px bg-slate-800 dark:block" />
          <div
            className={clsx(
              'sticky top-19 -ml-0.5 h-[calc(100vh-4.75rem)] w-56 overflow-x-hidden overflow-y-auto pr-8 pl-0.5',
              !isPdfMode && 'py-8',
            )}
          >
            <Navigation />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
