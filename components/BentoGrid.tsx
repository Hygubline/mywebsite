import { NotebookPen, FlaskConical, Hammer, BookOpen, Sparkles } from 'lucide-react'
import Reveal from '@/components/anim/Reveal'
import BentoCard, { type BentoCardProps } from '@/components/BentoCard'

/** The portal: five rooms of the garden, arranged as a bento grid. */
const cards: (BentoCardProps & { span: string })[] = [
  {
    href: '/notes',
    title: 'Notes',
    description: 'Personal essays, stray thoughts, and learning reflections.',
    Icon: NotebookPen,
    accent: 'warm',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    href: '/ui-lab',
    title: 'UI Lab',
    description: 'Front-end motion experiments and interface ideas I want to learn.',
    Icon: FlaskConical,
    accent: 'iris',
    span: 'sm:col-span-2',
  },
  {
    href: '/projects',
    title: 'Projects',
    description: 'Small things I’ve made, and what each one quietly taught me.',
    Icon: Hammer,
    accent: 'sage',
    span: 'sm:col-span-1',
  },
  {
    href: '/reading',
    title: 'Reading',
    description: 'Notes from books and ideas that stayed with me.',
    Icon: BookOpen,
    accent: 'gold',
    span: 'sm:col-span-1',
  },
  {
    href: '/about',
    title: 'About',
    description: 'Who I am, and why this little corner exists.',
    Icon: Sparkles,
    accent: 'clay',
    span: 'sm:col-span-2',
  },
]

export default function BentoGrid() {
  return (
    <Reveal
      stagger={0.09}
      className="grid auto-rows-[minmax(150px,1fr)] grid-cols-1 gap-4 sm:grid-cols-4"
    >
      {cards.map(({ span, ...card }) => (
        // Reveal animates this plain wrapper; MagneticCard owns the inner
        // transform — keeping GSAP and Framer from fighting over the same node.
        <div key={card.href} className={span}>
          <BentoCard {...card} className="h-full" />
        </div>
      ))}
    </Reveal>
  )
}
