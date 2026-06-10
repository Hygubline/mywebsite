'use client'

import { motion } from 'framer-motion'

type ProgressTone = 'warm' | 'iris' | 'sage' | 'gold'

interface CircularProgressProps {
  /** 0–100 */
  value: number
  tone?: ProgressTone
  /** diameter in px */
  size?: number
  strokeWidth?: number
}

const toneColors: Record<ProgressTone, string> = {
  warm: '#e3a86f',
  iris: '#8c7bd6',
  sage: '#8aa394',
  gold: '#d8b878',
}

/**
 * Circular progress ring. The arc animates from 0 to `value` the first time it
 * scrolls into view (Framer Motion via stroke-dashoffset), with a soft glow,
 * and the percentage sits in the center.
 */
export default function CircularProgress({
  value,
  tone = 'warm',
  size = 64,
  strokeWidth = 5,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const color = toneColors[tone]
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
        />
        {/* animated arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ filter: `drop-shadow(0 0 5px ${color}aa)` }}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold tabular-nums text-foreground">
        {clamped}
        <span className="ml-0.5 text-[10px] text-muted">%</span>
      </span>
    </div>
  )
}
