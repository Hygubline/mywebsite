import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Yun He — a personal digital garden',
  description:
    'My corner of the internet — a place where I collect ideas, build small experiments, write notes, and slowly figure things out.',
  keywords: ['digital garden', 'notes', 'UI experiments', 'reading notes', 'front-end', 'creative coding'],
  authors: [{ name: 'Yun He' }],
  openGraph: {
    title: 'Yun He — a personal digital garden',
    description:
      'A place where I collect ideas, build small experiments, write notes, and slowly figure things out.',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
