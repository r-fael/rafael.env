import { redirectToPreviewURL } from '@prismicio/next'
import { NextRequest } from 'next/server'

import { createClient } from '../../../../prismicio'
import { linkResolver } from '@/lib/prismic-helpers'

/**
 * Preview entry point.
 *
 * Prismic's editor calls this URL with a `?token=...&documentId=...`
 * query. `redirectToPreviewURL` sets the preview cookie, enables
 * Next's Draft Mode, and redirects to the target document's page.
 * From that point on, Server Components fetch drafts instead of
 * published content (handled by `enableAutoPreviews` in prismicio.ts).
 */
export async function GET(request: NextRequest) {
  const client = createClient()
  return redirectToPreviewURL({ client, request, linkResolver })
}
