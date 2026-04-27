'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  number?: string
}

export default function Section({ title, subtitle, number, children }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-cinema">
      <div className="container-cinema">
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[#6b6359] text-sm tracking-wide ml-0"
              style={number ? { marginLeft: 'calc(1.5rem + 2ch)' } : undefined}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
