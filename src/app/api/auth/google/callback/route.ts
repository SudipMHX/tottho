import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'
import { createSession } from '@/lib/session'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'http://localhost:3000'

function generateUsername(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 20) || 'user'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const cookieStore = await cookies()
  const savedState = cookieStore.get('oauth_state')?.value
  cookieStore.delete('oauth_state')

  if (!code || !state || state !== savedState) {
    return NextResponse.redirect(`${APP_URL}/login?error=oauth_failed`)
  }

  try {
    // 1. Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${APP_URL}/api/auth/google/callback`,
      }),
    })
    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token
    if (!accessToken) throw new Error('No access token')

    // 2. Get Google user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const gUser = await userRes.json()

    const { id: oauthId, email, name, picture, verified_email } = gUser
    if (!email || !verified_email) throw new Error('No verified email')

    const displayName = name || email.split('@')[0]

    await connectDB()

    // 3. Find or create user
    let user = await User.findOne({ $or: [{ oauthId, oauthProvider: 'google' }, { email }] })

    if (!user) {
      const baseUsername = generateUsername(displayName)
      let username = baseUsername
      let counter = 1
      while (await User.findOne({ username })) {
        username = `${baseUsername}${counter++}`
      }

      user = await User.create({
        email,
        username,
        role: 'user',
        oauthProvider: 'google',
        oauthId: String(oauthId),
        isEmailVerified: true, // Google pre-verifies
      })

      await Profile.create({
        userId: user._id,
        displayName,
        avatar: picture || '',
      })
    } else if (!user.oauthId) {
      user.oauthProvider = 'google'
      user.oauthId = String(oauthId)
      user.isEmailVerified = true
      await user.save()
    }

    if (user.isBanned) {
      return NextResponse.redirect(`${APP_URL}/login?error=banned`)
    }

    await createSession({
      userId: String(user._id),
      role: user.role,
      username: user.username,
      emailVerified: true,
    })

    return NextResponse.redirect(`${APP_URL}/dashboard`)
  } catch (err) {
    console.error('[google-oauth]', err)
    return NextResponse.redirect(`${APP_URL}/login?error=oauth_failed`)
  }
}
