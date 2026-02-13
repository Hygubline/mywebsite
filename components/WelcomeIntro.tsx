'use client'

import { Lightbulb, FolderOpen, Pen, Compass } from 'lucide-react'
import { toast } from 'sonner'
import { IntroDisclosure } from './IntroDisclosure'

const welcomeSteps = [
  {
    title: 'Welcome',
    description: 'I build systems with AI. This site is where I share my projects, ideas, and the principles that guide my work.',
    icon: <Lightbulb className="w-8 h-8" />,
  },
  {
    title: 'Projects',
    description: 'Explore the tools and systems I\'ve built. Each project showcases a problem solved, lessons learned, and the thinking behind the design.',
    icon: <FolderOpen className="w-8 h-8" />,
  },
  {
    title: 'Writing',
    description: 'Essays on building, leverage, and systems thinking. Not just updates — but judgments and frameworks worth defending.',
    icon: <Pen className="w-8 h-8" />,
  },
  {
    title: 'Explore',
    description: 'Check out my current focus on the Now page, or dive into my Philosophy to understand how I approach building.',
    icon: <Compass className="w-8 h-8" />,
  },
]

export function WelcomeIntro() {
  return (
    <IntroDisclosure
      steps={welcomeSteps}
      featureId="welcome-tour"
      onComplete={() => toast.success('Welcome! Feel free to explore.')}
      onSkip={() => toast('You can always find everything in the navigation.')}
    />
  )
}
