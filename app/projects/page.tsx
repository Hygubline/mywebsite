import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/anim/Reveal'
import { getProjects } from '@/lib/getProjects'

export const metadata: Metadata = {
  title: 'Projects — Yun He',
  description: 'Things I’m building and the lessons they keep teaching me.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container-main">
      <PageHeader
        eyebrow="Projects"
        title="Things I’m building"
        intro="Personal projects and learning experiments. Some are finished, some are perpetually in progress — each one taught me something worth keeping."
      />

      {projects.length === 0 ? (
        <p className="text-muted">No projects yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-warm/30 hover:bg-surface/70"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-warm/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm" />
              </div>
              {project.subtitle && (
                <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-muted">
                  {project.subtitle}
                </p>
              )}
              {project.techStack?.length ? (
                <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-white/[0.03] px-2 py-0.5 text-[11px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </Reveal>
      )}
    </div>
  )
}
