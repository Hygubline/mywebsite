export interface WorkIndexProject {
  slug: string
  number: string
  title: string
  type: string
  year: string
  status: string
  href: string
  description: string
  previewLabel: string
  previewMode: 'panel' | 'shelf' | 'graph' | 'lines' | 'screen'
}

export const workIndexProjects: WorkIndexProject[] = [
  {
    slug: 'personal-digital-lab',
    number: '01',
    title: 'Personal Digital Lab',
    type: 'Portfolio',
    year: '2026',
    status: 'Live',
    href: '/',
    description:
      'A cinematic personal website built as a dark studio environment for projects, books, experiments, and systems in progress.',
    previewLabel: 'Atmospheric Homepage',
    previewMode: 'screen',
  },
  {
    slug: 'ocean-cabinet',
    number: '02',
    title: 'Ocean Cabinet',
    type: 'Business Website',
    year: '2026',
    status: 'Shipped',
    href: '/projects/ocean-cabinet',
    description:
      'A trust-first renovation website designed to feel warm, credible, and conversion-ready without looking templated.',
    previewLabel: 'Client Website',
    previewMode: 'panel',
  },
  {
    slug: 'bookshelf-system',
    number: '03',
    title: 'Bookshelf System',
    type: 'Reading Archive',
    year: '2026',
    status: 'Active',
    href: '/reading',
    description:
      'A darker reading archive built as a room for notes, underlines, and books that continue to shape the work.',
    previewLabel: 'Reading Room',
    previewMode: 'shelf',
  },
  {
    slug: 'goal-dashboard',
    number: '04',
    title: 'Goal Dashboard',
    type: 'Personal System',
    year: '2026',
    status: 'Building',
    href: '/personal-os',
    description:
      'A personal operating layer for goals, weekly rhythm, project tracking, and a more deliberate relationship to progress.',
    previewLabel: 'System View',
    previewMode: 'graph',
  },
  {
    slug: 'ui-motion-experiments',
    number: '05',
    title: 'UI Motion Experiments',
    type: 'Frontend Lab',
    year: '2026',
    status: 'Ongoing',
    href: '/ui-lab',
    description:
      'A collection of hover studies, scroll ideas, interaction prototypes, and motion components explored in public.',
    previewLabel: 'Motion Studies',
    previewMode: 'lines',
  },
]
