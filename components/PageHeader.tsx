import Reveal from '@/components/anim/Reveal'

interface PageHeaderProps {
  eyebrow: string
  title: string
  intro: string
}

export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <Reveal className="mb-12">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-warm/70">{eyebrow}</p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted">{intro}</p>
    </Reveal>
  )
}
