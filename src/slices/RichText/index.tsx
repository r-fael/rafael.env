import type { Content } from '@prismicio/client'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

/**
 * RichText slice
 *
 * The main body slice for blog posts: paragraphs, headings (h2/h3),
 * lists, inline code, and links. The richer formatting needs (code
 * blocks, images, quotes) live in dedicated slices so editors can
 * reorder them.
 */
export type RichTextProps = SliceComponentProps<Content.RichTextSlice>

export default function RichText({ slice }: RichTextProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      className="max-w-none"
    >
      <PrismicRichText field={slice.primary.content} />
    </section>
  )
}
