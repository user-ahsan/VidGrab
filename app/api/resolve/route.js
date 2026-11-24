import { NextResponse } from 'next/server'
import { detectPlatform } from '../../lib/detect.js'
import { dumpSingleJson, buildFormats } from '../../lib/ytdlp.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function errorResponse(code, status, message) {
  return NextResponse.json({ error: code, message }, { status })
}

function formatDuration(seconds) {
  if (!seconds || typeof seconds !== 'number' || !Number.isFinite(seconds)) return null
  const s = Math.floor(seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m)
  const ss = String(sec).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return errorResponse('invalid_request', 400, 'Request body must be JSON with a "url" field.')
  }

  const rawUrl = typeof body?.url === 'string' ? body.url.trim() : ''
  if (!rawUrl) {
    return errorResponse('invalid_url', 400, 'Paste a video link first.')
  }

  let parsed
  try {
    parsed = new URL(rawUrl)
  } catch {
    return errorResponse('invalid_url', 400, 'That does not look like a valid link. Paste a full URL starting with http:// or https://.')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return errorResponse('invalid_url', 400, 'Only http:// and https:// links are supported.')
  }

  const detected = detectPlatform(rawUrl)
  if (!detected) {
    // Log only the host, never the full URL.
    console.warn('[resolve] unsupported host:', parsed.hostname)
    return errorResponse(
      'unsupported_platform',
      400,
      'This platform is not supported yet. VidGrab supports YouTube, Instagram, TikTok, Facebook, X (Twitter), Pinterest, Reddit, Twitch, Vimeo, Snapchat and Dailymotion.',
    )
  }

  let data
  try {
    data = await dumpSingleJson(rawUrl)
  } catch (err) {
    console.warn('[resolve] yt-dlp failed for host:', parsed.hostname, '| code:', err?.code)
    return errorResponse(err?.code || 'fetch_failed', err?.status || 502, err?.message || 'Could not fetch this video.')
  }

  const formats = buildFormats(data, detected.slug)

  return NextResponse.json({
    platform: detected.platform,
    slug: detected.slug,
    label: detected.label,
    title: data.title || 'Untitled video',
    uploader: data.uploader || data.channel || null,
    thumbnail: data.thumbnail || null,
    duration: data.duration ?? null,
    durationLabel: formatDuration(data.duration),
    webpageUrl: data.webpage_url || rawUrl,
    formats,
  })
}
