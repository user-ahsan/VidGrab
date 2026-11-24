export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://vidgrab.vercel.app/sitemap.xml',
  }
}
