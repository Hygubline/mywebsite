'use client'

import { useLayoutEffect, useRef, type ElementType } from 'react'
import gsap from 'gsap'

interface AnimatedTextProps {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Word-by-word text reveal. Each word rises out of a clipped line, giving the
 * hero copy a calm, cinematic entrance. Falls back to plain visible text when
 * motion is reduced.
 */
export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(' ')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-word]', {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger,
        delay,
      })
    }, el)

    return () => ctx.revert()
  }, [delay, stagger])

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block">
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
