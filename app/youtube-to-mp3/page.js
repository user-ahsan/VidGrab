import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'YouTube to MP3 — Convert YouTube Videos to MP3 Audio',
  description: 'Free YouTube to MP3 converter. Turn any public YouTube video into an MP3 up to 320kbps — music, podcasts, lectures. No login, no app.',
  alternates: { canonical: 'https://vidgrab.vercel.app/youtube-to-mp3' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='YouTube'
      slug='youtube-to-mp3'
      title='YouTube to MP3 — Convert YouTube Videos to MP3 Audio'
      description='Free YouTube to MP3 converter. Turn any public YouTube video into an MP3 up to 320kbps — music, podcasts, lectures. No login, no app.'
      exampleUrl='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      supports={['MP3 up to 320kbps', 'Music videos', 'Podcasts and interviews', 'Lectures and audiobooks', 'Long videos and mixes']}
      formats={[{ format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Music, podcasts, lectures' }, { format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching the full video offline' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'What bitrate is the MP3?', a: 'Up to 320kbps when the source audio supports it. Most YouTube audio converts cleanly at 192kbps or 320kbps.' }, { q: 'Can I convert long videos?', a: 'Yes. Long mixes, podcasts, and lectures convert the same way as short videos. Bigger files just take a little longer to prepare.' }, { q: 'Is YouTube to MP3 legal?', a: 'It depends on what you do with it. Saving audio you own, or audio under a Creative Commons licence, for personal use is fine. Downloading copyrighted music to share or sell is not. See our Terms page.' }, { q: 'Do I need to install anything?', a: 'No. The converter runs in your browser. Paste the link, pick MP3, and save the file.' }]}
    />
  )
}
