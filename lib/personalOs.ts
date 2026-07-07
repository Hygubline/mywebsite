/**
 * Static data for the "Personal OS" page.
 *
 * This is the ONE place to edit your yearly goals, systems, and focus areas.
 * No backend or database, just plain arrays.
 */

export type GoalStatus = 'Done' | 'On Track' | 'In Progress' | 'Planned'
export type ProjectStatus = 'Shipped' | 'Building' | 'Designing' | 'Planning'

export interface Goal {
  title: string
  category: string
  /** 0-100 */
  progress: number
  status: GoalStatus
}

export interface WeeklyTask {
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
  /** 0-100 */
  progress: number
  nextStep: string
}

export interface Skill {
  label: string
  /** 0-100 */
  value: number
  level: string
}

export interface DashboardStat {
  label: string
  value: string
  hint: string
}

export interface SystemNote {
  title: string
  detail: string
}

/* ---------------------------------------------------------------- Year Goals */

export const yearGoals: Goal[] = [
  {
    title: 'Save money and build a real cushion',
    category: 'Money',
    progress: 22,
    status: 'In Progress',
  },
  {
    title: 'Learn AI agents deeply enough to build with confidence',
    category: 'Learning',
    progress: 28,
    status: 'In Progress',
  },
  {
    title: 'Start making money online from skills and experiments',
    category: 'Income',
    progress: 12,
    status: 'Planned',
  },
  {
    title: 'Build a consistent fitness and nutrition routine',
    category: 'Health',
    progress: 36,
    status: 'On Track',
  },
  {
    title: 'Read 10 books and write a reflection for each one',
    category: 'Reading',
    progress: 20,
    status: 'In Progress',
  },
  {
    title: 'Build a personal life system I can actually keep',
    category: 'Systems',
    progress: 25,
    status: 'In Progress',
  },
]

/* ------------------------------------------------------------ Annual Systems */

export const systemNotes: SystemNote[] = [
  {
    title: 'Long timeline over weekly pressure',
    detail:
      'This page is meant to hold a full-year direction, not a weekly scoreboard. I want something I can update slowly without pretending my life fits into a rigid dashboard.',
  },
  {
    title: 'Build momentum through repeatable habits',
    detail:
      'Money, health, reading, and skill-building all work better when the system is simple enough to repeat, even during messy weeks.',
  },
  {
    title: 'Turn learning into visible proof',
    detail:
      'The goal is not just consuming information. I want to turn what I learn into projects, writing, experiments, and eventually income.',
  },
]

export const currentBooks = ['Educated', 'Strait Is the Gate']

/* ------------------------------------------------------------ Focus Areas */

export const projects: Project[] = [
  {
    name: 'AI Agent Learning Path',
    stage: 'Core concepts and hands-on builds',
    status: 'Building',
    tech: ['Agents', 'Automation', 'Prompting'],
    progress: 30,
    nextStep: 'Study real workflows and ship one useful agent experiment',
  },
  {
    name: 'Online Income Experiments',
    stage: 'Finding small offers worth testing',
    status: 'Building',
    tech: ['Writing', 'Products', 'Internet'],
    progress: 15,
    nextStep: 'Choose one small idea to test and document the result',
  },
  {
    name: 'Health Routine',
    stage: 'Consistency over intensity',
    status: 'Building',
    tech: ['Training', 'Nutrition', 'Sleep'],
    progress: 38,
    nextStep: 'Keep a routine simple enough to repeat every week',
  },
  {
    name: 'Life System',
    stage: 'Designing a calmer structure for work and growth',
    status: 'Designing',
    tech: ['Reflection', 'Planning', 'Review'],
    progress: 24,
    nextStep: 'Define the few rules and check-ins worth keeping all year',
  },
]

/* ----------------------------------------------------------- Learning Stack */

export const learningStack: Skill[] = [
  { label: 'HTML / CSS', value: 80, level: 'Comfortable' },
  { label: 'JavaScript', value: 60, level: 'Getting there' },
  { label: 'React', value: 55, level: 'Learning' },
  { label: 'GitHub', value: 65, level: 'Daily use' },
  { label: 'AI Coding Tools', value: 78, level: 'Comfortable' },
  { label: 'Writing', value: 50, level: 'Practicing' },
]

/* --------------------------------------------------------------- Top stats */

export const dashboardStats: DashboardStat[] = [
  {
    label: '2026 Goals',
    value: String(yearGoals.length),
    hint: `${yearGoals.filter((g) => g.status === 'Done').length} done · ${yearGoals.filter(
      (g) => g.status !== 'Done',
    ).length} in motion`,
  },
  {
    label: 'Books Progress',
    value: '2 / 10',
    hint: currentBooks.join(' · '),
  },
  {
    label: 'Time Horizon',
    value: '2026',
    hint: 'Yearly direction, not weekly pressure',
  },
]
