import Link from 'next/link'
import { getSession } from '@/lib/session'
import NavbarMobileMenu from './NavbarMobileMenu'
import Image from 'next/image'

export default async function Navbar() {
  const session = await getSession()
  const isLoggedIn = !!session

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/6"
      style={{ background: 'rgba(10,13,20,0.88)', backdropFilter: 'blur(18px)' }}
    >
      <div className="container-page">
        <nav className="flex h-16 items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg text-white shrink-0 hover:opacity-85 transition-opacity">
            <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
            <span>Tottho</span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 flex-1 ml-6">
            <Link href="/showcase" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Showcase
            </Link>
            <Link href="/theme" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Themes
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Desktop auth buttons — hidden on mobile */}
          <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
            {isLoggedIn ? (
              <Link href="/dashboard" className="btn btn-primary btn-sm">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm text-gray-400">Sign in</Link>
                <Link href="/register" className="btn btn-primary btn-sm">Get started free</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger (single button) — client component */}
          <NavbarMobileMenu isLoggedIn={isLoggedIn} />

        </nav>
      </div>
    </header>
  )
}
