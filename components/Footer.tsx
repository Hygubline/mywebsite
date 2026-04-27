import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-24 md:py-32">
      <div className="divider-cinema mb-16" />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-8">
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#4a443c]">
            Fin.
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#4a443c] tracking-wide">
              {new Date().getFullYear()} Yun He
            </p>
            <a
              href="https://github.com/Hygubline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a443c] hover:text-[#8a8278] transition-colors duration-700"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
