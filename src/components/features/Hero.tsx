'use client'

/**
 * Hero — the first thing visitors see.
 *
 * WHY 'use client'?
 * - Uses Framer Motion for the entrance animation
 * - The greeting text has a wave animation that needs JS
 *
 * DESIGN DECISIONS:
 * - Name + role are the most prominent (clear hierarchy)
 * - Inline badge for "Fullstack Developer" mirrors craftz.dog's subtitle
 * - Greeting uses a warm tone to feel approachable
 * - Avatar is circular (universal pattern for personal sites)
 *
 * ANIMATION PATTERN: Staggered reveal
 * Parent has `staggerChildren` → each child animates in sequence.
 * This creates a natural "loading in" effect without feeling slow.
 */

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function Hero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="pb-8 pt-8"
    >
      {/* ── Name + Avatar row ── */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <motion.div variants={item} className="text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Rafael Medeiros
          </h1>
          <p className="mt-2 text-foreground-muted">
            Fullstack Developer
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="group relative h-28 w-28 shrink-0 [perspective:1000px]"
        >
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Front — avatar.jpg */}
            <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-border ring-4 ring-accent-subtle [backface-visibility:hidden]">
              <Image
                width={112}
                height={112}
                src="/images/person_profile.png"
                alt="Rafael Medeiros"
                className="object-cover"
                priority
              />
            </div>

            {/* Back — avatar.png */}
            <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-border ring-4 ring-accent-subtle [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                width={112}
                height={112}
                src="/images/clay_profile.png"
                alt="Rafael Medeiros"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
