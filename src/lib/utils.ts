import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 *
 * WHY THIS EXISTS:
 * - `clsx` handles conditional classes: cn('base', isActive && 'bg-accent')
 * - `tailwind-merge` resolves conflicts: cn('px-4', 'px-6') → 'px-6'
 * - Together they're the industry standard for Tailwind class management.
 *
 * USAGE:
 * ```tsx
 * <div className={cn('p-4 bg-background', className, isActive && 'bg-accent')} />
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into a human-readable format.
 * e.g., "2024-03-15" → "March 15, 2024"
 */
export function formatDate(date: string, locale: string = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
