'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/lib/getProjects'

interface CaseStudyCardProps {
  project: Project
  index: number
}

export function CaseStudyCard({ project, index }: CaseStudyCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="case-study-card group block relative"
        onMouseMove={handleMouseMove}
      >
        {/* Mouse-follow highlight */}
        <div
          className="case-study-highlight"
          style={{
            '--mx': `${mousePos.x * 100}%`,
            '--my': `${mousePos.y * 100}%`,
          } as React.CSSProperties}
        />

        {/* Large background number */}
        <div className="absolute top-6 right-8 md:top-8 md:right-12 text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none text-[#e8e4df]/[0.02] select-none pointer-events-none tracking-[-0.05em] group-hover:text-[#e8e4df]/[0.04] transition-colors duration-1000">
          {num}
        </div>

        <div className="relative z-10 p-8 md:p-12 lg:p-14">
          {/* Top row: number + category */}
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#4a443c]">
                {num}
              </span>
              <div className="w-6 h-[1px] bg-[#4a443c]/50" />
              {project.techStack && project.techStack[0] && (
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#4a443c]">
                  {project.techStack[0]}
                </span>
              )}
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#4a443c] group-hover:text-[#e8e4df] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700" />
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[#e8e4df]/90 mb-4 group-hover:text-[#e8e4df] transition-colors duration-700 leading-[1.1]">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[#6b6359] text-sm md:text-base leading-[1.8] max-w-xl mb-10 group-hover:text-[#8a8278] transition-colors duration-700">
            {project.subtitle}
          </p>

          {/* Tech stack pills */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-8 border-t border-[#e8e4df]/[0.04] group-hover:border-[#e8e4df]/[0.08] transition-colors duration-700">
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono tracking-[0.1em] uppercase text-[#4a443c] px-3 py-1.5 border border-[#e8e4df]/[0.04] group-hover:border-[#e8e4df]/[0.08] group-hover:text-[#6b6359] transition-all duration-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
