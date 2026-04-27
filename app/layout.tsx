import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FloatingPapers } from '@/components/FloatingPapers'

export const metadata: Metadata = {
  title: 'Yun He — AI Builder & Systems Thinker',
  description: 'Building systems with AI. Designing tools, structuring ideas, and exploring leverage in the age of intelligence.',
  keywords: ['AI', 'Builder', 'Systems Thinking', 'Software Engineering', 'Product Design'],
  authors: [{ name: 'Yun He' }],
  openGraph: {
    title: 'Yun He — AI Builder & Systems Thinker',
    description: 'Building systems with AI. Designing tools, structuring ideas, and exploring leverage in the age of intelligence.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yun He — AI Builder & Systems Thinker',
    description: 'Building systems with AI.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-cinema film-grain vignette">
        <div className="ambient-glow" />
        <FloatingPapers />
        <div className="min-h-screen flex flex-col relative z-[1]">
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(10, 10, 10, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(232, 228, 223, 0.06)',
              color: '#e8e4df',
              fontFamily: 'var(--font-geist-sans)',
            },
          }}
        />
      </body>
    </html>
  )
}
