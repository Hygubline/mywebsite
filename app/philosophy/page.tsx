'use client'

import { motion } from 'framer-motion'
import type { Metadata } from 'next'

const principles = [
  {
    title: 'Build for leverage, not speed.',
    description: 'The goal is not to move fast, but to create systems that compound over time. Speed without direction is just noise.',
  },
  {
    title: 'Clarity over noise.',
    description: 'In a world of infinite information, the ability to distill complexity into clarity is the ultimate skill.',
  },
  {
    title: 'Optimize for long-term positioning.',
    description: 'Short-term wins mean nothing without a coherent long-term strategy. Every action should strengthen your position.',
  },
  {
    title: 'Systems over goals.',
    description: 'Goals are destinations. Systems are paths. Design the path well, and destinations become inevitable.',
  },
  {
    title: 'Ship, then iterate.',
    description: 'Perfect is the enemy of done. Get something real into the world, gather feedback, and improve relentlessly.',
  },
  {
    title: 'Think in principles, act in specifics.',
    description: 'Principles provide direction. Specific actions create results. You need both.',
  },
  {
    title: 'Embrace constraints.',
    description: 'Constraints force creativity. Unlimited options lead to paralysis. Welcome the boundaries that sharpen your focus.',
  },
  {
    title: 'Build in public.',
    description: 'Transparency creates accountability. Sharing your work attracts collaborators and accelerates learning.',
  },
]

export default function PhilosophyPage() {
  return (
    <div className="container-main">
      <div className="mb-12">
        <h1 className="mb-4">Philosophy</h1>
        <p className="text-xl text-neutral-500">
          The principles that guide how I build and think.
        </p>
      </div>

      <div className="grid gap-4">
        {principles.map((principle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-card p-6 group"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl font-mono text-neutral-700 group-hover:text-blue-400 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
