import { redirect } from 'next/navigation'

/**
 * Legacy redirect. The "Writing" section became "Notes", and a couple of
 * essay slugs were renamed in the move. Map the old slugs to their new
 * homes so stale bookmarks/links don't 404; anything unknown falls back to
 * the Notes index.
 */
const slugMap: Record<string, string> = {
  'first-essay': 'leverage-over-speed',
  'systems-thinking': 'systems-over-goals',
  'masterpiece-criterion': 'masterpiece-criterion',
}

export default function LegacyWritingPost({ params }: { params: { slug: string } }) {
  const target = slugMap[params.slug]
  redirect(target ? `/notes/${target}` : '/notes')
}
