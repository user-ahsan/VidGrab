import { describe, it, expect } from 'vitest'
import { detectPlatform, formatOptions, allFormatOptions, formatBytes } from '../app/lib/detect.js'
import { PLATFORMS, getPlatform } from '../app/lib/platforms.js'

const EXAMPLES = {
  youtube: [
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    'https://youtu.be/aqz-KE-bpKQ',
    'https://www.youtube.com/shorts/aqz-KE-bpKQ',
    'https://m.youtube.com/watch?v=aqz-KE-bpKQ',
  ],
  instagram: [
    'https://www.instagram.com/reel/C0example/',
    'https://www.instagram.com/p/C0example/',
    'https://instagram.com/reel/C0example/',
  ],
  tiktok: [
    'https://www.tiktok.com/@example/video/7000000000000000000',
    'https://vm.tiktok.com/abcdef/',
  ],
  facebook: [
    'https://www.facebook.com/reel/123456789/',
    'https://www.facebook.com/watch?v=123456789',
    'https://fb.watch/abc123/',
  ],
  twitter: [
    'https://x.com/example/status/123456789',
    'https://twitter.com/example/status/123456789',
    'https://mobile.twitter.com/example/status/123456789',
  ],
  pinterest: [
    'https://www.pinterest.com/pin/123456789/',
    'https://pin.it/abc123',
  ],
  reddit: [
    'https://www.reddit.com/r/videos/comments/abc123/example/',
    'https://redd.it/abc123',
    'https://old.reddit.com/r/videos/comments/abc123/example/',
  ],
  twitch: [
    'https://www.twitch.tv/videos/123456789',
    'https://clips.twitch.tv/ExampleClip-abc123',
    'https://www.twitch.tv/example/clip/ExampleClip-abc123',
  ],
  vimeo: [
    'https://vimeo.com/123456789',
    'https://player.vimeo.com/video/123456789',
  ],
  snapchat: [
    'https://www.snapchat.com/spotlight/abc123',
  ],
  dailymotion: [
    'https://www.dailymotion.com/video/abc123',
    'https://dai.ly/abc123',
  ],
}

describe('detectPlatform', () => {
  it.each(Object.entries(EXAMPLES))('detects %s links', (slug, urls) => {
    for (const url of urls) {
      const result = detectPlatform(url)
      expect(result, url).not.toBeNull()
      expect(result.slug).toBe(slug)
      expect(result.platform).toBe(slug)
      expect(typeof result.label).toBe('string')
      expect(result.label.length).toBeGreaterThan(0)
    }
  })

  it('detects all 11 platforms', () => {
    expect(Object.keys(EXAMPLES)).toHaveLength(11)
  })

  it('returns null for invalid URLs', () => {
    expect(detectPlatform('')).toBeNull()
    expect(detectPlatform('not a url')).toBeNull()
    expect(detectPlatform('just some text')).toBeNull()
    expect(detectPlatform(null)).toBeNull()
    expect(detectPlatform(undefined)).toBeNull()
    expect(detectPlatform(123)).toBeNull()
  })

  it('returns null for non-http(s) URLs', () => {
    expect(detectPlatform('ftp://example.com/video.mp4')).toBeNull()
    expect(detectPlatform('javascript:alert(1)')).toBeNull()
  })

  it('returns null for unsupported hosts', () => {
    expect(detectPlatform('https://example.com/watch?v=123')).toBeNull()
    expect(detectPlatform('https://www.google.com/')).toBeNull()
    expect(detectPlatform('https://vimeo.org/123')).toBeNull()
    expect(detectPlatform('https://notyoutube.com/watch?v=123')).toBeNull()
  })

  it('is case-insensitive on the host and trims whitespace', () => {
    expect(detectPlatform('  https://WWW.YOUTUBE.COM/watch?v=aqz-KE-bpKQ  ')?.slug).toBe('youtube')
  })
})

describe('formatOptions', () => {
  it('returns MP4 360/720/1080/4K, WebM, MP3 128/192/320, M4A and thumbnail', () => {
    const options = formatOptions('youtube')
    const videoIds = options.video.map((o) => o.id)
    expect(videoIds).toEqual(['mp4-360', 'mp4-720', 'mp4-1080', 'mp4-2160', 'webm-720'])
    expect(options.audio.map((o) => o.id)).toEqual(['mp3-128', 'mp3-192', 'mp3-320', 'm4a-best'])
    expect(options.thumbnail.map((o) => o.id)).toEqual(['thumbnail'])
  })

  it('returns the same catalogue for every platform', () => {
    for (const platform of PLATFORMS) {
      const options = formatOptions(platform.slug)
      expect(options.video).toHaveLength(5)
      expect(options.audio).toHaveLength(4)
      expect(options.thumbnail).toHaveLength(1)
    }
  })

  it('allFormatOptions flattens the groups', () => {
    expect(allFormatOptions('tiktok')).toHaveLength(10)
  })
})

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(512)).toBe('512 B')
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatBytes(1048576)).toBe('1 MB')
    expect(formatBytes(2500000)).toBe('2.4 MB')
    expect(formatBytes(1073741824)).toBe('1 GB')
  })

  it('returns Unknown for missing or invalid input', () => {
    expect(formatBytes(null)).toBe('Unknown')
    expect(formatBytes(undefined)).toBe('Unknown')
    expect(formatBytes(NaN)).toBe('Unknown')
    expect(formatBytes(-5)).toBe('Unknown')
    expect(formatBytes('1024')).toBe('Unknown')
  })
})

describe('PLATFORMS catalogue', () => {
  it('has exactly 11 platforms', () => {
    expect(PLATFORMS).toHaveLength(11)
  })

  it('every platform has slug, name, label, domains, supports, formats, exampleUrl, seoTitle, seoDescription and 4 FAQs', () => {
    for (const platform of PLATFORMS) {
      expect(platform.slug, platform.slug).toBeTruthy()
      expect(platform.name).toBeTruthy()
      expect(platform.label).toBeTruthy()
      expect(platform.domains.length).toBeGreaterThan(0)
      expect(platform.supports.length).toBeGreaterThan(0)
      expect(platform.formats.length).toBeGreaterThan(0)
      expect(platform.exampleUrl).toMatch(/^https:\/\//)
      expect(platform.seoTitle).toBeTruthy()
      expect(platform.seoDescription).toBeTruthy()
      expect(platform.faq).toHaveLength(4)
      for (const item of platform.faq) {
        expect(item.q).toBeTruthy()
        expect(item.a).toBeTruthy()
      }
    }
  })

  it('every example URL is detected as its own platform', () => {
    for (const platform of PLATFORMS) {
      // Placeholder example IDs are not real posts, but the URL shape must
      // still detect as the right platform.
      const detected = detectPlatform(platform.exampleUrl)
      expect(detected, platform.slug).not.toBeNull()
      expect(detected.slug).toBe(platform.slug)
    }
  })

  it('getPlatform finds a platform by slug', () => {
    expect(getPlatform('youtube')?.label).toBe('YouTube')
    expect(getPlatform('nope')).toBeNull()
  })
})
