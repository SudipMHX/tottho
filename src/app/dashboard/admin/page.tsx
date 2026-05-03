import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'
import LinkModel from '@/models/Link'
import Analytics from '@/models/Analytics'
import { FiUsers, FiLink, FiLayout, FiUserPlus } from 'react-icons/fi'
import { MotionDiv } from '@/components/ui/MotionDiv'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Overview' }

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default async function AdminPage() {
  await connectDB()

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const [totalUsers, totalProfiles, totalLinks, newSignups] = await Promise.all([
    User.countDocuments(),
    Profile.countDocuments(),
    LinkModel.countDocuments(),
    User.countDocuments({ createdAt: { $gte: yesterday } }),
  ])

  const stats = [
    { label: 'Total users', value: totalUsers, icon: FiUsers, color: 'bg-[#FF5240]' },
    { label: 'Active profiles', value: totalProfiles, icon: FiLayout, color: 'bg-purple-600' },
    { label: 'Total links', value: totalLinks, icon: FiLink, color: 'bg-emerald-600' },
    { label: 'New (24h)', value: newSignups, icon: FiUserPlus, color: 'bg-amber-500' },
  ]

  return (
    <MotionDiv
      className="p-4 md:p-8 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <MotionDiv variants={itemVariants} className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">Admin Overview</h1>
        <p className="text-[#9ca3af] text-sm mt-1">Site-wide statistics</p>
      </MotionDiv>

      <MotionDiv variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex flex-col p-6 rounded-2xl bg-[#161b26] border border-white/5 shadow-sm hover:border-white/10 transition-colors">
            <div className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center mb-4 shadow-lg`}>
              <Icon size={18} />
            </div>
            <p className="text-2xl font-bold text-[#f9fafb] mb-1">{value.toLocaleString()}</p>
            <p className="text-sm text-[#9ca3af]">{label}</p>
          </div>
        ))}
      </MotionDiv>
    </MotionDiv>
  )
}
