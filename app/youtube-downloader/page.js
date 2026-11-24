import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'YouTube Downloader — Save YouTube Videos in MP4 & MP3',
  description: 'Free YouTube downloader. Save any public YouTube video in MP4 up to 1080p or pull the audio as MP3. No login, no app, no watermark.',
  alternates: { canonical: 'https://vidgrab.vercel.app/youtube-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='YouTube'
      slug='youtube-downloader'
      title='YouTube Downloader — Save YouTube Videos in MP4 & MP3'
      description='Free YouTube downloader. Save any public YouTube video in MP4 up to 1080p or pull the audio as MP3. No login, no app, no watermark.'
      exampleUrl='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      supports={['YouTube videos', 'YouTube Shorts', 'Music videos', 'Live replays (VODs)', 'Lectures and tutorials', 'MP3 audio from any video']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Is the YouTube downloader free?', a: 'Yes. VidGrab is free to use. There is no account, no daily cap on the tool itself, and no card needed. Paste a link and download.' }, { q: 'What quality can I download?', a: 'Up to the quality of the original upload — usually 1080p, 720p, 480p, or 360p. A video uploaded in 720p cannot be saved in 1080p.' }, { q: 'Can I download YouTube Shorts?', a: 'Yes. Paste a Shorts link the same way as a normal video link. Shorts save as vertical MP4 files that play on any phone.' }, { q: 'Do I need to install anything?', a: 'No. VidGrab runs in your browser on Android, iPhone, Windows, and Mac. Nothing to install and nothing to log in to.' }]}
    />
  )
}
