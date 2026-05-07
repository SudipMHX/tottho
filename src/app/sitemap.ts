import type { MetadataRoute } from 'next'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'

export const revalidate = 43200
export const dynamic = 'force-static'

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://tottho.pro.bd'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: 'daily' },        // homepage 
  { url: `${BASE_URL}/showcase`, lastModified: new Date(), priority: 0.9, changeFrequency: 'daily' },   // main feature
  { url: `${BASE_URL}/register`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.5, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.5, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/privacy`, lastModified: new Date(), priority: 0.3, changeFrequency: 'yearly' },
  { url: `${BASE_URL}/terms`, lastModified: new Date(), priority: 0.3, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB()

    const users = await User.find({ isBanned: { $ne: true } })
      .select('username updatedAt')
      .lean()

    if (!users.length) return staticRoutes

    const userIds = users.map((u) => u._id)
    const profiles = await Profile.find({ userId: { $in: userIds } })
      .select('userId updatedAt')
      .lean()

    const profileUpdatedAt = new Map<string, Date>()
    for (const p of profiles) {
      profileUpdatedAt.set(String(p.userId), p.updatedAt as Date)
    }

    const profileRoutes: MetadataRoute.Sitemap = users.map((user) => {
      const profileDate = profileUpdatedAt.get(String(user._id))
      const lastModified = profileDate || (user.updatedAt as Date) || new Date()
      return {
        url: `${BASE_URL}/${user.username}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    })

    return [...staticRoutes, ...profileRoutes]
  } catch (err) {
    console.error('[sitemap] Failed to generate dynamic routes:', err)
    return staticRoutes
  }
}