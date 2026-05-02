import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import { getSession } from '@/lib/session'

// GET /api/profile — get current user's profile
export async function GET() {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const profile = await Profile.findOne({ userId: session.userId }).lean()
  return Response.json(profile)
}

// PATCH /api/profile — update profile fields
export async function PATCH(request: NextRequest) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const allowed = ['displayName', 'bio', 'avatar', 'theme', 'seoTitle', 'seoDescription']
  const update: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) update[key] = body[key]
  }

  await connectDB()
  const profile = await Profile.findOneAndUpdate(
    { userId: session.userId },
    update,
    { new: true }
  )
  return Response.json(profile)
}
