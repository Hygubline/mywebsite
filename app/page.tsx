import Link from 'next/link'
import { Github, GraduationCap, Linkedin, Mail, MapPin } from 'lucide-react'
import AmbientBackground from '@/components/AmbientBackground'
import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import Tag from '@/components/Tag'
import Reveal from '@/components/anim/Reveal'
import { getProjects } from '@/lib/getProjects'
import { learningStack } from '@/lib/personalOs'

const aboutParagraphs = [
  'I study computer science, build small web things, and use this site to collect thoughts, experiments, reading notes, and unfinished ideas.',
  'I am especially drawn to the expressive side of front-end work: motion, atmosphere, and interfaces that feel considered instead of merely functional.',
]

const experienceItems = [
  {
    title: 'Computer Science Student',
    meta: 'Hunter College',
    detail:
      'Building a stronger software foundation while using this site as a public record of what I am learning.',
    Icon: GraduationCap,
  },
  {
    title: 'Frontend-Focused Builder',
    meta: 'Personal projects',
    detail:
      'Designing and shipping small web experiences with Next.js, TypeScript, Tailwind CSS, and motion-driven UI details.',
    Icon: MapPin,
  },
  {
    title: 'Open to Opportunities',
    meta: 'New York / Remote',
    detail:
      'Actively looking for frontend and software internship opportunities where I can keep growing through real product work.',
    Icon: Mail,
  },
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

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <AmbientBackground variant="home" />

      <Hero />

      <section className="section-container relative z-10 py-20 sm:py-24" id="about">
        <SectionTitle
          eyebrow="About"
          title="A personal website built as a living workspace."
          intro="This homepage is meant to feel like an overview of who I am, what I build, and where I am trying to go next."
          className="mb-10"
        />

        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="prose max-w-none">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-warm/70">Now</p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Learning in public, building in small steady steps.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              Projects, notes, experiments, and systems all live together here so the
              site can grow alongside my work.
            </p>
            <Link href="/about" className="btn-secondary mt-6">
              Read more about me
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section-container relative z-10 py-20 sm:py-24" id="projects">
        <SectionTitle
          eyebrow="Projects"
          title="Selected builds and ongoing work."
          intro="A few recent projects that best represent what I have been making and studying."
          className="mb-10"
        />

        <Reveal stagger={0.08} className="grid gap-4 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="glass-card glow-hover group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-warm/70">
                {project.subtitle || 'Project'}
              </p>
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

      <section className="section-container relative z-10 py-20 sm:py-24" id="skills">
        <SectionTitle
          eyebrow="Skills"
          title="Tools and areas I am actively growing."
          intro="An honest snapshot of the stack I use most often right now."
          className="mb-10"
        />

        <Reveal className="glass-card rounded-3xl p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {learningStack.map((skill) => (
              <div key={skill.label}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{skill.label}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      {skill.level}
                    </p>
                  </div>
                  <span className="text-sm text-warm">{skill.value}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-warm via-warm/80 to-iris/80"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-container relative z-10 py-20 sm:py-24" id="experience">
        <SectionTitle
          eyebrow="Experience"
          title="Where I am building experience right now."
          intro="The repository does not currently expose formal work history on the homepage, so this section reflects the experience already described elsewhere in the site."
          className="mb-10"
        />

        <Reveal stagger={0.08} className="grid gap-4 lg:grid-cols-3">
          {experienceItems.map(({ title, meta, detail, Icon }) => (
            <div
              key={title}
              className="glass-card glow-hover rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <Icon className="h-5 w-5 text-warm" />
              <p className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                {title}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">{meta}</p>
              <p className="mt-4 text-sm leading-7 text-muted">{detail}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section-container relative z-10 py-20 pb-24 sm:py-24 sm:pb-28" id="contact">
        <SectionTitle
          eyebrow="Contact"
          title="Let’s talk."
          intro="The fastest way to reach me is email, but you can also find me on GitHub and LinkedIn."
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
              <Icon className="h-5 w-5 text-warm transition-transform duration-300 group-hover:scale-110" />
              <span className="mt-4 text-sm font-medium text-foreground">{label}</span>
              <span className="mt-1 text-sm text-muted">{value}</span>
            </a>
          ))}
        </Reveal>
      </section>
    </div>
  )
}
