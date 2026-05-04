'use client'

import { useState } from 'react'
import { FiSearch, FiLoader, FiChevronLeft, FiChevronRight, FiCheck, FiX } from 'react-icons/fi'
import { formatDate } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function UserTable({ initialUsers, total: initialTotal, pages: initialPages }: Props) {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(initialPages)
  const [totalUsers, setTotalUsers] = useState(initialTotal)
  
  // Track action confirmation: { userId, action }
  const [confirming, setConfirming] = useState<{ id: string, action: 'ban' | 'unban' | 'promote' } | null>(null)

  async function fetchUsers(q: string, p: number) {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users?search=${encodeURIComponent(q)}&page=${p}`)
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
        setTotalPages(data.pages)
        setTotalUsers(data.total)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(q: string) {
    setSearch(q)
    setPage(1)
    await fetchUsers(q, 1)
  }

  async function executeAction(userId: string, action: 'ban' | 'unban' | 'promote') {
    setConfirming(null)
    
    // Optimistic update
    setUsers(users.map(u => {
      if (u._id === userId) {
        if (action === 'ban') return { ...u, isBanned: true }
        if (action === 'unban') return { ...u, isBanned: false }
        if (action === 'promote') return { ...u, role: 'admin' }
      }
      return u
    }))
    
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action }),
    })
    
    // Background refresh to ensure consistency
    await fetchUsers(search, page)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            placeholder="Search users by username or email…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-400 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-white font-medium">{totalUsers}</span> total users
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="bg-gray-800/30 border-b border-gray-800">
              <tr>
                {['User', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-400">
                    <FiLoader className="animate-spin inline mr-2 text-xl" /> Loading users…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-500">
                    No users found matching "{search}"
                  </td>
                </tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {users.map((user) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-gray-800/40 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-white flex items-center gap-2">
                            @{user.username}
                            {user.role === 'admin' && (
                              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] uppercase px-2 py-0.5 rounded-full font-bold tracking-wider">Admin</span>
                            )}
                          </span>
                          <span className="text-gray-500 text-xs mt-1">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          user.isBanned 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.isBanned ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                          {user.isBanned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                          {confirming?.id === user._id ? (
                            <motion.div 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-2 bg-gray-800 rounded-lg p-1"
                            >
                              <span className="text-xs text-gray-300 px-2 font-medium">Confirm?</span>
                              <button 
                                onClick={() => executeAction(user._id, confirming.action)}
                                className={`p-1.5 rounded-md text-white ${confirming.action === 'ban' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                                title="Yes"
                              >
                                <FiCheck size={14} />
                              </button>
                              <button 
                                onClick={() => setConfirming(null)}
                                className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300"
                                title="Cancel"
                              >
                                <FiX size={14} />
                              </button>
                            </motion.div>
                          ) : (
                            <>
                              {user.isBanned ? (
                                <button 
                                  onClick={() => setConfirming({ id: user._id, action: 'unban' })} 
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                                >
                                  Restore
                                </button>
                              ) : (
                                <button 
                                  onClick={() => setConfirming({ id: user._id, action: 'ban' })} 
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                  Ban
                                </button>
                              )}
                              {user.role !== 'admin' && (
                                <button 
                                  onClick={() => setConfirming({ id: user._id, action: 'promote' })} 
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-purple-400 hover:bg-purple-500/10 transition-colors"
                                >
                                  Promote
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-gray-900/30 border border-gray-800 px-6 py-3 rounded-xl backdrop-blur-sm">
          <div className="text-sm text-gray-400">
            Page <span className="font-medium text-white">{page}</span> of <span className="font-medium text-white">{totalPages}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const p = Math.max(1, page - 1);
                setPage(p);
                fetchUsers(search, p);
              }}
              disabled={page === 1}
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-gray-800 transition-colors"
              aria-label="Previous page"
            >
              <FiChevronLeft size={16} />
            </button>
            
            <div className="items-center gap-1 hidden sm:flex">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p = i + 1;
                if (totalPages > 5) {
                  if (page > 3) p = page - 3 + i;
                  if (p > totalPages) p = totalPages - 5 + i + 1;
                }
                
                return (
                  <button
                    key={p}
                    onClick={() => { setPage(p); fetchUsers(search, p) }}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      p === page 
                        ? 'bg-white text-black' 
                        : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                const p = Math.min(totalPages, page + 1);
                setPage(p);
                fetchUsers(search, p);
              }}
              disabled={page === totalPages}
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-gray-800 transition-colors"
              aria-label="Next page"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
