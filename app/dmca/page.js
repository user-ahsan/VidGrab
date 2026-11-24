export const metadata = {
  title: 'DMCA Policy — VidGrab',
  description:
    'VidGrab DMCA takedown policy. How copyright owners can request removal, and how to contact us.',
  alternates: { canonical: 'https://vidgrab.vercel.app/dmca' },
}

export default function DmcaPage() {
  return (
    <main className="legal-page">
      <section className="section">
        <p className="section-label">VidGrab — Legal</p>
        <h1 className="section-h2 legal-h1">DMCA Policy</h1>
        <p className="section-lead">Last updated: 24 November 2026.</p>

        <div className="legal-body">
          <h2>Our position</h2>
          <p>
            VidGrab respects copyright. We do not host videos, we do not
            keep copies of downloaded files, and we do not run a library of
            content. The tool fetches a public link you paste and prepares a
            file for your browser. Even so, if you are a copyright owner and
            you believe your work is being misused through VidGrab, we will
            act on a proper notice.
          </p>

          <h2>How to send a takedown notice</h2>
          <p>
            Email your notice to{' '}
            <a href="mailto:ahsansheikhoffice@gmail.com">
              ahsansheikhoffice@gmail.com
            </a>{' '}
            with the subject line &ldquo;DMCA Takedown Request&rdquo;. Your
            notice should include:
          </p>
          <ul>
            <li>
              A description of the copyrighted work you own, with a link to
              the original where it is published.
            </li>
            <li>
              The exact URL on VidGrab or the exact link being misused, so we
              can find it.
            </li>
            <li>
              Your full name, address, phone number, and email address.
            </li>
            <li>
              A statement that you believe in good faith the use is not
              authorised by you, your agent, or the law.
            </li>
            <li>
              A statement, under penalty of perjury, that the information in
              your notice is accurate and that you are the copyright owner or
              authorised to act for the owner.
            </li>
            <li>Your physical or electronic signature.</li>
          </ul>

          <h2>What happens next</h2>
          <p>
            We review notices in the order they arrive. If a notice is
            complete, we will block the reported link or content from the
            tool where we are able to, and we will reply to the sender.
            Incomplete notices may be returned with a request for the missing
            details. We aim to respond within 5 business days.
          </p>

          <h2>Counter-notices</h2>
          <p>
            If you believe your content was blocked by mistake, you can send
            a counter-notice to the same email address with your name and
            contact details, a description of the blocked content, and a
            statement under penalty of perjury that the removal was a
            mistake. We will review it and restore access where the claim
            does not hold up.
          </p>

          <h2>Repeat misuse</h2>
          <p>
            Accounts and addresses tied to repeated misuse may be blocked
            from the tool.
          </p>

          <h2>Contact</h2>
          <p>
            DMCA notices only:{' '}
            <a href="mailto:ahsansheikhoffice@gmail.com">
              ahsansheikhoffice@gmail.com
            </a>
            . For anything else, see our{' '}
            <a href="/terms">Terms of Use</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
