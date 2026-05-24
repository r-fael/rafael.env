# CLAUDE.md — Project Rules & Conventions

> This file defines the coding standards, conventions, and architectural decisions
> for this portfolio project. Every contributor (human or AI) must follow these rules.

---

## 🏗️ Architecture

### Server vs Client Components
- **Default to Server Components.** Only add `'use client'` when the component needs:
  - React hooks (`useState`, `useEffect`, `useRef`, etc.)
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser-only APIs (`window`, `localStorage`, `IntersectionObserver`)
  - Third-party client libs (Framer Motion `motion` components)
- **Keep client boundaries small.** Don't mark an entire page as `'use client'`—extract the interactive part into a child component.

### File Organization
- `src/app/` — **Routing only.** `page.tsx`, `layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`. Keep these files thin (< 50 lines ideally).
- `src/components/ui/` — Generic, reusable primitives (Button, Card, Badge). **Zero business logic.**
- `src/components/layout/` — Structural components (Navbar, Footer, Container).
- `src/components/features/` — Domain-specific components (Hero, ProjectCard, BlogPostCard).
- `src/hooks/` — Custom React hooks. Always prefix with `use`.
- `src/lib/` — Utilities, data fetching, configuration.
- `src/types/` — Shared TypeScript interfaces and types.
- `content/` — Data and content files (projects data, MDX blog posts).

---

## 📝 Naming Conventions

| What | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProjectCard.tsx` |
| Hooks | camelCase, `use` prefix | `useMediaQuery.ts` |
| Utilities | camelCase | `utils.ts`, `formatDate` |
| Types/Interfaces | PascalCase | `Project`, `BlogPost` |
| CSS files | kebab-case or module | `globals.css` |
| Content files | kebab-case | `hello-world.mdx` |
| Constants | UPPER_SNAKE_CASE | `MAX_POSTS_PER_PAGE` |

---

## 🎨 Styling Rules (Tailwind CSS v4)

### Class Ordering
Follow this logical order for Tailwind classes:
1. **Layout** — `flex`, `grid`, `block`, `hidden`
2. **Position** — `relative`, `absolute`, `fixed`, `sticky`
3. **Sizing** — `w-*`, `h-*`, `min-*`, `max-*`
4. **Spacing** — `m-*`, `p-*`, `gap-*`
5. **Typography** — `text-*`, `font-*`, `leading-*`, `tracking-*`
6. **Visual** — `bg-*`, `border-*`, `rounded-*`, `shadow-*`, `opacity-*`
7. **Effects** — `transition-*`, `animate-*`, `hover:*`, `focus:*`

### Design Tokens
- Use CSS custom properties defined in `globals.css` via `@theme`.
- Never hardcode colors — always reference the theme system.

---

## 📦 Import Ordering

```typescript
// 1. React / Next.js
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

// 3. Internal: lib / hooks / types
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Project } from '@/types'

// 4. Internal: components
import { Button } from '@/components/ui/Button'
import { ProjectCard } from '@/components/features/ProjectCard'

// 5. Styles (if any CSS modules)
import styles from './Component.module.css'
```

---

## 🧩 Component Patterns

### Props Pattern
```typescript
// Always define props as an interface
interface ProjectCardProps {
  project: Project
  className?: string  // Always allow className override
}

// Export as named export (not default)
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (...)
}
```

### Why Named Exports?
- Prevents anonymous components in React DevTools
- Enables tree-shaking
- Makes imports explicit and refactor-safe

### Composition Over Configuration
- Prefer `children` prop for flexible content
- Use `className` prop + `cn()` utility for style overrides
- Keep components focused: one component = one responsibility

---

## 🌐 Data Layer

### Abstraction Rule
All data access goes through functions in `src/lib/` or `content/`.
Components never read files or call APIs directly.

```typescript
// ✅ Good — component calls abstracted function
const projects = await getProjects()

// ❌ Bad — component reads file system directly
const data = fs.readFileSync('content/projects.json')
```

This allows swapping the data source (local files → API → CMS) without touching components.

---

## ♿ Accessibility

- All images must have `alt` text
- Interactive elements must be keyboard-accessible
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- Respect `prefers-reduced-motion` via Framer Motion's `useReducedMotion`
- Color contrast must meet WCAG AA (4.5:1 for normal text)

---

## 🚀 Performance

- Use `next/image` for all images (automatic optimization)
- Use `next/font` for fonts (no layout shift)
- Lazy load below-the-fold content
- Keep client components small (they add to the JS bundle)
- Prefer CSS transitions over JS animations when possible
