import SystemLogsDashboard from '@/components/admin/SystemLogsDashboard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — System Logs' }

export default function AdminSystemPage() {
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">System Logs</h1>
        <p className="text-gray-500 text-sm mt-1">
          Real-time server diagnostics, memory usage, and database status.
        </p>
      </div>
      <SystemLogsDashboard />
    </div>
  )
}
