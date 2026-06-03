import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '@/components/ArticleView'
import { DemoStage } from '@/components/uilab/registry'
import { getCollection, getEntry } from '@/lib/content'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getCollection('ui-lab').map((entry) => ({ slug: entry.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getEntry('ui-lab', params.slug)
  if (!entry) return { title: 'Experiment Not Found' }
  return { title: `${entry.title} — UI Lab — Yun He`, description: entry.summary }
}

export default function ExperimentPage({ params }: Props) {
  const entry = getEntry('ui-lab', params.slug)
  if (!entry) notFound()

  return (
    <ArticleView
      entry={entry}
      backHref="/ui-lab"
      backLabel="Back to the lab"
      beforeBody={<DemoStage demoKey={entry.demo} />}
    />
  )
}
