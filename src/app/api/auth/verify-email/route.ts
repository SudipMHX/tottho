import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import { createSession, getSession } from '@/lib/session'
import { sendWelcomeEmail } from '@/lib/email'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'http://localhost:3000'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token || token.length < 10) {
    return NextResponse.redirect(`${APP_URL}/verify-email?error=invalid`)
  }

  await connectDB()

  // Find by token (ignore expiry in query — check separately for clearer errors)
  const user = await User.findOne({ emailVerifyToken: token })

  if (!user) {
    // Token not found — check if the session user is already verified
    // (handles the case where user re-clicks the link after already verifying)
    const session = await getSession()
    if (session) {
      const verified = await User.findOne({ _id: session.userId, isEmailVerified: true })
      if (verified) {
        return NextResponse.redirect(`${APP_URL}/dashboard`)
      }
    }
    return NextResponse.redirect(`${APP_URL}/verify-email?error=invalid`)
  }

  // Check expiry
  if (user.emailVerifyExpires && user.emailVerifyExpires < new Date()) {
    return NextResponse.redirect(`${APP_URL}/verify-email?error=expired`)
  }

  // Mark verified, clear token
  user.isEmailVerified = true
  user.emailVerifyToken = null
  user.emailVerifyExpires = null
  await user.save()

  // Create upgraded session (allowed in Route Handlers ✓)
  await createSession({
    userId: String(user._id),
    role: user.role,
    username: user.username,
    emailVerified: true,
  })

  // Welcome email (non-blocking)
  sendWelcomeEmail(user.email, user.username).catch(() => {})

  return NextResponse.redirect(`${APP_URL}/dashboard`)
}
