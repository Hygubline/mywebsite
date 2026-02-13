import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-main flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="glass-card p-12">
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl text-neutral-400 mb-8">
          This page doesn&apos;t exist. Yet.
        </p>
        <Link href="/" className="btn-primary">
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
