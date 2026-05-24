import { cn } from '@/lib/utils'

/**
 * Card — elevated surface container.
 *
 * WHY A CARD COMPONENT?
 * - Consistent elevation pattern (background-alt + border + shadow)
 * - Used by ProjectCard, BlogPostCard, and potentially other list items
 * - Handles hover effects in one place
 *
 * PATTERN: Polymorphic-ready
 * Right now it's a <div>, but if needed we can add an `as` prop
 * to render it as <article>, <li>, etc. For now, YAGNI (You Ain't Gonna Need It).
 */

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-background-alt p-6',
        'transition-all duration-300',
        hover && [
          'hover:border-border-hover',
          'hover:shadow-lg',
          'hover:-translate-y-1',
        ],
        className
      )}
    >
      {children}
    </div>
  )
}
