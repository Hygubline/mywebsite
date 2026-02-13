interface SectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="py-12 border-t border-white/10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="text-neutral-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
