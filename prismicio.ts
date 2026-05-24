import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import sm from './slicemachine.config.json'

/**
 * Prismic repository name. Reads from env so different environments
 * (preview, prod, local) can target different Prismic environments
 * without code changes. Falls back to the value committed in
 * slicemachine.config.json so Slice Machine and the runtime stay aligned.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName

/**
 * Routes config — maps Prismic document types to URLs.
 * Used by `<PrismicLink>` and `linkResolver` so editors can link
 * between documents in the editor and the URLs resolve correctly
 * on the rendered site.
 */
const routes: prismic.ClientConfig['routes'] = [
  { type: 'project', path: '/projects/:uid' },
  { type: 'blog_post', path: '/blog/:uid' },
]

/**
 * Creates a Prismic client.
 *
 * - `routes` keeps URL resolution centralised.
 * - `fetchOptions.next.revalidate = 60` enables ISR — pages are
 *   regenerated at most every 60s in the background. Phase 7 may
 *   replace this with on-demand revalidation via a Prismic webhook.
 * - `enableAutoPreviews` wires Next.js Draft Mode: when a preview
 *   cookie is set the client returns draft content instead of the
 *   published version.
 */
export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { tags: ['prismic'], revalidate: 60 },
    },
    ...config,
  })

  enableAutoPreviews({ client })

  return client
}
