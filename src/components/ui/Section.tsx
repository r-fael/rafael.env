import { cn } from '@/lib/utils'

/**
 * Section — semantic content block with heading.
 *
 * WHY A SECTION COMPONENT?
 * - Enforces semantic HTML (<section> with heading)
 * - Consistent spacing between content blocks
 * - The `delay` prop integrates with Framer Motion staggering later
 *
 * PATTERN: Composition via children
 * Instead of passing content as props, we use children for maximum flexibility.
 * The parent decides what goes inside — the Section only handles structure.
 */

interface SectionProps {
  title: string
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ title, children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('mb-8', className)}
    >
      <h3 className="mb-4 text-xl font-bold text-foreground underline decoration-accent/50 decoration-4 underline-offset-[6px]">
        {title}
      </h3>
      {children}
    </section>
  )
}
