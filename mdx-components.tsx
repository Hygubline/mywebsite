import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-neutral-900 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-neutral-900 mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-neutral-900 mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-neutral-600 mb-4 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-neutral-900 underline underline-offset-4 hover:opacity-70 transition-opacity"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-600">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-600">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-neutral-300 pl-4 italic text-neutral-500 my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 overflow-x-auto my-6">
        {children}
      </pre>
    ),
    ...components,
  }
}
