import Reveal from '@/components/anim/Reveal'

const exploring = [
  { label: 'GSAP', tone: 'text-warm border-warm/25' },
  { label: 'Next.js', tone: 'text-foreground/80 border-border' },
  { label: 'UI motion', tone: 'text-iris border-iris/30' },
  { label: 'AI tools', tone: 'text-sage border-sage/30' },
  { label: 'writing', tone: 'text-gold border-gold/30' },
  { label: 'literature', tone: 'text-clay border-clay/30' },
  { label: 'games', tone: 'text-foreground/80 border-border' },
  { label: 'self-improvement', tone: 'text-warm border-warm/25' },
]

export default function CurrentlyExploring() {
  return (
    <section className="section-container py-16">
      <div className="glass relative overflow-hidden p-8 sm:p-10">
        <div className="gradient-mesh absolute inset-0 opacity-20" />
        <div className="relative z-10">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-warm/70">
            Currently exploring
          </p>
          <h2 className="mb-6 max-w-lg text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            What I’m tinkering with these days
          </h2>
          <Reveal stagger={0.06} className="flex flex-wrap gap-3">
            {exploring.map((item) => (
              <span
                key={item.label}
                className={`cursor-default rounded-full border bg-white/[0.02] px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] ${item.tone}`}
              >
                {item.label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
