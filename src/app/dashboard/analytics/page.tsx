import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import AnalyticsChart from '@/components/dashboard/AnalyticsChart'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analytics' }

export default async function AnalyticsPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  await connectDB()
  const profile = await Profile.findOne({ userId: session.userId }).lean()
  if (!profile) notFound()

  const profileId = String(profile._id)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const [res7, res30] = await Promise.all([
    fetch(`${baseUrl}/api/analytics/${profileId}?days=7`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/analytics/${profileId}?days=30`, { cache: 'no-store' }),
  ])

  const data7 = await res7.json()
  const data30 = await res30.json()

  // Merge both datasets (30 days includes 7)
  const allData = data30.viewsData || data7.viewsData || []

  return (
    <div className="p-8 max-w-3xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Track your profile views and link clicks.</p>
      </div>

      <AnalyticsChart
        viewsData={allData}
        totalViews={data30.totalViews || 0}
        totalClicks={data30.totalClicks || 0}
        topLink={data30.topLink || null}
      />
    </div>
  )
}
