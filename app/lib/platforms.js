// VidGrab — per-platform catalogue used by the SEO downloader pages.
// Example URLs are placeholders showing the URL shape for each platform;
// only the YouTube one (Big Buck Bunny, public domain) is a real video.
// Do not present the placeholder IDs as real posts.

import { PLATFORM_META } from './detect.js'

function entry(slug, overrides) {
  const meta = PLATFORM_META[slug]
  return {
    slug: meta.slug,
    name: meta.label,
    label: meta.label,
    domains: meta.domains,
    ...overrides,
  }
}

export const PLATFORMS = [
  entry('youtube', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 360p', 'MP4 720p', 'MP4 1080p', 'MP4 4K', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    exampleNote: 'Real public-domain video: Big Buck Bunny (Blender Foundation).',
    seoTitle: 'YouTube Video Downloader — Download YouTube Videos in MP4, MP3 & 4K',
    seoDescription:
      'Download YouTube videos in MP4 360p, 720p, 1080p and 4K, extract MP3 audio, or save the thumbnail. Paste a link — no account, no app, no watermark.',
    faq: [
      { q: 'How do I download a YouTube video with VidGrab?', a: 'Paste the YouTube link into the box above, click Fetch, then pick a format such as MP4 720p or MP3 192 kbps. The file downloads straight from your browser.' },
      { q: 'Can I download YouTube videos in 4K?', a: 'Yes — if the video was uploaded in 4K, the MP4 4K option appears in the format list. If it is not listed, the source video simply has no 4K version.' },
      { q: 'Can I convert YouTube videos to MP3?', a: 'Yes. Choose MP3 128, 192 or 320 kbps under Audio and VidGrab extracts the audio track for you.' },
      { q: 'Do I need to install anything or sign in?', a: 'No. VidGrab works in the browser with no account, no app install and no login. Private, age-restricted and login-only videos cannot be downloaded.' },
    ],
  }),
  entry('instagram', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.instagram.com/reel/EXAMPLE_ID/',
    exampleNote: 'Example URL shape — replace EXAMPLE_ID with a real public reel ID.',
    seoTitle: 'Instagram Video Downloader — Download Reels & Videos in MP4',
    seoDescription:
      'Download Instagram reels and videos in MP4 HD, extract the audio as MP3, or save the cover thumbnail. Paste a public reel link — no login required.',
    faq: [
      { q: 'How do I download an Instagram reel?', a: 'Copy the reel link from Instagram, paste it into VidGrab, click Fetch, then choose an MP4 quality. The reel downloads without a watermark.' },
      { q: 'Can I download private Instagram videos?', a: 'No. Only public posts can be fetched. Private accounts and login-only content are not supported.' },
      { q: 'Does VidGrab save the reel without a watermark?', a: 'Yes — VidGrab fetches the source media file, so there is no added watermark or overlay.' },
      { q: 'Can I download just the audio from a reel?', a: 'Yes. Pick MP3 or M4A under Audio and only the sound track is downloaded.' },
    ],
  }),
  entry('tiktok', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.tiktok.com/@example/video/EXAMPLE_ID',
    exampleNote: 'Example URL shape — replace with a real public TikTok video URL.',
    seoTitle: 'TikTok Video Downloader — Download TikTok Videos Without Watermark',
    seoDescription:
      'Download TikTok videos without watermark in MP4 HD, save the audio as MP3, or grab the thumbnail. Paste any public TikTok link — no app needed.',
    faq: [
      { q: 'How do I download a TikTok video without watermark?', a: 'Paste the TikTok link into VidGrab and click Fetch. The MP4 options are the source video, so they come without the TikTok watermark.' },
      { q: 'Do I need the TikTok app to download a video?', a: 'No. VidGrab runs in your browser — copy the link from TikTok and paste it here.' },
      { q: 'Can I download TikTok audio as MP3?', a: 'Yes. Use the MP3 128, 192 or 320 kbps options under Audio.' },
      { q: 'Why does a TikTok link fail to fetch?', a: 'The video may be private, deleted, region-restricted, or the creator may have disabled downloads. Only public, available videos can be fetched.' },
    ],
  }),
  entry('facebook', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 360p', 'MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.facebook.com/reel/EXAMPLE_ID/',
    exampleNote: 'Example URL shape — replace with a real public Facebook reel or video URL.',
    seoTitle: 'Facebook Video Downloader — Download Facebook Videos & Reels in MP4',
    seoDescription:
      'Download Facebook videos and reels in MP4 up to 1080p, extract MP3 audio, or save the thumbnail. Works with public video and reel links.',
    faq: [
      { q: 'How do I download a Facebook video?', a: 'Copy the link of a public Facebook video or reel, paste it into VidGrab, click Fetch, then pick your MP4 quality.' },
      { q: 'Can I download videos from private Facebook groups?', a: 'No. Only public videos can be fetched. Private groups, friends-only posts and login-only content are not supported.' },
      { q: 'Does it work with Facebook reels?', a: 'Yes — facebook.com/reel links are supported the same way as regular video links.' },
      { q: 'Is there a file size limit?', a: 'No fixed limit in VidGrab, but very long videos take longer to prepare. The file size is shown next to each format when the source reports it.' },
    ],
  }),
  entry('twitter', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 360p', 'MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://x.com/example/status/EXAMPLE_ID',
    exampleNote: 'Example URL shape — replace with a real public post URL (x.com or twitter.com).',
    seoTitle: 'X (Twitter) Video Downloader — Download Twitter Videos in MP4',
    seoDescription:
      'Download videos from X (Twitter) posts in MP4, extract the audio as MP3, or save the thumbnail. Paste the post link — no account needed.',
    faq: [
      { q: 'How do I download a video from X (Twitter)?', a: 'Copy the link of the post containing the video, paste it into VidGrab, click Fetch, then choose an MP4 quality.' },
      { q: 'Does it work with both twitter.com and x.com links?', a: 'Yes. Both domains are recognised, as are mobile.twitter.com links.' },
      { q: 'Can I download a video from a protected account?', a: 'No. Only public posts can be fetched. Protected accounts and deleted posts will show an honest error.' },
      { q: 'Can I save just the audio from an X video?', a: 'Yes — pick MP3 or M4A under Audio after fetching the post.' },
    ],
  }),
  entry('pinterest', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.pinterest.com/pin/EXAMPLE_ID/',
    exampleNote: 'Example URL shape — replace with a real public pin URL (pin.it links also work).',
    seoTitle: 'Pinterest Video Downloader — Download Pinterest Videos & Pins in MP4',
    seoDescription:
      'Download Pinterest videos and video pins in MP4 HD or save the pin image. Paste a pin or pin.it link — no login required.',
    faq: [
      { q: 'How do I download a Pinterest video?', a: 'Copy the pin link (or short pin.it link), paste it into VidGrab, click Fetch, then choose an MP4 quality.' },
      { q: 'Does VidGrab work with pin.it short links?', a: 'Yes. Short pin.it links are recognised and expanded automatically.' },
      { q: 'Can I download Pinterest images too?', a: 'Yes — for image pins, use the Thumbnail option to save the full-size image.' },
      { q: 'Do I need a Pinterest account?', a: 'No. Public pins can be fetched without signing in to Pinterest.' },
    ],
  }),
  entry('reddit', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 360p', 'MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.reddit.com/r/videos/comments/EXAMPLE_ID/example/',
    exampleNote: 'Example URL shape — replace with a real public Reddit post URL.',
    seoTitle: 'Reddit Video Downloader — Download Reddit Videos in MP4 with Audio',
    seoDescription:
      'Download Reddit videos in MP4 with sound, extract the audio as MP3, or save the thumbnail. Paste any public Reddit post link.',
    faq: [
      { q: 'How do I download a Reddit video with sound?', a: 'Paste the Reddit post link, click Fetch, then pick an MP4 option. VidGrab merges the video and audio tracks, so the download has sound.' },
      { q: 'Why do some Reddit downloads have no sound?', a: 'Reddit stores video and audio separately. VidGrab merges them; if a format still has no audio, the source post itself has no audio track.' },
      { q: 'Can I download videos from private subreddits?', a: 'No. Only public posts can be fetched. Private or quarantined subreddits are not supported.' },
      { q: 'Does it work with redd.it short links?', a: 'Yes — redd.it short links are recognised alongside full reddit.com URLs.' },
    ],
  }),
  entry('twitch', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 360p', 'MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.twitch.tv/videos/EXAMPLE_ID',
    exampleNote: 'Example URL shape — replace with a real public Twitch VOD or clip URL.',
    seoTitle: 'Twitch Video Downloader — Download Twitch Clips & VODs in MP4',
    seoDescription:
      'Download Twitch clips and VODs in MP4 up to 1080p, extract the audio as MP3, or save the thumbnail. Paste a clip or VOD link.',
    faq: [
      { q: 'How do I download a Twitch clip?', a: 'Copy the clip link (clips.twitch.tv or twitch.tv clip URL), paste it into VidGrab, click Fetch, then choose an MP4 quality.' },
      { q: 'Can I download full Twitch VODs?', a: 'Yes, public VODs are supported. Long VODs are large files and take longer to prepare.' },
      { q: 'Can I download subscriber-only VODs?', a: 'No. Subscriber-only and deleted VODs cannot be fetched.' },
      { q: 'Can I save just the audio of a Twitch clip?', a: 'Yes — pick MP3 or M4A under Audio after fetching the clip.' },
    ],
  }),
  entry('vimeo', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 360p', 'MP4 720p', 'MP4 1080p', 'MP4 4K', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://vimeo.com/EXAMPLE_ID',
    exampleNote: 'Example URL shape — replace with a real public Vimeo video URL.',
    seoTitle: 'Vimeo Video Downloader — Download Vimeo Videos in MP4 & 4K',
    seoDescription:
      'Download Vimeo videos in MP4 360p to 4K, extract MP3 audio, or save the thumbnail. Paste a public Vimeo link — no account needed.',
    faq: [
      { q: 'How do I download a Vimeo video?', a: 'Paste the Vimeo link into VidGrab, click Fetch, then pick an MP4 quality up to the highest the video was uploaded in.' },
      { q: 'Can I download Vimeo videos in 4K?', a: 'Yes, when the uploader provided a 4K version — the MP4 4K option appears in the list only if it exists.' },
      { q: 'Can I download password-protected Vimeo videos?', a: 'No. Password-protected and private Vimeo videos cannot be fetched.' },
      { q: 'Can I extract audio from a Vimeo video?', a: 'Yes — choose MP3 or M4A under Audio after fetching the video.' },
    ],
  }),
  entry('snapchat', {
    supports: ['video', 'thumbnail'],
    formats: ['MP4 720p', 'MP4 1080p', 'WebM', 'Thumbnail'],
    exampleUrl: 'https://www.snapchat.com/spotlight/EXAMPLE_ID',
    exampleNote: 'Example URL shape — replace with a real public Snapchat Spotlight URL.',
    seoTitle: 'Snapchat Video Downloader — Download Snapchat Spotlight Videos in MP4',
    seoDescription:
      'Download public Snapchat Spotlight videos in MP4 HD or save the thumbnail. Paste a Spotlight link — no account needed.',
    faq: [
      { q: 'How do I download a Snapchat Spotlight video?', a: 'Copy the Spotlight link from Snapchat, paste it into VidGrab, click Fetch, then choose an MP4 quality.' },
      { q: 'Can I download snaps from private stories?', a: 'No. Only public Spotlight videos can be fetched. Private stories and snaps that need a login are not supported.' },
      { q: 'Does it work with snapchat.com/spotlight links?', a: 'Yes — Spotlight links are the supported Snapchat URL shape.' },
      { q: 'Why does a Snapchat link fail?', a: 'The Spotlight video may have expired, been removed, or be region-restricted. Only currently public Spotlight videos can be fetched.' },
    ],
  }),
  entry('dailymotion', {
    supports: ['video', 'audio', 'thumbnail'],
    formats: ['MP4 360p', 'MP4 720p', 'MP4 1080p', 'WebM', 'MP3 128/192/320 kbps', 'M4A', 'Thumbnail'],
    exampleUrl: 'https://www.dailymotion.com/video/EXAMPLE_ID',
    exampleNote: 'Example URL shape — replace with a real public Dailymotion video URL.',
    seoTitle: 'Dailymotion Video Downloader — Download Dailymotion Videos in MP4',
    seoDescription:
      'Download Dailymotion videos in MP4 up to 1080p, extract MP3 audio, or save the thumbnail. Paste a public Dailymotion link.',
    faq: [
      { q: 'How do I download a Dailymotion video?', a: 'Paste the Dailymotion link into VidGrab, click Fetch, then pick an MP4 or WebM quality.' },
      { q: 'Can I download Dailymotion videos in HD?', a: 'Yes — up to 1080p when the video was uploaded in HD. The available qualities are listed after fetching.' },
      { q: 'Can I convert Dailymotion videos to MP3?', a: 'Yes. Choose MP3 128, 192 or 320 kbps under Audio.' },
      { q: 'Do I need a Dailymotion account?', a: 'No. Public videos can be fetched without signing in. Private or age-restricted videos cannot be downloaded.' },
    ],
  }),
]

export function getPlatform(slug) {
  return PLATFORMS.find((p) => p.slug === slug) || null
}
