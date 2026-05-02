import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

const protectedRoutes = ['/dashboard']
const adminRoutes = ['/admin']
const authRoutes = ['/login', '/register', '/forgot-password']
const verifyRoutes = ['/verify-email']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('session')?.value
  const session = await decrypt(sessionCookie)

  // Redirect logged-in & verified users away from auth pages
  if (authRoutes.some((r) => pathname.startsWith(r)) && session?.emailVerified) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect dashboard routes — must be logged in
  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Logged in but email not verified — send to pending page
    if (!session.emailVerified) {
      return NextResponse.redirect(new URL('/verify-email/pending', request.url))
    }
  }

  // Allow verify-email routes through for everyone
  if (verifyRoutes.some((r) => pathname.startsWith(r))) {
    // If already verified, bounce to dashboard
    if (session?.emailVerified) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Protect admin routes — must have role=admin
  if (adminRoutes.some((r) => pathname.startsWith(r))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (session.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Admin API protection
  if (pathname.startsWith('/api/admin')) {
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/auth/verify-email',
    '/verify-email/:path*',
    '/verify-email',
    '/login',
    '/register',
    '/forgot-password',
  ],
}
