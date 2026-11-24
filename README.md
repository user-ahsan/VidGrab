# VidGrab

VidGrab is a free video downloader hub. Paste a link, pick a quality, get the file. It covers eleven platforms — YouTube, Instagram, TikTok, Facebook, X, Pinterest, Reddit, Twitch, Vimeo, Snapchat, and Dailymotion — with no sign-up, no watermark on TikTok, MP4 video up to 4K, and MP3 audio up to 320kbps.

The downloader reference was an InstaYTDownload-style Instagram + YouTube downloader; VidGrab rebuilds that idea for eleven platforms instead of two.

## Owner

VidGrab is built and maintained by **Ahsan Ali** (Lahore, Pakistan).

- Email: ahsansheikhoffice@gmail.com
- GitHub: https://github.com/user-ahsan
- LinkedIn: https://www.linkedin.com/in/ahsan-ali-fullstack-dev/
- Portfolio: https://ahsanali.cc

## Platforms

| Platform | Page | Formats |
| --- | --- | --- |
| YouTube | `/youtube-downloader` | MP4 up to 4K, MP3 up to 320kbps |
| Instagram | `/instagram-downloader` | MP4 HD, JPG |
| TikTok | `/tiktok-downloader` | MP4 HD, no watermark, MP3 |
| Facebook | `/facebook-downloader` | MP4 HD |
| X | `/twitter-downloader` | MP4 HD, GIF |
| Pinterest | `/pinterest-downloader` | MP4 HD |
| Reddit | `/reddit-downloader` | MP4 HD with audio, MP3 |
| Twitch | `/twitch-downloader` | MP4 HD, MP3 |
| Vimeo | `/vimeo-downloader` | MP4 up to 4K |
| Snapchat | `/snapchat-downloader` | MP4 HD |
| Dailymotion | `/dailymotion-downloader` | MP4 HD |

There is also a dedicated converter at `/youtube-to-mp3`, and a `/blog` with guides for each platform.

## Tech stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS 4
- Framer Motion for animation
- yt-dlp for extraction and downloads
- Lenis smooth scrolling

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page auto-updates as you edit files under `app/`.

`yt-dlp` must be installed and on the `PATH` for downloads to work. On macOS `brew install yt-dlp`, on Debian/Ubuntu `sudo apt install yt-dlp`, or `pip install yt-dlp`.

```bash
npm run build
npm run start
```

## Deploy to Vercel

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new). Import this repository, keep the defaults (Next.js, `npm run build`), and deploy. Make sure the deployment environment has `yt-dlp` available, or the download endpoints will fail — see `app/api/` for how extraction is invoked.

## Legal note

VidGrab only downloads content that is already publicly accessible, and only for personal, lawful use. Downloading copyrighted material without permission, or redistributing downloaded content, may infringe copyright. Respect the terms of the platform you download from and the rights of the creator who made the video. See `/terms`, `/privacy`, and `/dmca` on the site.
