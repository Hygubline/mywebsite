import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Now — Yun He',
  description: 'What I am currently building, learning, and thinking about.',
}

const sections = [
  {
    title: 'Currently Building',
    items: [
      'FocusFlow: An AI-powered study structuring system',
      'Personal knowledge management tools',
      'This portfolio website',
    ],
  },
  {
    title: 'Currently Learning',
    items: [
      'Systems design patterns for AI applications',
      'Cognitive architecture and workflow design',
      'Product positioning and market strategy',
    ],
  },
  {
    title: 'Currently Thinking',
    items: [
      'How to build systems that create leverage, not just output',
      'The difference between being busy and being effective',
      'Long-term positioning in the age of AI',
    ],
  },
]

export default function NowPage() {
  return (
    <div className="container-main">
      <div className="mb-12">
        <h1 className="mb-4">Now</h1>
        <p className="text-neutral-600 text-sm font-mono">
          Last updated: February 2026
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <div key={section.title} className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span className="text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
