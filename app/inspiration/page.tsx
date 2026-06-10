import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Reveal from '@/components/anim/Reveal'
import {
  inspiration,
  inspirationCategories,
  type InspirationItem,
} from '@/lib/inspiration'

export const metadata: Metadata = {
  title: 'Inspiration — Yun He',
  description: 'People, sites, tools, and ideas that shape how I build and think.',
}

function InspirationCard({ item }: { item: InspirationItem }) {
  const inner = (
    <div className="glass-card glow-hover flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
        {item.link && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm" />
        )}
      </div>
      {item.by && <p className="mt-0.5 text-xs text-warm/70">{item.by}</p>}
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
    </div>
  )

  return item.link ? (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      {inner}
    </a>
  ) : (
    <div className="h-full">{inner}</div>
  )
}

export default function InspirationPage() {
  return (
    <div className="container-main">
      <SectionTitle
        as="h1"
        eyebrow="Inspiration"
        title="What shapes how I build"
        intro="The people, sites, tools, and ideas I keep coming back to — a snapshot of the taste I’m trying to grow into."
        className="mb-12"
      />

      <div className="space-y-12">
        {inspirationCategories.map((category) => {
          const items = inspiration.filter((i) => i.category === category)
          if (items.length === 0) return null

          return (
            <section key={category}>
              <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-warm/70">
                {category}
              </h2>
              <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((item) => (
                  <InspirationCard key={item.title} item={item} />
                ))}
              </Reveal>
            </section>
          )
        })}
      </div>
    </div>
  )
}
