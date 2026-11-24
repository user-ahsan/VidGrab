'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Downloader from './components/Downloader'
import ProjectsList from './components/ProjectsList'
import Showcase from './components/Showcase'
import TechWall from './components/TechWall'
import ProofOfWork from './components/ProofOfWork'
import { PLATFORMS, SHOWCASE } from './projects/data'

const STACK = [
  'YouTube', 'Instagram', 'TikTok', 'Facebook', 'X', 'Pinterest',
  'Reddit', 'Twitch', 'Vimeo', 'Snapchat', 'Dailymotion',
  'MP4', 'MP3', '4K', 'No Watermark', 'No Sign-up',
  'yt-dlp', 'Next.js', 'Tailwind',
]

const MANIFESTO = [
  { t: 'Most' }, { t: 'downloaders' }, { t: 'cover' }, { t: 'one' }, { t: 'site.' },
  { t: 'Or' }, { t: 'they' }, { t: 'ask' }, { t: 'you' }, { t: 'to' }, { t: 'sign' }, { t: 'up.' },
  { t: 'Or' }, { t: 'they' }, { t: 'watermark' }, { t: 'everything.' },
  { t: 'VidGrab' }, { t: 'covers' }, { t: 'eleven' }, { t: 'platforms,' },
  { t: 'asks' }, { t: 'for' }, { t: 'nothing,' }, { t: 'and' },
  { t: 'gives', hl: true }, { t: 'you', hl: true }, { t: 'the', hl: true }, { t: 'file.', hl: true },
]

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

function Counter({ to, suffix }) {
  const ref = useRef(null)
  // Vertical-only inset. A bare '-100px' shrinks the observer root horizontally
  // too, and a two-character number sitting in the left gutter then never
  // intersects it, so the counter would sit at zero forever.
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1100
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.round(p * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function HomeClient({ stats }) {
  const heroRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.18])
  const heroFade = useTransform(heroProgress, [0, 0.85], [1, 0])

  const STATS = [
    { to: stats?.platforms ?? 11, suffix: '', label: 'Platforms' },
    { to: stats?.formats ?? 9, suffix: '', label: 'Formats' },
    { to: 0, suffix: '', label: 'Sign-up required' },
    { to: 4, suffix: 'K', label: 'Max quality' },
  ]

  // Feedback only: nothing leaves the browser, no external POST, no keys.
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />

      <SmoothScroll>
        <Nav />

        <section id="hero" ref={heroRef}>
          <div className="hero-img-wrap">
            <motion.img
              className="hero-img"
              src="/silver.png"
              alt=""
              aria-hidden="true"
              style={{ y: heroY, scale: heroScale }}
            />
          </div>

          <motion.div
            className="hero-content"
            variants={heroStagger}
            initial="hidden"
            animate="show"
            style={{ opacity: heroFade }}
          >
            <h1 className="hero-h1">
              <span className="line">
                <motion.span variants={lineReveal} className="line-in">Paste a link.</motion.span>
              </span>
              <span className="line">
                <motion.span variants={lineReveal} className="line-in">
                  Grab the <span className="hollow">video.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              VidGrab downloads public videos from YouTube, Instagram, TikTok,
              Facebook, X and more. No sign-up. No watermark on TikTok. MP4 up
              to 4K and MP3 up to 320kbps.
            </motion.p>

            <motion.div className="hero-btns" variants={fadeUp}>
              <a href="#downloader" className="btn-primary" data-magnetic data-scramble>Download now</a>
              <a href="#platforms" className="btn-ghost" data-magnetic data-scramble>See platforms</a>
            </motion.div>
          </motion.div>

          <div className="scroll-line"><span>scroll</span></div>
        </section>

        <section id="downloader" className="section">
          <p className="section-label">Downloader</p>
          <Downloader />
        </section>

        <section className="section section--wall">
          <p className="section-label">What it downloads from</p>
          <TechWall items={STACK} />
        </section>

        <section className="section">
          <p className="section-label">Why VidGrab</p>
          <p className="manifesto-text">
            {MANIFESTO.map((w, i) => (
              <motion.span
                key={`${w.t}-${i}`}
                className={`word${w.hl ? ' hl' : ''}`}
                initial={{ opacity: 0, y: 12, filter: 'blur(7px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
              >
                {w.t}
              </motion.span>
            ))}
          </p>

          <div className="stats-row">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
              >
                <div className="stat-num"><Counter to={s.to} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="platforms" className="section">
          <p className="section-label">Platforms</p>
          <ProjectsList projects={PLATFORMS} />
        </section>

        <section id="downloads" className="section">
          <p className="section-label">What you can download</p>
          <div className="shw-intro">
            <h2 className="section-h2">
              The files people <span className="hollow">actually</span> want.
            </h2>
            <p className="section-lead">
              Audio from a video, a TikTok without the logo, a Reel in full
              quality, a Short, a 4K original. Six downloads that cover most
              of what gets pasted into the box above.
            </p>
          </div>
          <Showcase sites={SHOWCASE} />
        </section>

        <section id="proof" className="section">
          <p className="section-label">Why VidGrab</p>
          <div className="shw-intro">
            <h2 className="section-h2">
              Used, then <span className="hollow">trusted</span>.
            </h2>
            <p className="section-lead">
              A downloader earns trust the boring way: the file arrives, in the
              quality asked for, every time the link is pasted. These are the
              numbers behind that.
            </p>
          </div>
          <ProofOfWork stats={stats} />
        </section>

        <section id="contact" className="section">
          <p className="section-label section-label--center">Feedback</p>
          <motion.h2
            className="contact-h2"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Something not<br />
            working?<br />
            <span className="hollow">Tell us.</span>
          </motion.h2>

          <p className="contact-sub">
            A link that will not download, a platform that broke, a quality
            that is missing. Tell us what you pasted and what happened.
          </p>

          <motion.div
            className="form-wrap"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }}
          >
            {sent ? (
              <div className="form-success">
                <p aria-hidden="true">&#10022;</p>
                <p>Thanks, noted. We will look into it.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="f-name">Name</label>
                    <input
                      id="f-name" type="text" placeholder="Your name" required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="f-email">Email</label>
                    <input
                      id="f-email" type="email" placeholder="you@example.com" required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="f-message">What is not working?</label>
                  <textarea
                    id="f-message"
                    placeholder="The link, the platform, and what happened when you tried it." required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="form-submit" data-magnetic>
                  Send feedback
                </button>
              </form>
            )}
          </motion.div>
        </section>

        <Footer />
      </SmoothScroll>
    </>
  )
}
