'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, MapPin } from 'lucide-react'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-medium text-accent-cyan uppercase tracking-widest mb-3">
            Experience
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-12">
            Where I&apos;ve worked
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl rounded-xl border border-white/[0.06] bg-surface p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-1">
                Front Desk / Order Coordinator
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Building2 size={14} className="text-accent-cyan" />
                <span>Local Chinese Restaurant</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted mt-2 sm:mt-0">
              <MapPin size={14} className="text-accent-cyan" />
              <span>Newark, NJ</span>
            </div>
          </div>

          <ul className="space-y-3 mt-5">
            {[
              'Managed customer orders, phone calls, payments, and communication between customers and kitchen staff in a fast-paced environment.',
              'Handled order accuracy, customer questions, and issue resolution during high-volume business hours.',
              'Developed strong communication, multitasking, and problem-solving skills through daily customer-facing operations.',
              'Gained practical understanding of small business workflows and customer service pain points.',
            ].map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                <span className="text-accent-cyan mt-0.5 shrink-0">&#8226;</span>
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
