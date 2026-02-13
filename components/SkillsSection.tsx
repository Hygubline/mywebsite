'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2,
  Braces,
  Terminal,
  Database,
  Globe,
  Cpu,
  Box,
  Figma,
  GitBranch,
} from 'lucide-react'

interface Skill {
  name: string
  level: number
  icon: React.ElementType
  color: string
}

const skills: Skill[] = [
  { name: 'Python', level: 90, icon: Code2, color: 'from-yellow-500 to-yellow-600' },
  { name: 'TypeScript', level: 85, icon: Braces, color: 'from-blue-500 to-blue-600' },
  { name: 'C++', level: 75, icon: Terminal, color: 'from-purple-500 to-purple-600' },
  { name: 'React/Next.js', level: 88, icon: Globe, color: 'from-cyan-500 to-cyan-600' },
  { name: 'ROS2', level: 70, icon: Cpu, color: 'from-green-500 to-green-600' },
  { name: 'SQL/Database', level: 80, icon: Database, color: 'from-orange-500 to-orange-600' },
  { name: 'Docker', level: 75, icon: Box, color: 'from-sky-500 to-sky-600' },
  { name: 'UI/UX Design', level: 82, icon: Figma, color: 'from-pink-500 to-pink-600' },
  { name: 'Git/DevOps', level: 85, icon: GitBranch, color: 'from-red-500 to-red-600' },
]

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const Icon = skill.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-4 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-white tracking-tight">{skill.name}</span>
        </div>
        <motion.span
          className="text-sm font-mono text-neutral-400"
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        >
          {hasAnimated ? skill.level : 0}%
        </motion.span>
      </div>

      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
          initial={{ width: 0 }}
          animate={hasAnimated ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Skills</h2>
        <p className="text-neutral-400">Technologies and tools I work with</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </section>
  )
}
