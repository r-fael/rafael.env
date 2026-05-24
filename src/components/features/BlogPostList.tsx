'use client'

import { motion, type Variants } from 'framer-motion'

import type { BlogPost } from '@/types'
import { BlogPostCard } from '@/components/features/BlogPostCard'

/**
 * BlogPostList — animated stacked list of BlogPostCard items.
 *
 * WHY 'use client'?
 * Same reason as ProjectGrid: Framer Motion's staggered animation needs JS.
 * Data is passed from the server component (blog listing page).
 *
 * PATTERN: Staggered reveal (matches ProjectGrid)
 * Cards appear one after another with a slight delay between each.
 */

interface BlogPostListProps {
  posts: BlogPost[]
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
      role="list"
    >
      {posts.map((post) => (
        <motion.li key={post.slug} variants={itemVariants}>
          <BlogPostCard post={post} />
        </motion.li>
      ))}
    </motion.ul>
  )
}
