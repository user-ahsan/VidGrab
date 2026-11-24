import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES } from '../articles'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const article = ARTICLES.find((a) => a.slug === params.slug)
  if (!article) return { title: 'Not found — VidGrab Blog' }
  return {
    title: `${article.title} — VidGrab Blog`,
    description: article.description,
    alternates: {
      canonical: `https://vidgrab.vercel.app/blog/${article.slug}`,
    },
  }
}

function wordCount(article) {
  return article.body.reduce(
    (n, s) => n + s.paragraphs.join(' ').split(/\s+/).filter(Boolean).length,
    0
  )
}

export default function ArticlePage({ params }) {
  const article = ARTICLES.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const related = ARTICLES.filter(
    (a) => a.slug !== article.slug && a.related === article.related
  ).slice(0, 3)

  return (
    <main className="blog-page">
      <article className="section blog-article">
        <p className="section-label">VidGrab — Blog</p>
        <Link href="/blog" className="back-link">
          All articles
        </Link>
        <h1 className="section-h2 blog-h1">{article.title}</h1>
        <p className="blog-meta">
          {article.date} · {wordCount(article)} words · Filed under{' '}
          {article.target}
        </p>
        <p className="section-lead">{article.description}</p>

        <div className="blog-body">
          {article.body.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="blog-cta">
          <h2>Try it now</h2>
          <p>
            Open the{' '}
            <Link href={`/${article.related}`}>
              {article.relatedLabel}
            </Link>{' '}
            on VidGrab, paste your link, and save the file. No account, no
            app, no login.
          </p>
          <p>
            <Link href={`/${article.related}`} className="btn-primary">
              Open the downloader
            </Link>
          </p>
        </div>

        {related.length > 0 && (
          <div className="blog-related">
            <h2>Keep reading</h2>
            <ul>
              {related.map((a) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`}>{a.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </main>
  )
}
