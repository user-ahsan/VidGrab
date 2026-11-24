import Link from 'next/link'
import Downloader from '../components/Downloader'

const ALL_PAGES = [
  { slug: 'youtube-downloader', name: 'YouTube Downloader' },
  { slug: 'instagram-downloader', name: 'Instagram Downloader' },
  { slug: 'tiktok-downloader', name: 'TikTok Downloader' },
  { slug: 'facebook-downloader', name: 'Facebook Downloader' },
  { slug: 'twitter-downloader', name: 'Twitter Downloader' },
  { slug: 'pinterest-downloader', name: 'Pinterest Downloader' },
  { slug: 'reddit-downloader', name: 'Reddit Downloader' },
  { slug: 'twitch-downloader', name: 'Twitch Downloader' },
  { slug: 'vimeo-downloader', name: 'Vimeo Downloader' },
  { slug: 'snapchat-downloader', name: 'Snapchat Downloader' },
  { slug: 'dailymotion-downloader', name: 'Dailymotion Downloader' },
  { slug: 'youtube-to-mp3', name: 'YouTube to MP3' },
  { slug: 'instagram-reels-downloader', name: 'Instagram Reels Downloader' },
  { slug: 'tiktok-downloader-no-watermark', name: 'TikTok Downloader No Watermark' },
]

export default function SeoDownloaderPage({
  platform,
  slug,
  title,
  description,
  supports,
  formats,
  faqs,
  exampleUrl,
}) {
  const others = ALL_PAGES.filter((p) => p.slug !== slug)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="section seo-hero">
        <p className="section-label">VidGrab — {platform}</p>
        <h1 className="section-h2 seo-h1">{title}</h1>
        <p className="section-lead">{description}</p>
        <div className="seo-downloader">
          <Downloader />
        </div>
        <p className="seo-example">
          Example link to try: <code>{exampleUrl}</code>
        </p>
        <p className="seo-note">
          No account. No app to install. No login. Paste a link, pick a
          format, and save the file. VidGrab works in your browser on phone,
          tablet, and desktop.
        </p>
      </section>

      <section className="section">
        <p className="section-label">How it works</p>
        <h2 className="section-h2">Save a {platform} video in three steps</h2>
        <ol className="seo-steps">
          <li>
            <span className="seo-step-num">01</span>
            <h3>Copy the link</h3>
            <p>
              Open the {platform} app or site, find the video you want, tap
              Share, then Copy link. The link goes on your clipboard.
            </p>
          </li>
          <li>
            <span className="seo-step-num">02</span>
            <h3>Paste it above</h3>
            <p>
              Come back here and paste the link into the box. VidGrab reads
              the link and shows the formats that are ready for that video.
            </p>
          </li>
          <li>
            <span className="seo-step-num">03</span>
            <h3>Pick a format and save</h3>
            <p>
              Choose MP4 for video or MP3 for audio, pick a quality, and tap
              Download. The file saves straight to your device.
            </p>
          </li>
        </ol>
      </section>

      <section className="section">
        <p className="section-label">Supported content</p>
        <h2 className="section-h2">What you can save from {platform}</h2>
        <p className="section-lead">
          VidGrab handles the {platform} links people paste most often. If a
          link is public, it usually works. Private or deleted posts cannot
          be fetched.
        </p>
        <ul className="seo-supports">
          {supports.map((item) => (
            <li key={item}>
              <span className="tag">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <p className="section-label">Formats</p>
        <h2 className="section-h2">Formats and quality</h2>
        <div className="seo-table-wrap">
          <table className="seo-table">
            <thead>
              <tr>
                <th>Format</th>
                <th>Quality</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((f) => (
                <tr key={f.format}>
                  <td>{f.format}</td>
                  <td>{f.quality}</td>
                  <td>{f.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="seo-note">
          The quality you get depends on the original upload. A video posted
          in 720p cannot be saved in 1080p. VidGrab lists what the source
          actually offers.
        </p>
      </section>

      <section className="section">
        <p className="section-label">Questions</p>
        <h2 className="section-h2">{platform} downloader — FAQ</h2>
        <div className="seo-faq">
          {faqs.map((f) => (
            <details key={f.q} className="seo-faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-label">More downloaders</p>
        <h2 className="section-h2">Save videos from other platforms</h2>
        <ul className="seo-links">
          {others.map((p) => (
            <li key={p.slug}>
              <Link href={`/${p.slug}`}>{p.name}</Link>
            </li>
          ))}
          <li>
            <Link href="/blog">VidGrab Blog</Link>
          </li>
        </ul>
        <p className="seo-note">
          Only download videos you own, videos shared under a Creative
          Commons licence, or videos the owner has made public for saving.
          Respect copyright and the rules of each platform. Read our{' '}
          <Link href="/terms">Terms</Link> and{' '}
          <Link href="/dmca">DMCA policy</Link>.
        </p>
      </section>
    </main>
  )
}
