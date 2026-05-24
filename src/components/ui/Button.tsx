import Link from 'next/link'

import { cn } from '@/lib/utils'

/**
 * Button — primary interactive element.
 *
 * WHY VARIANTS PATTERN?
 * Instead of creating GhostButton, OutlineButton, PrimaryButton separately,
 * we use a single component with a `variant` prop. This:
 * - Reduces component count
 * - Ensures consistent sizing across variants
 * - Makes it easy to switch styles without changing components
 *
 * PATTERN: Link-aware button
 * If `href` is provided, renders as Next.js <Link>. Otherwise renders <button>.
 * This keeps the API simple — the consumer doesn't think about implementation.
 */

type ButtonVariant = 'primary' | 'ghost' | 'outline'

interface ButtonBaseProps {
  children: React.ReactNode
  variant?: ButtonVariant
  className?: string
  icon?: React.ReactNode
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string
  external?: boolean
  onClick?: never
  type?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-accent text-background font-semibold',
    'hover:bg-accent-hover',
    'shadow-md hover:shadow-glow'
  ),
  ghost: cn(
    'text-accent',
    'hover:bg-accent-subtle'
  ),
  outline: cn(
    'border border-border text-foreground',
    'hover:border-border-hover hover:bg-background-elevated'
  ),
}

export function Button({
  children,
  variant = 'primary',
  className,
  icon,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-lg px-4 py-2',
    'text-sm font-medium',
    'transition-all duration-200',
    'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles[variant],
    className
  )

  // Render as Link if href is provided
  if ('href' in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink
    return (
      <Link
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {icon}
        {children}
      </Link>
    )
  }

  // Render as button
  const { onClick, type = 'button', ...rest } = props as ButtonAsButton
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {icon}
      {children}
    </button>
  )
}
