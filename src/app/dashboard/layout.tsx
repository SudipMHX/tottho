import '@/app/dashboard/dashboard.css'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import MobileNav from '@/components/layout/MobileNav'
import MobilePreview from '@/components/dashboard/MobilePreview'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import LinkModel from '@/models/Link'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  await connectDB()
  
  // Calculate a "version" string to force iframe reloads when data changes
  const profile = await Profile.findOne({ userId: session.userId }).select('updatedAt').lean()
  const latestLink = await LinkModel.findOne({ userId: session.userId }).sort({ updatedAt: -1 }).select('updatedAt').lean()
  
  const pTime = profile?.updatedAt ? new Date(profile.updatedAt).getTime() : 0
  const lTime = latestLink?.updatedAt ? new Date(latestLink.updatedAt).getTime() : 0
  const version = Math.max(pTime, lTime).toString()

  return (
    <div className="dashboard-layout">
      {/* Desktop sidebar — only visible on md+ via CSS */}
      <DashboardSidebar username={session.username} role={session.role} />

      {/* Main content area */}
      <main className="dashboard-main">
        {/* Mobile navigation — fixed overlays, rendered inside main so they don't affect the grid */}
        <MobileNav username={session.username} role={session.role} />
        {children}
      </main>

      {/* Live preview pane — only visible on xl+ */}
      <MobilePreview username={session.username} version={version} />
    </div>
  )
}
