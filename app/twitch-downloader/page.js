import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Twitch Clip Downloader — Save Twitch Clips & VODs in MP4',
  description: 'Free Twitch clip downloader. Save Twitch clips and VODs in MP4 up to 1080p60. No login, no app, no watermark.',
  alternates: { canonical: 'https://vidgrab.vercel.app/twitch-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Twitch'
      slug='twitch-downloader'
      title='Twitch Clip Downloader — Save Twitch Clips & VODs in MP4'
      description='Free Twitch clip downloader. Save Twitch clips and VODs in MP4 up to 1080p60. No login, no app, no watermark.'
      exampleUrl='https://www.twitch.tv/example/clip/ExampleClip-abc123'
      supports={['Twitch clips', 'VODs and past broadcasts', 'Highlights', '1080p60 where posted', 'MP3 audio from clips']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Can I download Twitch clips?', a: 'Yes. Paste the clip link and pick a quality. Clips save as MP4 files you can keep or edit.' }, { q: 'Can I download full VODs?', a: 'Yes, for VODs that are public and still on Twitch. Long streams take longer to prepare, so pick a quality and give it a moment.' }, { q: 'What quality do Twitch downloads come in?', a: 'Up to the quality of the broadcast — often 1080p60 for partnered streams. VidGrab lists the qualities the source offers.' }, { q: 'Do I need a Twitch account?', a: 'No. No login is needed, and subscriber-only VODs cannot be fetched without the streamer\'s permission anyway.' }]}
    />
  )
}
