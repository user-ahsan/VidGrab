import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Facebook Downloader — Save Facebook Videos & Reels in HD',
  description: 'Free Facebook downloader. Save public Facebook videos and Reels in HD MP4, or pull the audio as MP3. No login, no app, no watermark.',
  alternates: { canonical: 'https://vidgrab.vercel.app/facebook-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Facebook'
      slug='facebook-downloader'
      title='Facebook Downloader — Save Facebook Videos & Reels in HD'
      description='Free Facebook downloader. Save public Facebook videos and Reels in HD MP4, or pull the audio as MP3. No login, no app, no watermark.'
      exampleUrl='https://www.facebook.com/watch/?v=1000000000000000'
      supports={['Facebook videos', 'Facebook Reels', 'Watch videos', 'Live replays (public)', 'Group videos (public groups)', 'MP3 audio from videos']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Can I download Facebook videos in HD?', a: 'Yes, when the original video was uploaded in HD. VidGrab lists the qualities the source offers, usually up to 1080p.' }, { q: 'Do I need a Facebook account to use this?', a: 'No. You do not log in to Facebook or to VidGrab. The video must be public, though — private posts cannot be fetched.' }, { q: 'Can I download Facebook Reels?', a: 'Yes. Reels save the same way as normal videos. Paste the Reel link, pick MP4, and save the file.' }, { q: 'Where do downloaded videos go?', a: 'To your device\'s normal Downloads folder on desktop, or to Files / Photos on your phone, depending on your browser settings.' }]}
    />
  )
}
