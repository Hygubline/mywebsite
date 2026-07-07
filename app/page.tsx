import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import AmbientBackground from '@/components/AmbientBackground'
import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import Tag from '@/components/Tag'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'
import { getProjects } from '@/lib/getProjects'

const aboutParagraphs = [
  'I study computer science and use the web as a place to make ideas visible. Most of what I build lives somewhere between product thinking, front-end craft, and personal curiosity.',
  'This homepage is intentionally small now: just enough to say who I am, show a few projects, share a few thoughts, and leave the door open for conversation.',
]

const contactLinks = [
  {
    label: 'Email',
    value: 'hy1269335770@gmail.com',
    href: 'mailto:hy1269335770@gmail.com',
    Icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/Hygubline',
    href: 'https://github.com/Hygubline',
    Icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://linkedin.com',
    Icon: Linkedin,
  },
]

export default async function Home() {
  const projects = await getProjects()
  const featuredProjects = projects.slice(0, 3)
  const recentNotes = getCollection('notes').slice(0, 3)

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <AmbientBackground variant="home" />

      <Hero />

      <section className="section-container relative z-10 py-20 sm:py-24" id="about">
        <SectionTitle
          eyebrow="No. 01 - About"
          title="A quieter introduction."
          intro="Less like a full archive, more like a front room: who I am, what I am making, what I am thinking about, and how to reach me."
          className="mb-10"
        />

        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="prose max-w-none">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-7">
            <p className="eyebrow">Right now</p>
            <p className="font-display mt-4 text-2xl font-medium italic leading-snug tracking-tight text-foreground">
              Building small, atmospheric web work with{' '}
              <span className="text-gold-foil">care and patience.</span>
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              I am especially drawn to interfaces with mood, restraint, and a little
              emotional texture instead of noise.
            </p>
            <Link href="#contact" className="btn-secondary mt-6">
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section-container relative z-10 py-20 sm:py-24" id="projects">
        <SectionTitle
          eyebrow="No. 02 - Projects"
          title="A few projects worth opening."
          intro="Selected work that reflects how I like to build: focused ideas, clean systems, and front-end detail that earns its place."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-warm transition-colors hover:text-foreground"
            >
              See all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
          className="mb-10"
        />

        <Reveal stagger={0.08} className="grid gap-4 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="glass-card glow-hover group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-warm/70">
                  {project.subtitle || 'Project'}
                </p>
                <span className="font-display text-2xl italic leading-none text-warm/25 transition-colors duration-500 group-hover:text-warm/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                {project.overview || project.problem || project.learned || 'View project details.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(project.techStack || project.tags || []).slice(0, 4).map((item) => (
                  <Tag key={item} tone="warm">
                    {item}
                  </Tag>
                ))}
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="section-container relative z-10 py-20 sm:py-24" id="thoughts">
        <SectionTitle
          eyebrow="No. 03 - Thoughts"
          title="Notes, questions, and small pieces of thinking."
          intro="Not polished essays. Just the ideas I want to keep close while I am learning, building, and trying to become more deliberate."
          action={
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 text-sm text-warm transition-colors hover:text-foreground"
            >
              Visit the notes
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
          className="mb-10"
        />

        <Reveal stagger={0.08} className="grid gap-4 lg:grid-cols-3">
          {recentNotes.map((note, index) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="glass-card glow-hover group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-warm/70">
                  {note.date.slice(0, 10)}
                </p>
                <span className="font-display text-2xl italic leading-none text-warm/25 transition-colors duration-500 group-hover:text-warm/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                {note.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                {note.summary || 'A recent note from the garden.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(note.tags || []).slice(0, 3).map((tag) => (
                  <Tag key={tag} tone="warm">
                    {tag}
                  </Tag>
                ))}
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="section-container relative z-10 py-20 pb-24 sm:py-24 sm:pb-28" id="contact">
        <SectionTitle
          eyebrow="No. 04 - Contact"
          title="Say hello."
          intro="If something here resonates, email is still the best doorbell."
          className="mb-10"
        />

        <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-3">
          {contactLinks.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass-card glow-hover group flex flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm/25 bg-warm/[0.07] transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-[18px] w-[18px] text-warm" />
              </span>
              <span className="mt-4 text-sm font-medium text-foreground">{label}</span>
              <span className="mt-1 text-sm text-muted">{value}</span>
            </a>
          ))}
        </Reveal>
      </section>
    </div>
  )
}
