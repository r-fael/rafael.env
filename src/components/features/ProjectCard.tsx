import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Project } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/ui/BrandIcons'

/**
 * ProjectCard — displays a single project thumbnail, title, description, and tags.
 *
 * WHY SERVER COMPONENT?
 * No interactivity, no hooks. next/image handles optimisation on the server.
 * Hover effects are pure CSS (Tailwind) — zero JS needed.
 *
 * WHY next/image INSTEAD OF <img>?
 * - Automatic WebP/AVIF conversion
 * - Lazy loading by default
 * - Prevents layout shift (explicit width/height)
 * - Responsive srcset generated at build time
 */

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col rounded-xl border border-border bg-background-alt',
        'overflow-hidden',
        'transition-all duration-300',
        'hover:border-border-hover hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-elevated">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold text-foreground">{project.title}</h3>

        <p className="flex-1 text-sm leading-relaxed text-foreground-muted">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {/* Action links */}
        {(project.href || project.github) && (
          <div className="flex gap-3 pt-1">
            {project.href && (
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} (opens in new tab)`}
                className={cn(
                  'inline-flex items-center gap-1.5 text-xs text-accent',
                  'transition-colors hover:text-accent-hover'
                )}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Live demo
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                className={cn(
                  'inline-flex items-center gap-1.5 text-xs text-foreground-muted',
                  'transition-colors hover:text-foreground'
                )}
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                Source
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
