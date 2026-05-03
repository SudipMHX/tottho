import type { MetadataRoute } from 'next'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://tottho.pro.bd'

// Static pages that are always indexed
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
  },
  {
    url: `${BASE_URL}/register`,
    lastModified: new Date(),
  },
  {
    url: `${BASE_URL}/showcase`,
    lastModified: new Date(),
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
  },
  {
    url: `${BASE_URL}/privacy`,
    lastModified: new Date(),
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: new Date(),
  },
]


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB()

    // Fetch all non-banned users
    const users = await User.find({ isBanned: { $ne: true } })
      .select('username updatedAt')
      .lean()

    if (!users.length) return staticRoutes

    // Fetch profiles to get the most recent updatedAt for each user
    const userIds = users.map((u) => u._id)
    const profiles = await Profile.find({ userId: { $in: userIds } })
      .select('userId updatedAt')
      .lean()

    // Build a map of userId → profile updatedAt
    const profileUpdatedAt = new Map<string, Date>()
    for (const p of profiles) {
      profileUpdatedAt.set(String(p.userId), p.updatedAt as Date)
    }

    // Build profile page sitemap entries
    const profileRoutes: MetadataRoute.Sitemap = users.map((user) => {
      const profileDate = profileUpdatedAt.get(String(user._id))
      const lastModified = profileDate || (user.updatedAt as Date) || new Date()

      return {
        url: `${BASE_URL}/${user.username}`,
        lastModified
      }
    })

    return [...staticRoutes, ...profileRoutes]
  } catch (err) {
    // On error (e.g. build-time without DB), return only static routes
    console.error('[sitemap] Failed to generate dynamic routes:', err)
    return staticRoutes
  }
}
