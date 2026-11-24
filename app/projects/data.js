/*
  VidGrab platform directory.

  PLATFORMS is the single source of truth for the eleven supported
  downloaders: each entry links to its own downloader page. SHOWCASE is the
  six featured download cards on the homepage, reusing the existing
  /showcase/*.webp screenshots.
*/

export const PLATFORMS = [
  {
    slug: 'youtube',
    num: '01',
    title: 'YouTube',
    desc: 'Download YouTube videos, Shorts, and live replays up to 4K, or pull the audio out as MP3.',
    tags: ['4K', 'MP3', 'Shorts'],
    href: '/youtube-downloader',
    formats: ['MP4 2160p', 'MP4 1080p', 'MP4 720p', 'MP3 320kbps'],
  },
  {
    slug: 'instagram',
    num: '02',
    title: 'Instagram',
    desc: 'Save Instagram Reels, stories, posts, carousels, and highlights in original quality.',
    tags: ['Reels', 'Stories', 'HD'],
    href: '/instagram-downloader',
    formats: ['MP4 1080p', 'MP4 720p', 'JPG'],
  },
  {
    slug: 'tiktok',
    num: '03',
    title: 'TikTok',
    desc: 'Download TikTok videos with no watermark, plus the original audio as MP3.',
    tags: ['No watermark', 'MP3', 'HD'],
    href: '/tiktok-downloader',
    formats: ['MP4 1080p', 'MP4 720p', 'MP3 320kbps'],
  },
  {
    slug: 'facebook',
    num: '04',
    title: 'Facebook',
    desc: 'Save Facebook videos and Reels, public or from a group you can already see.',
    tags: ['Reels', 'HD', 'MP4'],
    href: '/facebook-downloader',
    formats: ['MP4 1080p', 'MP4 720p'],
  },
  {
    slug: 'twitter',
    num: '05',
    title: 'X',
    desc: 'Download videos and GIFs from X posts, including quote posts and threads.',
    tags: ['Video', 'GIF', 'HD'],
    href: '/twitter-downloader',
    formats: ['MP4 1080p', 'MP4 720p', 'GIF'],
  },
  {
    slug: 'pinterest',
    num: '06',
    title: 'Pinterest',
    desc: 'Save Pinterest video pins and idea pins in the quality they were uploaded.',
    tags: ['Video pins', 'HD'],
    href: '/pinterest-downloader',
    formats: ['MP4 1080p', 'MP4 720p'],
  },
  {
    slug: 'reddit',
    num: '07',
    title: 'Reddit',
    desc: 'Download Reddit videos with audio, from any public subreddit.',
    tags: ['With audio', 'HD'],
    href: '/reddit-downloader',
    formats: ['MP4 1080p', 'MP4 720p', 'MP3 320kbps'],
  },
  {
    slug: 'twitch',
    num: '08',
    title: 'Twitch',
    desc: 'Save Twitch clips and VODs so a stream you missed is still watchable offline.',
    tags: ['Clips', 'VODs', 'HD'],
    href: '/twitch-downloader',
    formats: ['MP4 1080p', 'MP4 720p', 'MP3 320kbps'],
  },
  {
    slug: 'vimeo',
    num: '09',
    title: 'Vimeo',
    desc: 'Download public Vimeo videos in up to 4K, straight from the link.',
    tags: ['4K', 'HD', 'MP4'],
    href: '/vimeo-downloader',
    formats: ['MP4 2160p', 'MP4 1080p', 'MP4 720p'],
  },
  {
    slug: 'snapchat',
    num: '10',
    title: 'Snapchat',
    desc: 'Save public Snapchat Spotlight videos and stories you can already view.',
    tags: ['Spotlight', 'Stories'],
    href: '/snapchat-downloader',
    formats: ['MP4 1080p', 'MP4 720p'],
  },
  {
    slug: 'dailymotion',
    num: '11',
    title: 'Dailymotion',
    desc: 'Download Dailymotion videos in HD, no account needed.',
    tags: ['HD', 'MP4'],
    href: '/dailymotion-downloader',
    formats: ['MP4 1080p', 'MP4 720p'],
  },
]

/* Featured downloads on the homepage. Each card links to a downloader page. */
export const SHOWCASE = [
  {
    name: 'YouTube to MP3',
    kind: 'Audio extraction',
    url: '/youtube-to-mp3',
    domain: '/youtube-to-mp3',
    image: '/showcase/youtube-mp3.webp',
    blurb:
      'Paste a YouTube link and take just the audio. MP3 up to 320kbps, picked before the download starts so you know the size first.',
    tags: ['MP3', '320kbps', 'No sign-up'],
  },
  {
    name: 'TikTok, no watermark',
    kind: 'Clean downloads',
    url: '/tiktok-downloader',
    domain: '/tiktok-downloader',
    image: '/showcase/tiktok-no-watermark.webp',
    blurb:
      'TikTok videos without the bouncing logo in the corner. The file you get is the video as it was uploaded, nothing stamped on it.',
    tags: ['No watermark', 'HD', 'MP3'],
  },
  {
    name: 'Instagram Reels',
    kind: 'Reels and stories',
    url: '/instagram-downloader',
    domain: '/instagram-downloader',
    image: '/showcase/instagram-reels.webp',
    blurb:
      'Reels, stories, and posts saved in original quality. One link in, one file out, no account and no app to install.',
    tags: ['Reels', 'Stories', 'HD'],
  },
  {
    name: 'Facebook Reels',
    kind: 'Reels and videos',
    url: '/facebook-downloader',
    domain: '/facebook-downloader',
    image: '/showcase/facebook-reels.webp',
    blurb:
      'Facebook Reels and videos you can already watch, saved for offline viewing. Public posts and groups, in HD where available.',
    tags: ['Reels', 'HD', 'MP4'],
  },
  {
    name: 'YouTube Shorts',
    kind: 'Short-form video',
    url: '/youtube-downloader',
    domain: '/youtube-downloader',
    image: '/showcase/youtube-shorts.webp',
    blurb:
      'Shorts download the same way as full videos. Paste the link, pick a quality up to 4K, and the file is yours.',
    tags: ['Shorts', '4K', 'MP4'],
  },
  {
    name: '4K downloads',
    kind: 'Maximum quality',
    url: '/youtube-downloader',
    domain: '/youtube-downloader',
    image: '/showcase/downloads-4k.webp',
    blurb:
      'Where the source allows it, VidGrab hands you the highest quality available: 4K video and 320kbps audio, with the size shown up front.',
    tags: ['4K', '320kbps', 'MP4'],
  },
]

export function getPlatform(slug) {
  return PLATFORMS.find((p) => p.slug === slug)
}

/* Backwards-compatible aliases; the old project/case-study shape is gone. */
export function getProject(slug) {
  return getPlatform(slug)
}

export function getCaseStudyProjects() {
  return PLATFORMS
}
