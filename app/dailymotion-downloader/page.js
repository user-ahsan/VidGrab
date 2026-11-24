import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Dailymotion Downloader — Save Dailymotion Videos in MP4',
  description: 'Free Dailymotion downloader. Save Dailymotion videos in MP4 up to 1080p, or pull the audio as MP3. No login, no app.',
  alternates: { canonical: 'https://vidgrab.vercel.app/dailymotion-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Dailymotion'
      slug='dailymotion-downloader'
      title='Dailymotion Downloader — Save Dailymotion Videos in MP4'
      description='Free Dailymotion downloader. Save Dailymotion videos in MP4 up to 1080p, or pull the audio as MP3. No login, no app.'
      exampleUrl='https://www.dailymotion.com/video/x8example'
      supports={['Dailymotion videos', 'Dailymotion playlists (per video)', '1080p and 720p MP4', 'MP3 audio from videos']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Can I download Dailymotion videos?', a: 'Yes. Paste the video link and pick a format. Public videos work in nearly every case.' }, { q: 'What quality can I get?', a: 'Up to the quality of the upload — usually 1080p or 720p. VidGrab lists what the source offers.' }, { q: 'Can I download a whole playlist at once?', a: 'Not in one click. Paste each video link from the playlist and save them one by one.' }, { q: 'Do I need an account?', a: 'No. No login and no app are needed.' }]}
    />
  )
}
