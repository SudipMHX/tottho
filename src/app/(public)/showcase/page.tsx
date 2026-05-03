import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import '@/models/User' // Ensure User schema is registered before populate
import Image from 'next/image'
import Link from 'next/link'
import { FiExternalLink } from 'react-icons/fi'
import type { Metadata } from 'next'

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'Showcase — Featured Profiles',
  description: 'Discover amazing bio link pages created by the Tottho community.',
}

export default async function ShowcasePage() {
  await connectDB()

  const profiles = await Profile.find({ isShowcased: true })
    .populate<{ userId: { username: string } }>('userId', 'username')
    .lean()

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-8 px-4 text-center">
        <span className="badge badge-purple mb-4">Community</span>
        <h1 className="text-4xl font-bold text-white mb-3">Featured profiles</h1>
        <p className="text-gray-500 text-lg max-w-lg mx-auto">
          Discover beautiful bio link pages from our community. Get inspired and create your own.
        </p>
      </section>

      {/* Grid */}
      <section className="px-4 pb-20">
        <div className="container-page">
          {profiles.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No featured profiles yet.</p>
              <p className="text-sm mt-2">Admins can feature profiles from the admin dashboard.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {profiles.map((profile) => {
                const username = (profile.userId as { username: string })?.username || ''
                return (
                  <div key={String(profile._id)} className="card hover:shadow-lg transition-all group">
                    {/* Avatar */}
                    <div className="flex items-center gap-3 mb-3">
                      {profile.avatar ? (
                        <Image
                          src={profile.avatar}
                          alt={profile.displayName || username}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFA040] to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {(profile.displayName || username)[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-sm truncate">
                          {profile.displayName || username}
                        </p>
                        <p className="text-xs text-gray-400">@{username}</p>
                      </div>
                    </div>

                    {profile.bio && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                        {profile.bio}
                      </p>
                    )}

                    <Link
                      href={`/${username}`}
                      className="btn btn-secondary btn-sm w-full group-hover:btn-primary transition-all"
                    >
                      <FiExternalLink className="text-xs" />
                      Visit profile
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
