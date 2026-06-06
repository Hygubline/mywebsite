import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CursorGlow from '@/components/CursorGlow'

export const metadata: Metadata = {
  title: 'Yun He — Digital Archive',
  description:
    'A living collection of code, projects, notes, books, and fragments of thought — a quiet, cinematic personal archive by Yun He.',
  keywords: [
    'digital archive',
    'personal website',
    'thought archive',
    'UI lab',
    'front-end experiments',
    'reading notes',
    'creative coding',
  ],
  authors: [{ name: 'Yun He' }],
  openGraph: {
    title: 'Yun He — Digital Archive',
    description:
      'A living collection of code, projects, notes, books, and fragments of thought.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-background text-foreground">
        <CursorGlow />
        <SiteHeader />
        <main className="relative z-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
