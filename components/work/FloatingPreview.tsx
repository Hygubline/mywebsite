'use client'

import Link from 'next/link'
import type { MotionStyle } from 'framer-motion'
import { motion } from 'framer-motion'
import type { WorkIndexProject } from '@/lib/workIndex'

interface FloatingPreviewProps {
  project: WorkIndexProject
  compact?: boolean
  floating?: boolean
  style?: MotionStyle
  className?: string
}

function PreviewArt({ project }: { project: WorkIndexProject }) {
  switch (project.previewMode) {
    case 'panel':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(216,149,74,0.24),transparent_22%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.06),transparent_24%)]" />
          <div className="absolute inset-x-[12%] top-[16%] h-[18%] rounded-[1.2rem] border border-white/8 bg-white/[0.03]" />
          <div className="absolute inset-x-[12%] top-[40%] h-[32%] rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
        </>
      )
    case 'shelf':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(216,149,74,0.2),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
          <div className="absolute left-[12%] right-[12%] bottom-[18%] h-[10%] rounded-full bg-[linear-gradient(180deg,#4d4136,#1c1815)]" />
          <div className="absolute left-[18%] bottom-[24%] h-[42%] w-[14%] rounded-[0.8rem] bg-[linear-gradient(180deg,#2b2622,#11100f)]" />
          <div className="absolute left-[36%] bottom-[24%] h-[50%] w-[17%] rounded-[0.9rem] bg-[linear-gradient(180deg,#5d4b37,#1c1815)]" />
          <div className="absolute left-[58%] bottom-[24%] h-[38%] w-[13%] rounded-[0.8rem] bg-[linear-gradient(180deg,#3e352c,#141210)]" />
        </>
      )
    case 'graph':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,149,74,0.14),transparent_34%)]" />
          {[18, 42, 68, 78].map((left, i) => (
            <div
              key={left}
              className="absolute top-[48%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.07]"
              style={{ left: `${left}%`, top: `${[36, 62, 44, 26][i]}%` }}
            />
          ))}
          <div className="absolute left-[18%] top-[36%] h-px w-[24%] rotate-[18deg] bg-white/12" />
          <div className="absolute left-[42%] top-[61%] h-px w-[28%] -rotate-[22deg] bg-white/12" />
          <div className="absolute left-[42%] top-[43%] h-px w-[36%] -rotate-[18deg] bg-white/12" />
        </>
      )
    case 'lines':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_16%,rgba(216,149,74,0.2),transparent_28%)]" />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute left-[14%] right-[14%] h-[2px] rounded-full bg-white/10"
              style={{ top: `${30 + i * 13}%` }}
            />
          ))}
          <div className="absolute left-[14%] top-[30%] h-[40%] w-[1px] bg-white/8" />
        </>
      )
    default:
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(216,149,74,0.2),transparent_24%),radial-gradient(circle_at_22%_78%,rgba(255,255,255,0.05),transparent_24%)]" />
          <div className="absolute inset-x-[14%] top-[24%] h-[26%] rounded-[1.2rem] border border-white/8 bg-white/[0.025]" />
          <div className="absolute inset-x-[22%] top-[58%] h-[8%] rounded-full bg-white/10" />
        </>
      )
  }
}

export default function FloatingPreview({
  project,
  compact = false,
  floating = false,
  style,
  className = '',
}: FloatingPreviewProps) {
  return (
    <motion.div
      style={style}
      className={`relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,17,0.96),rgba(8,8,9,0.98))] ${
        compact ? 'min-h-[16rem]' : 'min-h-[24rem]'
      } ${floating ? 'pointer-events-none fixed left-0 top-0 z-[60] w-[22rem]' : ''} ${className} shadow-[0_32px_90px_-62px_rgba(0,0,0,0.95),0_0_36px_rgba(216,149,74,0.08)]`}
    >
      <div className="ambient-noise absolute inset-0 opacity-[0.055]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <PreviewArt project={project} />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="rounded-[1.25rem] border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#d39b59]">
              {project.previewLabel}
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7a7268]">
              {project.status}
            </p>
          </div>
          <p className="mt-3 [font-family:Iowan_Old_Style,Georgia,serif] text-[1.6rem] leading-tight tracking-[-0.05em] text-[#f4efe7]">
            {project.title}
          </p>
          <p className="mt-2 text-sm leading-7 text-[#a59b8e]">{project.description}</p>
          {compact ? (
            <Link
              href={project.href}
              className="mt-4 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.24em] text-[#f4efe7] transition-colors hover:text-[#d39b59]"
            >
              Open project
            </Link>
          ) : (
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.24em] text-[#f4efe7]">
              Open project
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
