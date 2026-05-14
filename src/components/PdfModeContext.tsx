'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useSearchParams } from 'next/navigation'

type PaginationState = {
  current: number
  total: number
}

type PdfModeValue = {
  isPdfMode: boolean
  pagination: PaginationState
  setPagination: (next: Partial<PaginationState>) => void
}

const defaultValue: PdfModeValue = {
  isPdfMode: false,
  pagination: { current: 0, total: 0 },
  setPagination: () => {},
}

const PdfModeContext = createContext<PdfModeValue>(defaultValue)

export function PdfModeProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const value = searchParams?.get('pdf') ?? null

  const isPdfMode = useMemo(
    () => value === '1' || value === 'true' || value === '',
    [value],
  )

  const [pagination, setPaginationState] = useState<PaginationState>({
    current: 0,
    total: 0,
  })

  const setPagination = useCallback((next: Partial<PaginationState>) => {
    setPaginationState((prev) => ({ ...prev, ...next }))
  }, [])

  const ctx = useMemo<PdfModeValue>(
    () => ({ isPdfMode, pagination, setPagination }),
    [isPdfMode, pagination, setPagination],
  )

  return (
    <PdfModeContext.Provider value={ctx}>{children}</PdfModeContext.Provider>
  )
}

export function usePdfMode() {
  return useContext(PdfModeContext).isPdfMode
}

export function usePdfPagination() {
  const { pagination, setPagination } = useContext(PdfModeContext)
  return {
    current: pagination.current,
    total: pagination.total,
    setPagination,
  }
}
