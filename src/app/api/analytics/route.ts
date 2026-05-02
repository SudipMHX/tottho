import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Analytics from '@/models/Analytics'
import Profile from '@/models/Profile'
import User from '@/models/User'

// POST /api/analytics — log a profile view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username } = body

    if (!username) return Response.json({ error: 'username required' }, { status: 400 })

    await connectDB()
    const user = await User.findOne({ username })
    if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

    const profile = await Profile.findOne({ userId: user._id })
    if (!profile) return Response.json({ error: 'Profile not found' }, { status: 404 })

    const today = new Date().toISOString().split('T')[0]

    await Analytics.findOneAndUpdate(
      { profileId: profile._id, date: today },
      { $inc: { views: 1 } },
      { upsert: true }
    )

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
