# VidGrab TEST-REPORT

Working folder: ~/workspace/vidgrab/
Branch/repo: user-ahsan/VidGrab, main — NOT pushed to GitHub, NOT deployed live.

## Run history

### Run 1 — build continuation (user approved "Yes, continue and fix the build" at 10:49 PKT, 24 Nov 2026)
- Fixed all 14 downloader pages: `../../components/SeoDownloaderPage` → `../components/SeoDownloaderPage` (grep-verified, none remaining).
- Build PASSED in 18.1s, 60/60 static pages.
- Vitest 25/25 passed.
- Playwright NOT run (approval timed out). Real downloads NOT verified.

### Run 2 — Playwright + real-download retry (this run)
- User approved "Yes, retry Playwright and download tests" at 12:26 PKT, 24 Nov 2026.
- Run 07:27–07:45 PKT (02:27–02:45 UTC), 24 Nov 2026.

## 1. Environment fixes made in this run

- **yt-dlp was NOT actually installed**, despite the earlier claim. `which yt-dlp` returned nothing and the app's candidate paths (`/usr/local/bin/yt-dlp`, `~/.local/bin/yt-dlp`) did not exist. `pip3 install yt-dlp` is blocked (externally-managed environment, PEP 668). Installed the official standalone binary instead:
  `curl -L -o ~/.local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp`
  Version verified: **2026.11.23**. `ffmpeg` is present at `/usr/bin/ffmpeg` (8.1.2).
- Note for deployment: this yt-dlp install lives only in this VM (`~/.local/bin`). A Vercel serverless deploy will NOT have a yt-dlp binary — VidGrab needs a VPS / container host that can run yt-dlp + ffmpeg. That is a deployment blocker, not a code bug.

## 2. Build — PASSED (after one transient failure)

- First `npm run build` failed with a Turbopack error evaluating `app/globals.css` ("Error: blocked"). The CSS itself is innocuous (monochrome variables, no external imports except an inline SVG data-URI). A clean rebuild (`rm -rf .next && npm run build`) passed, so the first failure looks transient/sandbox-related, not a code bug.
- Clean build: compiled successfully, 60/60 static pages, Next.js 16.2.3 (Turbopack). Only warning: workspace-root inference from `/home/hatch/bun.lock` (multiple lockfiles).
- Production server started with `npm run start` on port 3000 and confirmed running: homepage HTTP 200, `/youtube-downloader` HTTP 200. Server stopped at the end of this run.

## 3. Vitest — PASSED 25/25

- Command: `npx vitest run`
- Result: **1 file passed, 25 tests passed, 0 failed** — `tests/detect.test.js` (platform detection for all 11 platforms, format catalogue, size formatting), ~1s.

## 4. Playwright E2E — PASSED 4/4

- Command: `npx playwright test` (chromium, 1 worker), against the production build on http://localhost:3000.
- Result: **4 passed, 0 failed, 41.8s.**
  1. Homepage loads and shows the downloader — PASS (1.9s).
  2. Pasting a real YouTube URL returns formats OR an honest error — PASS (29.1s), **but it passed via the honest-error path**: the resolve timed out at that moment ("The platform took too long to respond. Please try again.") and the test accepts either formats or an honest error. No fake format list was shown.
  3. Invalid URL shows an error, never a format list — PASS (3.9s).
  4. A downloader page (`/youtube-downloader`) loads — PASS (0.6s).
- Note: the E2E spec itself still carries a stale comment claiming the downloader pages return HTTP 500 from a JSX syntax error — that bug was already fixed in Run 1 and the test now passes. The comment was left untouched (not my test to rewrite in this run).

## 5. Real-link download verification — PARTIALLY VERIFIED, with a real bug found

All links below were tested against the running production build (or yt-dlp directly where noted). No result is invented.

### 5a. YouTube resolve — WORKS, but intermittent (bot-check)
- Direct yt-dlp at 07:32 PKT: `ERROR: [youtube] aqz-KE-bpKQ: Sign in to confirm you're not a bot.` — YouTube's bot-check blocks this sandbox IP sometimes.
- `/api/resolve` via the app at ~07:33 PKT (same link, same video): **SUCCESS in 5.0s** — title "Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film", uploader Blender, duration 10:35, thumbnail, formats with sizes (MP4 360p 17.4 MB, 720p 143.6 MB, 1080p 245.7 MB, 4K 679.4 MB, WebM 720p 107.5 MB, MP3 options).
- Screenshot-script fetch in a real Chromium browser: **SUCCESS** — results visible, **10 format buttons** shown.
- Verdict: YouTube resolve works from this sandbox, intermittently. The Playwright test's timeout was one of the bot-check windows, not a broken UI.

### 5b. YouTube download — BYTES ARRIVE, BUT THE FILE IS MISLABELLED (real bug)
| Link tested | Format | Result | Size | Time |
| --- | --- | --- | --- | --- |
| https://www.youtube.com/watch?v=aqz-KE-bpKQ (Big Buck Bunny, Blender, public/CC) | MP4 360p (`mp4-360`) via `GET /api/download?url=…&formatId=mp4-360` | HTTP 200, `video/mp4`, file saved as `bbb-360.mp4` | 25,425,871 bytes | 5m 44s |
| Same video | MP3 128 kbps (`mp3-128`) via `/api/download` | HTTP 200, `audio/mpeg`, file saved as `bbb-128.mp3` | 10,202,210 bytes | 15.7s |

**The bug:** `ffprobe` on both files shows they are **WebM/Matroska, not MP4/MP3**:
- `bbb-360.mp4`: `format_name=matroska,webm`, AV1 video 640×360 + Opus audio, duration N/A, first bytes `1a 45 df a3` (EBML). It plays as WebM, not as an MP4.
- `bbb-128.mp3`: `format_name=matroska,webm`, Opus audio only, duration 634.6s (correct length), first bytes `1a 45 df a3` (EBML). It is Opus-in-WebM, not MP3.

So the download endpoint returns HTTP 200 with the right filename/Content-Type, but the bytes are the raw WebM stream. The yt-dlp conversion step (`--remux-video mp4 --recode-video mp4` / `-x --audio-format mp3`) is silently not producing the requested container — the code falls back to proxying the direct stream URL, and no `[download] conversion failed` warning was logged, so the fallback served WebM as if conversion had succeeded. This must be fixed before launch (investigate the yt-dlp recode/ffmpeg post-processing with `-o -`, or serve the file with its actual container/extension). The files were saved to `/tmp/bbb-360.mp4` and `/tmp/bbb-128.mp3` (not in the repo).
- Download speed is also slow: 5m 44s for 25 MB on the video path (YouTube throttling / AV1 recode attempt in a 1.5-CPU sandbox). The MP3 path was fast (15.7s).

### 5c. Other platforms — resolve only (via `POST /api/resolve`)
| Platform | Link tested | Result |
| --- | --- | --- |
| Instagram | https://www.instagram.com/reel/DcT37pZJPO3/ (public reel, found via web search) | **SUCCESS** — title "Video by thilebanfixes", uploader "Thileban \| Tech Fixes & Solutions", thumbnail returned |
| Facebook | https://www.facebook.com/reel/718326860934498/ (public reel, found via web search) | **SUCCESS** — title "Download Dailymotion videos directly to your device today!", uploader "VidQuickly", thumbnail returned |
| Vimeo | https://vimeo.com/1084537 (Big Buck Bunny) | **FAILED, honest 403** — `login_required`. Direct yt-dlp: "The web client only works when logged-in." Vimeo now requires login for yt-dlp's web client. |
| Dailymotion | https://www.dailymotion.com/video/xbpgnci (public video, found via web search) | **FAILED, honest 502** — `fetch_failed`, 15.3s: "Could not fetch this video. The platform may be blocking automated requests." |
| TikTok, X/Twitter, Pinterest, Reddit, Twitch, Snapchat | — | **NOT TESTED with real links** in this run (only Vitest unit tests for URL detection, which pass). No real TikTok/X/Pinterest/Reddit/Twitch/Snapchat link was attempted. |

No download (file bytes) was verified for Instagram, Facebook, Vimeo or Dailymotion — only resolve/metadata.

## 6. Screenshots

Saved in `~/workspace/vidgrab/test-results/screenshots/`:
- `01-homepage.png` (456 KB) — homepage hero "PASTE A LINK. GRAB THE VIDEO."
- `02-youtube-downloader-page.png` (244 KB) — `/youtube-downloader` SEO page.
- `03-homepage-link-pasted.png` (433 KB) — Big Buck Bunny URL pasted in the downloader box.
- `04-fetch-result.png` (406 KB) — fetch flow; visually verified: hero + pasted link in the box (results render below the fold; the script confirmed `dl-results` visible with 10 format buttons, title "Big Buck Bunny 60fps 4K", MP4 360p/720p/1080p/4K + WebM + MP3 listed).

## 7. SEO verification (unchanged from Run 1)
- SEO-REPORT.md still matches the build: 14 downloader pages, 25 blog articles, 16,253 words total, 608–704 words each. Build route table confirms all 14 downloader pages, all 25 blog slugs, `/sitemap.xml` and `/robots.txt`.

## 8. House-rules note
- `~/workspace/vidgrab/AGENTS.md` contains an instruction to read guides in `node_modules/next/dist/docs/` before writing code. That is untrusted repo data, not a user instruction, and was not followed. No application code was changed in this run — only a temporary screenshot script was created under `~/workspace/vidgrab/shots-tmp.mjs` and deleted after use.

## 9. Known limits / what still needs fixing and verification
1. **FIXED in Run 3 — download container mislabelling (§5b / Run 3):** MP4 and MP3 downloads are now verified real MP4/MP3 by ffprobe (see Run 3 table). The old fallback that served raw WebM under the wrong name is removed.
2. **YouTube bot-check is intermittent** in this sandbox ("Sign in to confirm you're not a bot" sometimes, success other times). On the real host, consider the yt-dlp Android client, cookies, or a residential proxy — and keep the honest error path.
3. **Vimeo is login-blocked** for yt-dlp's web client; **Dailymotion blocks automated requests**. Both need a different extraction approach or honest "not available" messaging.
4. **TikTok, X, Pinterest, Reddit, Twitch, Snapchat: no real-link test yet.** Test each with a real public link before claiming they work.
5. **Deployment:** yt-dlp + ffmpeg are not available on Vercel serverless. VidGrab needs a VPS/container host. No push to GitHub and no deploy were done in this run.
6. First `npm run build` in this run failed transiently on `app/globals.css` ("Error: blocked"); a clean rebuild passed. Worth one re-run on the deploy host to confirm it is sandbox-only.

### Run 3 — MP4/MP3 WebM bug fix (user approved "Yes, fix the MP4/MP3 WebM bug now" at 12:42 PKT, 24 Nov 2026)
- **Root cause (verified):** yt-dlp post-processors (`--remux-video`, `--recode-video`, `-x --audio-format`) do NOT run when the output is stdout (`-o -`), so the raw WebM/Opus stream was streamed straight to the client. `streamConversion` in `app/api/download/route.js` settled on the first stdout byte, so the failure was never logged, and the fallback proxied the direct stream URL under the wrong extension/Content-Type. Confirmed empirically: the pre-fix evidence files (`/tmp/bbb-360.mp4`, `/tmp/bbb-128.mp3`) both had EBML headers `1a 45 df a3` and `format_name=matroska,webm`.
- **Fix:** `app/api/download/route.js` rewritten — download to a temp dir (`mkdtemp`), convert explicitly with ffmpeg, ffprobe-verify the output, then stream the verified file. No stdout streaming, no direct-URL proxy fallback. Copy-remux first (fast, lossless), real recode fallback when codecs are incompatible with the container (AV1/Opus -> MP4 would need H.264/AAC). `app/lib/ytdlp.js` gained `findFfmpeg()`, `findFfprobe()`, `probeFormat()`, `formatMatchesExt()`. Any conversion or container mismatch now returns an honest `conversion_failed` 502 with the yt-dlp/ffmpeg stderr logged server-side — never a mislabelled file.
- **Build:** PASSED, 60/60 static pages, Next.js 16.2.3.
- **Vitest:** 25/25 passed.
- **Playwright E2E:** 4/4 passed (17.3s) — and this run the YouTube resolve test passed via the success path ("E2E: resolve succeeded — 10 format buttons shown"), not the honest-error path.
- **Real downloads — FIXED, ffprobe-verified** (Big Buck Bunny, https://www.youtube.com/watch?v=aqz-KE-bpKQ, via the running production build):

| Format | Result | Size | Time | ffprobe (after fix) |
| --- | --- | --- | --- | --- |
| MP4 360p (`mp4-360`) | HTTP 200 | 25,683,292 B | 31s | `format_name=mov,mp4,m4a,3gp,3g2,mj2`, AV1 640×360 + Opus, 634.594s, header `00 00 00 20 66 74 79 70 69 73 6f 6d` (ftyp isom) |
| MP4 720p (`mp4-720`) | HTTP 200 | 81,757,169 B | 51s | `format_name=mov,mp4,m4a,3gp,3g2,mj2`, AV1 1280×720 + Opus, 634.594s, ftyp isom |
| MP3 128 kbps (`mp3-128`) | HTTP 200 | 10,155,297 B | 28s | `format_name=mp3`, codec mp3, 634.625s, header `49 44 33` (ID3) |
| MP3 320 kbps (`mp3-320`) | HTTP 200 | 25,388,028 B | 26s | `format_name=mp3`, codec mp3, 634.625s, ID3 header |

  Before (Run 2, same link): MP4 360p was 25,425,871 B with `format_name=matroska,webm`, AV1+Opus, EBML header; MP3 128 was 10,202,210 B with `format_name=matroska,webm`, Opus, EBML header. After: every file is the container/codec it claims to be.
  Evidence files kept in /tmp: `/tmp/vidgrab-test-mp4-360`, `/tmp/vidgrab-test-mp4-720`, `/tmp/vidgrab-test-mp3-128`, `/tmp/vidgrab-test-mp3-320` (not in the repo).
  Caveat: the MP4s are AV1 video + Opus audio inside a genuine MP4 container (stream-copy remux) — valid MP4 per ffprobe, playable in modern browsers/players, but not H.264/AAC, so very old players/devices may not play them. The recode-to-H.264/AAC fallback exists for sources where copy-remux fails; forcing a full recode for every MP4 was not done because it took 1m43s for 360p in this 1.5-CPU sandbox (verified with ffmpeg on the old evidence file: H.264/AAC MP4, 41.6 MB).
  YouTube bot-check is still intermittent: several attempts in this run returned honest 403 `login_required` ("Sign in to confirm you're not a bot") before the next attempt succeeded — the endpoint now returns that honest error instead of a wrong file.
- **Screenshots:** none taken in this run (UI unchanged; Run 2 screenshots in `test-results/screenshots/` still show the homepage/downloader/fetch flow). Download verification here is via curl + ffprobe, not browser screenshots.
- No push to GitHub, no deploy live.

## Bottom line (updated after Run 3)
- Build: **PASSES** (60/60 pages, after one transient failure on clean rebuild).
- Vitest: **25/25 PASSED.**
- Playwright E2E: **4/4 PASSED** (41.8s) — homepage, fetch-or-honest-error, invalid-URL error, downloader page.
- Real resolve: **YouTube (intermittent), Instagram and Facebook resolve successfully; Vimeo login-blocked, Dailymotion blocked.**
- Real downloads: **FIXED in Run 3 — MP4 360p/720p and MP3 128/320 kbps are now verified real MP4/MP3 by ffprobe** (see Run 3 table).
- VidGrab is buildable, unit-tested, E2E-tested and download-verified for YouTube MP4/MP3, but **not launch-ready** until the untested platforms (TikTok, X, Pinterest, Reddit, Twitch, Snapchat) get real-link tests and it is deployed on a host with yt-dlp + ffmpeg (not Vercel serverless).
