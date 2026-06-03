import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Yun He — Software Developer',
  description: 'Computer Science student building web applications, data tools, and practical software for real-world business needs.',
  keywords: ['Software Engineer', 'Web Developer', 'React', 'Next.js', 'Python', 'TypeScript'],
  authors: [{ name: 'Yun He' }],
  openGraph: {
    title: 'Yun He — Software Developer',
    description: 'Computer Science student building web applications, data tools, and practical software.',
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
