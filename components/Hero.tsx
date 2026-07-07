import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import AnimatedText from '@/components/AnimatedText'
import FloatingFragments from '@/components/FloatingFragments'
import HeroParticleField from '@/components/HeroParticleField'
import MagneticCard from '@/components/MagneticCard'

const identityTags = ['Intro', 'Projects', 'Thoughts', 'Contact']

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <HeroParticleField />
      <div className="aurora-veil" />
      <div className="aurora-veil aurora-veil--secondary" />
      <div className="hero-spotlight absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
      <FloatingFragments />

      <div className="section-container relative z-10 py-32">
        <div
          className="mb-10 flex animate-fade-in items-center gap-4"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="gilded-rule w-14" />
          <span className="eyebrow flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-warm" />
            Personal digital space · est. 2026
          </span>
          <span className="gilded-rule w-14" />
        </div>

        <AnimatedText
          as="h1"
          text="Yun He"
          delay={0.15}
          stagger={0.09}
          className="font-display text-7xl font-semibold leading-[0.92] tracking-tight text-foreground sm:text-8xl md:text-9xl"
        />

        <p
          className="text-gold-foil font-display mt-4 animate-slide-up text-3xl font-medium italic leading-tight tracking-tight sm:text-4xl md:text-5xl"
          style={{ animationDelay: '0.85s', opacity: 0, animationFillMode: 'forwards' }}
        >
          builder, student,
          <span className="text-foreground/90"> and quiet internet resident.</span>
        </p>

        <div
          className="mt-9 flex animate-slide-up flex-wrap gap-2.5"
          style={{ animationDelay: '1.0s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {identityTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-warm/15 bg-surface/40 px-3.5 py-1.5 text-[13px] tracking-wide text-foreground/75 backdrop-blur-md transition-colors duration-300 hover:border-warm/40 hover:text-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-warm/80" />
              {tag}
            </span>
          ))}
        </div>

        <p
          className="mt-8 max-w-2xl animate-slide-up text-lg leading-relaxed text-foreground/75 sm:text-xl"
          style={{ animationDelay: '1.15s', opacity: 0, animationFillMode: 'forwards' }}
        >
          This site is a smaller personal space: a short introduction, a few projects
          I care about, some notes on what I am thinking through, and a simple way to
          reach me.
        </p>

        <div
          className="mt-11 flex animate-slide-up flex-wrap items-center gap-4"
          style={{ animationDelay: '1.35s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <MagneticCard strength={0.3} className="inline-block">
            <Link href="#projects" className="btn-primary">
              View projects
              <ArrowRight className="relative h-4 w-4" />
            </Link>
          </MagneticCard>
          <MagneticCard strength={0.25} className="inline-block">
            <Link href="#thoughts" className="btn-secondary">
              Read thoughts
            </Link>
          </MagneticCard>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span
          className="gilded-rule h-10 w-px"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(230,184,119,0.5))' }}
        />
        <ArrowDown size={16} className="animate-bounce text-warm/50" />
      </div>
    </section>
  )
}
