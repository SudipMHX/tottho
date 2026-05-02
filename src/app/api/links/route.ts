import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Link from '@/models/Link'
import { getSession } from '@/lib/session'

// GET /api/links — get current user's links
export async function GET() {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const links = await Link.find({ userId: session.userId }).sort({ order: 1 }).lean()
  return Response.json(links)
}

// POST /api/links — add a link
export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, url, icon } = body

  if (!title || !url) {
    return Response.json({ error: 'Title and URL are required' }, { status: 400 })
  }

  await connectDB()
  const count = await Link.countDocuments({ userId: session.userId })
  const link = await Link.create({
    userId: session.userId,
    title,
    url,
    icon: icon || 'FaLink',
    order: count,
  })

  return Response.json(link, { status: 201 })
}

// PATCH /api/links — reorder links
export async function PATCH(request: NextRequest) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { linkIds } = body as { linkIds: string[] }

  if (!Array.isArray(linkIds)) {
    return Response.json({ error: 'linkIds array required' }, { status: 400 })
  }

  await connectDB()
  await Promise.all(
    linkIds.map((id, index) =>
      Link.findOneAndUpdate({ _id: id, userId: session.userId }, { order: index })
    )
  )

  return Response.json({ success: true })
}
