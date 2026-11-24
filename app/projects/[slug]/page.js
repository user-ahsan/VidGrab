import { notFound, redirect } from 'next/navigation'
import { PLATFORMS, getPlatform } from '../data'

/*
  Old portfolio case-study URLs (/projects/<slug>) no longer exist. Each
  platform slug redirects to its downloader page instead.
*/

export function generateStaticParams() {
  return PLATFORMS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const platform = getPlatform(slug)
  if (!platform) return {}
  return {
    title: `${platform.title} Downloader | VidGrab`,
    description: platform.desc,
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const platform = getPlatform(slug)
  if (!platform) notFound()

  redirect(platform.href)
}
