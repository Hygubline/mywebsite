'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Layout, Database, Wrench } from 'lucide-react'

const skillGroups = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    icon: Layout,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    title: 'Backend & Data',
    icon: Database,
    skills: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'pandas', 'REST APIs'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Linux', 'ROS2'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 sm:py-32 bg-surface/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-medium text-accent-cyan uppercase tracking-widest mb-3">
            Skills
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-12">
            Technologies I work with
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="rounded-xl border border-white/[0.06] bg-surface p-6 hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-accent-cyan/10">
                  <group.icon size={18} className="text-accent-cyan" />
                </div>
                <h4 className="text-sm font-semibold text-foreground">{group.title}</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-md bg-white/[0.04] text-muted border border-white/[0.06] hover:text-foreground hover:border-accent-cyan/30 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
