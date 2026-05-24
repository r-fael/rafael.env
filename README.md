# Rafael Medeiros — Portfolio

A personal portfolio and blog built with the Next.js App Router, React Server Components, and a Prismic-backed content layer. The design is a dark, teal-accented theme driven entirely by CSS design tokens, with subtle motion powered by Framer Motion.

🔗 **Live:** [r-fael.dev](https://r-fael.dev)

---

## ✨ Features

- **Server-first rendering** — Server Components by default; client interactivity is kept to small islands (Navbar, animated sections).
- **Headless CMS** — Projects and blog posts are authored in [Prismic](https://prismic.io/) and modeled with [Slice Machine](https://www.slicemachine.dev/). All content access is abstracted behind `src/lib/`, so the data source can be swapped without touching components.
- **Blog with rich slices** — Posts render through a Prismic `SliceZone` with custom slices: `RichText`, `CodeBlock`, `ImageBlock`, and `Quote`.
- **Draft Mode / live preview** — `/api/preview` and `/api/exit-preview` wire Next.js Draft Mode to Prismic, so editors see unpublished content.
- **ISR** — Pages revalidate at most every 60s in the background (see `prismicio.ts`).
- **Design-token theming** — The full visual language lives as CSS custom properties in `globals.css`, exposed to Tailwind v4 via `@theme`.
- **Accessible & performant** — Semantic HTML, `next/image` optimization, `next/font` (zero layout shift), and reduced-motion support.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme` config) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| CMS | [Prismic](https://prismic.io/) + [Slice Machine](https://www.slicemachine.dev/) |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) *(in progress)* |
| Icons | [lucide-react](https://lucide.dev/) |
| Utilities | `clsx` + `tailwind-merge` (via the `cn()` helper) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (20+ recommended)
- npm
- A [Prismic](https://prismic.io/) repository (for live content)

### Install & run

```bash
npm install
npm run dev
```

The dev server binds to `0.0.0.0` (so it's reachable from other devices on your LAN) and runs at [http://localhost:3000](http://localhost:3000).

> If Prismic isn't configured yet, pages still render — the data layer fails gracefully and returns empty lists instead of crashing the build.

### Environment variables

Create a `.env.local` in the project root:

```bash
# Optional. Overrides the Prismic repository name.
# Falls back to "repositoryName" in slicemachine.config.json when unset.
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (`next dev -H 0.0.0.0`) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run slicemachine` | Launch the Slice Machine UI for editing content models & slices |

---

## 🗂️ Project Structure

```
src/
├── app/                    # Routing only (thin page/layout files)
│   ├── layout.tsx          # Root layout: metadata, fonts, Navbar/Footer
│   ├── page.tsx            # Home (Hero, Bio, SocialLinks)
│   ├── projects/           # Projects grid
│   ├── blog/               # Blog list + [slug] post pages (SliceZone)
│   ├── slice-simulator/    # Slice Machine preview route
│   └── api/                # Prismic preview / exit-preview routes
├── components/
│   ├── ui/                 # Generic primitives (Button, Card, Badge, Section)
│   ├── layout/             # Structural (Navbar, Footer, Container)
│   └── features/           # Domain components (Hero, ProjectCard, BlogPostList…)
├── slices/                 # Prismic slice components (RichText, CodeBlock, …)
├── lib/                    # Data layer & utilities (projects, blog, fonts, utils)
└── types/                  # Shared TypeScript interfaces

customtypes/                # Prismic custom type models (project, blog_post)
prismicio.ts                # Prismic client factory, routes, preview config
slicemachine.config.json    # Slice Machine configuration
```

---

## 🧭 Routes

| Path | Description |
|---|---|
| `/` | Home — hero, bio, social links |
| `/projects` | Project showcase grid |
| `/blog` | Blog post index |
| `/blog/[slug]` | Individual blog post (rendered from Prismic slices) |
| `/slice-simulator` | Slice Machine development simulator |
| `/api/preview` · `/api/exit-preview` | Prismic Draft Mode entry/exit |

---

## 📝 Content & CMS

Content is modeled in Prismic with two custom types:

- **`project`** — title, description, image, tags, live URL, GitHub URL
- **`blog_post`** — title, description, cover image, date, tags, and a slice-based body

To edit the models or build new slices locally, run `npm run slicemachine` and open the Slice Machine UI. Document-type-to-URL mapping lives in `prismicio.ts` so editor links resolve to the right pages.

---

## 🤝 Conventions

Coding standards, naming, import ordering, styling rules, and architectural decisions are documented in [`CLAUDE.md`](./CLAUDE.md). Highlights:

- Default to **Server Components**; keep `'use client'` boundaries small.
- **Named exports** for components; always accept a `className` prop and merge with `cn()`.
- Components never read data directly — all access goes through `src/lib/`.
- Reference design tokens instead of hardcoding colors.

---

## 📄 License

Private project. All rights reserved.
