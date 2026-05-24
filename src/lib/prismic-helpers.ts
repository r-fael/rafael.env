import { asLink, type Content, type LinkField } from '@prismicio/client'

/**
 * Prismic data-layer helpers.
 *
 * These adapters translate Prismic documents into the existing
 * `Project` / `BlogPost` types from `@/types`. The contract for the
 * rest of the app stays unchanged — only this file knows about Prismic.
 *
 * Document types come from `prismicio-types.d.ts`, which Slice Machine
 * regenerates from `customtypes/` and `src/slices/`. Until the user
 * pushes the schemas to a real Prismic repo, a hand-written placeholder
 * version of that file lives at the repo root.
 */

export type ProjectDocument = Content.ProjectDocument
export type BlogPostDocument = Content.BlogPostDocument

/**
 * Reads the URL out of any Prismic Link field (Web, Document, Media).
 * Returns `undefined` for empty links so optional `Project` fields
 * stay optional. `asLink` does the resolution; passing
 * `linkResolver` ensures Document links use our URL scheme.
 */
export function linkUrl(field: LinkField | undefined): string | undefined {
  if (!field) return undefined
  const url = asLink(field, { linkResolver })
  return url ?? undefined
}

/**
 * Resolves Prismic documents to URLs. Used by `<PrismicLink>` and
 * preview redirects. Centralised so URL changes happen in one place.
 */
export function linkResolver(doc: { type: string; uid?: string | null }): string {
  switch (doc.type) {
    case 'project':
      return doc.uid ? `/projects/${doc.uid}` : '/projects'
    case 'blog_post':
      return doc.uid ? `/blog/${doc.uid}` : '/blog'
    default:
      return '/'
  }
}
