export const metadata = {
  title: 'Terms of Use — VidGrab',
  description:
    'VidGrab terms of use. Download only content you own, content shared under a Creative Commons licence, or public content the owner allows you to save.',
  alternates: { canonical: 'https://vidgrab.vercel.app/terms' },
}

export default function TermsPage() {
  return (
    <main className="legal-page">
      <section className="section">
        <p className="section-label">VidGrab — Legal</p>
        <h1 className="section-h2 legal-h1">Terms of Use</h1>
        <p className="section-lead">Last updated: 24 November 2026.</p>

        <div className="legal-body">
          <h2>What VidGrab is</h2>
          <p>
            VidGrab is a free browser tool that saves public videos and audio
            from links you paste in. You paste a link, pick a format, and the
            file downloads to your device. There is no account, no login, and
            nothing to install.
          </p>

          <h2>What you may download</h2>
          <p>
            Only download content you have the right to save. That means
            videos you recorded or own, videos shared under a Creative
            Commons licence, and public videos the owner has made available
            for saving. Do not use VidGrab to copy work you do not own and
            then re-upload it, sell it, or pass it off as your own.
          </p>

          <h2>Respect copyright and platform rules</h2>
          <p>
            Copyright belongs to the person who made the video. Downloading a
            video for your own offline viewing is one thing. Re-posting it,
            putting it in a paid course, or using it in an ad without
            permission is another. You are responsible for following the
            copyright law where you live and the terms of the platform the
            video came from. If a creator asks you not to use their work, do
            not use it.
          </p>

          <h2>No affiliation</h2>
          <p>
            VidGrab is not affiliated with, endorsed by, or connected to
            YouTube, Instagram, TikTok, Facebook, X (Twitter), Pinterest,
            Reddit, Twitch, Vimeo, Snapchat, or Dailymotion. Those names and
            logos belong to their owners. VidGrab is an independent tool made
            by Ahsan Ali.
          </p>

          <h2>No login, no storage</h2>
          <p>
            VidGrab does not ask you to log in to any platform, and it does
            not store the links you paste. Files are prepared for your
            browser and downloaded to your device. We do not keep a library
            of your downloads.
          </p>

          <h2>Fair use</h2>
          <p>
            Do not abuse the tool. Do not use it to harass anyone, to grab
            private content, or to hammer a platform with automated requests.
            We may block use that looks abusive.
          </p>

          <h2>As-is</h2>
          <p>
            VidGrab is provided as-is. Platforms change their pages often,
            so a link that works today may stop working tomorrow. We do not
            promise that every link will work, and we are not liable for
            files you download or for how you use them.
          </p>

          <h2>Changes</h2>
          <p>
            These terms may change from time to time. The date at the top
            shows the latest version. If you keep using VidGrab after a
            change, you accept the new terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{' '}
            <a href="mailto:ahsansheikhoffice@gmail.com">
              ahsansheikhoffice@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
