/**
 * Static data for the "Personal OS" dashboard.
 *
 * This is the ONE place to edit your goals, weekly plan, and projects.
 * No backend or database — just plain arrays. Add, remove, or tweak entries
 * here and the page updates automatically.
 */

export type GoalStatus = 'Done' | 'On Track' | 'In Progress' | 'Planned'
export type ProjectStatus = 'Shipped' | 'Building' | 'Designing' | 'Planning'

export interface Goal {
  title: string
  category: string
  /** 0–100 */
  progress: number
  status: GoalStatus
}

export interface WeeklyTask {
  /** Full weekday name — must match the JS Date weekday (e.g. "Monday"). */
  day: string
  focus: string
  task: string
  done: boolean
}

export interface Project {
  name: string
  stage: string
  status: ProjectStatus
  tech: string[]
  /** 0–100 */
  progress: number
  nextStep: string
}

/* ---------------------------------------------------------------- Year Goals */

export const yearGoals: Goal[] = [
  {
    title: 'Build Personal Website V1',
    category: 'Portfolio',
    progress: 80,
    status: 'On Track',
  },
  {
    title: 'Finish 3 Portfolio Projects',
    category: 'Engineering',
    progress: 55,
    status: 'In Progress',
  },
  {
    title: 'Improve Resume',
    category: 'Career',
    progress: 40,
    status: 'In Progress',
  },
  {
    title: 'Apply to Entry-Level Jobs',
    category: 'Career',
    progress: 25,
    status: 'Planned',
  },
  {
    title: 'Read 12 Books',
    category: 'Growth',
    progress: 33,
    status: 'On Track',
  },
]

/* --------------------------------------------------------------- Weekly Plan */

export const weeklyPlan: WeeklyTask[] = [
  { day: 'Monday', focus: 'Deep Work', task: 'Build new website section', done: true },
  { day: 'Tuesday', focus: 'Learning', task: 'Study React patterns', done: true },
  { day: 'Wednesday', focus: 'Projects', task: 'Ship Ocean Cabinet page', done: false },
  { day: 'Thursday', focus: 'Career', task: 'Polish resume bullet points', done: false },
  { day: 'Friday', focus: 'Review', task: 'Code review + refactor', done: false },
  { day: 'Saturday', focus: 'Reading', task: 'Read 30 pages', done: false },
  { day: 'Sunday', focus: 'Reset', task: 'Plan next week', done: false },
]

/* ------------------------------------------------------------ Project Tracker */

export const projects: Project[] = [
  {
    name: 'Personal Website',
    stage: 'V1 launch polish',
    status: 'Building',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    progress: 80,
    nextStep: 'Finish Personal OS dashboard',
  },
  {
    name: 'Ocean Cabinet Website',
    stage: 'Building pages',
    status: 'Building',
    tech: ['Next.js', 'Tailwind'],
    progress: 60,
    nextStep: 'Wire up product gallery',
  },
  {
    name: 'Restaurant Menu System',
    stage: 'Design + data model',
    status: 'Designing',
    tech: ['React', 'TypeScript'],
    progress: 35,
    nextStep: 'Define menu data schema',
  },
  {
    name: 'AI Learning Tracker',
    stage: 'Concept',
    status: 'Planning',
    tech: ['Next.js', 'OpenAI API'],
    progress: 15,
    nextStep: 'Sketch core screens',
  },
]

/* ----------------------------------------------------------- Learning Stack */

export interface Skill {
  label: string
  /** 0–100 — be honest, it's more relatable than perfect */
  value: number
  /** a short, human label for where you're at */
  level: string
}

export const learningStack: Skill[] = [
  { label: 'HTML / CSS', value: 80, level: 'Comfortable' },
  { label: 'JavaScript', value: 60, level: 'Getting there' },
  { label: 'React', value: 55, level: 'Learning' },
  { label: 'GitHub', value: 65, level: 'Daily use' },
  { label: 'AI Coding Tools', value: 78, level: 'Comfortable' },
  { label: 'Writing', value: 50, level: 'Practicing' },
]

/* --------------------------------------------------------------- Top stats */

export interface DashboardStat {
  label: string
  value: string
  hint: string
}

/**
 * Top-of-page summary stats. Values are derived from the arrays above so they
 * stay in sync when you edit goals or projects.
 */
export const dashboardStats: DashboardStat[] = [
  {
    label: '2026 Goals',
    value: String(yearGoals.length),
    hint: `${yearGoals.filter((g) => g.status === 'Done').length} done · ${yearGoals.filter(
      (g) => g.status !== 'Done',
    ).length} in motion`,
  },
  {
    label: 'Active Projects',
    value: String(projects.filter((p) => p.status !== 'Shipped').length),
    hint: `${projects.length} tracked total`,
  },
  {
    label: 'Weekly Focus',
    value: `${weeklyPlan.filter((t) => t.done).length}/${weeklyPlan.length}`,
    hint: 'tasks done this week',
  },
]
