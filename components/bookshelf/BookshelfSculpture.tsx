interface BookshelfSculptureProps {
  titles: string[]
}

export default function BookshelfSculpture({ titles }: BookshelfSculptureProps) {
  const spines = titles.slice(0, 4)

  return (
    <div className="bookshelf-stage">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(227,168,111,0.16),transparent_22%),radial-gradient(circle_at_20%_84%,rgba(255,255,255,0.05),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%,rgba(0,0,0,0.3)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:84px_84px]" />

      <div className="bookshelf-shell" />
      <div className="bookshelf-cavity bookshelf-cavity-main" />
      <div className="bookshelf-cavity bookshelf-cavity-top" />
      <div className="bookshelf-cavity bookshelf-cavity-bottom" />
      <div className="bookshelf-plinth" />

      <div className="pointer-events-none absolute left-[15%] top-[18%] h-[52%] w-[46%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_34%,rgba(227,168,111,0.22),transparent_22%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.04),transparent_32%)] blur-[18px]" />
      <div className="pointer-events-none absolute right-[10%] top-[10%] h-[28%] w-[26%] rounded-full bg-[radial-gradient(circle,rgba(227,168,111,0.18),transparent_60%)] blur-[28px] animate-pulse-soft" />

      <div className="bookshelf-vase">
        <div className="bookshelf-vase-bloom" />
        <div className="absolute left-1/2 top-[4%] h-[44%] w-[1px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(216,184,120,0),rgba(216,184,120,0.65),rgba(216,184,120,0.16))]" />
        <div className="absolute left-[30%] top-[10%] h-[36%] w-[1px] rotate-[-20deg] bg-[linear-gradient(180deg,rgba(216,184,120,0),rgba(216,184,120,0.45),rgba(216,184,120,0.12))]" />
        <div className="absolute right-[31%] top-[8%] h-[38%] w-[1px] rotate-[18deg] bg-[linear-gradient(180deg,rgba(216,184,120,0),rgba(216,184,120,0.45),rgba(216,184,120,0.12))]" />
        <div className="absolute left-[16%] top-[4%] h-7 w-7 rounded-full bg-[radial-gradient(circle,rgba(216,184,120,0.5),rgba(216,184,120,0.05)_72%,transparent_74%)] blur-[1px]" />
        <div className="absolute right-[12%] top-[14%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(216,184,120,0.35),rgba(216,184,120,0.05)_72%,transparent_74%)] blur-[1px]" />
        <div className="bookshelf-vase-pot" />
      </div>

      <div className="bookshelf-spines">
        {spines.map((title, index) => (
          <div
            key={title}
            className="bookshelf-spine"
            style={{
              transform: `rotate(${[-14, -8, 6, 12][index] ?? 0}deg) translateY(${[8, 2, 6, 0][index] ?? 0}px)`,
              background:
                index % 2 === 0
                  ? 'linear-gradient(180deg, rgba(63, 57, 49, 0.96), rgba(25, 22, 19, 0.98))'
                  : 'linear-gradient(180deg, rgba(84, 69, 54, 0.96), rgba(31, 27, 23, 0.98))',
              width: `${index === 1 ? 42 : index === 3 ? 34 : 30}px`,
            }}
          >
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
