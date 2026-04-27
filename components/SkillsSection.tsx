'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'C++', 'SQL'],
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Next.js', 'ROS2', 'Node.js'],
  },
  {
    title: 'Tools & Infra',
    skills: ['Docker', 'Git', 'Figma', 'DevOps'],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-cinema" ref={ref}>
      <div className="container-cinema">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-baseline gap-6 mb-4">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#4a443c]">03</span>
            <h2>Craft</h2>
          </div>
          <p className="text-[#6b6359] text-sm tracking-wide" style={{ marginLeft: 'calc(1.5rem + 2ch)' }}>
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + catIndex * 0.15 }}
            >
              <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#4a443c] mb-6">
                {category.title}
              </h3>
              <div className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm text-[#8a8278] tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
