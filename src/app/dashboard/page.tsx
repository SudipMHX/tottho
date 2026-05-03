import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import Link2 from '@/models/Link'
import { FiLink, FiLayout, FiSettings, FiBarChart2, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { MotionDiv } from '@/components/ui/MotionDiv'
import type { Metadata } from 'next'
import type { Variants } from 'framer-motion'

export const metadata: Metadata = { title: 'Dashboard' }

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

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
    <MotionDiv 
      className="p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <MotionDiv variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#f9fafb]">
            Hey, @{session.username} 👋
          </h1>
          <p className="text-[#9ca3af] text-sm mt-1">Here's how your page is doing</p>
        </div>
        <Link
          href={`/${session.username}`}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#e5e7eb] bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-[1px] transition-all"
        >
          <FiExternalLink />
          View my page
        </Link>
      </MotionDiv>

      {/* Quick links */}
      <MotionDiv variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 p-6 rounded-2xl bg-[#161b26] border border-white/5 hover:border-[#FF5240]/30 hover:shadow-[0_8px_30px_rgb(255,82,64,0.12)] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF5240]/10 flex items-center justify-center text-[#FF5240] group-hover:bg-[#FF5240] group-hover:text-white transition-all">
              <Icon size={18} />
            </div>
            <div>
              <p className="font-semibold text-[#e5e7eb] text-sm">{label}</p>
              <p className="text-xs text-[#9ca3af] mt-1">{desc}</p>
            </div>
            <div className="mt-auto pt-2 flex justify-end">
               <FiArrowRight className="text-white/20 group-hover:text-[#FF5240] transition-colors text-sm" />
            </div>
          </Link>
        ))}
      </MotionDiv>

      {/* Profile preview card */}
      <MotionDiv variants={itemVariants} className="p-6 rounded-2xl bg-[#161b26] border border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#f9fafb]">Your profile URL</h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-[#0f1117] border border-white/10">
          <div className="flex-1 font-mono text-sm text-[#93c5fd] truncate">
            {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/{session.username}
          </div>
          <Link
            href={`/${session.username}`}
            target="_blank"
            className="inline-flex shrink-0 items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-br from-[#FFA040] via-[#FF5240] to-[#FF3366] shadow-[0_4px_14px_0_rgb(255,82,64,0.39)] hover:shadow-[0_6px_20px_rgb(255,82,64,0.23)] hover:-translate-y-[1px] transition-all"
          >
            <FiExternalLink />
            Open
          </Link>
        </div>
        {linkCount === 0 && (
          <div className="mt-4 p-4 rounded-xl bg-[#92400e]/20 border border-[#92400e]/40 text-sm text-[#fcd34d]">
            Your page is empty! <Link href="/dashboard/links" className="font-semibold underline hover:text-white transition-colors">Add your first link</Link> to get started.
          </div>
        )}
      </MotionDiv>
    </MotionDiv>
  )
}
