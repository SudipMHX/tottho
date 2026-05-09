import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import User from '@/models/User'

// GET /api/admin/showcase?page=1&search=&filter=all
export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)
  const search = request.nextUrl.searchParams.get('search') || ''
  const filter = request.nextUrl.searchParams.get('filter') || 'all'
  const limit = 20

  await connectDB()

  let matchingUserIds = null
  if (search) {
    const users = await User.find({ username: new RegExp(search, 'i') }).select('_id').lean()
    matchingUserIds = users.map(u => u._id)
  }

  interface ProfileQuery {
    isShowcased?: boolean;
    $or?: Array<Record<string, unknown>>;
  }
  const query: ProfileQuery = {}
  
  if (filter === 'featured') {
    query.isShowcased = true
  } else if (filter === 'not_featured') {
    query.isShowcased = false
  }

  if (search) {
    query.$or = [
      { displayName: new RegExp(search, 'i') }
    ]
    if (matchingUserIds && matchingUserIds.length > 0) {
      query.$or.push({ userId: { $in: matchingUserIds } })
    }
  }

  const [profilesRaw, total] = await Promise.all([
    Profile.find(query)
      .populate<{ userId: { username: string, email: string } }>('userId', 'username email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Profile.countDocuments(query),
  ])

  const serialized = profilesRaw.map((p) => ({
    _id: String(p._id),
    displayName: p.displayName || '',
    bio: p.bio || '',
    avatar: p.avatar || '',
    isShowcased: p.isShowcased,
    username: p.userId?.username || '',
  }))

  return Response.json({ profiles: serialized, total, pages: Math.ceil(total / limit) })
}

// PATCH /api/admin/showcase — toggle isShowcased
export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { profileId, isShowcased } = body as { profileId: string; isShowcased: boolean }

  await connectDB()
  await Profile.findByIdAndUpdate(profileId, { isShowcased })
  return Response.json({ success: true })
}
