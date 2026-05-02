import { FiFlag } from 'react-icons/fi'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Reports' }

export default function AdminReportsPage() {
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Flagged content and user reports will appear here.</p>
      </div>

      <div className="card text-center py-16">
        <FiFlag className="mx-auto text-5xl text-gray-200 mb-4" />
        <p className="font-semibold text-gray-700 mb-2">No reports yet</p>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          When users report content using the "Report" button on profile pages, 
          those reports will appear here for review.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5240]/10 text-[#e8432f] text-xs font-medium">
          🚧 Report button on profiles — coming soon
        </div>
      </div>
    </div>
  )
}
