import { notFound } from 'next/navigation'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'
import LinkModel from '@/models/Link'
import ProfileRenderer from '@/components/profile/ProfileRenderer'
import type { Metadata } from 'next'
import type { SerializedProfile, SerializedLink } from '@/components/themes/types'

type Props = { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  await connectDB()

  const user = await User.findOne({ username, isBanned: false })
  if (!user) return { title: 'Profile not found' }

  const profile = await Profile.findOne({ userId: user._id })

  return {
    title: profile?.seoTitle || `${profile?.displayName || username} | Tottho`,
    description:
      profile?.seoDescription ||
      profile?.bio ||
      `Check out ${profile?.displayName || username}'s links on Tottho.`,
    openGraph: {
      type: 'profile',
      title: profile?.seoTitle || profile?.displayName || username,
      description: profile?.bio || '',
      images: profile?.avatar ? [{ url: profile.avatar }] : [],
    },
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  await connectDB()

  const user = await User.findOne({ username, isBanned: false })
  if (!user) notFound()

  const profile = await Profile.findOne({ userId: user._id }).lean()
  if (!profile) notFound()

  const links = await LinkModel.find({ userId: user._id, isActive: true })
    .sort({ order: 1 })
    .lean()

  // Log view (fire and forget)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  fetch(`${baseUrl}/api/analytics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  }).catch(() => { })

  const serializedProfile: SerializedProfile = {
    _id: String(profile._id),
    displayName: profile.displayName || '',
    bio: profile.bio || '',
    avatar: profile.avatar || '',
    theme: profile.theme || 'default',
    isShowcased: profile.isShowcased || false,
    seoTitle: profile.seoTitle || '',
    seoDescription: profile.seoDescription || '',
  }

  const serializedLinks: SerializedLink[] = links.map((l) => ({
    _id: String(l._id),
    title: l.title,
    url: l.url,
    icon: l.icon,
    isActive: l.isActive,
    clicks: l.clicks,
    order: l.order,
  }))

  return (
    <ProfileRenderer
      profile={serializedProfile}
      links={serializedLinks}
      username={username}
    />
  )
}
