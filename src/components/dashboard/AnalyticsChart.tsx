'use client'

import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

type ViewData = { date: string; views: number }

type Props = {
  viewsData: ViewData[]
  totalViews: number
  totalClicks: number
  topLink: { title: string; clicks: number } | null
}

export default function AnalyticsChart({ viewsData, totalViews, totalClicks, topLink }: Props) {
  const [activeRange, setActiveRange] = useState<7 | 30>(7)

  const displayData = activeRange === 7 ? viewsData.slice(-7) : viewsData

  const summaryCards = [
    { label: 'Total Views', value: totalViews, color: 'text-[#FF5240]' },
    { label: 'Total Clicks', value: totalClicks, color: 'text-purple-600' },
    { label: 'Top Link', value: topLink?.title || '—', color: 'text-emerald-600', isText: true },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {summaryCards.map(({ label, value, color, isText }) => (
          <div key={label} className="card text-center">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color} ${isText ? 'text-base truncate' : ''}`}>
              {isText ? value : Number(value).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Range toggle */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">Profile Views</h3>
          <div className="flex gap-2">
            {([7, 30] as const).map((n) => (
              <button
                key={n}
                onClick={() => setActiveRange(n)}
                className={`btn btn-xs ${activeRange === n ? 'btn-primary' : 'btn-secondary'}`}
              >
                {n}d
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={displayData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              tickFormatter={(v) => v.slice(5)}
            />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
              labelFormatter={(l) => `Date: ${l}`}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#3b63f7"
              strokeWidth={2}
              dot={{ r: 3, fill: '#3b63f7' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
