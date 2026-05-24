/**
 * Shared TypeScript types for the portfolio.
 *
 * WHY A CENTRALIZED TYPES FILE?
 * - Single source of truth for data shapes
 * - Components and data layers share the same contract
 * - When the backend API is added later, these types become the "interface"
 *   between frontend and backend
 */

export interface Project {
  /** Unique identifier (used as key and potentially in URLs) */
  id: string
  /** URL slug (Prismic UID). Optional for backward compatibility — equals `id` when sourced from Prismic. */
  slug?: string
  /** Display title */
  title: string
  /** Short description of the project */
  description: string
  /** Path to the project thumbnail image */
  image: string
  /** Technology tags (e.g., "React", "Node.js", "TypeScript") */
  tags: string[]
  /** External link to the live project (optional) */
  href?: string
  /** GitHub repository URL (optional) */
  github?: string
}

export interface BlogPost {
  /** URL-friendly identifier (derived from filename) */
  slug: string
  /** Post title from frontmatter */
  title: string
  /** Short description/excerpt */
  description: string
  /** Cover image URL (from Prismic imgix CDN) */
  coverImage?: string
  /** Publication date (ISO string) */
  date: string
  /** Content tags for categorization */
  tags: string[]
  /** The raw content (only loaded for individual post pages) */
  content?: string
}

/**
 * Social media link definition.
 * Used by the SocialLinks component.
 */
export interface SocialLink {
  /** Platform name (for accessibility labels) */
  platform: string
  /** Full URL to the profile */
  href: string
  /** Icon identifier (matches Lucide React icon names) */
  icon: string
}
