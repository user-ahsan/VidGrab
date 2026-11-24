export const metadata = {
  title: 'Privacy Policy — VidGrab',
  description:
    'VidGrab privacy policy. No accounts, no URL logging, no tracking cookies. What you paste stays in your browser.',
  alternates: { canonical: 'https://vidgrab.vercel.app/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <section className="section">
        <p className="section-label">VidGrab — Legal</p>
        <h1 className="section-h2 legal-h1">Privacy Policy</h1>
        <p className="section-lead">Last updated: 24 November 2026.</p>

        <div className="legal-body">
          <h2>Short version</h2>
          <p>
            VidGrab does not have accounts, does not log the links you paste,
            and does not use cookies to track you. What you download is your
            business.
          </p>

          <h2>No accounts</h2>
          <p>
            There is no sign-up and no login. We do not ask for your name,
            email, phone number, or any platform password. There is nothing
            to create an account with, so there is no account data to leak.
          </p>

          <h2>Links you paste</h2>
          <p>
            The link you paste is used only to fetch the video or audio you
            asked for, in your browser session. We do not keep a log of
            URLs, and we do not build a history of what you download.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            VidGrab does not set tracking cookies and does not run
            advertising trackers. If the site ever adds basic, anonymous
            visit counts to see which pages people use, this page will say so
            first.
          </p>

          <h2>What your browser stores</h2>
          <p>
            Your browser may keep the downloaded file in your Downloads
            folder — that is your device, not our server. Clearing your
            browser history or downloads removes those local traces.
          </p>

          <h2>Third parties</h2>
          <p>
            Downloading a video means fetching it from the platform that
            hosts it, such as YouTube or TikTok. Those platforms have their
            own privacy policies, and their rules apply when you visit them.
            VidGrab does not share your data with advertisers.
          </p>

          <h2>Children</h2>
          <p>
            VidGrab is not aimed at children under 13, and we do not
            knowingly collect information from children.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions? Email{' '}
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
