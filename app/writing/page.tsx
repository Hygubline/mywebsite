import { getPosts } from '@/lib/getPosts'
import EssayCard from '@/components/EssayCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing — Yun He',
  description: 'Essays on building, thinking, and leverage in the age of AI.',
}

export default async function WritingPage() {
  const posts = await getPosts()

  return (
    <div className="container-main">
      <div className="mb-12">
        <h1 className="mb-4">Writing</h1>
        <p className="text-xl text-neutral-500">
          Ideas worth articulating. Judgments worth defending.
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((post, index) => (
          <EssayCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-neutral-500">Essays coming soon.</p>
        </div>
      )}
    </div>
  )
}
