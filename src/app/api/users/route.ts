import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'

// GET /api/users?username=xxx — check username availability
export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')
  if (!username) {
    return Response.json({ error: 'Username is required' }, { status: 400 })
  }

  await connectDB()
  const existing = await User.findOne({ username: username.toLowerCase() })
  return Response.json({ available: !existing })
}
