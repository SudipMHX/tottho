import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

export async function GET() {
  const state = randomUUID()

  // Store state in a short-lived cookie for CSRF protection
  const cookieStore = await cookies()
  cookieStore.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/',
  })

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
    scope: 'read:user user:email',
    state,
  })

  redirect(`https://github.com/login/oauth/authorize?${params}`)
}
