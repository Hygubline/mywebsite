'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  highlights: string[]
  buttons: { label: string; href: string; icon: 'github' | 'external' | 'details' }[]
  badge?: string
  index: number
}

export default function ProjectCard({
  title,
  description,
  techStack,
  highlights,
  buttons,
  badge,
  index,
}: ProjectCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-xl border border-white/[0.06] bg-surface hover:bg-surface-light hover:border-white/[0.1] transition-all duration-300 hover:shadow-xl hover:shadow-black/20 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent-cyan transition-colors duration-200">
            {title}
          </h3>
          {badge && (
            <span className="text-xs px-2 py-1 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/20 shrink-0 ml-3">
              {badge}
            </span>
          )}
        </div>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-muted border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted leading-relaxed mb-5">
          {description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted/80">
              <span className="text-accent-cyan mt-1 shrink-0">&#8226;</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          {buttons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/[0.08] text-muted hover:text-foreground hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200"
            >
              {btn.icon === 'github' && <Github size={14} />}
              {btn.icon === 'external' && <ExternalLink size={14} />}
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
