import { getProjects, getProjectBySlug } from '@/lib/getProjects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} — Yun He`,
    description: project.subtitle,
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const sections = [
    { title: 'Problem', content: project.problem },
    { title: 'Design', content: project.design },
    { title: 'Lessons Learned', content: project.lessons },
    { title: 'Next Steps', content: project.nextSteps },
  ].filter((s) => s.content)

  return (
    <div className="container-main">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 mb-8 text-neutral-500 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </Link>

      <article>
        <header className="mb-12">
          <h1 className="mb-4">{project.title}</h1>
          <p className="text-xl text-neutral-400">{project.subtitle}</p>
        </header>

        <div className="grid gap-6">
          {sections.map((section) => (
            <div key={section.title} className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4 tracking-tight">
                {section.title}
              </h2>
              <p className="text-neutral-400 leading-relaxed">{section.content}</p>
            </div>
          ))}

          {project.techStack && project.techStack.length > 0 && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4 tracking-tight">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.github || project.live) && (
            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
