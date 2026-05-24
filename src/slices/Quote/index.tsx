import type { Content } from '@prismicio/client'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

/**
 * Quote slice
 *
 * A pull quote with an optional citation. Uses `<blockquote>` +
 * `<cite>` for semantic correctness.
 */
export type QuoteProps = SliceComponentProps<Content.QuoteSlice>

export default function Quote({ slice }: QuoteProps) {
  return (
    <blockquote
      data-slice-type={slice.slice_type}
      className="my-6 border-l-4 border-foreground/30 pl-4 italic"
    >
      <PrismicRichText field={slice.primary.quote} />
      {slice.primary.cite ? (
        <cite className="mt-2 block text-sm text-foreground-muted not-italic">
          — {slice.primary.cite}
        </cite>
      ) : null}
    </blockquote>
  )
}
