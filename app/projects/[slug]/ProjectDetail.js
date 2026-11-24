'use client'
import Link from 'next/link'
import Cursor from '../../components/Cursor'
import Preloader from '../../components/Preloader'
import ScrollProgress from '../../components/ScrollProgress'
import SmoothScroll from '../../components/SmoothScroll'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

/*
  Fallback for old /projects/<slug> links. The page itself redirects to the
  matching downloader page; this component only renders if that redirect is
  ever bypassed, and points the visitor at the downloader.
*/
export default function ProjectDetail({ project }) {
  const href = project?.href || '/#downloader'
  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />

      <SmoothScroll>
        <Nav />

        <section className="section case-cta">
          <h2 className="section-h2 case-cta-h2">
            {project?.title || 'VidGrab'} has <span className="hollow">moved</span>.
          </h2>
          <p className="contact-sub">
            {project?.desc || 'This page now lives on the downloader.'}
          </p>
          <Link href={href} className="btn-primary" data-magnetic data-scramble>
            Open the downloader
          </Link>
        </section>

        <Footer />
      </SmoothScroll>
    </>
  )
}
