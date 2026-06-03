'use client'

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealProps {
  children: ReactNode
  /** When set, the element's direct children animate in sequence. */
  stagger?: number
  delay?: number
  y?: number
  as?: ElementType
  className?: string
}

/**
 * Scroll-triggered fade-up. Honors prefers-reduced-motion by leaving
 * everything visible. The hidden state is applied in a layout effect so
 * there's no flash, and the no-JS fallback keeps content visible.
 */
export default function Reveal({
  children,
  stagger,
  delay = 0,
  y = 24,
  as: Tag = 'div',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const targets =
        stagger != null ? (Array.from(el.children) as HTMLElement[]) : el
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, delay, y])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
