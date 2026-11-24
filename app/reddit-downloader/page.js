import SeoDownloaderPage from '../components/SeoDownloaderPage'

export const metadata = {
  title: 'Reddit Video Downloader — Save Reddit Videos with Sound',
  description: 'Free Reddit video downloader. Save Reddit videos with sound in MP4, plus GIFs and images from any public post. No login, no app.',
  alternates: { canonical: 'https://vidgrab.vercel.app/reddit-downloader' },
}

export default function Page() {
  return (
    <SeoDownloaderPage
      platform='Reddit'
      slug='reddit-downloader'
      title='Reddit Video Downloader — Save Reddit Videos with Sound'
      description='Free Reddit video downloader. Save Reddit videos with sound in MP4, plus GIFs and images from any public post. No login, no app.'
      exampleUrl='https://www.reddit.com/r/videos/comments/abc123/example_post/'
      supports={['Reddit videos with sound', 'v.redd.it clips', 'GIF posts as MP4', 'Images and galleries', 'Audio-only as MP3']}
      formats={[{ format: 'MP4', quality: '1080p / 720p / 480p / 360p', bestFor: 'Watching offline, editing, sharing' }, { format: 'MP3', quality: 'Up to 320kbps', bestFor: 'Audio only — music, podcasts, lectures' }, { format: 'WEBM', quality: 'Up to 1080p', bestFor: 'Smaller files, browser playback' }]}
      faqs={[{ q: 'Why do Reddit videos often download without sound?', a: 'Reddit stores video and audio in separate files. Many tools only grab the video. VidGrab joins the two, so you get sound in the MP4.' }, { q: 'Can I download videos from any subreddit?', a: 'Any public subreddit, yes. Private subreddits and removed posts cannot be fetched.' }, { q: 'Does it work with v.redd.it links?', a: 'Yes. Paste the post link or the direct v.redd.it link — both work.' }, { q: 'Can I save Reddit images too?', a: 'Yes. Images and gallery posts save at full size from the same tool.' }]}
    />
  )
}
