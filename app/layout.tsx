import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CursorGlow from '@/components/CursorGlow'

export const metadata: Metadata = {
  title: 'Yun He — Digital Garden',
  description:
    'A quiet, cinematic corner of the internet — thoughts, front-end experiments, reading reflections, and unfinished ideas, floating like fragments in a personal archive.',
  keywords: [
    'digital garden',
    'thought archive',
    'UI lab',
    'front-end experiments',
    'reading notes',
    'creative coding',
  ],
  authors: [{ name: 'Yun He' }],
  openGraph: {
    title: 'Yun He — Digital Garden',
    description:
      'A personal corner of the internet for thoughts, front-end experiments, reading reflections, and unfinished ideas.',
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
