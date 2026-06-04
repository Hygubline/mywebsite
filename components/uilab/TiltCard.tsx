'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Experiment: a card that tilts in 3D toward the cursor, with a moving glare. */
export default function TiltCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50 })
  const prefersReduced = useReducedMotion()

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ ry: (px - 0.5) * 18, rx: -(py - 0.5) * 18 })
    setGlare({ x: px * 100, y: py * 100 })
  }

  const reset = () => {
    setTilt({ rx: 0, ry: 0 })
    setGlare({ x: 50, y: 50 })
  }

  return (
    <div className="flex min-h-[300px] items-center justify-center [perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-52 w-72 overflow-hidden rounded-2xl border border-warm/20 bg-surface/70 p-6 shadow-2xl shadow-black/50"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(300px circle at ${glare.x}% ${glare.y}%, rgba(227,168,111,0.18), transparent 60%)`,
          }}
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm/70">3D hover</p>
        <p className="mt-4 text-xl font-semibold text-foreground">Tilt me around</p>
        <p className="mt-2 text-sm text-muted">
          Move your cursor across the card and watch it follow in three dimensions.
        </p>
      </motion.div>
    </div>
  )
}
