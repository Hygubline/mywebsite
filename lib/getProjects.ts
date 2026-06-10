import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface Project {
  slug: string
  title: string
  subtitle: string
  // story framing (Overview → Why → Role → Learned → Next step)
  overview?: string
  why?: string
  role?: string
  learned?: string
  nextStep?: string
  improve?: string
  // legacy / optional
  problem?: string
  design?: string
  techStack?: string[]
  lessons?: string
  nextSteps?: string
  tags?: string[]
  github?: string
  live?: string
  featured?: boolean
  order?: number
}

export async function getProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const projects = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        subtitle: data.subtitle || '',
        overview: data.overview,
        why: data.why,
        role: data.role,
        learned: data.learned,
        nextStep: data.nextStep,
        improve: data.improve,
        problem: data.problem,
        design: data.design,
        techStack: data.techStack,
        lessons: data.lessons,
        nextSteps: data.nextSteps,
        tags: data.tags,
        github: data.github,
        live: data.live,
        featured: data.featured || false,
        order: data.order || 0,
      } as Project
    })

  return projects.sort((a, b) => (b.order || 0) - (a.order || 0))
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug) || null
}
