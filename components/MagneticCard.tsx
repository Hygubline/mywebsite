'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface MagneticCardProps {
  children: ReactNode
  className?: string
  /** how strongly it leans toward the cursor (0–1) */
  strength?: number
}

/**
 * Wraps content so it leans toward the cursor and lifts slightly on hover,
 * while feeding the pointer position to a `.glow-hover` child via CSS vars.
 * Springs back on leave. Inert for reduced-motion users.
 */
export default function MagneticCard({
  children,
  className = '',
  strength = 0.18,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const prefersReduced = useReducedMotion()

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    if (prefersReduced) return
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    setOffset({ x: relX * strength, y: relY * strength })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 160, damping: 15, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
