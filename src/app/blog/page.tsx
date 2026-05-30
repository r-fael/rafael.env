import type { Metadata } from 'next'
import { PenLine } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { Container } from '@/components/layout/Container'
import { BlogPostList } from '@/components/features/BlogPostList'
export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on web development, design, and the tools I use — written by Rafael Medeiros.',
}
/**
 * Blog Listing Page
 *
 * Server Component — fetches all blog posts from Prismic via the data
 * layer in `src/lib/blog.ts`, then passes them to the animated
 * `BlogPostList` client component.
 *
 * WHY ASYNC SERVER COMPONENT?
 * Same pattern as the Projects page: keep data-fetching on the server,
 * ship only the interactive list code to the browser.
 */
export default async function BlogPage() {
    const posts = await getAllPosts()
    return (
        <Container>
            <div className="flex flex-col gap-8 py-12">
                <header className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog</h1>
                    <p className="text-foreground-muted">
                        Thoughts on web development, design, and the tools I use.
                    </p>
                </header>
                {posts.length > 0 ? (
                    <BlogPostList posts={posts} />
                ) : (
                    <div className="flex flex-col items-center gap-4 py-16 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-subtle">
                            <PenLine className="h-8 w-8 text-accent" aria-hidden="true" />
                        </div>
                        <p className="text-lg font-medium text-foreground">No posts yet</p>
                        <p className="max-w-sm text-sm text-foreground-muted">
                            Blog posts will appear here once I publish them.
                            Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </Container>
    )
}