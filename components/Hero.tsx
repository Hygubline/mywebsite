'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'

/**
 * The front door. Not a résumé headline — a quiet invitation into a personal
 * corner of the internet. The lines reveal in sequence on load via GSAP.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* soft lamplight */}
      <div className="absolute -top-1/4 left-1/3 h-[520px] w-[520px] rounded-full bg-warm/[0.06] blur-[130px]" />
      <div className="absolute bottom-0 -left-1/4 h-[400px] w-[400px] rounded-full bg-sage/[0.05] blur-[120px]" />

      <div ref={root} className="section-container relative z-10 py-28">
        <span
          data-reveal
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-warm animate-pulse" />
          <span className="text-xs font-medium text-muted">a personal digital garden</span>
        </span>

        <h1
          data-reveal
          className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-foreground"
        >
          Hi, I&apos;m Yun.
          <br />
          This is my corner of{' '}
          <span className="bg-gradient-to-r from-warm to-clay bg-clip-text text-transparent">
            the internet.
          </span>
        </h1>

        <p
          data-reveal
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted"
        >
          A place where I collect ideas, build small experiments, write notes, and
          slowly figure things out. Not a résumé — just the stuff I&apos;m thinking
          about and tinkering with, out in the open.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/notes"
            className="rounded-lg bg-warm px-6 py-3 text-sm font-medium text-background transition-all duration-200 hover:bg-warm/90 hover:shadow-lg hover:shadow-warm/20"
          >
            Read my notes
          </Link>
          <Link
            href="/ui-lab"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-white/5"
          >
            Wander the UI Lab
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/40">
        <ArrowDown size={20} className="animate-bounce" />
      </div>
    </section>
  )
}
