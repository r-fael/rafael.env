import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'

/**
 * CodeBlock slice
 *
 * Renders a fenced code block. Syntax highlighting is intentionally
 * deferred to a CSS layer (e.g. Shiki + rehype later) so the slice
 * stays trivial. The `language-*` class is the convention every
 * highlighter recognises.
 */
export type CodeBlockProps = SliceComponentProps<Content.CodeBlockSlice>

export default function CodeBlock({ slice }: CodeBlockProps) {
  const language = slice.primary.language || 'text'
  const code = slice.primary.code ?? ''

  return (
    <section
      data-slice-type={slice.slice_type}
      className="my-6"
    >
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </section>
  )
}
