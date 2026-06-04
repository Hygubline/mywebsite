import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { renderMarkdown, type ContentEntry } from './content-shared'

// Re-export the client-safe pieces so existing imports of `@/lib/content`
// keep working (server files can grab loaders + types from one place).
export {
  estimateReadTime,
  renderMarkdown,
  type ContentEntry,
  type ExperimentStatus,
} from './content-shared'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

/** Read every .mdx entry in a collection, newest first. Server only. */
export function getCollection(collection: string): ContentEntry[] {
  const dir = path.join(CONTENT_ROOT, collection)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? String(data.date) : new Date().toISOString(),
        summary: data.summary ?? data.excerpt ?? data.hook,
        tags: data.tags,
        author: data.author,
        source: data.source,
        link: data.link,
        rating: data.rating,
        favorite: data.favorite,
        demo: data.demo,
        preview: data.preview,
        status: data.status,
        raw: content,
        content: renderMarkdown(content),
      } satisfies ContentEntry
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getEntry(collection: string, slug: string): ContentEntry | null {
  return getCollection(collection).find((entry) => entry.slug === slug) ?? null
}
