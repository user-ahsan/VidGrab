// VidGrab — server-only yt-dlp helper shared by /api/resolve and /api/download.
// Never import this file from a client component.

import { execFile, spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { formatOptions } from './detect.js'

export const YTDLP_TIMEOUT_MS = 25000
export const DOWNLOAD_TIMEOUT_MS = 180000

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// Candidate yt-dlp locations, best first. The standalone binary in
// /usr/local/bin is preferred; the pip script in ~/.local/bin only works
// when the user site-packages path is enabled (PYTHONNOUSERSITE=0).
const CANDIDATES = [
  '/usr/local/bin/yt-dlp',
  'yt-dlp', // resolved via PATH
  join(homedir(), '.local', 'bin', 'yt-dlp'),
]

async function isExecutable(path) {
  if (path === 'yt-dlp') return true // PATH lookup is attempted by execFile
  try {
    await access(path, fsConstants.X_OK)
    return true
  } catch {
    return false
  }
}

let cachedBinary = null
let cachedChecked = false

/** Resolve the yt-dlp binary to use, or null when it is not installed. */
export async function findYtDlp() {
  if (cachedChecked) return cachedBinary
  cachedChecked = true
  for (const candidate of CANDIDATES) {
    if (await isExecutable(candidate)) {
      cachedBinary = candidate
      return candidate
    }
  }
  return null
}

// --- ffmpeg / ffprobe -------------------------------------------------
// Conversion must never be done by streaming yt-dlp to stdout: yt-dlp
// post-processors (--remux-video, --recode-video, -x --audio-format) do
// NOT run when the output is `-o -`, so the raw source stream (usually
// WebM/Opus) was streamed straight to the client labelled as MP4/MP3.
// Downloads therefore go to a temp file first, are converted explicitly
// with ffmpeg, and are ffprobe-verified before anything is served.

const FFMPEG_CANDIDATES = ['/usr/bin/ffmpeg', '/usr/local/bin/ffmpeg', 'ffmpeg']
const FFPROBE_CANDIDATES = ['/usr/bin/ffprobe', '/usr/local/bin/ffprobe', 'ffprobe']

let cachedFfmpeg = null
let cachedFfmpegChecked = false
let cachedFfprobe = null
let cachedFfprobeChecked = false

/** Resolve the ffmpeg binary, or null when it is not installed. */
export async function findFfmpeg() {
  if (cachedFfmpegChecked) return cachedFfmpeg
  cachedFfmpegChecked = true
  for (const candidate of FFMPEG_CANDIDATES) {
    if (candidate === 'ffmpeg' || (await isExecutable(candidate))) {
      cachedFfmpeg = candidate
      return candidate
    }
  }
  return null
}

/** Resolve the ffprobe binary, or null when it is not installed. */
export async function findFfprobe() {
  if (cachedFfprobeChecked) return cachedFfprobe
  cachedFfprobeChecked = true
  for (const candidate of FFPROBE_CANDIDATES) {
    if (candidate === 'ffprobe' || (await isExecutable(candidate))) {
      cachedFfprobe = candidate
      return candidate
    }
  }
  return null
}

/**
 * Probe a file with ffprobe. Returns { formatName, streams } or null when
 * ffprobe is missing / the file cannot be probed.
 */
export async function probeFormat(file) {
  const ffprobe = await findFfprobe()
  if (!ffprobe) return null
  try {
    const { stdout } = await runExecFile(
      ffprobe,
      ['-v', 'error', '-show_entries', 'format=format_name', '-show_entries', 'stream=codec_name,codec_type,width,height', '-of', 'json', file],
      30000,
    )
    const parsed = JSON.parse(stdout)
    return {
      formatName: String(parsed?.format?.format_name || ''),
      streams: Array.isArray(parsed?.streams) ? parsed.streams : [],
    }
  } catch {
    return null
  }
}

/** True when an ffprobe format_name actually matches the advertised ext. */
export function formatMatchesExt(ext, formatName) {
  const name = String(formatName || '').toLowerCase()
  if (ext === 'mp4') return name.includes('mp4') || name.includes('mov')
  if (ext === 'webm') return name.includes('webm') || name.includes('matroska')
  if (ext === 'mp3') return name === 'mp3' || name.includes('mp3')
  if (ext === 'm4a') return name.includes('mp4') || name.includes('m4a') || name.includes('mov')
  return false
}

export function ytdlpEnv() {
  return {
    ...process.env,
    // The pip-installed yt-dlp script needs the user site-packages path.
    PYTHONNOUSERSITE: '0',
    PATH: `/usr/local/bin:${join(homedir(), '.local', 'bin')}:${process.env.PATH || ''}`,
  }
}

/** Classify yt-dlp stderr/exit into an honest, user-facing error. */
export function classifyYtDlpError(stderr, { timedOut = false } = {}) {
  const text = `${stderr || ''}`.toLowerCase()
  if (timedOut || text.includes('timed out') || text.includes('timeout')) {
    return { code: 'timeout', status: 504, message: 'The platform took too long to respond. Please try again.' }
  }
  if (text.includes('unsupported url')) {
    return { code: 'unsupported', status: 400, message: 'This link is not supported. Check the URL and try a link from one of the 11 supported platforms.' }
  }
  if (
    text.includes('private') ||
    text.includes('login required') ||
    text.includes('sign in') ||
    text.includes('log in') ||
    text.includes('cookies') ||
    text.includes('age') ||
    text.includes('only available to') ||
    text.includes('requires authentication')
  ) {
    return { code: 'login_required', status: 403, message: 'This video is private, age-restricted or needs a login, so it cannot be downloaded.' }
  }
  if (
    text.includes('video unavailable') ||
    text.includes('not found') ||
    text.includes('404') ||
    text.includes('removed') ||
    text.includes('deleted') ||
    text.includes('no longer available')
  ) {
    return { code: 'not_found', status: 404, message: 'This video was not found — it may have been deleted, removed or made private.' }
  }
  if (text.includes('429') || text.includes('too many requests') || text.includes('rate limit')) {
    return { code: 'rate_limited', status: 429, message: 'The platform is rate-limiting requests right now. Please wait a few minutes and try again.' }
  }
  if (text.includes('unable to download') || text.includes('network') || text.includes('connection')) {
    return { code: 'network', status: 502, message: 'Could not reach the platform to fetch this video. Please check the link and try again.' }
  }
  return { code: 'fetch_failed', status: 502, message: 'Could not fetch this video. The platform may be blocking automated requests.' }
}

function runExecFile(binary, args, timeoutMs) {
  return new Promise((resolvePromise, rejectPromise) => {
    execFile(
      binary,
      args,
      { timeout: timeoutMs, maxBuffer: 20 * 1024 * 1024, env: ytdlpEnv() },
      (error, stdout, stderr) => {
        if (error) {
          const timedOut = error.killed || error.signal === 'SIGTERM' || /timed out/i.test(String(error.message))
          rejectPromise({ error, stdout: String(stdout || ''), stderr: String(stderr || ''), timedOut })
        } else {
          resolvePromise({ stdout: String(stdout || ''), stderr: String(stderr || '') })
        }
      },
    )
  })
}

/**
 * Run `yt-dlp --dump-single-json` and parse the metadata.
 * @returns {Promise<object>} parsed yt-dlp JSON
 * @throws {{ code: string, status: number, message: string }}
 */
export async function dumpSingleJson(url) {
  const binary = await findYtDlp()
  if (!binary) {
    throw {
      code: 'yt_dlp_missing',
      status: 500,
      message: 'The downloader engine (yt-dlp) is not installed on this server yet. See the README for setup.',
    }
  }
  let result
  try {
    result = await runExecFile(
      binary,
      ['--dump-single-json', '--no-playlist', '--no-warnings', '--user-agent', USER_AGENT, url],
      YTDLP_TIMEOUT_MS,
    )
  } catch (failure) {
    throw classifyYtDlpError(failure.stderr, { timedOut: failure.timedOut })
  }
  try {
    return JSON.parse(result.stdout)
  } catch {
    throw { code: 'fetch_failed', status: 502, message: 'The platform returned data that could not be understood. Please try again.' }
  }
}

function pickVideoFormat(formats, ext, maxHeight) {
  const candidates = (formats || []).filter(
    (f) => f && f.vcodec && f.vcodec !== 'none' && f.height && f.height <= maxHeight,
  )
  if (!candidates.length) return null
  // Prefer the requested container, then the tallest, then the largest file.
  const byExt = candidates.filter((f) => f.ext === ext)
  const pool = byExt.length ? byExt : candidates
  return pool.sort(
    (a, b) => b.height - a.height || (b.filesize || b.filesize_approx || 0) - (a.filesize || a.filesize_approx || 0),
  )[0]
}

function pickAudioFormat(formats) {
  const candidates = (formats || []).filter(
    (f) => f && f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'),
  )
  if (!candidates.length) return null
  return candidates.sort(
    (a, b) => (b.abr || 0) - (a.abr || 0) || (b.filesize || b.filesize_approx || 0) - (a.filesize || a.filesize_approx || 0),
  )[0]
}

function videoSelector(ext, maxHeight) {
  return (
    `bestvideo[height<=${maxHeight}][ext=${ext}]+bestaudio/` +
    `best[height<=${maxHeight}][ext=${ext}]/best[height<=${maxHeight}]`
  )
}

/**
 * Build the honest format list for a resolved video: an option is only
 * listed when the source actually has a matching stream. MP3 options are
 * conversions of the best audio stream (done with ffmpeg at download time),
 * so they carry no file size until the file is made.
 */
export function buildFormats(data, platform) {
  const groups = formatOptions(platform)
  const formats = data.formats || []
  const out = []

  for (const option of groups.video) {
    const match = pickVideoFormat(formats, option.ext, option.quality)
    if (!match) continue
    out.push({
      id: option.id,
      label: option.label,
      ext: option.ext,
      quality: option.quality,
      filesize: match.filesize ?? null,
      filesizeApprox: match.filesize_approx ?? match.filesize ?? null,
      hasAudio: Boolean(match.acodec && match.acodec !== 'none'),
      hasVideo: true,
      selector: videoSelector(option.ext, option.quality),
    })
  }

  const audio = pickAudioFormat(formats)
  if (audio) {
    for (const option of groups.audio) {
      const isM4a = option.id === 'm4a-best'
      out.push({
        id: option.id,
        label: option.label,
        ext: option.ext,
        quality: option.quality,
        // MP3 is re-encoded at download time, so its size is unknown upfront.
        filesize: isM4a ? (audio.filesize ?? null) : null,
        filesizeApprox: isM4a ? (audio.filesize_approx ?? audio.filesize ?? null) : null,
        hasAudio: true,
        hasVideo: false,
        selector: 'bestaudio[ext=m4a]/bestaudio',
        audioFormat: option.ext,
        audioQuality: option.quality,
      })
    }
  }

  if (data.thumbnail) {
    out.push({
      id: 'thumbnail',
      label: 'Thumbnail · JPG',
      ext: 'jpg',
      quality: null,
      filesize: null,
      filesizeApprox: null,
      hasAudio: false,
      hasVideo: false,
      selector: null,
    })
  }

  return out
}

/** Safe download filename from a video title. */
export function safeFilename(title, ext) {
  const base = String(title || 'vidgrab-download')
    .replace(/[\\/:*?"<>|#%&{}$!'@+=`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80)
  return `${base || 'vidgrab-download'}.${ext}`
}

/** Spawn yt-dlp with an already-resolved binary path; stdout can be piped to the HTTP response. */
export function spawnYtDlp(binary, args) {
  return spawn(binary, args, { env: ytdlpEnv() })
}
