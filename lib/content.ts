import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * A single piece of content in the garden — a note, a reading note, or a
 * UI Lab experiment. Frontmatter fields are loose because each collection
 * uses a slightly different shape (reading has author/source, ui-lab has
 * a demo key, etc.). Everything funnels through one loader.
 */
export interface ContentEntry {
  slug: string
  title: string
  date: string
  summary?: string
  tags?: string[]
  /** rendered HTML body */
  content: string
  /** raw markdown body, handy for read-time estimates */
  raw: string
  // collection-specific extras
  author?: string
  source?: string
  link?: string
  rating?: number
  demo?: string
  status?: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content')

/** Read every .mdx entry in a collection, newest first. */
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
        summary: data.summary ?? data.hook,
        tags: data.tags,
        author: data.author,
        source: data.source,
        link: data.link,
        rating: data.rating,
        demo: data.demo,
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

export function estimateReadTime(raw: string): number {
  const words = raw.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

/**
 * A tiny, dependency-light markdown → HTML pass. It emits clean semantic
 * tags that are styled by the `.prose` rules in globals.css, so the output
 * stays consistent with the rest of the garden. Block-level handling only,
 * plus inline bold/italic/code/links.
 */
export function renderMarkdown(markdown: string): string {
  const blocks = markdown.split(/\n{2,}/)

  return blocks
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''

      if (trimmed.startsWith('### ')) return `<h3>${inline(trimmed.slice(4))}</h3>`
      if (trimmed.startsWith('## ')) return `<h2>${inline(trimmed.slice(3))}</h2>`
      if (trimmed.startsWith('# ')) return `<h2>${inline(trimmed.slice(2))}</h2>`

      if (trimmed.startsWith('> ')) {
        const body = trimmed
          .split('\n')
          .map((line) => inline(line.replace(/^>\s?/, '')))
          .join(' ')
        return `<blockquote>${body}</blockquote>`
      }

      if (/^[-*] /.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((line) => /^[-*] /.test(line.trim()))
          .map((line) => `<li>${inline(line.trim().slice(2))}</li>`)
          .join('')
        return `<ul>${items}</ul>`
      }

      if (/^\d+\. /.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((line) => /^\d+\. /.test(line.trim()))
          .map((line) => `<li>${inline(line.trim().replace(/^\d+\.\s/, ''))}</li>`)
          .join('')
        return `<ol>${items}</ol>`
      }

      return `<p>${inline(trimmed.replace(/\n/g, ' '))}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

function inline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
}
