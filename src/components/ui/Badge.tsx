import { cn } from '@/lib/utils'

/**
 * Badge — small label for tags (technologies, categories).
 *
 * WHY A BADGE COMPONENT?
 * - Consistent styling across project tags and blog tags
 * - Encapsulates the accent-subtle pattern
 * - Tiny, focused, reusable
 *
 * PATTERN: className override via cn()
 * The consumer can pass additional classes that properly merge with defaults.
 */

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1',
        'text-xs font-medium',
        'bg-accent-subtle text-accent',
        'transition-colors duration-200',
        className
      )}
    >
      {children}
    </span>
  )
}
