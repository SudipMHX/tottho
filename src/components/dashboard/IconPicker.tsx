'use client'

import { useState } from 'react'
import { ICON_MAP, ALL_ICONS } from '@/lib/icons'
import { FiSearch, FiX } from 'react-icons/fi'

type Props = {
  selected: string
  onSelect: (icon: string) => void
  onClose?: () => void
}

export default function IconPicker({ selected, onSelect, onClose }: Props) {
  const [search, setSearch] = useState('')

  const filtered = ALL_ICONS.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="card p-4 w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-700">Choose an icon</p>
        {onClose && (
          <button onClick={onClose} className="btn btn-ghost btn-icon btn-sm text-gray-400">
            <FiX />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          className="input !pl-8 text-sm"
          placeholder="Search icons…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-1 max-h-52 overflow-y-auto">
        {filtered.map((name) => {
          const Icon = ICON_MAP[name]
          return (
            <button
              key={name}
              title={name}
              onClick={() => { onSelect(name); onClose?.() }}
              className={`
                flex items-center justify-center h-9 w-9 rounded-lg text-lg transition-all
                ${selected === name
                  ? 'bg-[#FF5240] text-white'
                  : 'text-gray-400 hover:bg-white/8'
                }
              `}
            >
              <Icon />
            </button>
          )
        })}
      </div>
    </div>
  )
}
