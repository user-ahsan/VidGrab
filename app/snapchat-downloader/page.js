import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Snapchat Downloader — Save Snapchat Spotlight Videos',
  description: 'Free Snapchat downloader. Save public Snapchat Spotlight videos in MP4. No login, no app, no watermark.',
  alternates: { canonical: 'https://vidgrab.vercel.app/snapchat-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Snapchat'
      slug='snapchat-downloader'
      title='Snapchat Downloader — Save Snapchat Spotlight Videos'
      description='Free Snapchat downloader. Save public Snapchat Spotlight videos in MP4. No login, no app, no watermark.'
      exampleUrl='https://www.snapchat.com/spotlight/W7_EDD_example'
      supports={['Spotlight videos', 'Public Snap stories (web links)', 'Snapchat web video links', 'MP4 up to 1080p']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Can I download Snapchat Spotlight videos?', a: 'Yes. Paste the Spotlight link from the Snapchat web player and VidGrab saves the video as MP4.' }, { q: 'Can I download private Snaps?', a: 'No. Private Snaps and chats disappear by design and cannot be fetched. Only public Spotlight videos with a shareable link work.' }, { q: 'Do I need a Snapchat account?', a: 'No. You do not log in to Snapchat or to VidGrab.' }, { q: 'Will the person know I downloaded their Spotlight video?', a: 'Spotlight videos are public. Downloading one does not send the creator a notice, but reposting their work without credit is still poor form.' }]}
    />
  )
}
