import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Instagram Reels Downloader — Save Reels in HD, No Watermark',
  description: 'Free Instagram Reels downloader. Save any public Reel in HD MP4 with sound, no watermark. No login, no app, works on Android and iPhone.',
  alternates: { canonical: 'https://vidgrab.vercel.app/instagram-reels-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Instagram'
      slug='instagram-reels-downloader'
      title='Instagram Reels Downloader — Save Reels in HD, No Watermark'
      description='Free Instagram Reels downloader. Save any public Reel in HD MP4 with sound, no watermark. No login, no app, works on Android and iPhone.'
      exampleUrl='https://www.instagram.com/reel/C0example/'
      supports={['Reels in HD with sound', 'Reels without watermark', 'Reel audio as MP3', 'Reel cover thumbnails', 'Reels from public accounts']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'How do I download an Instagram Reel?', a: 'Open the Reel, tap Share, then Copy link. Paste the link here, pick MP4, and tap Download. The Reel saves with sound and no watermark.' }, { q: 'Will the Reel keep its sound?', a: 'Yes. Reels save as MP4 with the original audio track included.' }, { q: 'Can I download Reels on iPhone?', a: 'Yes. Paste the link in Safari or Chrome, download the MP4, then save it to Photos from the Files app. See our guide on downloading Reels on Android and iPhone.' }, { q: 'Does it work for private accounts?', a: 'No. Reels from private accounts cannot be fetched. The account must be public.' }]}
    />
  )
}
