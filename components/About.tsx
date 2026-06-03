'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, MapPin, Briefcase } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-medium text-accent-cyan uppercase tracking-widest mb-3">
            About
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-8">
            A bit about me
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-2">
              <p className="text-muted leading-relaxed text-base sm:text-lg">
                I am a Computer Science student at Hunter College with hands-on experience in web development, Python programming, and practical software projects. My work focuses on building useful technology for real-world needs, including responsive business websites, data analysis tools, and automation-focused projects. I enjoy turning ideas into working products, especially projects that help small businesses improve their online presence and operations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <GraduationCap size={16} className="text-accent-cyan shrink-0" />
                <span className="text-muted">CS @ Hunter College</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-accent-cyan shrink-0" />
                <span className="text-muted">New York / New Jersey</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase size={16} className="text-accent-cyan shrink-0" />
                <span className="text-muted">Open to Internships & Entry-Level</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
