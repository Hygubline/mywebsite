import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            {new Date().getFullYear()} Yun He
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Hygubline"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
