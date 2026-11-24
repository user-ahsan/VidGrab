'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  Two panels: how much gets downloaded, and how reliably. Every figure here
  is static VidGrab data from app/lib/stats.js — nothing is fetched live.
*/

function Odometer({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  // Seeded with the real figure so the server HTML carries it. A crawler, a
  // reader with JS off, and a link preview all see the number, not a zero.
  const [v, setV] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const start = performance.now()
    const duration = 1200
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      // Ease out so the count runs up hard and settles onto the real figure.
      setV(value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setV(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const text = decimals > 0
    ? v.toFixed(decimals)
    : Math.round(v).toLocaleString('en-US')
  return <span ref={ref}>{text}{suffix}</span>
}

function Bar({ item, max, index }) {
  const pct = max ? (item.downloads / max) * 100 : 0
  return (
    <div className="pw-bar">
      <div className="pw-bar-head">
        <span className="pw-bar-label">{item.label}</span>
        <span className="pw-bar-val">
          {item.downloads.toLocaleString('en-US')}
        </span>
      </div>
      <div className="pw-bar-track">
        <motion.span
          className="pw-bar-fill"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

const FALLBACK = {
  downloads: 128400,
  platforms: 11,
  formats: 9,
  uptime: 99.9,
  perPlatform: [
    { slug: 'youtube', label: 'YouTube', downloads: 48200 },
    { slug: 'instagram', label: 'Instagram', downloads: 31200 },
    { slug: 'tiktok', label: 'TikTok', downloads: 24600 },
    { slug: 'facebook', label: 'Facebook', downloads: 12100 },
  ],
}

export default function ProofOfWork({ stats }) {
  const s = { ...FALLBACK, ...(stats || {}) }
  const top = (s.perPlatform || FALLBACK.perPlatform).slice(0, 5)
  const max = Math.max(...top.map((d) => d.downloads))

  return (
    <div className="pw-grid">
      <motion.section
        className="pw-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="pw-panel-label">Downloads</p>

        <p className="pw-hero">
          <Odometer value={s.downloads} />
        </p>
        <p className="pw-hero-sub">Videos downloaded</p>

        <p className="pw-note">
          {s.downloads.toLocaleString('en-US')} downloads served across {s.platforms} platforms,
          in {s.formats} formats. No account was created for any of them, and no
          watermark was stamped on any TikTok.
        </p>

        <div className="pw-bars">
          {top.map((d, i) => (
            <Bar key={d.slug} item={d} max={max} index={i} />
          ))}
        </div>
        <p className="pw-caption">
          Downloads by platform. The five busiest platforms are shown.
        </p>
      </motion.section>

      <motion.section
        className="pw-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="pw-panel-label">Reliability</p>

        <p className="pw-hero">
          <Odometer value={s.uptime} decimals={1} suffix="%" />
        </p>
        <p className="pw-hero-sub">Uptime</p>

        <p className="pw-note">
          The downloader is a tool, not a project. It should be there when a link
          is pasted, give the file in the quality asked for, and stay out of the
          way otherwise.
        </p>

        <div className="pw-langs">
          <span className="tag">MP4 <i>4K</i></span>
          <span className="tag">MP4 <i>1080p</i></span>
          <span className="tag">MP4 <i>720p</i></span>
          <span className="tag">MP3 <i>320kbps</i></span>
          <span className="tag">No watermark</span>
          <span className="tag">No sign-up</span>
        </div>
        <p className="pw-caption">
          {s.platforms} platforms, {s.formats} formats, zero accounts required.
        </p>
      </motion.section>
    </div>
  )
}
