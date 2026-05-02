import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import LinkModel from '@/models/Link'
import LinksManager from '@/components/dashboard/LinksManager'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Links' }

export default async function LinksPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  await connectDB()
  const links = await LinkModel.find({ userId: session.userId }).sort({ order: 1 }).lean()

  const serializedLinks = links.map((l) => ({
    _id: String(l._id),
    title: l.title,
    url: l.url,
    icon: l.icon,
    isActive: l.isActive,
    clicks: l.clicks,
  }))

  return (
    <div className="p-4 sm:p-8 max-w-2xl animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Links</h1>
        <p className="text-gray-500 text-sm mt-1">Add, edit, and reorder your links. Drag to change order.</p>
      </div>
      <LinksManager initialLinks={serializedLinks} />
    </div>
  )
}
