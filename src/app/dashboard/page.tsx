import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import Link2 from '@/models/Link'
import { FiLink, FiLayout, FiSettings, FiBarChart2, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  await connectDB()
  const profile = await Profile.findOne({ userId: session.userId }).lean()
  const linkCount = await Link2.countDocuments({ userId: session.userId })
  const activeLinks = await Link2.countDocuments({ userId: session.userId, isActive: true })

  const quickLinks = [
    { href: '/dashboard/links', label: 'Manage Links', icon: FiLink, desc: `${linkCount} links (${activeLinks} active)` },
    { href: '/dashboard/appearance', label: 'Change Theme', icon: FiLayout, desc: 'Choose from 5 beautiful themes' },
    { href: '/dashboard/settings', label: 'Edit Profile', icon: FiSettings, desc: 'Update bio, avatar, SEO' },
    { href: '/dashboard/analytics', label: 'View Analytics', icon: FiBarChart2, desc: 'Views, clicks, top links' },
  ]

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hey, @{session.username} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's how your page is doing</p>
        </div>
        <Link
          href={`/${session.username}`}
          target="_blank"
          className="btn btn-secondary btn-sm"
        >
          <FiExternalLink />
          View my page
        </Link>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="card hover:shadow-md hover:border-[#FF5240]/20 transition-all group flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF5240]/10 flex items-center justify-center text-[#FF5240] group-hover:bg-[#FF5240] group-hover:text-white transition-all">
              <Icon />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <FiArrowRight className="text-gray-300 group-hover:text-[#FF5240] transition-colors text-sm" />
          </Link>
        ))}
      </div>

      {/* Profile preview card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Your profile URL</h2>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex-1 font-mono text-sm text-gray-700 truncate">
            {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/{session.username}
          </div>
          <Link
            href={`/${session.username}`}
            target="_blank"
            className="btn btn-primary btn-sm shrink-0"
          >
            <FiExternalLink />
            Open
          </Link>
        </div>
        {linkCount === 0 && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
            Your page is empty! <Link href="/dashboard/links" className="font-semibold underline">Add your first link</Link> to get started.
          </div>
        )}
      </div>
    </div>
  )
}
