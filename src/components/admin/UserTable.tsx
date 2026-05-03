'use client'

import { useState } from 'react'
import { FiSearch, FiLoader } from 'react-icons/fi'
import { formatDate } from '@/lib/utils'

type User = {
  _id: string
  username: string
  email: string
  role: 'user' | 'admin'
  isBanned: boolean
  createdAt: string
}

type Props = {
  initialUsers: User[]
  total: number
  pages: number
}

export default function UserTable({ initialUsers, total, pages }: Props) {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  async function fetchUsers(q: string, p: number) {
    setLoading(true)
    const res = await fetch(`/api/admin/users?search=${encodeURIComponent(q)}&page=${p}`)
    const data = await res.json()
    setUsers(data.users)
    setLoading(false)
  }

  async function handleSearch(q: string) {
    setSearch(q)
    setPage(1)
    await fetchUsers(q, 1)
  }

  async function handleAction(userId: string, action: 'ban' | 'unban' | 'promote') {
    if (!confirm(`Are you sure you want to ${action} this user?`)) return
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action }),
    })
    await fetchUsers(search, page)
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          className="input !pl-9"
          placeholder="Search users…"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="text-xs text-gray-400 mb-3">{total} total users</div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 border-b border-gray-200">
              <tr>
                {['Username', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    <FiLoader className="animate-spin inline mr-2" />Loading…
                  </td>
                </tr>
              ) : users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-800 transition-colors border-b border-gray-700">
                  <td className="px-4 py-3 font-medium text-white">@{user.username}</td>
                  <td className="px-4 py-3 text-gray-400">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${user.role === 'admin' ? 'badge-purple' : 'badge-gray'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${user.isBanned ? 'badge-red' : 'badge-green'}`}>
                      {user.isBanned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {user.isBanned ? (
                        <button onClick={() => handleAction(user._id, 'unban')} className="btn btn-xs badge-green text-emerald-700">
                          Restore
                        </button>
                      ) : (
                        <button onClick={() => handleAction(user._id, 'ban')} className="btn btn-danger btn-xs">
                          Ban
                        </button>
                      )}
                      {user.role !== 'admin' && (
                        <button onClick={() => handleAction(user._id, 'promote')} className="btn btn-xs badge-purple text-purple-700">
                          Promote
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => { setPage(p); fetchUsers(search, p) }}
              className={`btn btn-xs ${p === page ? 'btn-primary' : 'btn-secondary'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
