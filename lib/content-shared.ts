/**
 * Client-safe content helpers: types, read-time estimate, and the markdown
 * renderer. No `fs` here, so this module is safe to import from client
 * components. The filesystem loaders live in `content.ts` (server only).
 */

export type ExperimentStatus = 'idea' | 'building' | 'finished'

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
  /** reading: a single favorite idea worth remembering */
  favorite?: string
  /** ui-lab: key into the live demo registry */
  demo?: string
  /** ui-lab: animated preview motif when there's no live demo */
  preview?: string
  /** ui-lab: where the experiment stands */
  status?: ExperimentStatus
}

export function estimateReadTime(raw: string): number {
  const words = raw.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

/**
 * A tiny, dependency-light markdown → HTML pass. It emits clean semantic
 * tags styled by the `.prose` rules in globals.css. Block-level handling
 * only, plus inline bold/italic/code/links.
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
