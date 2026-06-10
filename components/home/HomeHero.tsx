import Link from 'next/link'
import { ArrowRight, NotebookPen, Sparkles } from 'lucide-react'
import Reveal from '@/components/anim/Reveal'

const signals = ['archive', 'bookshelf', 'lab notes', 'selected works', 'future systems']

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-[#070708]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,138,61,0.16),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.04),transparent_18%),radial-gradient(circle_at_50%_115%,rgba(255,255,255,0.03),transparent_34%)]" />
      <div className="gradient-mesh absolute inset-0 opacity-[0.18]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,8,0.25),rgba(7,7,8,0.75)_65%,#070708_100%)]" />

      <div className="section-container relative z-10 flex min-h-[95vh] items-end py-28 sm:py-32">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <div className="max-w-3xl">
            <Reveal className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.34em] text-[#cfb28a] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c88a3d]" />
              Digital Archive
            </Reveal>

            <Reveal delay={0.06} className="mt-8">
              <p className="max-w-[14ch] font-serif text-[3.4rem] font-normal leading-[0.9] tracking-[-0.06em] text-[#f1eadf] sm:text-[4.8rem] lg:text-[6.4rem]">
                A private room for work, thought, and unfinished futures.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-7 max-w-2xl">
              <p className="text-base leading-8 text-[#b0a79a] sm:text-lg">
                Not a landing page. Not a resume with nicer shadows. More like a quiet
                digital interior, where projects, reading, notes, experiments, and long
                range goals are kept in the same dim light.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/notes" className="btn-primary">
                Enter the archive
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/reading"
                className="inline-flex items-center gap-2 text-sm text-[#d8c3a5] transition-colors hover:text-[#f1eadf]"
              >
                Browse the library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-2.5">
              {signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-1.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#918777]"
                >
                  {signal}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,26,0.88),rgba(12,12,13,0.92))] p-5 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95),0_0_40px_rgba(200,138,61,0.08)] backdrop-blur-xl sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(200,138,61,0.18),transparent_24%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.04),transparent_16%)]" />
              <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.8)_0.8px,transparent_0.8px)] [background-size:10px_10px]" />

              <div className="relative z-10 w-full max-w-[28rem]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[0.64rem] uppercase tracking-[0.34em] text-[#8e8578]">
                      Presence
                    </p>
                    <p className="mt-2 text-sm text-[#f1eadf]">Yun He</p>
                  </div>
                  <Sparkles className="h-4 w-4 text-[#c88a3d]" />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-center">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,#1a1a1c,#0e0e10)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <div className="absolute inset-x-[22%] top-[15%] h-[30%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,241,217,0.55),rgba(255,241,217,0.08)_65%,transparent_72%)] blur-[1px]" />
                    <div className="absolute left-1/2 top-[36%] h-[20%] w-[24%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05))]" />
                    <div className="absolute left-1/2 top-[50%] h-[34%] w-[54%] -translate-x-1/2 rounded-[999px_999px_32%_32%] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(200,138,61,0.22),transparent_28%)]" />
                  </div>

                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8e8578]">
                      Archive card
                    </p>
                    <p className="mt-3 font-serif text-[1.65rem] leading-tight text-[#f1eadf]">
                      Builder, reader, and keeper of half-finished ideas.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#a69c8f]">
                      Front-end work, design experiments, reading notes, and systems for
                      becoming more deliberate over time.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 border-t border-white/10 pt-5 text-sm text-[#b4a999] sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
                    <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#8e8578]">
                      Currently building
                    </p>
                    <p className="mt-2 text-[#f1eadf]">A more atmospheric personal web.</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
                    <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#8e8578]">
                      Open drawer
                    </p>
                    <Link
                      href="/personal-os"
                      className="mt-2 inline-flex items-center gap-2 text-[#d7b07a] transition-colors hover:text-[#f1eadf]"
                    >
                      Personal OS
                      <NotebookPen className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
