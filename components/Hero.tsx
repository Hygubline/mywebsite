import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import AnimatedText from '@/components/AnimatedText'
import FloatingFragments from '@/components/FloatingFragments'

/**
 * The entrance to the world. Big expressive type that reveals word by word,
 * an animated gradient mesh, and glass fragments drifting in the dark.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* atmosphere */}
      <div className="gradient-mesh absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <FloatingFragments />

      <div className="section-container relative z-10 py-32">
        <div
          className="mb-7 inline-flex animate-fade-in items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 backdrop-blur-md"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-warm" />
          <span className="text-xs font-medium text-muted">Digital Garden · Thought Archive</span>
        </div>

        <AnimatedText
          as="h1"
          text="Hi, I'm Yun."
          delay={0.15}
          className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
        />

        <AnimatedText
          as="p"
          text="I build small things, collect beautiful interfaces, write notes, and slowly figure things out."
          delay={0.55}
          stagger={0.025}
          className="mt-8 max-w-2xl text-xl font-medium leading-snug text-foreground/85 sm:text-2xl"
        />

        <p
          className="mt-5 max-w-xl animate-slide-up text-base leading-relaxed text-muted"
          style={{ animationDelay: '1.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          This is my personal corner of the internet — a place for thoughts, front-end
          experiments, reading reflections, and unfinished ideas.
        </p>

        <div
          className="mt-10 flex animate-slide-up flex-wrap items-center gap-4"
          style={{ animationDelay: '1.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link href="/notes" className="btn-primary">
            Read the notes
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/ui-lab" className="btn-secondary">
            Enter the UI Lab
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/40">
        <ArrowDown size={20} className="animate-bounce" />
      </div>
    </section>
  )
}
