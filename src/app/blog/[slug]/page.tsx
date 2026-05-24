import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { createClient } from '../../../../prismicio'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { components } from '@/slices'
/**
 * Blog Post Page (Dynamic Route)
 *
 * WHY generateStaticParams?
 * Pre-renders every known blog post at build time (SSG).
 * New posts published after the build are handled by ISR —
 * the `revalidate: 60` on the Prismic client ensures they
 * appear within a minute without a full redeploy.
 *
 * WHY generateMetadata?
 * Each post gets a unique `<title>` and `<meta description>`,
 * critical for SEO. The data comes straight from Prismic.
 *
 * WHY SliceZone?
 * The post body is composed of slices (RichText, CodeBlock,
 * ImageBlock, Quote) that editors arrange freely. SliceZone
 * maps each slice to the corresponding React component.
 */
// ── Static params (SSG) ──────────────────────────────────────────
export async function generateStaticParams() {
    const client = createClient()
    try {
        const docs = await client.getAllByType('blog_post')
        return docs.map((doc) => ({ slug: doc.uid }))
    } catch {
        return []
    }
}
// ── Per-post SEO metadata ────────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return { title: 'Post Not Found' }
    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
        },
    }
}
// ── Page component ───────────────────────────────────────────────
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) notFound()
    return (
        <Container>
            <article className="flex flex-col gap-8 py-12">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-accent"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to blog
                </Link>
                {/* Post header */}
                <header className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                        {post.title}
                    </h1>
                    {/* Meta row: date + tags */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-subtle">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </div>
                        {post.tags.length > 0 && (
                            <>
                                <span aria-hidden="true" className="text-border">•</span>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag}>{tag}</Badge>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </header>
                {/* Divider */}
                <hr className="border-border" />
                {/* Post body — SliceZone renders the editor-composed content */}
                <div className="prose-custom">
                    <SliceZone slices={post.body} components={components} />
                </div>
                {/* Bottom nav */}
                <hr className="border-border" />
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-accent"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to all posts
                </Link>
            </article>
        </Container>
    )
}
