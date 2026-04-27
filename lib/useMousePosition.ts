'use client'

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
  nx: number
  ny: number
}

const defaultPos: MousePosition = { x: 0, y: 0, nx: 0.5, ny: 0.5 }

const MouseContext = createContext<MousePosition>(defaultPos)

export function useMousePosition() {
  return useContext(MouseContext)
}

export { MouseContext }

export function useMouseTracking() {
  const [pos, setPos] = useState<MousePosition>(defaultPos)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef(0)
  const mounted = useRef(false)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const tick = useCallback(() => {
    current.current.x = lerp(current.current.x, target.current.x, 0.1)
    current.current.y = lerp(current.current.y, target.current.y, 0.1)

    const w = typeof window !== 'undefined' ? window.innerWidth : 1
    const h = typeof window !== 'undefined' ? window.innerHeight : 1

    setPos({
      x: current.current.x,
      y: current.current.y,
      nx: current.current.x / w,
      ny: current.current.y / h,
    })

    rafId.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2, nx: 0.5, ny: 0.5 })
      return
    }

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    current.current = { ...target.current }

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [tick])

  return pos
}
