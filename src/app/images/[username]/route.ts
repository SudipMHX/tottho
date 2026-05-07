import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params
    await connectDB()

    const user = await User.findOne({ username, isBanned: false })
    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const profile = await Profile.findOne({ userId: user._id })
    if (!profile || !profile.avatar) {
      return new NextResponse('Avatar not found', { status: 404 })
    }

    // Fetch the image from the external URL (e.g., uploadthing)
    const response = await fetch(profile.avatar)
    if (!response.ok) {
      return new NextResponse('Failed to fetch image', { status: response.status })
    }

    // Proxy the response body as a stream
    const headers = new Headers(response.headers)
    // Add caching headers so it doesn't fetch from DB/Uploadthing every time
    headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
    // Remove headers that might cause issues when proxying
    headers.delete('content-encoding')
    headers.delete('content-length') // Length might change if we messed with it, though we aren't. Better to let Next handle it or stream it.

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  } catch (error) {
    console.error('Error proxying image:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
