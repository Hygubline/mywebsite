import type { Book } from '@/lib/books'

type CoverVariant = 'moon' | 'door' | 'stairs' | 'ribbon' | 'orb'

interface BookCoverProps {
  book?: Book
  title?: string
  author?: string
  size?: 'sm' | 'lg'
  variant?: CoverVariant
  accent?: string
}

function variantFromTitle(title: string): CoverVariant {
  const lower = title.toLowerCase()
  if (lower.includes('quiet') || lower.includes('compass')) return 'moon'
  if (lower.includes('between') || lower.includes('line')) return 'door'
  if (lower.includes('habit') || lower.includes('stair')) return 'stairs'
  if (lower.includes('obsidian')) return 'ribbon'
  return 'orb'
}

function artForVariant(variant: CoverVariant, accent: string) {
  switch (variant) {
    case 'moon':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.04),transparent_35%)]" />
          <div
            className="absolute left-1/2 top-[22%] h-[18%] w-[18%] -translate-x-1/2 rounded-full blur-[0.2px]"
            style={{ background: accent, boxShadow: `0 0 24px ${accent}55` }}
          />
          <div className="absolute inset-x-[12%] bottom-[18%] h-[24%] rounded-[100%] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
          <div className="absolute left-[18%] right-[18%] bottom-[18%] h-[15%] rounded-[100%] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)] opacity-70 blur-[1px]" />
          <div className="absolute left-1/2 bottom-[18%] h-[14%] w-[2px] -translate-x-1/2 bg-white/45" />
        </>
      )
    case 'door':
      return (
        <>
          <div className="absolute inset-x-[18%] bottom-[15%] top-[18%] rounded-[22px_22px_0_0] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
          <div className="absolute inset-x-[31%] bottom-[15%] top-[35%] rounded-[999px_999px_0_0] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))]" />
          <div className="absolute left-1/2 bottom-[15%] h-[20%] w-[3%] -translate-x-1/2 rounded-full bg-[#0d0d0b]" />
        </>
      )
    case 'stairs':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_78%,rgba(255,159,28,0.24),transparent_24%)]" />
          <div className="absolute inset-x-[14%] bottom-[14%] top-[16%] rounded-[22px] bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.03))]" />
          <div className="absolute bottom-[16%] right-[17%] h-[55%] w-[42%]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute right-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.13),rgba(255,255,255,0.03))]"
                style={{
                  bottom: `${i * 10}%`,
                  width: `${20 + i * 12}%`,
                  height: '10%',
                }}
              />
            ))}
          </div>
          <div
            className="absolute bottom-[18%] right-[14%] h-[12%] w-[6%] rounded-full"
            style={{ background: accent }}
          />
        </>
      )
    case 'ribbon':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.05),transparent_22%),radial-gradient(circle_at_70%_74%,rgba(255,159,28,0.16),transparent_22%)]" />
          <div
            className="absolute left-[38%] top-[12%] h-[72%] w-[28%] -rotate-[18deg] rounded-[999px]"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))',
              boxShadow: `0 0 24px ${accent}22`,
            }}
          />
          <div
            className="absolute left-[40%] top-[34%] h-[36%] w-[24%] -rotate-[18deg] rounded-[999px] bg-[#101010]"
          />
          <div
            className="absolute left-[34%] top-[48%] h-[22%] w-[22%] rounded-full blur-[2px]"
            style={{ background: `${accent}66` }}
          />
        </>
      )
    case 'orb':
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_86%,rgba(255,255,255,0.12),transparent_22%)]" />
          <div className="absolute inset-x-[20%] top-[14%] h-[54%] rounded-full bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.06),transparent_58%)]" />
          <div className="absolute left-1/2 top-[18%] h-[48%] w-[48%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_48%,transparent_52%)]" />
          <div
            className="absolute left-1/2 top-[44%] h-[12%] w-[12%] -translate-x-1/2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 28px ${accent}88` }}
          />
          <div className="absolute left-1/2 top-[61%] h-[7%] w-[28%] -translate-x-1/2 rounded-full bg-white/14 blur-[1px]" />
        </>
      )
  }
}

export default function BookCover({
  book,
  title,
  author,
  size = 'sm',
  variant,
  accent = '#ff9f1c',
}: BookCoverProps) {
  const resolvedTitle = title ?? book?.title ?? 'Untitled'
  const resolvedAuthor = author ?? book?.author ?? ''
  const resolvedVariant = variant ?? variantFromTitle(resolvedTitle)
  const lg = size === 'lg'

  return (
    <div className="relative aspect-[2/3] w-full rounded-[12px] transition-transform duration-500">
      <div className="absolute inset-y-[1.2%] -left-[4.8%] w-[6.4%] rounded-l-[7px] bg-[linear-gradient(180deg,#37312b,#171614)] shadow-[inset_1px_0_0_rgba(255,255,255,0.05)]" />
      <div className="absolute inset-y-[1.8%] -right-[3.5%] w-[5.3%] rounded-r-[8px] bg-[linear-gradient(90deg,#d7cfbf,#a3998b)] shadow-[inset_-1px_0_0_rgba(0,0,0,0.22)]" />

      <div className="relative h-full w-full overflow-hidden rounded-[12px] border border-white/[0.06] bg-[linear-gradient(145deg,#151413,#0c0c0b)] shadow-[0_22px_46px_-24px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-500 group-hover:shadow-[0_28px_60px_-26px_rgba(0,0,0,0.95),0_0_28px_rgba(245,154,35,0.12)]">
        <div className="absolute inset-[6%] rounded-[8px] border border-white/[0.05]" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 72% 20%, ${accent}22, transparent 20%), linear-gradient(155deg, #191816 0%, #0b0b0a 100%)`,
          }}
        />
        <div className="absolute inset-0 opacity-30 mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.12)_0.6px,transparent_0.6px)] [background-size:6px_6px]" />
        {artForVariant(resolvedVariant, accent)}

        <div className={`absolute inset-x-[11%] ${lg ? 'top-[69%]' : 'top-[70%]'}`}>
          <p
            className={`max-w-[8.5ch] text-[#f4eee4] [font-family:Iowan_Old_Style,Georgia,serif] ${
              lg ? 'text-[0.86rem] leading-[1.24] tracking-[0.2em]' : 'text-[0.7rem] leading-[1.26] tracking-[0.18em]'
            }`}
          >
            {resolvedTitle.toUpperCase()}
          </p>
          <p
            className={`mt-5 uppercase tracking-[0.24em] text-[#d8cebe]/68 ${
              lg ? 'text-[0.54rem]' : 'text-[0.45rem]'
            }`}
          >
            {resolvedAuthor}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_34%,transparent_68%,rgba(255,255,255,0.04))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}33, 0 0 38px ${accent}1f` }}
        />
      </div>
    </div>
  )
}
