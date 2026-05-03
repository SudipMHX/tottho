'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import {
  FiLink, FiLayout, FiSettings, FiBarChart2, FiHome, FiLogOut, FiShield,
  FiUsers, FiStar, FiFlag,
} from 'react-icons/fi'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

export { navLinks }

export default function DashboardSidebar({ username, role }: { username: string; role: string }) {
  const pathname = usePathname()

  const isAdminRoute = pathname.startsWith('/dashboard/admin')
  const currentLinks = isAdminRoute ? adminLinks : navLinks

  const isActive = (href: string) =>
    href === '/dashboard' || href === '/dashboard/admin' ? pathname === href : pathname.startsWith(href)

  const sidebarClasses = "hidden md:flex flex-col bg-[#030712] text-white sticky top-0 h-dvh overflow-y-auto overflow-x-hidden md:p-5 md:w-[64px] lg:w-[220px] lg:p-6 gap-1 border-r border-white/5 z-30"
  
  const linkBaseClasses = "flex items-center gap-3 p-2.5 rounded-xl text-[0.88rem] font-medium transition-all justify-center whitespace-nowrap lg:px-3.5 lg:justify-start hover:bg-white/5 hover:text-white"

  return (
    <motion.aside 
      className={sidebarClasses}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 font-display font-bold shrink-0 hover:opacity-85 transition-opacity mb-8">
        <Image src="/logo.png" alt="Logo" width={32} height={32} className="shrink-0" />
        <span className='hidden lg:inline text-white tracking-tight'>Tottho</span>
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {currentLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={label}
            className={`${linkBaseClasses} ${isActive(href) ? 'bg-gradient-to-br from-[#FFA040] via-[#FF5240] to-[#FF3366] text-white shadow-[0_4px_14px_0_rgb(255,82,64,0.39)]' : 'text-[#9ca3af]'}`}
          >
            <Icon className="shrink-0 text-lg" />
            <span className="hidden lg:inline font-semibold">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-1.5 pt-4 border-t border-white/10">
        <Link href={`/${username}`} target="_blank" title="View my page" className={`${linkBaseClasses} text-[#9ca3af]`}>
          <FiLink className="shrink-0 text-lg" />
          <span className="hidden lg:inline font-semibold">View my page</span>
        </Link>
        
        {isAdminRoute ? (
          <Link href="/dashboard" title="User dashboard" className={`${linkBaseClasses} text-[#9ca3af]`}>
            <FiHome className="shrink-0 text-lg" />
            <span className="hidden lg:inline font-semibold">User dashboard</span>
          </Link>
        ) : (
          role === 'admin' && (
            <Link href="/dashboard/admin" title="Admin Panel" className={`${linkBaseClasses} text-amber-400 hover:text-amber-300 hover:bg-amber-900/20`}>
              <FiShield className="shrink-0 text-lg" />
              <span className="hidden lg:inline font-semibold">Admin Panel</span>
            </Link>
          )
        )}
        <form action={logout}>
          <button type="submit" title="Sign out" className={`${linkBaseClasses} w-full text-red-400 hover:text-red-300 hover:bg-red-900/20`}>
            <FiLogOut className="shrink-0 text-lg" />
            <span className="hidden lg:inline font-semibold">Sign out</span>
          </button>
        </form>
      </div>
    </motion.aside>
  )
}
