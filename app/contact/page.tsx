import { redirect } from 'next/navigation'

// Contact details now live on the About page.
export default function ContactPage() {
  redirect('/about')
}
