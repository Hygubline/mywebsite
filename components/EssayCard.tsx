'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Post } from '@/lib/getPosts'

interface EssayCardProps {
  post: Post
  index?: number
}

export default function EssayCard({ post, index = 0 }: EssayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/writing/${post.slug}`}
        className="block py-6 border-b border-[#e8e4df]/[0.04] group"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-6 flex-1">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#4a443c] mt-1.5 min-w-[2ch]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <time className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#4a443c] mb-2 block">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <h3 className="font-medium text-[#e8e4df]/90 tracking-[-0.02em] group-hover:text-[#e8e4df] transition-colors duration-700">
                {post.title}
              </h3>
              {post.hook && (
                <p className="text-[#6b6359] text-sm mt-2 leading-[1.7] line-clamp-2">{post.hook}</p>
              )}
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#4a443c] group-hover:text-[#e8e4df] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-700 flex-shrink-0 mt-1.5" />
        </div>
      </Link>
    </motion.div>
  )
}
