'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'

const PdfModeContext = createContext<boolean>(false)

export function PdfModeProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const value = searchParams?.get('pdf') ?? null

  const isPdfMode = useMemo(
    () => value === '1' || value === 'true' || value === '',
    [value],
  )

  return (
    <PdfModeContext.Provider value={isPdfMode}>
      {children}
    </PdfModeContext.Provider>
  )
}

export function usePdfMode() {
  return useContext(PdfModeContext)
}
