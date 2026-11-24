import Link from 'next/link'
import { ARTICLES } from './articles'

export const metadata = {
  title: 'VidGrab Blog — How to Download Videos from YouTube, TikTok, Instagram & More',
  description:
    'Plain guides to downloading videos from YouTube, TikTok, Instagram, Facebook, X, Reddit, Twitch, and more — with real steps, no jargon, and no apps to install.',
  alternates: { canonical: 'https://vidgrab.vercel.app/blog' },
}

function wordCount(article) {
  return article.body.reduce(
    (n, s) => n + s.paragraphs.join(' ').split(/\s+/).filter(Boolean).length,
    0
  )
}

export default function BlogIndexPage() {
  return (
    <main className="blog-page">
      <section className="section">
        <p className="section-label">VidGrab — Blog</p>
        <h1 className="section-h2 blog-h1">
          How to download videos, plainly explained
        </h1>
        <p className="section-lead">
          Short, practical guides to saving videos from YouTube, TikTok,
          Instagram, Facebook, X, Reddit, Twitch, and more. Every guide
          gives you real steps you can follow on your phone or computer, and
          a link to the free tool that does the job.
        </p>

        <ul className="blog-list">
          {ARTICLES.map((a) => (
            <li key={a.slug} className="blog-card">
              <Link href={`/blog/${a.slug}`} className="blog-card-link">
                <span className="blog-card-date">{a.date}</span>
                <h2 className="blog-card-title">{a.title}</h2>
                <p className="blog-card-desc">{a.description}</p>
                <span className="blog-card-meta">
                  {wordCount(a)} words · {a.target}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="blog-note">
          Need the tool itself? Start with the{' '}
          <Link href="/youtube-downloader">YouTube downloader</Link>, the{' '}
          <Link href="/tiktok-downloader-no-watermark">
            TikTok downloader with no watermark
          </Link>
          , or the{' '}
          <Link href="/instagram-reels-downloader">
            Instagram Reels downloader
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
