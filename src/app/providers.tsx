'use client'

import { Suspense } from 'react'
import { ThemeProvider } from 'next-themes'

import { PdfModeProvider } from '@/components/PdfModeContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Suspense fallback={children}>
        <PdfModeProvider>{children}</PdfModeProvider>
      </Suspense>
    </ThemeProvider>
  )
}
