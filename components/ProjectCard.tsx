'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/lib/getProjects'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/projects/${project.slug}`} className="block scene-card p-6 md:p-8 group">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-6 flex-1">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#4a443c] mt-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <h3 className="font-medium text-[#e8e4df]/90 tracking-[-0.02em] group-hover:text-[#e8e4df] transition-colors duration-700">
                {project.title}
              </h3>
              <p className="text-[#6b6359] text-sm mt-2 leading-[1.7]">{project.subtitle}</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#4a443c] group-hover:text-[#e8e4df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-700 flex-shrink-0" />
        </div>
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6 ml-[calc(1.5rem+2ch)]">
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
