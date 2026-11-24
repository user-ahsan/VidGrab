import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Vimeo Downloader — Save Vimeo Videos in HD MP4',
  description: 'Free Vimeo downloader. Save public Vimeo videos in HD MP4 up to 1080p, or pull the audio as MP3. No login, no app.',
  alternates: { canonical: 'https://vidgrab.vercel.app/vimeo-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Vimeo'
      slug='vimeo-downloader'
      title='Vimeo Downloader — Save Vimeo Videos in HD MP4'
      description='Free Vimeo downloader. Save public Vimeo videos in HD MP4 up to 1080p, or pull the audio as MP3. No login, no app.'
      exampleUrl='https://vimeo.com/1000000000'
      supports={['Vimeo videos', 'Vimeo Staff Picks', 'Showcase videos', '1080p and 720p MP4', 'MP3 audio from videos']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Can I download Vimeo videos?', a: 'Yes, for public Vimeo videos. Paste the link and choose a quality. Private or password-protected videos cannot be fetched.' }, { q: 'What quality does Vimeo save at?', a: 'Up to 1080p for most public videos, and higher when the creator uploaded a higher-quality file and Vimeo offers it.' }, { q: 'Is Vimeo downloading legal?', a: 'Downloading for personal use is fine for videos you own or that carry a Creative Commons licence. Re-uploading someone else\'s film is not.' }, { q: 'Do I need a Vimeo account?', a: 'No. VidGrab does not ask for a login, and no app is needed.' }]}
    />
  )
}
