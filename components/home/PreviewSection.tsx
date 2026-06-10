import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/anim/Reveal'

interface PreviewSectionProps {
  eyebrow: string
  title: string
  intro: string
  href: string
  linkLabel: string
  children: ReactNode
}

export default function PreviewSection({
  eyebrow,
  title,
  intro,
  href,
  linkLabel,
  children,
}: PreviewSectionProps) {
  return (
    <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(16,16,18,0.82),rgba(10,10,11,0.78))] p-5 shadow-[0_36px_90px_-62px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-8">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-[#b88a52]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-[2rem] leading-tight tracking-[-0.04em] text-[#f1eadf] sm:text-[2.5rem]">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#a49a8d] sm:text-base">
            {intro}
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm text-[#d7b07a] transition-colors hover:text-[#f1eadf]"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>

      {children}
    </section>
  )
}
