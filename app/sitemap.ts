import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/getProjects'
import { getCollection } from '@/lib/content'

const baseUrl = 'https://yunhe.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  const notes = getCollection('notes')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/notes`, priority: 0.9, changeFrequency: 'weekly' as const },
  ].map((route) => ({ ...route, lastModified: new Date() }))

  const noteRoutes: MetadataRoute.Sitemap = notes.map((entry) => ({
    url: `${baseUrl}/notes/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...noteRoutes, ...projectRoutes]
}
