'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import FloatingPreview from '@/components/work/FloatingPreview'
import type { WorkIndexProject } from '@/lib/workIndex'

interface ProjectIndexProps {
  title: string
  intro: string
  projects: WorkIndexProject[]
}

export default function ProjectIndex({
  title,
  intro,
  projects,
}: ProjectIndexProps) {
  const featuredProjects = useMemo(() => projects, [projects])
  const [activeSlug, setActiveSlug] = useState(featuredProjects[0]?.slug ?? '')
  const [previewVisible, setPreviewVisible] = useState(false)
  const frameRef = useRef(0)
  const pendingPoint = useRef({ x: 0, y: 0 })
  const pointerFineRef = useRef(false)

  const previewX = useMotionValue(0)
  const previewY = useMotionValue(0)
  const smoothX = useSpring(previewX, { stiffness: 180, damping: 26, mass: 0.8 })
  const smoothY = useSpring(previewY, { stiffness: 180, damping: 26, mass: 0.8 })

  const activeProject =
    featuredProjects.find((project) => project.slug === activeSlug) ?? featuredProjects[0] ?? null

  useEffect(() => {
    pointerFineRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  if (!activeProject) return null

  const queuePointerUpdate = (clientX: number, clientY: number) => {
    pendingPoint.current = { x: clientX + 24, y: clientY - 24 }
    if (frameRef.current) return

    frameRef.current = requestAnimationFrame(() => {
      previewX.set(pendingPoint.current.x)
      previewY.set(pendingPoint.current.y)
      frameRef.current = 0
    })
  }

  return (
    <section className="section-container relative z-10">
      <motion.div
        animate={{
          opacity: 1,
        }}
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-[38rem]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_72%_24%,rgba(216,149,74,0.18),transparent_26%),radial-gradient(circle_at_18%_72%,rgba(255,255,255,0.05),transparent_24%)] blur-[10px]"
          />
        </AnimatePresence>
      </motion.div>

      <div className="mb-14 max-w-4xl">
        <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#d39b59]">
          Project Index
        </p>
        <h1 className="mt-5 text-[3rem] font-semibold uppercase leading-[0.9] tracking-[-0.08em] text-[#f4efe7] sm:text-[4.6rem] lg:text-[6.6rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-8 text-[#a79d91] sm:text-base">
          {intro}
        </p>
      </div>

      <div className="hidden lg:block">
        <div
          className="relative"
          onMouseMove={(event) => {
            if (!pointerFineRef.current) return
            queuePointerUpdate(event.clientX, event.clientY)
          }}
          onMouseLeave={() => setPreviewVisible(false)}
        >
          <div className="border-t border-white/8">
            {featuredProjects.map((project, index) => {
              const active = project.slug === activeProject.slug

              return (
                <Link
                  key={project.slug}
                  href={project.href}
                  onMouseEnter={(event) => {
                    setActiveSlug(project.slug)
                    if (!pointerFineRef.current) return
                    setPreviewVisible(true)
                    queuePointerUpdate(event.clientX, event.clientY)
                  }}
                  onMouseMove={(event) => {
                    if (!pointerFineRef.current) return
                    queuePointerUpdate(event.clientX, event.clientY)
                  }}
                  onFocus={() => setActiveSlug(project.slug)}
                  onBlur={() => setPreviewVisible(false)}
                  className="group relative block border-b border-white/8 px-2 py-7 focus-visible:outline-none"
                >
                  <AnimatePresence>
                    {active ? (
                      <motion.div
                        layoutId="active-work-row"
                        className="absolute inset-0 rounded-[1.4rem] bg-[linear-gradient(90deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015)),radial-gradient(circle_at_14%_50%,rgba(216,149,74,0.16),transparent_28%)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    ) : null}
                  </AnimatePresence>

                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="relative z-10 grid items-center gap-4 px-4 sm:grid-cols-[4.2rem_minmax(0,1fr)_12rem_5rem_7rem]"
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.26em] text-[#71685f]">
                      {project.number}
                    </p>
                    <div>
                      <p
                        className={`text-[1.45rem] font-medium tracking-[-0.04em] transition-colors duration-300 ${
                          active ? 'text-[#f4efe7]' : 'text-[#b5aca1] group-hover:text-[#f4efe7]'
                        }`}
                      >
                        {project.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#8d8478]">
                        {project.description}
                      </p>
                    </div>
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#90877b]">
                      {project.type}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#72695f]">
                      {project.year}
                    </p>
                    <p
                      className={`text-right text-[0.72rem] uppercase tracking-[0.24em] transition-colors duration-300 ${
                        active ? 'text-[#d39b59]' : 'text-[#7a7268] group-hover:text-[#d39b59]'
                      }`}
                    >
                      {project.status}
                    </p>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {previewVisible ? (
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <FloatingPreview
              project={activeProject}
              floating
              style={{ x: smoothX, y: smoothY }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-4 lg:hidden">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(14,14,15,0.94),rgba(7,7,8,0.97))]"
          >
            <div className="border-b border-white/8 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[#70685f]">
                  {project.number}
                </p>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#d39b59]">
                  {project.status}
                </p>
              </div>
              <p className="mt-3 text-[1.55rem] font-medium tracking-[-0.04em] text-[#f4efe7]">
                {project.title}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#8f867b]">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>
            </div>

            <div className="p-4">
              <FloatingPreview project={project} compact />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
