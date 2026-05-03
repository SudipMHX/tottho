import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import ThemeSelector from '@/components/dashboard/ThemeSelector'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Appearance' }

export default async function AppearancePage() {
  const session = await getSession()
  if (!session) redirect('/login')

  await connectDB()
  const profile = await Profile.findOne({ userId: session.userId }).lean()

  return (
    <div className="p-4 sm:p-8 max-w-3xl animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold gradient-text">Appearance</h1>
        <p className="text-gray-500 text-sm mt-1">Choose a theme for your public profile page.</p>
      </div>

      <div className="">
        <h2 className="font-semibold text-white mb-1">Theme</h2>
        <p className="text-sm text-gray-400 mb-6">Click a theme to apply it instantly to your profile.</p>
        <ThemeSelector currentTheme={profile?.theme || 'default'} />
      </div>
    </div>
  )
}
