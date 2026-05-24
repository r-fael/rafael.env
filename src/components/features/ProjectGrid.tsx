'use client'

import { motion, type Variants } from 'framer-motion'

import type { Project } from '@/types'
import { ProjectCard } from '@/components/features/ProjectCard'

/**
 * ProjectGrid — animated responsive grid of ProjectCard items.
 *
 * WHY 'use client'?
 * Framer Motion's staggered animation requires JS — we can't do orchestrated
 * child animations with pure CSS. The data is passed in from the server
 * component (projects page), so the data-fetching stays server-side.
 *
 * PATTERN: Staggered reveal
 * `staggerChildren` on the parent variant delays each child's animation start.
 * Result: cards appear one after another instead of all at once.
 * This guides the user's eye naturally through the grid.
 */

interface ProjectGridProps {
  projects: Project[]
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
    >
      {projects.map((project) => (
        <motion.li key={project.id} variants={itemVariants}>
          <ProjectCard project={project} className="h-full" />
        </motion.li>
      ))}
    </motion.ul>
  )
}
