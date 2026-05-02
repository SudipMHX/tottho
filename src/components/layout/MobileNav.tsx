'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { logout } from '@/app/actions/auth'
import {
  FiLink, FiLayout, FiSettings, FiBarChart2, FiHome, FiLogOut, FiShield, FiMenu, FiX,
} from 'react-icons/fi'

const navLinks = [
  { href: '/dashboard',            label: 'Home',       icon: FiHome },
  { href: '/dashboard/links',      label: 'Links',      icon: FiLink },
  { href: '/dashboard/appearance', label: 'Appearance', icon: FiLayout },
  { href: '/dashboard/settings',   label: 'Settings',   icon: FiSettings },
  { href: '/dashboard/analytics',  label: 'Analytics',  icon: FiBarChart2 },
]

export default function MobileNav({ username, role }: { username: string; role: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close on navigation
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === href : pathname.startsWith(href)

  return (
    <>
      {/* ── Top bar ── */}
      <header className="mobile-topbar">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white text-xs shrink-0" style={{ background: 'linear-gradient(135deg, #FFA040, #FF3366)' }}>
            <FiLink />
          </span>
          <span className="font-bold text-white text-sm tracking-tight">Tottho</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </header>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Slide-out drawer ── */}
      <div className={`mobile-drawer${open ? ' open' : ''}`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between mb-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm shrink-0" style={{ background: 'linear-gradient(135deg, #FFA040, #FF3366)' }}>
              <FiLink />
            </span>
            <span className="font-bold text-white">Tottho</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar-link${isActive(href) ? ' active' : ''}`}
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer bottom */}
        <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
          <Link href={`/${username}`} target="_blank" className="sidebar-link text-xs">
            <FiLink />
            View my page
          </Link>
          {role === 'admin' && (
            <Link href="/admin" className="sidebar-link text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-900/20">
              <FiShield />
              Admin Panel
            </Link>
          )}
          <form action={logout}>
            <button type="submit" className="sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20">
              <FiLogOut />
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* ── Bottom tab bar ── */}
      <nav className="mobile-tabbar">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`mobile-tab${isActive(href) ? ' active' : ''}`}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
