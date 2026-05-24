import { asImageSrc } from '@prismicio/client'

import { createClient } from '../../prismicio'
import type { Project } from '@/types'

import {
  linkUrl,
  type ProjectDocument,
} from './prismic-helpers'

/**
 * Projects data layer (Prismic-backed).
 *
 * Components never call Prismic directly — they go through these
 * functions. If the data source ever changes again (REST API, DB,
 * another CMS), only this file is rewritten.
 *
 * `lang` is optional and defaults to "any locale" so Phase 6 (i18n)
 * just passes the active locale into these calls. No callers change.
 */

function toProject(doc: ProjectDocument): Project {
  return {
    id: doc.uid ?? doc.id,
    slug: doc.uid ?? doc.id,
    title: doc.data.title ?? '',
    description: doc.data.description ?? '',
    image: asImageSrc(doc.data.image) ?? '',
    tags: (doc.data.tags ?? [])
      .map((t) => t.label ?? '')
      .filter((label): label is string => label.length > 0),
    href: linkUrl(doc.data.live_url),
    github: linkUrl(doc.data.github_url),
  }
}

export async function getProjects(lang: string = '*'): Promise<Project[]> {
  const client = createClient()
  try {
    const docs = await client.getAllByType<ProjectDocument>('project', {
      lang,
      orderings: [{ field: 'document.first_publication_date', direction: 'desc' }],
    })
    return docs.map(toProject)
  } catch (error) {
    // Graceful fallback: if the Prismic repo is unreachable (not yet
    // configured, network issue, or transient outage) the page renders
    // with an empty grid instead of crashing the build / route.
    // Logged at WARN level so the misconfiguration is visible.
    console.warn('[lib/projects] getProjects failed; returning empty array.', error)
    return []
  }
}

export async function getProjectBySlug(
  slug: string,
  lang: string = '*'
): Promise<Project | null> {
  const client = createClient()
  try {
    const doc = await client.getByUID<ProjectDocument>('project', slug, { lang })
    return toProject(doc)
  } catch {
    return null
  }
}
