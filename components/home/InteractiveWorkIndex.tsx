'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/lib/getProjects'

interface InteractiveWorkIndexProps {
  projects: Project[]
}

function getCategory(project: Project) {
  const raw = project.tags?.[0] ?? project.techStack?.[0] ?? 'Project'
  return raw.replace(/-/g, ' ')
}

function getYear(index: number) {
  return String(2026 - Math.min(index, 2))
}

export default function InteractiveWorkIndex({
  projects,
}: InteractiveWorkIndexProps) {
  const featured = useMemo(() => projects.slice(0, 4), [projects])
  const [activeSlug, setActiveSlug] = useState(featured[0]?.slug ?? '')

  const activeProject =
    featured.find((project) => project.slug === activeSlug) ?? featured[0] ?? null

  if (featured.length === 0) return null

  return (
    <section id="work" className="section-container relative z-10 py-20 sm:py-24">
      <div className="lab-panel relative overflow-hidden rounded-[2rem] border border-white/8 px-5 py-6 sm:px-8 sm:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(216,149,74,0.13),transparent_26%),radial-gradient(circle_at_22%_84%,rgba(255,255,255,0.04),transparent_28%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div className="max-w-2xl">
                <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#d39b59]">
                  Work Index
                </p>
                <h2 className="mt-4 max-w-[12ch] [font-family:Iowan_Old_Style,Georgia,serif] text-[2.4rem] leading-[1.02] tracking-[-0.05em] text-[#f4efe7] sm:text-[3.2rem]">
                  Selected projects, arranged like an active desk.
                </h2>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.24em] text-[#9d9387] transition-colors hover:text-[#f4efe7]"
              >
                Open all work
              </Link>
            </div>

            <div className="space-y-2">
              {featured.map((project, index) => {
                const isActive = activeProject?.slug === project.slug

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    onMouseEnter={() => setActiveSlug(project.slug)}
                    onFocus={() => setActiveSlug(project.slug)}
                    className="group relative block overflow-hidden rounded-[1.4rem] border border-transparent px-4 py-4 transition-colors duration-300 hover:border-white/8 focus-visible:border-white/12 focus-visible:outline-none sm:px-5"
                  >
                    <AnimatePresence>
                      {isActive ? (
                        <motion.div
                          layoutId="work-row-glow"
                          className="absolute inset-0 rounded-[1.4rem] bg-[radial-gradient(circle_at_14%_50%,rgba(216,149,74,0.17),transparent_24%),linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]"
                          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                        />
                      ) : null}
                    </AnimatePresence>

                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                      className="relative z-10 grid items-center gap-4 sm:grid-cols-[4rem_minmax(0,1fr)_7rem_4rem]"
                    >
                      <span className="text-[0.72rem] uppercase tracking-[0.24em] text-[#756c62]">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <p className="text-[1.45rem] font-medium tracking-[-0.04em] text-[#f4efe7] sm:text-[2rem]">
                          {project.title}
                        </p>
                        <p className="mt-1 max-w-xl text-sm leading-7 text-[#978d81]">
                          {project.subtitle || project.overview}
                        </p>
                      </div>

                      <span className="text-[0.74rem] uppercase tracking-[0.24em] text-[#a49a8e]">
                        {getCategory(project)}
                      </span>

                      <span className="text-right text-[0.78rem] uppercase tracking-[0.24em] text-[#756c62]">
                        {getYear(index)}
                      </span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="relative hidden min-h-[26rem] lg:block">
            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="sticky top-28"
                >
                  <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(19,19,20,0.94),rgba(10,10,11,0.96))] p-6 shadow-[0_30px_90px_-58px_rgba(0,0,0,0.95),0_0_36px_rgba(216,149,74,0.08)]">
                    <div className="ambient-noise absolute inset-0 opacity-[0.055]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(216,149,74,0.18),transparent_24%),radial-gradient(circle_at_26%_80%,rgba(255,255,255,0.04),transparent_30%)]" />

                    <div className="relative z-10">
                      <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#d39b59]">
                        Preview
                      </p>
                      <h3 className="mt-5 [font-family:Iowan_Old_Style,Georgia,serif] text-[2rem] leading-tight tracking-[-0.05em] text-[#f4efe7]">
                        {activeProject.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#a2998d]">
                        {activeProject.overview || activeProject.subtitle}
                      </p>

                      <div className="mt-8 grid gap-4 border-t border-white/10 pt-5">
                        <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.025] p-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#8c8378]">
                            Why it matters
                          </p>
                          <p className="mt-3 text-sm leading-7 text-[#c0b5a7]">
                            {activeProject.why || activeProject.learned || activeProject.role}
                          </p>
                        </div>

                        {activeProject.techStack?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {activeProject.techStack.slice(0, 5).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#a8a092]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
