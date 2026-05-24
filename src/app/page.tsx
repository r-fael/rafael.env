import { setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/layout/Container'
import { Hero } from '@/components/features/Hero'
import { Bio } from '@/components/features/Bio'
import { SocialLinks } from '@/components/features/SocialLinks'
/**
 * Home Page — the landing page.
 *
 * `setRequestLocale` enables static rendering for this page.
 * The actual translations are consumed by the client components
 * (Hero, Bio, SocialLinks) via `useTranslations()`.
 */
export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <Container>
            <Hero />
            <Bio />
            <SocialLinks />
        </Container>
    )
}
