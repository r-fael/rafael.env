import { cn } from '@/lib/utils'

/**
 * Container — responsive max-width wrapper.
 *
 * WHY A CONTAINER COMPONENT?
 * - Consistent horizontal padding across all pages
 * - Single place to change max-width
 * - Mobile-first: full-width on small screens, centered on large
 *
 * BEST PRACTICE: max-w-2xl (672px)
 * Like craftz.dog, we use a narrow content width for readability.
 * Research shows 50-75 characters per line is optimal for reading.
 */

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-2xl px-6',
        className
      )}
    >
      {children}
    </div>
  )
}
