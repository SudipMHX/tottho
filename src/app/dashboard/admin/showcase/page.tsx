import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import '@/models/User'
import ShowcaseGrid from '@/components/admin/ShowcaseGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Showcase' }

export default async function AdminShowcasePage() {
  await connectDB()

  const limit = 20
  const [profilesRaw, total]: [any, number] = await Promise.all([
    Profile.find({})
      .populate<{ userId: { username: string } }>('userId', 'username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
    Profile.countDocuments({}),
  ])

  const serialized = profilesRaw.map((p: any) => ({
    _id: String(p._id),
    displayName: p.displayName || '',
    bio: p.bio || '',
    avatar: p.avatar || '',
    isShowcased: p.isShowcased,
    username: p.userId?.username || '',
  }))

  const pages = Math.ceil(total / limit)

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">Showcase</h1>
        <p className="text-gray-500 text-sm mt-1">
          Toggle profiles to feature them on the public <a href="/showcase" className="text-[#FF5240] underline hover:text-[#FF5240]/80 transition-colors">Showcase page</a>.
        </p>
      </div>
      <ShowcaseGrid initialProfiles={serialized} initialTotal={total} initialPages={pages} />
    </div>
  )
}
