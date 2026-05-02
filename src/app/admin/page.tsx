import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'
import LinkModel from '@/models/Link'
import Analytics from '@/models/Analytics'
import { FiUsers, FiLink, FiLayout, FiUserPlus } from 'react-icons/fi'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Overview' }

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
    { label: 'Total users',     value: totalUsers,    icon: FiUsers,    color: 'bg-[#FF5240]' },
    { label: 'Active profiles', value: totalProfiles,  icon: FiLayout,   color: 'bg-purple-600' },
    { label: 'Total links',     value: totalLinks,     icon: FiLink,     color: 'bg-emerald-600' },
    { label: 'New (24h)',       value: newSignups,     icon: FiUserPlus, color: 'bg-amber-500' },
  ]

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Site-wide statistics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card">
            <div className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center mb-3`}>
              <Icon />
            </div>
            <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
