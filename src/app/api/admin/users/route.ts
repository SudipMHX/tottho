import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'

// GET /api/admin/users?page=1&search=
export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)
  const search = request.nextUrl.searchParams.get('search') || ''
  const limit = 20

  await connectDB()

  const query = search
    ? { $or: [{ username: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
    : {}

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    User.countDocuments(query),
  ])

  return Response.json({ users, total, pages: Math.ceil(total / limit) })
}

// PATCH /api/admin/users — ban/unban or promote user
export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { userId, action } = body as { userId: string; action: 'ban' | 'unban' | 'promote' }

  await connectDB()

  let update: Record<string, unknown> = {}
  if (action === 'ban') update = { isBanned: true }
  else if (action === 'unban') update = { isBanned: false }
  else if (action === 'promote') update = { role: 'admin' }
  else return Response.json({ error: 'Invalid action' }, { status: 400 })

  await User.findByIdAndUpdate(userId, update)
  return Response.json({ success: true })
}
