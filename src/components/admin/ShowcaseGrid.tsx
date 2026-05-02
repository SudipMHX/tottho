'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiStar, FiExternalLink } from 'react-icons/fi'

type Profile = {
  _id: string
  displayName: string
  bio: string
  avatar: string
  isShowcased: boolean
  username: string
}

export default function ShowcaseGrid({ initialProfiles }: { initialProfiles: Profile[] }) {
  const [profiles, setProfiles] = useState(initialProfiles)

  async function handleToggle(profileId: string, current: boolean) {
    await fetch('/api/admin/showcase', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, isShowcased: !current }),
    })
    setProfiles((prev) =>
      prev.map((p) => (p._id === profileId ? { ...p, isShowcased: !current } : p))
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map((profile) => (
        <div key={profile._id} className="card flex items-center gap-3">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.displayName || profile.username}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFA040] to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
              {(profile.displayName || profile.username)[0]?.toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {profile.displayName || profile.username}
            </p>
            <p className="text-xs text-gray-400">@{profile.username}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Link href={`/${profile.username}`} target="_blank" className="btn btn-ghost btn-icon btn-xs text-gray-400">
              <FiExternalLink />
            </Link>
            <button
              onClick={() => handleToggle(profile._id, profile.isShowcased)}
              className={`btn btn-xs ${profile.isShowcased ? 'btn-primary' : 'btn-secondary'}`}
            >
              <FiStar className={profile.isShowcased ? 'fill-current' : ''} />
              {profile.isShowcased ? 'Featured' : 'Feature'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
