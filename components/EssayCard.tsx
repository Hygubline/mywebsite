'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Post } from '@/lib/getPosts'

interface EssayCardProps {
  post: Post
  index?: number
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 250))
}

export default function EssayCard({ post, index = 0 }: EssayCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReduced = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const num = String(index + 1).padStart(2, '0')
  const readTime = estimateReadTime(post.content)

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.0,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/writing/${post.slug}`}
        className="archive-card group block relative"
        onMouseMove={handleMouseMove}
      >
        {/* Mouse-follow highlight */}
        <div
          className="archive-card-highlight"
          style={{
            '--mx': `${mousePos.x * 100}%`,
            '--my': `${mousePos.y * 100}%`,
          } as React.CSSProperties}
        />

        {/* Large background number */}
        <div className="absolute top-4 right-6 md:top-6 md:right-10 text-[5rem] md:text-[7rem] font-bold leading-none text-[#e8e4df]/[0.015] select-none pointer-events-none tracking-[-0.05em] group-hover:text-[#e8e4df]/[0.04] transition-colors duration-1000">
          {num}
        </div>

        <div className="relative z-10 p-6 md:p-10">
          {/* Top row: number + date + read time */}
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#4a443c]">
              {num}
            </span>
            <div className="w-4 h-[1px] bg-[#4a443c]/40" />
            <time className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#4a443c]">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <div className="flex-1" />
            <span className="text-[10px] font-mono tracking-[0.12em] text-[#4a443c]/60">
              {readTime} min read
            </span>
          </div>

          {/* Title — larger, editorial */}
          <h3 className="text-xl md:text-2xl lg:text-[1.75rem] font-bold tracking-[-0.03em] text-[#e8e4df]/85 mb-3 group-hover:text-[#e8e4df] transition-colors duration-700 leading-[1.15]">
            {post.title}
          </h3>

          {/* Hook / excerpt */}
          {post.hook && (
            <p className="text-[#6b6359] text-sm md:text-[0.9rem] leading-[1.8] max-w-xl mb-6 group-hover:text-[#8a8278] transition-colors duration-700 line-clamp-2">
              {post.hook}
            </p>
          )}

          {/* Bottom row: read link */}
          <div className="flex items-center justify-between pt-5 border-t border-[#e8e4df]/[0.03] group-hover:border-[#e8e4df]/[0.08] transition-colors duration-700">
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#4a443c] group-hover:text-[#6b6359] transition-colors duration-700">
              Read essay
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#4a443c] group-hover:text-[#e8e4df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-700" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
