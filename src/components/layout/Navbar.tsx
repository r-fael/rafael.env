'use client'

/**
 * Navbar — site header with navigation.
 *
 * WHY 'use client'?
 * - We need useState for the mobile menu toggle
 * - We need usePathname to highlight the active link
 * - This is a perfect example of keeping the client boundary small:
 *   only the Navbar is client-side, the rest of the layout is server-rendered.
 *
 * PATTERN: Active link detection
 * We compare the current pathname to each nav item's href.
 * This gives visual feedback about where the user is.
 */

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const getClass = (item: NavItem): string => {
    console.log(item.href, pathname)
    return cn(
      'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
      pathname.includes(item.href)
        ? 'bg-accent-subtle text-accent'
        : 'text-foreground-muted hover:bg-accent-subtle hover:text-accent'
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-accent"
          >
            <span className="inline-block transition-transform duration-300 group-hover:rotate-12">
              ✦
            </span>
            r-fael
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={getClass(item)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <div
                className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-accent-subtle hover:text-accent"
              >
                <Link
                  href="https://github.com/r-fael"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </li>
          </ul>

          {/* ── Mobile hamburger ── */}
          <button
            className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-accent-subtle hover:text-accent sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* ── Mobile menu ── */}
        {isOpen && (
          <div className="border-t border-border pb-4 sm:hidden">
            <ul className="flex flex-col gap-1 pt-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-accent-subtle text-accent'
                        : 'text-foreground-muted hover:bg-accent-subtle hover:text-accent'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}
