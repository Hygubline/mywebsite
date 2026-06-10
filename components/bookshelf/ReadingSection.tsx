import type { ReactNode } from 'react'

interface ReadingSectionProps {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export default function ReadingSection({
  eyebrow,
  title,
  description,
  action,
  children,
  className = '',
}: ReadingSectionProps) {
  return (
    <section className={`bookshelf-panel ${className}`}>
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[#d8b878]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-normal leading-tight text-[#f4eee4] [font-family:Iowan_Old_Style,Georgia,serif] sm:text-[2.2rem]">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9f978b] sm:text-base">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  )
}
