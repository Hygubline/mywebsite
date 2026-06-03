'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Experiment: a button that leans toward the cursor while hovered nearby,
 * springing back to rest on leave. The label drifts a little further than
 * the shell so the motion reads as weight rather than a flat slide.
 */
export default function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const prefersReduced = useReducedMotion()

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    // scale + clamp so it never wanders too far
    const clamp = (n: number) => Math.max(-22, Math.min(22, n * 0.35))
    setPos({ x: clamp(relX), y: clamp(relY) })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <div className="flex min-h-[260px] items-center justify-center">
      <motion.button
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, mass: 0.4 }}
        className="relative rounded-full border border-warm/40 bg-warm/10 px-10 py-4 text-sm font-medium tracking-wide text-warm"
      >
        <motion.span
          animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, mass: 0.4 }}
          className="block"
        >
          Come closer
        </motion.span>
      </motion.button>
    </div>
  )
}
