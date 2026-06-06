'use client'

import { motion } from 'framer-motion'

type ProgressTone = 'warm' | 'iris' | 'sage' | 'gold'

interface ProgressBarProps {
  /** 0–100 */
  value: number
  tone?: ProgressTone
  /** show the "%" label to the right of the track */
  showLabel?: boolean
}

const tones: Record<ProgressTone, { fill: string; glow: string }> = {
  warm: { fill: 'from-warm/80 to-warm', glow: 'shadow-[0_0_12px_rgba(227,168,111,0.55)]' },
  iris: { fill: 'from-iris/80 to-iris', glow: 'shadow-[0_0_12px_rgba(140,123,214,0.55)]' },
  sage: { fill: 'from-sage/80 to-sage', glow: 'shadow-[0_0_12px_rgba(138,163,148,0.5)]' },
  gold: { fill: 'from-gold/80 to-gold', glow: 'shadow-[0_0_12px_rgba(216,184,120,0.5)]' },
}

/**
 * Thin glowing progress track. The fill animates from 0 to `value` the first
 * time it scrolls into view (Framer Motion), and stays put after.
 */
export default function ProgressBar({ value, tone = 'warm', showLabel = true }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const { fill, glow } = tones[tone]

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${fill} ${glow}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      {showLabel && (
        <span className="w-9 shrink-0 text-right font-mono text-xs tabular-nums text-muted">
          {clamped}%
        </span>
      )}
    </div>
  )
}
