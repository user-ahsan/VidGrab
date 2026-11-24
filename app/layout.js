import { Orbitron, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

/* Display. Variable wght 400 to 900, driven live by the cursor in <TechWall />. */
const display = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  // No dedicated VidGrab domain yet; the owner's portfolio stands in as the
  // base for absolute Open Graph URLs until one is set.
  metadataBase: new URL('https://ahsanali.cc'),
  title: 'VidGrab — Download Videos from YouTube, Instagram, TikTok & More',
  description:
    'VidGrab downloads public videos from YouTube, Instagram, TikTok, Facebook, X and more. No sign-up. No watermark on TikTok. MP4 up to 4K and MP3 up to 320kbps.',
  openGraph: {
    title: 'VidGrab — Download Videos from YouTube, Instagram, TikTok & More',
    description:
      'VidGrab downloads public videos from YouTube, Instagram, TikTok, Facebook, X and more. No sign-up. No watermark on TikTok. MP4 up to 4K and MP3 up to 320kbps.',
    type: 'website',
    siteName: 'VidGrab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VidGrab — Download Videos from YouTube, Instagram, TikTok & More',
    description:
      'VidGrab downloads public videos from YouTube, Instagram, TikTok, Facebook, X and more. No sign-up. No watermark on TikTok. MP4 up to 4K and MP3 up to 320kbps.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
