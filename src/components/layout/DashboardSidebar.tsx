'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import {
  FiLink, FiLayout, FiSettings, FiBarChart2, FiHome, FiLogOut, FiShield,
} from 'react-icons/fi'
import Image from 'next/image'

const navLinks = [
  { href: '/dashboard',            label: 'Home',       icon: FiHome },
  { href: '/dashboard/links',      label: 'Links',      icon: FiLink },
  { href: '/dashboard/appearance', label: 'Appearance', icon: FiLayout },
  { href: '/dashboard/settings',   label: 'Settings',   icon: FiSettings },
  { href: '/dashboard/analytics',  label: 'Analytics',  icon: FiBarChart2 },
]

export { navLinks }

export default function DashboardSidebar({ username, role }: { username: string; role: string }) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === href : pathname.startsWith(href)

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-display font-bold shrink-0 hover:opacity-85 transition-opacity">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
        <span className='text-white'>Tottho</span>
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1 mt-6">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={label}
            className={`sidebar-link${isActive(href) ? ' active' : ''}`}
          >
            <Icon />
            <span className="sidebar-label">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/10">
        <Link href={`/${username}`} target="_blank" title="View my page" className="sidebar-link text-xs">
          <FiLink />
          <span className="sidebar-label">View my page</span>
        </Link>
        {role === 'admin' && (
          <Link href="/admin" title="Admin Panel" className="sidebar-link text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-900/20">
            <FiShield />
            <span className="sidebar-label">Admin Panel</span>
          </Link>
        )}
        <form action={logout}>
          <button type="submit" title="Sign out" className="sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20">
            <FiLogOut />
            <span className="sidebar-label">Sign out</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
