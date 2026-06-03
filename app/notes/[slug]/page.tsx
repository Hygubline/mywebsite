import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '@/components/ArticleView'
import { getCollection, getEntry } from '@/lib/content'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getCollection('notes').map((entry) => ({ slug: entry.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getEntry('notes', params.slug)
  if (!entry) return { title: 'Note Not Found' }
  return { title: `${entry.title} — Yun He`, description: entry.summary }
}

export default function NotePage({ params }: Props) {
  const entry = getEntry('notes', params.slug)
  if (!entry) notFound()

  return <ArticleView entry={entry} backHref="/notes" backLabel="Back to notes" />
}
