import { redirect } from 'next/navigation'

// "Writing" became "Notes" when the site turned into a digital garden.
export default function WritingPage() {
  redirect('/notes')
}
