import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Fraunces } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CursorGlow from '@/components/CursorGlow'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
})

export const metadata: Metadata = {
  title: 'Yun He - Personal Site',
  description:
    'A cinematic personal website by Yun He with a short introduction, selected projects, personal notes, and contact.',
  keywords: ['personal website', 'frontend developer', 'projects', 'notes', 'portfolio'],
  authors: [{ name: 'Yun He' }],
  openGraph: {
    title: 'Yun He - Personal Site',
    description: 'A cinematic personal website with selected projects, notes, and contact.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <body className="font-sans bg-background text-foreground">
        <CursorGlow />
        <SiteHeader />
        <main className="relative z-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
