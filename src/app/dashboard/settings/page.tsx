import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import SettingsForm from '@/components/dashboard/SettingsForm'
import AvatarUploader from '@/components/dashboard/AvatarUploader'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  await connectDB()
  const profile = await Profile.findOne({ userId: session.userId }).lean()

  return (
    <div className="p-4 sm:p-8 max-w-2xl animate-fade-in space-y-3">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Update your profile information and SEO settings.</p>
      </div>

      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-1">Username</h2>
        <p className="text-sm text-gray-500">
          Your page is at{' '}
          <span className="font-mono text-[#FF5240]">
            {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/{session.username}
          </span>
        </p>
        <p className="text-xs text-gray-400 mt-2">Username cannot be changed at this time.</p>
      </div>

      <AvatarUploader
        currentAvatar={profile?.avatar || ''}
        displayName={profile?.displayName || session.username}
      />

      <SettingsForm
        displayName={profile?.displayName || ''}
        bio={profile?.bio || ''}
        seoTitle={profile?.seoTitle || ''}
        seoDescription={profile?.seoDescription || ''}
      />
    </div>
  )
}
