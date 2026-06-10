export interface ShelfBook {
  title: string
  author: string
  /** legacy field; current UI always renders generated placeholder covers */
  cover?: string
  /** legacy accent hint kept for compatibility with older shelves */
  color?: string
  /** slug of a written reading note, if one exists — makes the circle a link */
  noteSlug?: string
}

/**
 * The "recently read" shelf. Curated by hand so it can include books I read
 * but never wrote a full note for. Newest first. Edit freely.
 */
export const recentlyRead: ShelfBook[] = [
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    color: 'from-warm to-clay',
    noteSlug: 'thinking-fast-and-slow',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Hunt & Thomas',
    color: 'from-sage to-warm',
  },
  {
    title: 'Refactoring UI',
    author: 'Wathan & Schoger',
    color: 'from-clay to-sage',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    color: 'from-warm to-sage',
  },
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    color: 'from-sage to-clay',
  },
]

export function initials(title: string): string {
  return title
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')
}
