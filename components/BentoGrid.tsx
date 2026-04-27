'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Project } from '@/lib/getProjects'
import { CaseStudyCard } from './CaseStudyCard'

interface BentoGridProps {
  projects: Project[]
}

export function BentoGrid({ projects }: BentoGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className="space-y-[1px]">
      {projects.map((project, index) => (
        <CaseStudyCard key={project.slug} project={project} index={index} />
      ))}

      {/* View all link */}
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, delay: projects.length * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 text-[12px] tracking-[0.1em] uppercase text-[#4a443c] hover:text-[#8a8278] transition-colors duration-700 group"
        >
          View full archive
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-700" />
        </Link>
      </motion.div>
    </div>
  )
}
