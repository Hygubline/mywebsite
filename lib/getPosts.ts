import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/writing')

export interface Post {
  slug: string
  title: string
  date: string
  hook?: string
  content: string
}

export async function getPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        hook: data.hook,
        content: processContent(content),
      } as Post
    })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug) || null
}

function processContent(content: string): string {
  return content
    .split('\n\n')
    .map((paragraph) => {
      const trimmed = paragraph.trim()

      if (trimmed.startsWith('## ')) {
        return `<h2 class="text-2xl font-semibold text-white mt-12 mb-4 tracking-tight">${trimmed.slice(3)}</h2>`
      }
      if (trimmed.startsWith('### ')) {
        return `<h3 class="text-xl font-medium text-white mt-8 mb-3 tracking-tight">${trimmed.slice(4)}</h3>`
      }
      if (trimmed.startsWith('> ')) {
        return `<blockquote class="border-l-2 border-white/20 pl-4 italic text-neutral-500 my-6">${trimmed.slice(2)}</blockquote>`
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map(item => `<li class="text-neutral-400">${item.slice(2)}</li>`).join('')
        return `<ul class="list-disc list-inside space-y-2 my-4">${items}</ul>`
      }
      if (trimmed === '') return ''

      let processed = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-neutral-300">$1</code>')

      return `<p class="text-neutral-400 leading-relaxed mb-4">${processed}</p>`
    })
    .join('\n')
}
