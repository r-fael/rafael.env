import { Container } from '@/components/layout/Container'

/**
 * Footer — site footer with copyright.
 *
 * WHY A SEPARATE COMPONENT?
 * - Keeps layout.tsx clean (thin route file principle)
 * - Server component — no interactivity needed, no 'use client'
 * - Can be extended with sitemap links, newsletter signup, etc.
 */

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container>
        <p className="text-center text-sm text-foreground-subtle">
          © {new Date().getFullYear()} Rafael Medeiros. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
