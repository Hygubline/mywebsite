import { getProjects } from '@/lib/getProjects'
import ProjectCard from '@/components/ProjectCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Yun He',
  description: 'Selected projects showcasing systems thinking and AI-powered tools.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container-main">
      <div className="mb-12">
        <h1 className="mb-4">Projects</h1>
        <p className="text-xl text-neutral-500">
          Systems I&apos;ve built. Problems I&apos;ve solved.
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-neutral-500">Projects coming soon.</p>
        </div>
      )}
    </div>
  )
}
