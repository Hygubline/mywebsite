/**
 * The "Inspiration" page — people, sites, tools, and ideas that shape how I
 * build and think. Edit this list freely; items are grouped by `category`.
 */

export interface InspirationItem {
  title: string
  /** who/where it's from (optional) */
  by?: string
  category: InspirationCategory
  /** one honest line on why it inspires you */
  note: string
  /** optional external link */
  link?: string
}

export type InspirationCategory = 'Websites' | 'People' | 'Tools' | 'Ideas'

/** Order in which the category sections appear. */
export const inspirationCategories: InspirationCategory[] = [
  'Websites',
  'People',
  'Tools',
  'Ideas',
]

export const inspiration: InspirationItem[] = [
  {
    title: 'Personal digital gardens',
    category: 'Websites',
    note: 'Sites that feel like a person, not a résumé — playful, layered, and clearly hand-made.',
  },
  {
    title: 'Award-winning portfolios',
    category: 'Websites',
    note: 'Motion and typography studies I return to when I want to raise my own bar.',
  },
  {
    title: 'Indie builders who ship in public',
    category: 'People',
    note: 'Watching people learn out loud reminds me that finished beats perfect.',
  },
  {
    title: 'Front-end & design educators',
    category: 'People',
    note: 'Clear teachers who turn fuzzy concepts into things I can actually build.',
  },
  {
    title: 'AI coding assistants',
    by: 'Claude, Copilot',
    category: 'Tools',
    note: 'A patient pair-programmer — they let me build bigger ideas while I’m still learning.',
  },
  {
    title: 'Next.js + Tailwind',
    category: 'Tools',
    note: 'The stack this site runs on — fast to start, hard to outgrow.',
  },
  {
    title: 'Figma',
    category: 'Tools',
    note: 'Where ideas get cheap to try before they get expensive to code.',
  },
  {
    title: 'Build to learn',
    category: 'Ideas',
    note: 'I understand things only after I’ve made something with them. Projects are my notes.',
  },
  {
    title: 'Small, honest progress',
    category: 'Ideas',
    note: 'A little every day, tracked openly — momentum matters more than intensity.',
  },
]
