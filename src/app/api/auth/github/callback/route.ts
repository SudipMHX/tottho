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

  // CSRF check
  if (!code || !state || state !== savedState) {
    return NextResponse.redirect(`${APP_URL}/login?error=oauth_failed`)
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${APP_URL}/api/auth/github/callback`,
      }),
    })
    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token
    if (!accessToken) throw new Error('No access token')

    // 2. Get GitHub user info
    const [userRes, emailsRes] = await Promise.all([
      fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}`, 'User-Agent': 'Tottho' },
      }),
      fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}`, 'User-Agent': 'Tottho' },
      }),
    ])

    const ghUser = await userRes.json()
    const ghEmails: Array<{ email: string; primary: boolean; verified: boolean }> = await emailsRes.json()

    const primaryEmail = ghEmails.find((e) => e.primary && e.verified)?.email || ghUser.email
    if (!primaryEmail) throw new Error('No verified email')

    const oauthId = String(ghUser.id)
    const displayName = ghUser.name || ghUser.login || 'User'
    const avatar = ghUser.avatar_url || ''

    await connectDB()

    // 3. Find or create user
    let user = await User.findOne({ $or: [{ oauthId, oauthProvider: 'github' }, { email: primaryEmail }] })

    if (!user) {
      // Generate unique username
      const baseUsername = generateUsername(ghUser.login || displayName)
      let username = baseUsername
      let counter = 1
      while (await User.findOne({ username })) {
        username = `${baseUsername}${counter++}`
      }

      user = await User.create({
        email: primaryEmail,
        username,
        role: 'user',
        oauthProvider: 'github',
        oauthId,
        isEmailVerified: true, // GitHub verifies email
      })

      await Profile.create({
        userId: user._id,
        displayName,
        avatar,
      })
    } else if (!user.oauthId) {
      // Existing email account — link GitHub
      user.oauthProvider = 'github'
      user.oauthId = oauthId
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
    console.error('[github-oauth]', err)
    return NextResponse.redirect(`${APP_URL}/login?error=oauth_failed`)
  }
}
