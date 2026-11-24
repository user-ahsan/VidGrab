import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Instagram Downloader — Save Instagram Videos, Reels & Photos',
  description: 'Free Instagram downloader. Save public Instagram videos, Reels, photos, and stories in full quality. No login, no app, no watermark.',
  alternates: { canonical: 'https://vidgrab.vercel.app/instagram-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Instagram'
      slug='instagram-downloader'
      title='Instagram Downloader — Save Instagram Videos, Reels & Photos'
      description='Free Instagram downloader. Save public Instagram videos, Reels, photos, and stories in full quality. No login, no app, no watermark.'
      exampleUrl='https://www.instagram.com/reel/C0example/'
      supports={['Instagram Reels', 'Feed videos', 'Photos and carousels', 'Stories (public accounts)', 'IGTV videos', 'Profile pictures']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Can I download Instagram videos without logging in?', a: 'Yes. VidGrab does not ask for your Instagram login. Paste the link to a public post and download it straight from your browser.' }, { q: 'Does it work for private accounts?', a: 'No. Posts from private accounts cannot be fetched. The post must be public, and the account must not have blocked downloads.' }, { q: 'Will the video have a watermark?', a: 'No. VidGrab saves the original video file, so there is no added watermark and no app logo stamped on it.' }, { q: 'Can I save Instagram photos too?', a: 'Yes. Photos and carousel images from public posts can be saved at full size, one by one.' }]}
    />
  )
}
