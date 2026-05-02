import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminSidebar from '@/components/layout/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session || session.role !== 'admin') redirect('/')

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="flex flex-col min-h-dvh bg-gray-50">
        {children}
      </main>
    </div>
  )
}
