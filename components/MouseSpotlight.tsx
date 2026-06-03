'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { useMousePosition } from '@/lib/useMousePosition'

const springConfig = { damping: 35, stiffness: 120, mass: 0.8 }

export function MouseSpotlight() {
  const { x, y } = useMousePosition()
  const ref = useRef<HTMLDivElement>(null)

  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const smoothX = useSpring(spotX, springConfig)
  const smoothY = useSpring(spotY, springConfig)

  useEffect(() => {
    spotX.set(x)
    spotY.set(y)
  }, [x, y, spotX, spotY])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const unsubX = smoothX.on('change', (v) => {
      el.style.setProperty('--spot-x', `${v}px`)
    })
    const unsubY = smoothY.on('change', (v) => {
      el.style.setProperty('--spot-y', `${v}px`)
    })

    return () => {
      unsubX()
      unsubY()
    }
  }, [smoothX, smoothY])

  return (
    <div
      ref={ref}
      className="mouse-spotlight"
      aria-hidden="true"
    />
  )
}
