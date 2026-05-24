import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'
import { Badge } from '@/components/ui/Badge'

/**
 * BlogPostCard — displays a single blog post preview.
 *
 * WHY SERVER COMPONENT?
 * No interactivity, no hooks. Hover effects are pure CSS.
 * The card links to `/blog/[slug]` for the full post.
 *
 * DESIGN: Horizontal layout — text on the left, cover image thumbnail
 * on the right. Matches the ProjectCard aesthetic: dark card surface,
 * accent-subtle tags, hover glow + upward shift.
 */

interface BlogPostCardProps {
  post: BlogPost
  className?: string
}

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  return (
    <article
      className={cn(
        'group relative flex gap-4 rounded-xl border border-border bg-background-alt p-5',
        'transition-all duration-300',
        'hover:border-border-hover hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Accent bar — visible on hover */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Text content — takes remaining space */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {/* Meta: date */}
        <div className="flex items-center gap-2 text-xs text-foreground-subtle">
          <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        {/* Title — links to full post */}
        <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-foreground-muted">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        {/* Read more indicator */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Read more
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>

      {/* Cover image thumbnail — right side */}
      {post.coverImage && (
        <div className="relative hidden h-28 w-40 shrink-0 overflow-hidden rounded-lg bg-background-elevated sm:block">
          <Image
            src={post.coverImage}
            alt={`Cover for ${post.title}`}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
    </article>
  )
}
