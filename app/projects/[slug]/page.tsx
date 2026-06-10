import { getProjects, getProjectBySlug } from '@/lib/getProjects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import Tag from '@/components/Tag'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return { title: `${project.title} — Yun He`, description: project.subtitle }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  // The project, told as a short story. Each section falls back to older
  // field names so existing notes keep rendering.
  const sections = [
    { title: 'Overview', content: project.overview },
    { title: 'Why I built it', content: project.why ?? project.problem },
    { title: 'My role', content: project.role },
    { title: 'What I learned', content: project.learned ?? project.lessons },
    { title: 'Next step', content: project.nextStep ?? project.improve ?? project.nextSteps },
  ].filter((s) => s.content)

  return (
    <div className="container-main">
      <Link
        href="/projects"
        className="group mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to projects
      </Link>

      <article>
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          {project.subtitle && <p className="text-lg text-muted">{project.subtitle}</p>}
        </header>

        <div className="grid gap-4">
          {sections.map((section, i) => (
            <div key={section.title} className="glass p-6">
              <h2 className="mb-3 flex items-center gap-3 text-base font-semibold tracking-tight text-foreground">
                <span className="font-mono text-xs text-warm/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              <p className="leading-relaxed text-muted">{section.content}</p>
            </div>
          ))}

          {project.techStack?.length ? (
            <div className="glass p-6">
              <h2 className="mb-4 text-base font-semibold tracking-tight text-foreground">
                Tech stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Tag key={tech} tone="warm">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          ) : null}

          {(project.github || project.live) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github className="h-4 w-4" /> View source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
