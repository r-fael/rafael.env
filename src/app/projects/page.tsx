import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getProjects } from '@/lib/projects'
import { Container } from '@/components/layout/Container'
import { ProjectGrid } from '@/components/features/ProjectGrid'
/**
 * Projects Page — now locale-aware.
 *
 * Passes the Prismic locale to `getProjects()` so it fetches
 * the correct language version of each project document.
 */
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Projects',
        description: 'Here you can see some of my projects. I hope you enjoy!',
    }
}
export default async function ProjectsPage() {
    const projects = await getProjects()
    return (
        <Container>
            <div className="flex flex-col gap-8 py-12">
                <header className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
                    <p className="text-foreground-muted">
                        Here you can see some of my projects. I hope you enjoy!
                    </p>
                </header>
                <ProjectGrid projects={projects} />
            </div>
        </Container>
    )
}