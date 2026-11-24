'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePointerFine } from './hooks'

/*
  The wordmark is a spotlight: a bright disc tracks the cursor across the
  letters, so the mark is only ever fully readable where you are looking.
*/

const DOWNLOADERS = [
  { label: 'YouTube Downloader', href: '/youtube-downloader' },
  { label: 'Instagram Downloader', href: '/instagram-downloader' },
  { label: 'TikTok Downloader', href: '/tiktok-downloader' },
  { label: 'Facebook Downloader', href: '/facebook-downloader' },
  { label: 'X Downloader', href: '/twitter-downloader' },
  { label: 'Pinterest Downloader', href: '/pinterest-downloader' },
  { label: 'Reddit Downloader', href: '/reddit-downloader' },
  { label: 'Twitch Downloader', href: '/twitch-downloader' },
  { label: 'Vimeo Downloader', href: '/vimeo-downloader' },
  { label: 'Snapchat Downloader', href: '/snapchat-downloader' },
  { label: 'Dailymotion Downloader', href: '/dailymotion-downloader' },
]

const MORE_LINKS = [
  { label: 'YouTube to MP3', href: '/youtube-to-mp3' },
  { label: 'Blog', href: '/blog' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'DMCA', href: '/dmca' },
]

export default function Footer() {
  const fine = usePointerFine()
  const markRef = useRef(null)

  useEffect(() => {
    const el = markRef.current
    if (!fine || !el) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [fine])

  return (
    <footer>
      <div className="footer-mark" ref={markRef} aria-hidden="true">
        VIDGRAB
      </div>

      <nav className="footer-nav" aria-label="Site">
        <div className="footer-nav-group">
          <p className="footer-nav-label">Downloaders</p>
          <ul>
            {DOWNLOADERS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-nav-group">
          <p className="footer-nav-label">More</p>
          <ul>
            {MORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="footer-bar">
        <p>&#169; 2026 VidGrab. Built by Ahsan Ali, Lahore, Pakistan.</p>
        <div className="footer-links">
          <a href="https://github.com/user-ahsan" target="_blank" rel="noopener noreferrer" data-scramble>GitHub</a>
          <a href="https://www.linkedin.com/in/ahsan-ali-fullstack-dev/" target="_blank" rel="noopener noreferrer" data-scramble>LinkedIn</a>
          <a href="mailto:ahsansheikhoffice@gmail.com" data-scramble>Email</a>
          <a href="https://ahsanali.cc" target="_blank" rel="noopener noreferrer" data-scramble>Portfolio</a>
        </div>
      </div>
    </footer>
  )
}
