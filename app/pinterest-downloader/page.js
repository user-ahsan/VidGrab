import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Pinterest Video Downloader — Save Pinterest Videos & Images',
  description: 'Free Pinterest downloader. Save Pinterest videos in MP4 and pins as full-size images. No login, no app, no watermark.',
  alternates: { canonical: 'https://vidgrab.vercel.app/pinterest-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Pinterest'
      slug='pinterest-downloader'
      title='Pinterest Video Downloader — Save Pinterest Videos & Images'
      description='Free Pinterest downloader. Save Pinterest videos in MP4 and pins as full-size images. No login, no app, no watermark.'
      exampleUrl='https://www.pinterest.com/pin/1000000000000000/'
      supports={['Pinterest videos', 'Idea Pins', 'Full-size pin images', 'GIF pins as MP4', 'Board cover images']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Can I download Pinterest videos?', a: 'Yes. Paste the pin link and VidGrab shows the video in MP4. Most Pinterest videos save in the quality they were uploaded in.' }, { q: 'Can I save pin images at full size?', a: 'Yes. VidGrab pulls the full-resolution image behind the pin, not the small preview shown in the feed.' }, { q: 'Do I need a Pinterest account?', a: 'No. No login is needed. The pin must be public, which nearly all pins are.' }, { q: 'Is it okay to reuse a downloaded pin?', a: 'Only with the owner\'s permission or a licence that allows it. Downloading for personal viewing is different from reposting someone else\'s work.' }]}
    />
  )
}
