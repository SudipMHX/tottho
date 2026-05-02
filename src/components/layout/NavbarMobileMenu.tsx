'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiLayout, FiLogIn, FiUserPlus, FiBookOpen, FiInfo } from 'react-icons/fi'

const navLinks = [
  { href: '/showcase', label: 'Showcase', icon: FiBookOpen },
  { href: '/about',    label: 'About',    icon: FiInfo },
]

export default function NavbarMobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Single hamburger — visible on mobile only */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex md:hidden ml-auto items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
      >
        {open ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-down drawer */}
      <div
        className={`
          fixed left-0 right-0 z-50 md:hidden
          border-b border-white/8
          p-5
          transition-all duration-250 ease-in-out
          ${open
            ? 'top-16 opacity-100 pointer-events-auto translate-y-0'
            : 'top-16 opacity-0 pointer-events-none -translate-y-3'
          }
        `}
        style={{ background: 'rgba(10,13,20,0.97)', backdropFilter: 'blur(24px)' }}
      >
        {/* Nav links */}
        <nav className="flex flex-col gap-1 mb-4">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/6 transition-colors"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="h-px bg-white/8 mb-4" />

        {/* Auth */}
        <div className="flex flex-col gap-2">
          {isLoggedIn ? (
            <Link href="/dashboard" className="btn btn-primary w-full justify-center" onClick={() => setOpen(false)}>
              <FiLayout size={16} /> Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary w-full justify-center" onClick={() => setOpen(false)}>
                <FiLogIn size={16} /> Sign in
              </Link>
              <Link href="/register" className="btn btn-primary w-full justify-center" onClick={() => setOpen(false)}>
                <FiUserPlus size={16} /> Get started free
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
