import type { Metadata } from 'next'

import { inter } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

import './globals.css'

/**
 * Root Layout — wraps every page in the app.
 *
 * WHY THIS STRUCTURE?
 * - Metadata: SEO title/description + Open Graph for social sharing
 * - Font: Inter loaded via next/font (zero layout shift)
 * - Navbar + Footer: present on every page (shared layout)
 * - <main>: semantic HTML for the page content area
 *
 * IMPORTANT: This file is a Server Component (no 'use client').
 * The Navbar is the only client component here — it's imported
 * but rendered as an island of interactivity in a server-rendered shell.
 */

export const metadata: Metadata = {
  title: {
    default: 'Rafael Medeiros — Fullstack Developer',
    template: '%s | Rafael Medeiros',
  },
  description:
    'Portfolio of Rafael Medeiros — Fullstack Developer crafting digital experiences with React, Next.js, Node.js, and TypeScript.',
  openGraph: {
    title: 'Rafael Medeiros — Fullstack Developer',
    description:
      'Portfolio of Rafael Medeiros — Fullstack Developer crafting digital experiences.',
    url: 'https://r-fael.dev',
    siteName: 'Rafael Medeiros',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main className="flex-1 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
