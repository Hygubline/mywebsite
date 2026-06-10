'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ContentEntry } from '@/lib/content'
import MiniPreview from '@/components/uilab/MiniPreview'

interface LabPreviewGridProps {
  entries: ContentEntry[]
}

export default function LabPreviewGrid({ entries }: LabPreviewGridProps) {
  return (
    <section id="lab" className="section-container relative z-10 py-20 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#d39b59]">
            Lab Preview
          </p>
          <h2 className="mt-4 [font-family:Iowan_Old_Style,Georgia,serif] text-[2.35rem] leading-[1.04] tracking-[-0.05em] text-[#f4efe7] sm:text-[3rem]">
            Motion studies, interface tests, and components worth keeping around.
          </h2>
        </div>

        <Link
          href="/ui-lab"
          className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.24em] text-[#9d9387] transition-colors hover:text-[#f4efe7]"
        >
          Open the lab
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/ui-lab/${entry.slug}`}
              className="group lab-card block overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(17,17,18,0.92),rgba(10,10,11,0.94))] transition-colors duration-300 hover:border-[#d39b59]/24"
            >
              <MiniPreview motif={entry.preview} />
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.26em] text-[#8f877c]">
                    {entry.status ?? 'study'}
                  </span>
                  <span className="text-[0.68rem] uppercase tracking-[0.24em] text-[#6c645a]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-medium tracking-[-0.03em] text-[#f4efe7] transition-transform duration-300 group-hover:translate-x-1">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#a2998d]">
                  {entry.summary}
                </p>

                {entry.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-[#9a9083]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
