'use client'

import { useEffect, useRef } from 'react'
import { Sparkles, BookOpen, Star, Code2 } from 'lucide-react'

interface Fragment {
  /** position as % of the hero box */
  top: string
  left: string
  depth: number
  float: 'animate-float-slow' | 'animate-float-slower'
  rot: number
  node: React.ReactNode
}

const fragments: Fragment[] = [
  {
    top: '14%',
    left: '72%',
    depth: 26,
    float: 'animate-float-slow',
    rot: -6,
    node: (
      <div className="glass w-44 px-4 py-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-warm/70">note</p>
        <p className="mt-1 text-xs text-foreground/80">becoming better, slowly</p>
      </div>
    ),
  },
  {
    top: '64%',
    left: '78%',
    depth: 40,
    float: 'animate-float-slower',
    rot: 5,
    node: (
      <div className="glass flex items-center gap-2 px-3 py-2">
        <BookOpen className="h-3.5 w-3.5 text-sage" />
        <span className="text-xs text-foreground/80">Lu Xun — Hometown</span>
      </div>
    ),
  },
  {
    top: '30%',
    left: '8%',
    depth: 34,
    float: 'animate-float-slower',
    rot: 4,
    node: (
      <div className="glass flex items-center gap-2 px-3 py-2 font-mono text-xs text-iris">
        <Code2 className="h-3.5 w-3.5" /> gsap.from(&hellip;)
      </div>
    ),
  },
  {
    top: '72%',
    left: '14%',
    depth: 22,
    float: 'animate-float-slow',
    rot: -4,
    node: (
      <div className="glass flex items-center gap-1.5 px-3 py-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-gold text-gold" />
        ))}
        <Star className="h-3 w-3 text-gold/30" />
      </div>
    ),
  },
  {
    top: '8%',
    left: '34%',
    depth: 18,
    float: 'animate-float-slow',
    rot: 8,
    node: (
      <div className="glass flex items-center gap-2 px-3 py-2">
        <Sparkles className="h-3.5 w-3.5 text-warm" />
        <span className="text-xs text-foreground/80">unfinished idea</span>
      </div>
    ),
  },
]

export default function FloatingFragments() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2
        const cy = window.innerHeight / 2
        const dx = (e.clientX - cx) / cx
        const dy = (e.clientY - cy) / cy
        el.querySelectorAll<HTMLElement>('[data-depth]').forEach((node) => {
          const depth = Number(node.dataset.depth) || 0
          node.style.transform = `translate3d(${dx * depth}px, ${dy * depth}px, 0)`
        })
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {fragments.map((f, i) => (
        <div
          key={i}
          data-depth={f.depth}
          className="absolute will-change-transform"
          style={{ top: f.top, left: f.left, transition: 'transform 0.3s ease-out' }}
        >
          <div className={f.float} style={{ ['--frag-rot' as string]: `${f.rot}deg` }}>
            {f.node}
          </div>
        </div>
      ))}
    </div>
  )
}
