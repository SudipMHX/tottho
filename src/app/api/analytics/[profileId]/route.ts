import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Analytics from '@/models/Analytics'
import Link from '@/models/Link'
import { getSession } from '@/lib/session'

// GET /api/analytics/[profileId]?days=7|30
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ profileId: string }> }
) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { profileId } = await params
  const days = parseInt(request.nextUrl.searchParams.get('days') || '7', 10)

  const dates: string[] = Array.from({ length: days }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (days - 1 - i))
    return d.toISOString().split('T')[0]
  })

  await connectDB()

  const records = await Analytics.find({
    profileId,
    date: { $in: dates },
  }).lean()

  // Map dates to view data
  const viewsData = dates.map((date) => {
    const rec = records.find((r) => r.date === date)
    return { date, views: rec?.views || 0 }
  })

  const totalViews = viewsData.reduce((sum, d) => sum + d.views, 0)

  // Sum all clickData
  const clickMap: Record<string, number> = {}
  for (const rec of records) {
    for (const cd of rec.clickData) {
      const id = String(cd.linkId)
      clickMap[id] = (clickMap[id] || 0) + cd.count
    }
  }

  // Top link
  const topLinkId = Object.entries(clickMap).sort((a, b) => b[1] - a[1])[0]?.[0]
  let topLink = null
  if (topLinkId) {
    topLink = await Link.findById(topLinkId).lean()
  }

  const totalClicks = Object.values(clickMap).reduce((a, b) => a + b, 0)

  return Response.json({ viewsData, totalViews, totalClicks, topLink })
}
