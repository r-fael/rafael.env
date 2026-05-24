'use client'

/**
 * SocialLinks — "On the Web" section with social media links.
 *
 * WHY 'use client'?
 * - Uses Framer Motion for scroll-triggered animation
 *
 * PATTERN: Data-driven rendering
 * Instead of hardcoding each link as JSX, we define an array of objects
 * and map over them. This makes it trivial to add/remove platforms.
 *
 * ACCESSIBILITY:
 * - Each link has an aria-label describing the destination
 * - External links open in new tab with noopener noreferrer
 * - Icons are decorative (aria-hidden), the text label is the accessible name
 */

import { motion, type Variants } from 'framer-motion'

import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { GitHubIcon, InstagramIcon, XIcon } from '@/components/ui/BrandIcons'

interface SocialItem {
  platform: string
  handle: string
  href: string
  icon: React.ReactNode
}

const socialLinks: SocialItem[] = [
  {
    platform: 'GitHub',
    handle: '@r-fael',
    href: 'https://github.com/r-fael',
    icon: <GitHubIcon />,
  },
  {
    platform: 'X (Twitter)',
    handle: '@rafaeldotenv',
    href: 'https://x.com/rafaeldotenv',
    icon: <XIcon />,
  },
  {
    platform: 'Instagram',
    handle: '@rafael.env',
    href: 'https://instagram.com/rafael.env',
    icon: <InstagramIcon />,
  },
]

// 'easeOut' must be typed as const so Framer Motion's Easing union accepts it.
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function SocialLinks() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Section title="On the Web">
        <ul className="flex flex-col gap-2">
          {socialLinks.map((link) => (
            <li key={link.platform}>
              <Button
                href={link.href}
                variant="ghost"
                icon={link.icon}
                external
                className="w-full justify-start"
              >
                {link.handle}
              </Button>
            </li>
          ))}
        </ul>
      </Section>
    </motion.div>
  )
}
