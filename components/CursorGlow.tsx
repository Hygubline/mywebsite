'use client'

import { useEffect, useState } from 'react'

/**
 * A soft amber glow that trails the cursor — just enough to make the dark
 * room feel lamp-lit and alive. Desktop + fine-pointer only, and disabled
 * for anyone who prefers reduced motion, so it never hurts usability.
 */
export default function CursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!pos) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500"
      style={{
        background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(227, 168, 111, 0.06), transparent 70%)`,
      }}
    />
  )
}
