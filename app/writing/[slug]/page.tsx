import { getPosts, getPostBySlug } from '@/lib/getPosts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} — Yun He`,
    description: post.hook,
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container-main">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 mb-8 text-neutral-500 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to writing
      </Link>

      <article className="glass-card p-8 md:p-12">
        <header className="mb-12 pb-8 border-b border-white/10">
          <time className="text-sm text-neutral-600 mb-3 block font-mono">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="mb-4">{post.title}</h1>
          {post.hook && (
            <p className="text-xl text-neutral-400 font-medium leading-relaxed">{post.hook}</p>
          )}
        </header>

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  )
}
