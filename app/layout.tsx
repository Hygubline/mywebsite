import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
      <body className="font-sans bg-grid">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  )
}
