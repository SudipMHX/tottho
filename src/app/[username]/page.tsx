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
  if (!user) return { title: 'Profile not found', robots: { index: false, follow: false } }

  const profile = await Profile.findOne({ userId: user._id })

  const title = profile?.seoTitle || profile?.displayName || username
  const description =
    profile?.seoDescription ||
    profile?.bio ||
    `Check out ${profile?.displayName || username}'s links on Tottho.`
  const canonicalUrl = `/${username}`
  const images = profile?.avatar ? [{ url: `/images/${username}` || profile.avatar, alt: `${title}'s avatar` }] : [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Tottho profile' }]

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'profile',
      title,
      description,
      url: canonicalUrl,
      siteName: 'Tottho',
      images,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: profile?.avatar ? [`/images/${username}` || profile.avatar] : ['/og-default.png'],
    },
    robots: { index: true, follow: true },
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

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tottho.pro.bd';

  // Log view (fire and forget)
  fetch(`${baseUrl}/api/analytics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  }).catch(() => { })

  const serializedProfile: SerializedProfile = {
    _id: String(profile._id),
    displayName: profile.displayName || '',
    bio: profile.bio || '',
    avatar: `/images/${username}` || profile.avatar || '',
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.displayName || username,
      image: `${baseUrl}/images/${username}` || profile.avatar || `${baseUrl}/og-default.png`,
      description: profile.bio || profile.seoDescription || `Check out ${profile.displayName || username}'s links on Tottho.`,
      url: `${baseUrl}/${username}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileRenderer
        profile={serializedProfile}
        links={serializedLinks}
        username={username}
      />
    </>
  )
}
