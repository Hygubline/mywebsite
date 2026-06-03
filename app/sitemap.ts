import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/getProjects'
import { getCollection } from '@/lib/content'

const baseUrl = 'https://yunhe.dev' // Update with your domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  const notes = getCollection('notes')
  const reading = getCollection('reading')
  const uiLab = getCollection('ui-lab')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/notes`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/ui-lab`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/reading`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
  ].map((route) => ({ ...route, lastModified: new Date() }))

  const collectionRoutes: MetadataRoute.Sitemap = [
    ...notes.map((e) => ({ path: `notes/${e.slug}`, date: e.date })),
    ...reading.map((e) => ({ path: `reading/${e.slug}`, date: e.date })),
    ...uiLab.map((e) => ({ path: `ui-lab/${e.slug}`, date: e.date })),
  ].map(({ path, date }) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...collectionRoutes, ...projectRoutes]
}
