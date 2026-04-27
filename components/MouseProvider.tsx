'use client'

import { ReactNode } from 'react'
import { MouseContext, useMouseTracking } from '@/lib/useMousePosition'

export function MouseProvider({ children }: { children: ReactNode }) {
  const mouse = useMouseTracking()
  return (
    <MouseContext.Provider value={mouse}>
      {children}
    </MouseContext.Provider>
  )
}
