import { NextResponse } from 'next/server'
import { Readable } from 'node:stream'
import { execFile } from 'node:child_process'
import { mkdtemp, readdir, rm, stat } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { detectPlatform, allFormatOptions } from '../../lib/detect.js'
import {
  dumpSingleJson,
  buildFormats,
  findYtDlp,
  findFfmpeg,
  probeFormat,
  formatMatchesExt,
  safeFilename,
  classifyYtDlpError,
  ytdlpEnv,
  DOWNLOAD_TIMEOUT_MS,
} from '../../lib/ytdlp.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const CONTENT_TYPES = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  jpg: 'image/jpeg',
}

function errorResponse(code, status, message) {
  return NextResponse.json({ error: code, message }, { status })
}

function runCommand(binary, args, timeoutMs) {
  return new Promise((resolvePromise, rejectPromise) => {
    execFile(binary, args, { timeout: timeoutMs, maxBuffer: 20 * 1024 * 1024, env: ytdlpEnv() }, (error, stdout, stderr) => {
      if (error) {
        rejectPromise({ error, stdout: String(stdout || ''), stderr: String(stderr || '') })
      } else {
        resolvePromise({ stdout: String(stdout || ''), stderr: String(stderr || '') })
      }
    })
  })
}

async function cleanup(dir) {
  if (!dir) return
  try {
    await rm(dir, { recursive: true, force: true })
  } catch {
    /* temp cleanup is best-effort */
  }
}

/**
 * Convert a downloaded source file to the requested container/codec with
 * ffmpeg, explicitly — never by piping yt-dlp to stdout, because yt-dlp
 * post-processors do not run on `-o -` and the raw WebM stream was served
 * labelled as MP4/MP3. Tries a stream-copy remux first (fast, lossless);
 * falls back to a real recode when the codecs are not compatible with the
 * target container (e.g. AV1/Opus -> MP4 needs H.264/AAC).
 * Returns the output path on success; throws { message, stderr } on failure.
 */
async function convertWithFfmpeg(ffmpeg, source, outPath, option) {
  const probe = await probeFormat(source)
  const hasVideo = (probe?.streams || []).some((s) => s.codec_type === 'video')
  const hasAudio = (probe?.streams || []).some((s) => s.codec_type === 'audio')

  const tryArgs = async (args) => {
    try {
      await runCommand(ffmpeg, args, DOWNLOAD_TIMEOUT_MS)
      return true
    } catch (failure) {
      return { failed: true, stderr: failure.stderr || '' }
    }
  }

  if (option.kind === 'audio') {
    if (option.ext === 'mp3') {
      const bitrate = Number(option.quality) || 128
      // MP3 in an MP3 source can be copied; otherwise re-encode with lame.
      const copied = await tryArgs(['-y', '-v', 'error', '-i', source, '-vn', '-c:a', 'copy', outPath])
      if (copied === true) return outPath
      const recoded = await tryArgs(['-y', '-v', 'error', '-i', source, '-vn', '-c:a', 'libmp3lame', '-b:a', `${bitrate}k`, outPath])
      if (recoded === true) return outPath
      throw { message: 'Audio conversion to MP3 failed.', stderr: recoded?.stderr || copied?.stderr || '' }
    }
    // M4A: copy the AAC stream when possible, else encode AAC.
    const copied = await tryArgs(['-y', '-v', 'error', '-i', source, '-vn', '-c:a', 'copy', outPath])
    if (copied === true) return outPath
    const recoded = await tryArgs(['-y', '-v', 'error', '-i', source, '-vn', '-c:a', 'aac', '-b:a', '192k', outPath])
    if (recoded === true) return outPath
    throw { message: 'Audio conversion to M4A failed.', stderr: recoded?.stderr || copied?.stderr || '' }
  }

  // Video targets (mp4 / webm).
  const mapArgs = []
  if (hasVideo) mapArgs.push('-map', '0:v:0')
  if (hasAudio) mapArgs.push('-map', '0:a:0')
  if (!mapArgs.length) mapArgs.push('-map', '0')

  const copyArgs = ['-y', '-v', 'error', '-i', source, ...mapArgs, '-c', 'copy']
  if (option.ext === 'mp4') copyArgs.push('-movflags', '+faststart')
  copyArgs.push(outPath)
  const copied = await tryArgs(copyArgs)
  if (copied === true) return outPath

  // Copy failed (codecs incompatible with the container) — recode for real.
  let recodeArgs
  if (option.ext === 'mp4') {
    recodeArgs = ['-y', '-v', 'error', '-i', source]
    if (hasVideo) recodeArgs.push('-map', '0:v:0', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'veryfast', '-crf', '23')
    if (hasAudio) recodeArgs.push('-map', '0:a:0', '-c:a', 'aac', '-b:a', '192k')
    recodeArgs.push('-movflags', '+faststart', outPath)
  } else {
    recodeArgs = ['-y', '-v', 'error', '-i', source]
    if (hasVideo) recodeArgs.push('-map', '0:v:0', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30')
    if (hasAudio) recodeArgs.push('-map', '0:a:0', '-c:a', 'libopus', '-b:a', '128k')
    recodeArgs.push(outPath)
  }
  const recoded = await tryArgs(recodeArgs)
  if (recoded === true) return outPath
  throw {
    message: `Video conversion to ${option.ext.toUpperCase()} failed.`,
    stderr: recoded?.stderr || copied?.stderr || '',
  }
}

export async function GET(request) {
  const params = request.nextUrl.searchParams
  const rawUrl = (params.get('url') || '').trim()
  const formatId = (params.get('formatId') || '').trim()

  if (!rawUrl || !formatId) {
    return errorResponse('invalid_request', 400, 'Both "url" and "formatId" query parameters are required.')
  }

  let parsed
  try {
    parsed = new URL(rawUrl)
  } catch {
    return errorResponse('invalid_url', 400, 'That does not look like a valid link.')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return errorResponse('invalid_url', 400, 'Only http:// and https:// links are supported.')
  }

  const detected = detectPlatform(rawUrl)
  if (!detected) {
    return errorResponse('unsupported_platform', 400, 'This platform is not supported yet.')
  }

  const option = allFormatOptions(detected.slug).find((o) => o.id === formatId)
  if (!option) {
    return errorResponse('invalid_format', 400, `Unknown format "${formatId}". Fetch the link again to see the formats available for this video.`)
  }

  const binary = await findYtDlp()
  if (!binary) {
    return errorResponse('yt_dlp_missing', 500, 'The downloader engine (yt-dlp) is not installed on this server yet. See the README for setup.')
  }
  const ffmpeg = await findFfmpeg()
  if (!ffmpeg) {
    return errorResponse('conversion_unavailable', 500, 'The converter (ffmpeg) is not installed on this server yet, so MP4/MP3 downloads cannot be made. See the README for setup.')
  }

  let data
  try {
    data = await dumpSingleJson(rawUrl)
  } catch (err) {
    console.warn('[download] resolve failed for host:', parsed.hostname, '| code:', err?.code)
    return errorResponse(err?.code || 'fetch_failed', err?.status || 502, err?.message || 'Could not fetch this video.')
  }

  const title = data.title || 'Untitled video'

  // Thumbnail: just send the browser to the source image.
  if (option.kind === 'thumbnail') {
    if (!data.thumbnail) {
      return errorResponse('not_found', 404, 'No thumbnail is available for this video.')
    }
    return NextResponse.redirect(data.thumbnail, 302)
  }

  const formats = buildFormats(data, detected.slug)
  const format = formats.find((f) => f.id === formatId)
  if (!format) {
    return errorResponse(
      'format_unavailable',
      404,
      `The ${option.label} format is not available for this video. Pick another format from the list.`,
    )
  }

  const filename = safeFilename(title, option.ext)
  const contentType = CONTENT_TYPES[option.ext] || 'application/octet-stream'

  // --- Temp-file download + explicit ffmpeg conversion + ffprobe check ---
  // No stdout streaming, no direct-URL proxy fallback: serving a raw
  // stream under the wrong extension/Content-Type is exactly the bug
  // being fixed. Any failure here returns an honest error instead.
  const workDir = await mkdtemp(join(tmpdir(), 'vidgrab-'))
  try {
    const sourceTemplate = join(workDir, 'source.%(ext)s')
    const ffmpegLocation = ffmpeg === 'ffmpeg' ? undefined : dirname(ffmpeg)
    const downloadArgs = [
      '-f', format.selector,
      '--no-playlist', '--no-warnings', '--user-agent', USER_AGENT,
    ]
    if (ffmpegLocation) downloadArgs.push('--ffmpeg-location', ffmpegLocation)
    downloadArgs.push('-o', sourceTemplate, rawUrl)

    let download
    try {
      download = await runCommand(binary, downloadArgs, DOWNLOAD_TIMEOUT_MS)
    } catch (failure) {
      console.warn('[download] yt-dlp download failed:', classifyYtDlpError(failure.stderr).code, '| stderr:', String(failure.stderr || '').slice(-2000))
      const classified = classifyYtDlpError(failure.stderr)
      return errorResponse(classified.code, classified.status, classified.message)
    }
    void download

    const entries = (await readdir(workDir)).filter((name) => name.startsWith('source.'))
    if (!entries.length) {
      console.warn('[download] yt-dlp produced no file for', parsed.hostname)
      return errorResponse('fetch_failed', 502, 'The download produced no file. Please try again.')
    }
    const sourcePath = join(workDir, entries[0])

    const outPath = join(workDir, `output.${option.ext}`)
    try {
      await convertWithFfmpeg(ffmpeg, sourcePath, outPath, option)
    } catch (failure) {
      console.warn('[download] ffmpeg conversion failed:', failure.message, '| stderr:', String(failure.stderr || '').slice(-2000))
      return errorResponse('conversion_failed', 502, `${failure.message} The requested ${option.ext.toUpperCase()} file could not be made from this video. Try another format.`)
    }

    // Verify the actual container before serving anything.
    const probe = await probeFormat(outPath)
    if (!probe) {
      console.warn('[download] ffprobe could not verify the converted file')
      return errorResponse('conversion_failed', 502, 'The converted file could not be verified. Please try again.')
    }
    if (!formatMatchesExt(option.ext, probe.formatName)) {
      console.warn('[download] CONTAINER MISMATCH: wanted', option.ext, 'got', probe.formatName, '| streams:', JSON.stringify(probe.streams))
      return errorResponse(
        'conversion_failed',
        502,
        `Conversion produced ${probe.formatName || 'an unknown container'} instead of ${option.ext.toUpperCase()}, so the file was not served. Please try another format.`,
      )
    }

    const fileStat = await stat(outPath)
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
    headers.set('Content-Length', String(fileStat.size))

    const stream = createReadStream(outPath)
    stream.on('close', () => { void cleanup(workDir) })
    stream.on('error', () => { void cleanup(workDir) })
    return new NextResponse(Readable.toWeb(stream), { headers })
  } catch (err) {
    await cleanup(workDir)
    if (err && typeof err === 'object' && 'status' in err) throw err
    console.warn('[download] unexpected error:', err)
    return errorResponse('fetch_failed', 502, 'Could not download this video. Please try again.')
  }
}
