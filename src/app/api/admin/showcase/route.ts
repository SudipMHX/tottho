import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import User from '@/models/User'

// GET /api/admin/showcase — all profiles with showcase status
export async function GET() {
  await connectDB()

  const profiles = await Profile.find({})
    .populate('userId', 'username email')
    .lean()

  return Response.json(profiles)
}

// PATCH /api/admin/showcase — toggle isShowcased
export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { profileId, isShowcased } = body as { profileId: string; isShowcased: boolean }

  await connectDB()
  await Profile.findByIdAndUpdate(profileId, { isShowcased })
  return Response.json({ success: true })
}
