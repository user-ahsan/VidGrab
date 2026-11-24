// VidGrab — platform detection + format catalogue.
// Pure functions only: no network, no yt-dlp, safe to import anywhere
// (client components, API routes, tests).

export const PLATFORM_META = {
  youtube: {
    slug: 'youtube',
    label: 'YouTube',
    domains: ['youtube.com', 'youtu.be', 'youtube-nocookie.com', 'music.youtube.com'],
  },
  instagram: {
    slug: 'instagram',
    label: 'Instagram',
    domains: ['instagram.com'],
  },
  tiktok: {
    slug: 'tiktok',
    label: 'TikTok',
    domains: ['tiktok.com', 'vm.tiktok.com'],
  },
  facebook: {
    slug: 'facebook',
    label: 'Facebook',
    domains: ['facebook.com', 'fb.com', 'fb.watch'],
  },
  twitter: {
    slug: 'twitter',
    label: 'X (Twitter)',
    domains: ['twitter.com', 'x.com'],
  },
  pinterest: {
    slug: 'pinterest',
    label: 'Pinterest',
    domains: ['pinterest.com', 'pin.it'],
  },
  reddit: {
    slug: 'reddit',
    label: 'Reddit',
    domains: ['reddit.com', 'redd.it'],
  },
  twitch: {
    slug: 'twitch',
    label: 'Twitch',
    domains: ['twitch.tv', 'clips.twitch.tv'],
  },
  vimeo: {
    slug: 'vimeo',
    label: 'Vimeo',
    domains: ['vimeo.com', 'player.vimeo.com'],
  },
  snapchat: {
    slug: 'snapchat',
    label: 'Snapchat',
    domains: ['snapchat.com'],
  },
  dailymotion: {
    slug: 'dailymotion',
    label: 'Dailymotion',
    domains: ['dailymotion.com', 'dai.ly'],
  },
}

function hostMatches(host, domain) {
  return host === domain || host.endsWith(`.${domain}`)
}

/**
 * Detect the platform for a pasted URL.
 * @param {string} input
 * @returns {{ platform: string, slug: string, label: string } | null}
 * Returns null for invalid URLs, non-http(s) URLs, and unsupported hosts.
 */
export function detectPlatform(input) {
  if (!input || typeof input !== 'string') return null
  const trimmed = input.trim()
  if (!trimmed) return null

  let parsed
  try {
    parsed = new URL(trimmed)
  } catch {
    return null
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null

  const host = parsed.hostname.toLowerCase()
  for (const meta of Object.values(PLATFORM_META)) {
    if (meta.domains.some((d) => hostMatches(host, d))) {
      return { platform: meta.slug, slug: meta.slug, label: meta.label }
    }
  }
  return null
}

/**
 * Download format options for a platform. Same catalogue for every
 * platform: yt-dlp resolves each option to the best real match, and the
 * API only returns options that actually resolve — nothing is faked.
 * @param {string} [platform] - slug, currently unused; kept for per-platform tweaks.
 * @returns {{ video: Array, audio: Array, thumbnail: Array }}
 */
export function formatOptions(platform) {
  void platform
  return {
    video: [
      { id: 'mp4-360', label: 'MP4 · 360p', ext: 'mp4', quality: 360, kind: 'video' },
      { id: 'mp4-720', label: 'MP4 · 720p', ext: 'mp4', quality: 720, kind: 'video' },
      { id: 'mp4-1080', label: 'MP4 · 1080p', ext: 'mp4', quality: 1080, kind: 'video' },
      { id: 'mp4-2160', label: 'MP4 · 4K', ext: 'mp4', quality: 2160, kind: 'video' },
      { id: 'webm-720', label: 'WebM · 720p', ext: 'webm', quality: 720, kind: 'video' },
    ],
    audio: [
      { id: 'mp3-128', label: 'MP3 · 128 kbps', ext: 'mp3', quality: 128, kind: 'audio' },
      { id: 'mp3-192', label: 'MP3 · 192 kbps', ext: 'mp3', quality: 192, kind: 'audio' },
      { id: 'mp3-320', label: 'MP3 · 320 kbps', ext: 'mp3', quality: 320, kind: 'audio' },
      { id: 'm4a-best', label: 'M4A · Best quality', ext: 'm4a', quality: null, kind: 'audio' },
    ],
    thumbnail: [
      { id: 'thumbnail', label: 'Thumbnail · JPG', ext: 'jpg', quality: null, kind: 'thumbnail' },
    ],
  }
}

/** Flat list of every format option (video + audio + thumbnail). */
export function allFormatOptions(platform) {
  const groups = formatOptions(platform)
  return [...groups.video, ...groups.audio, ...groups.thumbnail]
}

/**
 * Human-readable byte size.
 * @param {number|null|undefined} n
 * @returns {string} e.g. "1.5 MB", "512 B", or "Unknown" when not a finite number.
 */
export function formatBytes(n) {
  if (n === null || n === undefined || typeof n !== 'number' || !Number.isFinite(n) || n < 0) {
    return 'Unknown'
  }
  if (n === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = n
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  const rounded = unit === 0 ? String(Math.round(value)) : value.toFixed(1).replace(/\.0$/, '')
  return `${rounded} ${units[unit]}`
}
