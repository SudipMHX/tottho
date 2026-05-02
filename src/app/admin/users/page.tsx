import connectDB from '@/lib/db'
import User from '@/models/User'
import UserTable from '@/components/admin/UserTable'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Users' }

export default async function AdminUsersPage() {
  await connectDB()

  const [usersRaw, total] = await Promise.all([
    User.find().select('-password').sort({ createdAt: -1 }).limit(20).lean(),
    User.countDocuments(),
  ])

  const users = usersRaw.map((u) => ({
    _id: String(u._id),
    username: u.username,
    email: u.email,
    role: u.role,
    isBanned: u.isBanned,
    createdAt: u.createdAt?.toISOString() || new Date().toISOString(),
  }))

  const pages = Math.ceil(total / 20)

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all registered users</p>
      </div>
      <UserTable initialUsers={users} total={total} pages={pages} />
    </div>
  )
}
