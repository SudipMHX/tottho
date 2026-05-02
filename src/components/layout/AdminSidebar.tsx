'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import {
  FiUsers, FiStar, FiFlag, FiBarChart2, FiHome, FiLogOut, FiLink,
} from 'react-icons/fi'

const links = [
  { href: '/admin',          label: 'Overview', icon: FiBarChart2 },
  { href: '/admin/users',    label: 'Users',    icon: FiUsers },
  { href: '/admin/showcase', label: 'Showcase', icon: FiStar },
  { href: '/admin/reports',  label: 'Reports',  icon: FiFlag },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <Link href="/" className="flex items-center gap-2 px-2 mb-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm shrink-0" style={{ background: 'linear-gradient(135deg, #FFA040, #FF3366)' }}>
          <FiLink />
        </span>
        <span className="font-display font-bold text-white text-base">Admin</span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === '/admin' ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link${active ? ' active' : ''}`}
            >
              <Icon />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/10">
        <Link href="/dashboard" className="sidebar-link text-xs">
          <FiHome />
          User dashboard
        </Link>
        <form action={logout}>
          <button type="submit" className="sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20">
            <FiLogOut />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
