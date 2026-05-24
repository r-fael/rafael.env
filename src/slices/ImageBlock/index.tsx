import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import type { SliceComponentProps } from '@prismicio/react'

/**
 * ImageBlock slice
 *
 * Wraps `<PrismicNextImage>` (which itself wraps `next/image`) so the
 * image pipeline uses Prismic's imgix CDN + Next's responsive sizes.
 * The caption is optional and rendered as `<figcaption>` for a11y.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>

export default function ImageBlock({ slice }: ImageBlockProps) {
  return (
    <figure
      data-slice-type={slice.slice_type}
      className="my-6"
    >
      <PrismicNextImage
        field={slice.primary.image}
        className="w-full rounded-lg"
        sizes="(min-width: 1024px) 768px, 100vw"
      />
      {slice.primary.caption ? (
        <figcaption className="mt-2 text-center text-sm text-foreground-muted">
          {slice.primary.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
