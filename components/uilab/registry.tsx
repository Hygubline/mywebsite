'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

/**
 * Maps a UI Lab entry's `demo` frontmatter key to the live component that
 * renders the experiment. Demos load client-side only so server rendering
 * stays cheap and motion code never runs on the server.
 */
const demos: Record<string, ComponentType> = {
  'magnetic-button': dynamic(() => import('./MagneticButton'), { ssr: false }),
  'tilt-card': dynamic(() => import('./TiltCard'), { ssr: false }),
  'animated-gradient': dynamic(() => import('./AnimatedGradient'), { ssr: false }),
  'text-reveal': dynamic(() => import('./TextRevealDemo'), { ssr: false }),
}

export function getDemo(key?: string): ComponentType | null {
  if (!key) return null
  return demos[key] ?? null
}

export function DemoStage({ demoKey }: { demoKey?: string }) {
  const Demo = getDemo(demoKey)
  if (!Demo) return null

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-border bg-surface/40">
      <div className="border-b border-border px-5 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
        Live demo
      </div>
      <Demo />
    </div>
  )
}
