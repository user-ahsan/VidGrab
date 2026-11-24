import { ARTICLES } from './blog/articles'

const BASE = 'https://vidgrab.vercel.app'

const DOWNLOADER_PAGES = [
  'youtube-downloader',
  'instagram-downloader',
  'tiktok-downloader',
  'facebook-downloader',
  'twitter-downloader',
  'pinterest-downloader',
  'reddit-downloader',
  'twitch-downloader',
  'vimeo-downloader',
  'snapchat-downloader',
  'dailymotion-downloader',
  'youtube-to-mp3',
  'instagram-reels-downloader',
  'tiktok-downloader-no-watermark',
]

export default function sitemap() {
  const now = new Date('2026-11-24')
  const staticPages = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...DOWNLOADER_PAGES.map((slug) => ({
      url: `${BASE}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })),
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...ARTICLES.map((a) => ({
      url: `${BASE}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/dmca`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
  return staticPages
}
