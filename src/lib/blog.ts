import { createClient } from '../../prismicio'
import type { BlogPost } from '@/types'

import { type BlogPostDocument } from './prismic-helpers'

/**
 * Blog data layer (Prismic-backed).
 *
 * Phase 5 (Blog) pages call these instead of touching Prismic
 * directly. The shape returned matches the existing `BlogPost`
 * interface so any consumer wired up against the old MDX plan
 * keeps working.
 *
 * `body` (the SliceZone field) is preserved as-is on the returned
 * object via the `content` property — the post page passes it
 * straight to `<SliceZone>`.
 */

function toBlogPost(doc: BlogPostDocument): BlogPost & { body: BlogPostDocument['data']['body'] } {
  return {
    slug: doc.uid ?? doc.id,
    title: doc.data.title ?? '',
    description: doc.data.description ?? '',
    coverImage: doc.data.cover_image?.url ?? undefined,
    date: doc.data.date ?? doc.first_publication_date,
    tags: (doc.data.tags ?? [])
      .map((t) => t.label ?? '')
      .filter((label): label is string => label.length > 0),
    body: doc.data.body,
  }
}

export async function getAllPosts(lang: string = '*') {
  const client = createClient()
  try {
    let docs = await client.getAllByType<BlogPostDocument>('blog_post', {
      lang,
      orderings: [{ field: 'my.blog_post.date' }],
    })

    // sort by the latest post because ordering direction was not working
    docs = docs.sort((a, b) => new Date(b.first_publication_date).getTime() - new Date(a.first_publication_date).getTime())
    return docs.map(toBlogPost)
  } catch (error) {
    console.warn('[lib/blog] getAllPosts failed; returning empty array.', error)
    return []
  }
}

export async function getPostBySlug(slug: string, lang: string = '*') {
  const client = createClient()
  try {
    const doc = await client.getByUID<BlogPostDocument>('blog_post', slug, { lang })
    return toBlogPost(doc)
  } catch {
    return null
  }
}
