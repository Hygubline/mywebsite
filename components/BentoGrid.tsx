'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/lib/getProjects'

interface BentoGridProps {
  projects: Project[]
}

function SceneCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block scene-card p-8 md:p-10 group"
      >
        <div className="flex items-start justify-between mb-8">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#4a443c]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#4a443c] group-hover:text-[#e8e4df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-700" />
        </div>

        <h3 className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-[#e8e4df]/90 mb-3 group-hover:text-[#e8e4df] transition-colors duration-700">
          {project.title}
        </h3>
        <p className="text-[#6b6359] text-sm leading-[1.7] mb-8">
          {project.subtitle}
        </p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-6 border-t border-[#e8e4df]/[0.04]">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono tracking-wide text-[#4a443c]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  )
}

export function BentoGrid({ projects }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#e8e4df]/[0.04]">
      {projects.map((project, index) => (
        <SceneCard key={project.slug} project={project} index={index} />
      ))}

      {/* View all — final cell */}
      <Link
        href="/projects"
        className="scene-card p-8 md:p-10 flex items-center justify-center group"
      >
        <div className="text-center">
          <ArrowUpRight className="w-5 h-5 mx-auto mb-4 text-[#4a443c] group-hover:text-[#e8e4df] transition-colors duration-700" />
          <p className="text-[12px] tracking-[0.1em] uppercase text-[#4a443c] group-hover:text-[#8a8278] transition-colors duration-700">
            View all projects
          </p>
        </div>
      </Link>
    </div>
  )
}
