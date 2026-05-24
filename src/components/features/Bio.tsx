'use client'

/**
 * Bio — Work and interests sections.
 *
 * WHY 'use client'?
 * - Uses Framer Motion for scroll-triggered reveal animations
 *
 * CONTENT STRATEGY:
 * - Work section: professional description (what you do, your passion)
 * - Interests section: personal touch (hobbies, what makes you human)
 * - Both use the Section UI primitive for consistent headings
 *
 * NOTE: Text content is mocked for now. When i18n is added (Phase 6),
 * these strings will move to translation files.
 */

import { motion, Variants } from 'framer-motion'

import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function Bio() {
  return (
    <div className="space-y-0">
      {/* ── Work ── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Section title="Work">
          <div className="text-sm leading-relaxed text-foreground-muted indent-4 sm:text-base text-justify">
            <p>
              Rafael is a fullstack developer based in Brazil with a passion for
              building digital products and solving real-world problems with code. He
              has experience across the entire stack — from crafting polished user
              interfaces with React and Next.js to designing robust APIs with Node.js
              and NestJS.
            </p>
            <p>

              When not coding, he loves exploring new technologies,
              contributing to open source, and sharing knowledge with the community.
              Currently focused on building scalable web applications and always
              looking for the next challenge.
            </p>
          </div>
        </Section>
      </motion.div>

      {/* ── I ♥ ── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Section title="I ♥">
          <p className="text-sm leading-relaxed text-foreground-muted sm:text-base">
            Music, Gaming, Open Source,{' '}
            <span className="text-accent">Problem Solving</span>,{' '}
            Coffee, Clean Architecture, Learning New Things
          </p>

          <div className="mt-6 text-center">
            <Button href="/projects" variant="primary">
              My portfolio →
            </Button>
          </div>
        </Section>
      </motion.div>
    </div>
  )
}
