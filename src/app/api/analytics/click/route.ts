import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Analytics from '@/models/Analytics'
import Link from '@/models/Link'
import Profile from '@/models/Profile'
import User from '@/models/User'

// POST /api/analytics/click — log a link click
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, linkId } = body

    if (!username || !linkId) {
      return Response.json({ error: 'username and linkId required' }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ username })
    if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

    const profile = await Profile.findOne({ userId: user._id })
    if (!profile) return Response.json({ error: 'Profile not found' }, { status: 404 })

    const today = new Date().toISOString().split('T')[0]

    // Increment link total clicks
    await Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } })

    // Upsert analytics: increment or add to clickData
    const existing = await Analytics.findOne({ profileId: profile._id, date: today })
    if (existing) {
      const clickEntry = existing.clickData.find((c) => String(c.linkId) === linkId)
      if (clickEntry) {
        await Analytics.updateOne(
          { profileId: profile._id, date: today, 'clickData.linkId': linkId },
          { $inc: { 'clickData.$.count': 1 } }
        )
      } else {
        await Analytics.updateOne(
          { profileId: profile._id, date: today },
          { $push: { clickData: { linkId, count: 1 } } }
        )
      }
    } else {
      await Analytics.create({
        profileId: profile._id,
        date: today,
        views: 0,
        clickData: [{ linkId, count: 1 }],
      })
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
