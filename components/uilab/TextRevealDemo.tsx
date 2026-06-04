'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { RotateCcw } from 'lucide-react'

const LINES = ['Some words', 'arrive slowly,', 'one after another.']

/** Experiment: a GSAP word-by-word reveal you can replay. */
export default function TextRevealDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [key, setKey] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-word]', {
        yPercent: 120,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.06,
      })
    }, el)
    return () => ctx.revert()
  }, [key])

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-8">
      <div ref={ref} className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {LINES.map((line, li) => (
          <div key={li}>
            {line.split(' ').map((word, wi) => (
              <span key={wi} className="inline-block overflow-hidden align-bottom">
                <span data-word className="inline-block">
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted transition-colors hover:border-warm/30 hover:text-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Replay
      </button>
    </div>
  )
}
