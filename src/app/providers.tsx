'use client'

import { ThemeProvider } from 'next-themes'

import { PdfModeProvider } from '@/components/PdfModeContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <PdfModeProvider>{children}</PdfModeProvider>
    </ThemeProvider>
  )
}
