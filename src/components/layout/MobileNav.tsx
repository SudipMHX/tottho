'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { logout } from '@/app/actions/auth'
import {
  FiLink, FiLayout, FiSettings, FiBarChart2, FiHome, FiLogOut, FiShield, FiMenu, FiX,
  FiUsers, FiStar, FiFlag,
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/dashboard',            label: 'Home',       icon: FiHome },
  { href: '/dashboard/links',      label: 'Links',      icon: FiLink },
  { href: '/dashboard/appearance', label: 'Appearance', icon: FiLayout },
  { href: '/dashboard/settings',   label: 'Settings',   icon: FiSettings },
  { href: '/dashboard/analytics',  label: 'Analytics',  icon: FiBarChart2 },
]

const adminLinks = [
  { href: '/dashboard/admin',          label: 'Overview', icon: FiBarChart2 },
  { href: '/dashboard/admin/users',    label: 'Users',    icon: FiUsers },
  { href: '/dashboard/admin/showcase', label: 'Showcase', icon: FiStar },
  { href: '/dashboard/admin/reports',  label: 'Reports',  icon: FiFlag },
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

  const isAdminRoute = pathname.startsWith('/dashboard/admin')
  const currentLinks = isAdminRoute ? adminLinks : navLinks

  const isActive = (href: string) =>
    href === '/dashboard' || href === '/dashboard/admin' ? pathname === href : pathname.startsWith(href)

  const linkBaseClasses = "flex items-center gap-3 p-3 rounded-xl text-[0.88rem] font-medium transition-colors justify-start hover:bg-white/5 hover:text-white"
  const tabBaseClasses = "flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[0.625rem] font-medium transition-colors flex-1 hover:text-[#d1d5db]"

  return (
    <>
      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-[#030712] border-b border-white/5 flex items-center justify-between px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white text-xs shrink-0 bg-gradient-to-br from-[#FFA040] via-[#FF5240] to-[#FF3366]">
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

      <AnimatePresence>
        {open && (
          <>
            {/* ── Backdrop ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* ── Slide-out drawer ── */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-50 h-full w-[17rem] bg-[#030712] flex flex-col p-5 gap-1 md:hidden shadow-2xl border-r border-white/5"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-5">
                <Link href="/" className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm shrink-0 bg-gradient-to-br from-[#FFA040] via-[#FF5240] to-[#FF3366]">
                    <FiLink />
                  </span>
                  <span className="font-bold text-white tracking-tight">Tottho</span>
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
              <nav className="flex flex-col gap-1.5 flex-1">
                {currentLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${linkBaseClasses} ${isActive(href) ? 'bg-gradient-to-br from-[#FFA040] via-[#FF5240] to-[#FF3366] text-white shadow-[0_4px_14px_0_rgb(255,82,64,0.39)]' : 'text-[#9ca3af]'}`}
                  >
                    <Icon className="text-lg" />
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Drawer bottom */}
              <div className="flex flex-col gap-1.5 pt-4 border-t border-white/10">
                <Link href={`/${username}`} target="_blank" className={`${linkBaseClasses} text-[#9ca3af]`}>
                  <FiLink className="text-lg" />
                  View my page
                </Link>
                
                {isAdminRoute ? (
                  <Link href="/dashboard" className={`${linkBaseClasses} text-[#9ca3af]`}>
                    <FiHome className="text-lg" />
                    User dashboard
                  </Link>
                ) : (
                  role === 'admin' && (
                    <Link href="/dashboard/admin" className={`${linkBaseClasses} text-amber-400 hover:text-amber-300 hover:bg-amber-900/20`}>
                      <FiShield className="text-lg" />
                      Admin Panel
                    </Link>
                  )
                )}
                <form action={logout}>
                  <button type="submit" className={`${linkBaseClasses} w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20`}>
                    <FiLogOut className="text-lg" />
                    Sign out
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Bottom tab bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#030712] border-t border-white/5 flex items-center justify-around px-2 pb-safe md:hidden">
        {currentLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${tabBaseClasses} ${isActive(href) ? 'text-[#FF5240]' : 'text-[#6b7280]'}`}
          >
            <Icon className="text-lg" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
