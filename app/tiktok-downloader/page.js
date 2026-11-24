import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'TikTok Downloader — Save TikTok Videos in HD, No Watermark',
  description: 'Free TikTok downloader. Save TikTok videos in HD without the watermark, plus audio as MP3. No login, no app, works on any device.',
  alternates: { canonical: 'https://vidgrab.vercel.app/tiktok-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='TikTok'
      slug='tiktok-downloader'
      title='TikTok Downloader — Save TikTok Videos in HD, No Watermark'
      description='Free TikTok downloader. Save TikTok videos in HD without the watermark, plus audio as MP3. No login, no app, works on any device.'
      exampleUrl='https://www.tiktok.com/@example/video/7000000000000000000'
      supports={['TikTok videos (no watermark)', 'TikTok slideshows', 'TikTok audio as MP3', 'TikTok LIVE replays', 'Duets and stitches (public)']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Does the TikTok downloader remove the watermark?', a: 'Yes. VidGrab saves the clean video file, so the bouncing TikTok logo and username are not in the saved file.' }, { q: 'Can I download TikTok videos as MP3?', a: 'Yes. Pick the MP3 option after pasting the link and VidGrab pulls the audio track from the video.' }, { q: 'Is it safe to use?', a: 'VidGrab asks for no login and installs nothing. You paste a public link and get a file. Your TikTok account is never involved.' }, { q: 'Why does one video fail while others work?', a: 'The most common cause is a private video, a deleted video, or a video the creator set to friends-only. Public videos work in almost every case.' }]}
    />
  )
}
