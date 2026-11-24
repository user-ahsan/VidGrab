import HomeClient from './HomeClient'
import { getStats } from './lib/stats'

/* VidGrab stats are static (see app/lib/stats.js); no live fetching. */
export const revalidate = 21600

export default async function Page() {
  const stats = await getStats()
  return <HomeClient stats={stats} />
}
