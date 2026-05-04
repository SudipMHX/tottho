'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FiStar, FiExternalLink, FiSearch, FiFilter, FiLoader, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

type Profile = {
  _id: string
  displayName: string
  bio: string
  avatar: string
  isShowcased: boolean
  username: string
}

type Props = {
  initialProfiles: Profile[]
  initialTotal: number
  initialPages: number
}

export default function ShowcaseGrid({ initialProfiles, initialTotal, initialPages }: Props) {
  const [profiles, setProfiles] = useState(initialProfiles)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // 'all', 'featured', 'not_featured'
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(initialTotal)
  const [pages, setPages] = useState(initialPages)

  // Use debounce for search
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const isMounted = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    fetchProfiles(debouncedSearch, filter, 1)
    setPage(1)
  }, [debouncedSearch, filter])

  async function fetchProfiles(q: string, f: string, p: number) {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/showcase?search=${encodeURIComponent(q)}&filter=${f}&page=${p}`)
      if (res.ok) {
        const data = await res.json()
        setProfiles(data.profiles)
        setTotal(data.total)
        setPages(data.pages)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggle(profileId: string, current: boolean) {
    // Optimistic update
    setProfiles((prev) =>
      prev.map((p) => (p._id === profileId ? { ...p, isShowcased: !current } : p))
    )

    await fetch('/api/admin/showcase', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, isShowcased: !current }),
    })
    
    // Refresh quietly
    fetchProfiles(debouncedSearch, filter, page)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 flex-1">
          <div className="relative w-full sm:max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="Search profiles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative flex-shrink-0 w-full sm:w-auto">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <FiFilter />
            </div>
            <select
              className="w-full sm:w-auto appearance-none bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Profiles</option>
              <option value="featured">Featured Only</option>
              <option value="not_featured">Not Featured</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-gray-400 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-800 self-start sm:self-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <span className="text-white font-medium">{total}</span> total
        </div>
      </div>

      {/* Grid */}
      {loading && profiles.length === 0 ? (
        <div className="flex justify-center py-20 text-gray-400">
          <FiLoader className="animate-spin text-2xl" />
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-gray-800 border-dashed">
          <p className="text-gray-500">No profiles found matching your criteria.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {profiles.map((profile) => (
              <motion.div 
                key={profile._id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-4 rounded-2xl w-full flex items-center gap-3 border ${profile.isShowcased ? 'border-amber-500/30 bg-amber-500/5' : 'border-gray-800 bg-gray-900/50'} backdrop-blur-xl transition-all hover:bg-gray-800/80`}
              >
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.displayName || profile.username}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-gray-800"
                    unoptimized
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFA040] to-purple-600 flex items-center justify-center text-white font-bold shrink-0 ring-2 ring-gray-800 shadow-inner">
                    {(profile.displayName || profile.username)[0]?.toUpperCase()}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate flex items-center gap-1.5">
                    {profile.displayName || profile.username}
                  </p>
                  <p className="text-xs text-gray-400 truncate">@{profile.username}</p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/${profile.username}`} target="_blank" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" title="View Profile">
                    <FiExternalLink />
                  </Link>
                  <button
                    onClick={() => handleToggle(profile._id, profile.isShowcased)}
                    className={`p-2 rounded-lg transition-colors ${profile.isShowcased ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    title={profile.isShowcased ? 'Unfeature from Showcase' : 'Feature on Showcase'}
                  >
                    <FiStar className={profile.isShowcased ? 'fill-current' : ''} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between bg-gray-900/30 border border-gray-800 px-6 py-3 rounded-xl backdrop-blur-sm mt-2">
          <div className="text-sm text-gray-400">
            Page <span className="font-medium text-white">{page}</span> of <span className="font-medium text-white">{pages}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const p = Math.max(1, page - 1);
                setPage(p);
                fetchProfiles(debouncedSearch, filter, p);
              }}
              disabled={page === 1}
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-gray-800 transition-colors"
              aria-label="Previous page"
            >
              <FiChevronLeft size={16} />
            </button>
            
            <div className="items-center gap-1 hidden sm:flex">
              {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                let p = i + 1;
                if (pages > 5) {
                  if (page > 3) p = page - 3 + i;
                  if (p > pages) p = pages - 5 + i + 1;
                }
                
                return (
                  <button
                    key={p}
                    onClick={() => { setPage(p); fetchProfiles(debouncedSearch, filter, p); }}
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
                const p = Math.min(pages, page + 1);
                setPage(p);
                fetchProfiles(debouncedSearch, filter, p);
              }}
              disabled={page === pages}
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
