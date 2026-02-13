'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Sparkles, Code2, Lightbulb } from 'lucide-react'
import { Project } from '@/lib/getProjects'

interface BentoGridProps {
  projects: Project[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
}

export function BentoGrid({ projects }: BentoGridProps) {
  return (
    <div className="bento-grid">
      {/* Featured Project - Large Card */}
      {projects[0] && (
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bento-card bento-card-lg group"
        >
          <Link href={`/projects/${projects[0].slug}`} className="block h-full">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <div className="flex-1">
                <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Featured</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                  {projects[0].title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {projects[0].subtitle}
                </p>
              </div>

              {projects[0].techStack && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                  {projects[0].techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      )}

      {/* Secondary Projects */}
      {projects.slice(1).map((project, index) => (
        <motion.div
          key={project.slug}
          custom={index + 1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bento-card group"
        >
          <Link href={`/projects/${project.slug}`} className="block h-full">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {index % 2 === 0 ? (
                    <Code2 className="w-5 h-5 text-neutral-400" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-neutral-400" />
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <h3 className="text-lg font-medium text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed flex-1">
                {project.subtitle}
              </p>

              {project.techStack && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Call to Action Card */}
      <motion.div
        custom={projects.length}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bento-card flex items-center justify-center text-center group cursor-pointer"
      >
        <Link href="/projects" className="block p-4">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-sm text-neutral-400 group-hover:text-white transition-colors">
            View all projects
          </p>
        </Link>
      </motion.div>
    </div>
  )
}
