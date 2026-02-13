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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="block glass-card p-5 group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-medium text-white tracking-tight group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-neutral-500 text-sm mt-1">{project.subtitle}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
        </div>
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-500 border border-white/5"
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
