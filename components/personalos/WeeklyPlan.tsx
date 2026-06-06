'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { WeeklyTask } from '@/lib/personalOs'

interface WeeklyPlanProps {
  plan: WeeklyTask[]
}

/**
 * Weekly plan as a glass table. Today's row is highlighted, completed tasks
 * get a check + muted strikethrough, and rows stagger in on mount.
 */
export default function WeeklyPlan({ plan }: WeeklyPlanProps) {
  // Resolved on the client only — keeps server/client markup identical until mount.
  const [today, setToday] = useState<string | null>(null)

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { weekday: 'long' }))
  }, [])

  return (
    <div className="glass overflow-hidden rounded-2xl">
      {/* header row (hidden on mobile, where each row is a stacked card) */}
      <div className="hidden grid-cols-[1fr_1fr_2fr_auto] gap-4 border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:grid">
        <span>Day</span>
        <span>Focus</span>
        <span>Task</span>
        <span className="text-right">Status</span>
      </div>

      <ul>
        {plan.map((row, i) => {
          const isToday = today === row.day
          return (
            <motion.li
              key={row.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative grid grid-cols-2 gap-x-4 gap-y-1 border-b border-border/60 px-5 py-3.5 text-sm transition-colors last:border-b-0 sm:grid-cols-[1fr_1fr_2fr_auto] sm:items-center ${
                isToday ? 'bg-warm/[0.07]' : 'hover:bg-white/[0.02]'
              }`}
            >
              {isToday && (
                <span className="absolute inset-y-0 left-0 w-0.5 bg-warm shadow-[0_0_10px_rgba(227,168,111,0.7)]" />
              )}

              <span className="flex items-center gap-2 font-medium text-foreground">
                {row.day}
                {isToday && (
                  <span className="rounded-full bg-warm/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-warm">
                    Today
                  </span>
                )}
              </span>

              <span className="text-muted">{row.focus}</span>

              <span
                className={`col-span-2 sm:col-span-1 ${
                  row.done ? 'text-muted/60 line-through' : 'text-foreground/90'
                }`}
              >
                {row.task}
              </span>

              <span className="flex items-center sm:justify-end">
                {row.done ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-sage">
                    <Check className="h-3.5 w-3.5" /> Done
                  </span>
                ) : (
                  <span className="text-xs text-muted/70">Pending</span>
                )}
              </span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
