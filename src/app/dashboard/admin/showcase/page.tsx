import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import User from '@/models/User'
import ShowcaseGrid from '@/components/admin/ShowcaseGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Showcase' }

export default async function AdminShowcasePage() {
  await connectDB()

  const profiles = await Profile.find({})
    .populate<{ userId: { username: string } }>('userId', 'username')
    .lean()

  const serialized = profiles.map((p) => ({
    _id: String(p._id),
    displayName: p.displayName || '',
    bio: p.bio || '',
    avatar: p.avatar || '',
    isShowcased: p.isShowcased,
    username: (p.userId as { username: string })?.username || '',
  }))

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">Showcase</h1>
        <p className="text-gray-500 text-sm mt-1">
          Toggle profiles to feature them on the public <a href="/showcase" className="text-[#FF5240] underline">Showcase page</a>.
        </p>
      </div>
      <ShowcaseGrid initialProfiles={serialized} />
    </div>
  )
}
