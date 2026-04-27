'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface SectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  number?: string
}

const ease = [0.16, 1, 0.3, 1] as const

export default function Section({ title, subtitle, number, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.4'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, 0])

  const noMotion = { opacity: 1, y: 0 }

  return (
    <motion.section
      ref={ref}
      className="section-cinema"
      style={prefersReduced ? {} : { opacity: sectionOpacity, y: sectionY }}
    >
      <div className="container-cinema">
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={prefersReduced ? noMotion : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
            className="flex items-baseline gap-6 mb-4"
          >
            {number && (
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#4a443c]">
                {number}
              </span>
            )}
            <h2>{title}</h2>
          </motion.div>
          {subtitle && (
            <motion.p
              initial={prefersReduced ? noMotion : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="text-[#6b6359] text-sm tracking-wide ml-0"
              style={number ? { marginLeft: 'calc(1.5rem + 2ch)' } : undefined}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={prefersReduced ? noMotion : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.25, ease }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}
