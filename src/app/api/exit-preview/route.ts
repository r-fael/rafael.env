import { exitPreview } from '@prismicio/next'

/**
 * Preview exit.
 *
 * Disables Draft Mode and clears the Prismic preview cookie, then
 * redirects back to the origin page. Wired up to the "Exit preview"
 * button on the Prismic toolbar.
 */
export async function GET() {
  return exitPreview()
}
