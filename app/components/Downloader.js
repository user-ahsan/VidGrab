'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { detectPlatform, formatBytes } from '../lib/detect.js'

const EXAMPLE_URL = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'

function groupFormats(formats) {
  const video = formats.filter((f) => f.hasVideo)
  const audio = formats.filter((f) => !f.hasVideo && f.hasAudio)
  const thumbnail = formats.filter((f) => f.id === 'thumbnail')
  return { video, audio, thumbnail }
}

export default function Downloader({ initialUrl = '' }) {
  const [url, setUrl] = useState(initialUrl)
  const [detected, setDetected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloadingId, setDownloadingId] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  const handleUrlChange = (value) => {
    setUrl(value)
    setDetected(detectPlatform(value))
    if (error) setError(null)
  }

  const fetchFormats = useCallback(async () => {
    const trimmed = url.trim()
    if (!trimmed) {
      setError('Paste a video link first.')
      return
    }
    if (!detectPlatform(trimmed)) {
      setError(
        'That link is not from a supported platform. VidGrab supports YouTube, Instagram, TikTok, Facebook, X (Twitter), Pinterest, Reddit, Twitch, Vimeo, Snapchat and Dailymotion.',
      )
      return
    }

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
        signal: controller.signal,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || 'Could not fetch this video. Please try again.')
        return
      }
      if (!data.formats || data.formats.length === 0) {
        setError('No downloadable formats were found for this video.')
        return
      }
      setResult(data)
    } catch (err) {
      if (err?.name === 'AbortError') return
      setError('Could not reach the server. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [url, error])

  const downloadFormat = useCallback(
    async (format) => {
      if (!result) return
      setDownloadingId(format.id)
      setError(null)
      try {
        const downloadUrl =
          `/api/download?url=${encodeURIComponent(result.webpageUrl || url.trim())}` +
          `&formatId=${encodeURIComponent(format.id)}`
        // A plain navigation lets the browser handle the file download
        // (Content-Disposition: attachment) without buffering it in JS.
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = ''
        document.body.appendChild(link)
        link.click()
        link.remove()
      } finally {
        // Give the browser a moment to start the navigation before clearing.
        setTimeout(() => setDownloadingId((current) => (current === format.id ? null : current)), 1500)
      }
    },
    [result, url],
  )

  const groups = result ? groupFormats(result.formats) : null

  return (
    <div className="dl-box" data-testid="downloader">
      <div className="dl-row">
        <input
          className="dl-input"
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder="Paste a video link — YouTube, Instagram, TikTok, X, Reddit…"
          aria-label="Video link"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') fetchFormats()
          }}
          disabled={loading}
        />
        <button
          className="dl-btn"
          type="button"
          onClick={fetchFormats}
          disabled={loading || !url.trim()}
        >
          {loading ? 'Fetching…' : 'Fetch'}
        </button>
      </div>

      <div className="dl-meta-row">
        {detected ? (
          <span className="dl-badge" data-testid="platform-badge">
            {detected.label} detected
          </span>
        ) : (
          <span className="dl-hint">11 platforms supported — no login, no watermark</span>
        )}
        <button
          className="dl-example"
          type="button"
          onClick={() => handleUrlChange(EXAMPLE_URL)}
        >
          Try an example
        </button>
      </div>

      {error && (
        <p className="dl-error" role="alert" data-testid="dl-error">
          {error}
        </p>
      )}

      {loading && (
        <div className="dl-loading" aria-live="polite">
          <span className="dl-spinner" aria-hidden="true" />
          Fetching video info…
        </div>
      )}

      {result && groups && (
        <div className="dl-results" data-testid="dl-results">
          <div className="dl-media">
            {result.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="dl-thumb" src={result.thumbnail} alt="" />
            )}
            <div className="dl-media-info">
              <p className="dl-title">{result.title}</p>
              <p className="dl-sub">
                {result.label}
                {result.uploader ? ` · ${result.uploader}` : ''}
                {result.durationLabel ? ` · ${result.durationLabel}` : ''}
              </p>
            </div>
          </div>

          {groups.video.length > 0 && (
            <div className="dl-group">
              <p className="dl-group-label">Video</p>
              <div className="dl-grid">
                {groups.video.map((format) => (
                  <button
                    key={format.id}
                    className="dl-format"
                    type="button"
                    onClick={() => downloadFormat(format)}
                    disabled={downloadingId === format.id}
                  >
                    <span className="dl-format-label">{format.label}</span>
                    <span className="dl-format-size">
                      {format.filesizeApprox || format.filesize
                        ? formatBytes(format.filesizeApprox || format.filesize)
                        : 'Size varies'}
                      {format.hasAudio === false ? ' · no audio' : ''}
                    </span>
                    <span className="dl-format-action">
                      {downloadingId === format.id ? 'Starting…' : 'Download'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {groups.audio.length > 0 && (
            <div className="dl-group">
              <p className="dl-group-label">Audio</p>
              <div className="dl-grid">
                {groups.audio.map((format) => (
                  <button
                    key={format.id}
                    className="dl-format"
                    type="button"
                    onClick={() => downloadFormat(format)}
                    disabled={downloadingId === format.id}
                  >
                    <span className="dl-format-label">{format.label}</span>
                    <span className="dl-format-size">
                      {format.filesizeApprox || format.filesize
                        ? formatBytes(format.filesizeApprox || format.filesize)
                        : 'Size varies'}
                    </span>
                    <span className="dl-format-action">
                      {downloadingId === format.id ? 'Starting…' : 'Download'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {groups.thumbnail.length > 0 && (
            <div className="dl-group">
              <p className="dl-group-label">Thumbnail</p>
              <div className="dl-grid">
                {groups.thumbnail.map((format) => (
                  <button
                    key={format.id}
                    className="dl-format"
                    type="button"
                    onClick={() => downloadFormat(format)}
                    disabled={downloadingId === format.id}
                  >
                    <span className="dl-format-label">{format.label}</span>
                    <span className="dl-format-size">JPG image</span>
                    <span className="dl-format-action">
                      {downloadingId === format.id ? 'Starting…' : 'Download'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="dl-note">
            Only download videos you have the right to save. Private, age-restricted and
            login-only videos cannot be downloaded.
          </p>
        </div>
      )}
    </div>
  )
}
