import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import MagneticCard from '@/components/MagneticCard'
import Tag from '@/components/Tag'
import Reveal from '@/components/anim/Reveal'
import { getProjects } from '@/lib/getProjects'

export const metadata: Metadata = {
  title: 'Projects — Yun He',
  description: 'Small things I’ve made, and what each one quietly taught me.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container-main">
      <SectionTitle
        as="h1"
        eyebrow="Small Builds"
        title="Things I’ve made"
        intro="Personal builds and learning experiments. Some are finished, some are perpetually in progress — each one taught me something worth keeping."
        className="mb-12"
      />

      {projects.length === 0 ? (
        <p className="text-muted">No projects yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <MagneticCard key={project.slug} strength={0.06} className="h-full">
              <Link
                href={`/projects/${project.slug}`}
                className="glass glow-hover group flex h-full flex-col p-6 transition-colors duration-300 hover:border-warm/25"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm" />
                </div>
                {project.subtitle && (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.subtitle}</p>
                )}
                {project.techStack?.length ? (
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                ) : null}
              </Link>
            </MagneticCard>
          ))}
        </Reveal>
      )}
    </div>
  )
}
