'use client'

import { motion } from 'framer-motion'

interface SkillBarProps {
  label: string
  /** 0–100 */
  value: number
  /** short human label, e.g. "Learning" */
  level: string
}

/**
 * A thin, glowing skill bar. The fill animates from 0 to `value` the first time
 * it scrolls into view, so the learning stack feels alive but stays subtle.
 */
export default function SkillBar({ label, value, level }: SkillBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-[11px] text-muted">
          {level} · {clamped}%
        </span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-warm/70 to-warm shadow-[0_0_12px_rgba(227,168,111,0.5)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
