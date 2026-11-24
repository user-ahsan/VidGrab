import { test, expect } from '@playwright/test'

// Public-domain video used as the live fixture everywhere in VidGrab.
const BIG_BUCK_BUNNY = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'

test.describe('VidGrab downloader', () => {
  test('homepage loads and shows the downloader', async ({ page }) => {
    await page.goto('/')
    const downloader = page.getByTestId('downloader')
    await expect(downloader).toBeVisible({ timeout: 30000 })
    await expect(page.getByPlaceholder(/paste a video link/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /^fetch$/i })).toBeVisible()
  })

  test('pasting a real YouTube URL returns formats OR an honest error', async ({ page }) => {
    test.setTimeout(180000)
    await page.goto('/')
    const input = page.getByPlaceholder(/paste a video link/i)
    await input.fill(BIG_BUCK_BUNNY)

    // Auto-detect badge should appear without fetching.
    await expect(page.getByTestId('platform-badge')).toContainText('YouTube')

    await page.getByRole('button', { name: /^fetch$/i }).click()

    // yt-dlp may be blocked or rate-limited by YouTube from this network,
    // so either outcome is acceptable — but one of them must be visible,
    // and the UI must never show a fake format list.
    const results = page.getByTestId('dl-results')
    const error = page.getByTestId('dl-error')
    await expect(results.or(error)).toBeVisible({ timeout: 90000 })

    if (await results.isVisible()) {
      await expect(results).toContainText('Big Buck Bunny')
      const formatButtons = page.locator('.dl-format')
      await expect(formatButtons.first()).toBeVisible()
      expect(await formatButtons.count()).toBeGreaterThan(0)
      console.log(`E2E: resolve succeeded — ${await formatButtons.count()} format buttons shown`)
    } else {
      const message = (await error.textContent()) || ''
      console.log(`E2E: resolve failed honestly with error: ${message}`)
      expect(message.trim().length).toBeGreaterThan(10)
    }
  })

  test('invalid URL shows an error, never a format list', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder(/paste a video link/i)
    await input.fill('https://example.com/not-a-video')
    await page.getByRole('button', { name: /^fetch$/i }).click()
    await expect(page.getByTestId('dl-error')).toBeVisible({ timeout: 15000 })
    await expect(page.getByTestId('dl-results')).toHaveCount(0)
  })

  // NOTE (2026-11-24): this test currently FAILS, but not because of the
  // Downloader component — every *-downloader page returns HTTP 500 from a
  // JSX syntax error in the page file itself (e.g. app/youtube-downloader/
  // page.js line 17: supports=[...] is missing its { } braces). Those pages
  // are owned by another worker and must not be edited here. This test will
  // go green once the page files are fixed; it is kept as-is so the failure
  // stays visible instead of being papered over.
  test('a downloader page loads', async ({ page }) => {
    await page.goto('/youtube-downloader')
    await expect(page.getByTestId('downloader')).toBeVisible({ timeout: 30000 })
  })
})
