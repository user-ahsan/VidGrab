/*
  VidGrab stats: static, no external fetches.

  These are the figures shown on the homepage (platforms, formats, downloads
  served, uptime). There is nothing to fetch from any outside service.
*/

const STATS = {
  downloads: 128400,
  platforms: 11,
  formats: 9,
  uptime: 99.9,
  live: false,
  perPlatform: [
    { slug: 'youtube', label: 'YouTube', downloads: 48200 },
    { slug: 'instagram', label: 'Instagram', downloads: 31200 },
    { slug: 'tiktok', label: 'TikTok', downloads: 24600 },
    { slug: 'facebook', label: 'Facebook', downloads: 12100 },
    { slug: 'twitter', label: 'X', downloads: 5200 },
    { slug: 'pinterest', label: 'Pinterest', downloads: 2000 },
    { slug: 'reddit', label: 'Reddit', downloads: 1700 },
    { slug: 'twitch', label: 'Twitch', downloads: 1400 },
    { slug: 'vimeo', label: 'Vimeo', downloads: 900 },
    { slug: 'snapchat', label: 'Snapchat', downloads: 700 },
    { slug: 'dailymotion', label: 'Dailymotion', downloads: 400 },
  ],
}

export async function getStats() {
  return STATS
}

export { STATS }
