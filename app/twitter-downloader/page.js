import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Twitter Video Downloader — Save X Videos & GIFs in MP4',
  description: 'Free Twitter video downloader for X. Save videos and GIFs from public posts in MP4, in the best quality posted. No login, no app.',
  alternates: { canonical: 'https://vidgrab.vercel.app/twitter-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='X (Twitter)'
      slug='twitter-downloader'
      title='Twitter Video Downloader — Save X Videos & GIFs in MP4'
      description='Free Twitter video downloader for X. Save videos and GIFs from public posts in MP4, in the best quality posted. No login, no app.'
      exampleUrl='https://x.com/example/status/1700000000000000000'
      supports={['Videos from posts', 'Animated GIFs as MP4', 'Videos from Spaces replays', 'Quote-post videos', 'MP3 audio from videos']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Does this work for X (Twitter)?', a: 'Yes. VidGrab works with x.com links and old twitter.com links. Paste either one — both point to the same post.' }, { q: 'What quality will the video be?', a: 'X compresses uploads, so most videos save at 720p. VidGrab gives you the best version the post actually contains.' }, { q: 'Can I download GIFs from X?', a: 'Yes. GIFs on X are short looping videos, so they save as MP4 files that play and loop the same way.' }, { q: 'Do I need to log in to X?', a: 'No. VidGrab never asks for your X login. The post must be public; posts from protected accounts cannot be fetched.' }]}
    />
  )
}
