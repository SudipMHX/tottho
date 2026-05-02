import { NextRequest } from 'next/server'
import connectDB from '@/lib/db'
import Link from '@/models/Link'
import { getSession } from '@/lib/session'

// PATCH /api/links/[id] — update a link
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()

  await connectDB()
  const link = await Link.findOneAndUpdate(
    { _id: id, userId: session.userId },
    body,
    { new: true }
  )

  if (!link) return Response.json({ error: 'Link not found' }, { status: 404 })
  return Response.json(link)
}

// DELETE /api/links/[id] — delete a link
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  await connectDB()
  await Link.findOneAndDelete({ _id: id, userId: session.userId })
  return Response.json({ success: true })
}
