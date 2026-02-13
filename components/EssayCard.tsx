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
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/writing/${post.slug}`} className="block glass-card p-5 group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <time className="text-xs text-neutral-600 mb-2 block font-mono">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <h3 className="font-medium text-white tracking-tight group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            {post.hook && (
              <p className="text-neutral-500 text-sm mt-2 line-clamp-2">{post.hook}</p>
            )}
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
        </div>
      </Link>
    </motion.div>
  )
}
