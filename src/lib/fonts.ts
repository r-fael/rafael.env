import { Inter } from 'next/font/google'

/**
 * Inter — Google's modern variable font.
 *
 * WHY INTER?
 * - Designed specifically for computer screens
 * - Variable font = one file covers all weights (300–900)
 * - Excellent readability at small sizes (UI text)
 * - Used by GitHub, Linear, Vercel, and many top-tier apps
 *
 * WHY next/font?
 * - Zero layout shift (CLS = 0): font is loaded at build time
 * - Self-hosted: no external requests to Google CDN
 * - Automatic subsetting: only characters you use are included
 * - Privacy: no data sent to third parties
 *
 * The `variable` option creates a CSS custom property (--font-inter)
 * that we reference in globals.css via @theme { --font-sans: var(--font-inter) }
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Shows fallback font immediately, swaps when Inter loads
})
