'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { updateLink, deleteLink } from '@/app/actions/profile'
import { ICON_MAP } from '@/lib/icons'
import { FiMove, FiTrash2, FiEdit3, FiCheck, FiX, FiToggleLeft, FiToggleRight } from 'react-icons/fi'

type Link = {
  _id: string
  title: string
  url: string
  icon: string
  isActive: boolean
  clicks: number
}

export default function LinkCard({ link }: { link: Link }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(link.title)
  const [url, setUrl] = useState(link.url)
  const [pending, setPending] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const Icon = ICON_MAP[link.icon] || ICON_MAP.FaLink

  async function handleSave() {
    setPending(true)
    await updateLink(link._id, { title, url })
    setPending(false)
    setEditing(false)
  }

  async function handleToggle() {
    await updateLink(link._id, { isActive: !link.isActive })
  }

  async function handleDelete() {
    if (!confirm('Delete this link?')) return
    await deleteLink(link._id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card flex items-center gap-3 p-4 hover:shadow-md transition-shadow"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-1 shrink-0"
        title="Drag to reorder"
      >
        <FiMove />
      </button>

      {/* Icon */}
      <span className="text-gray-400 text-xl shrink-0">
        <Icon />
      </span>

      {/* Content */}
      {editing ? (
        <div className="flex-1 flex flex-col gap-2">
          <input
            className="input input-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className="input input-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
          />
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{link.title}</p>
          <p className="text-xs text-gray-400 truncate">{link.url}</p>
          <p className="text-xs text-gray-300 mt-0.5">{link.clicks} clicks</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {editing ? (
          <>
            <button onClick={handleSave} disabled={pending} className="btn btn-primary btn-xs">
              <FiCheck />
            </button>
            <button onClick={() => setEditing(false)} className="btn btn-secondary btn-xs">
              <FiX />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleToggle}
              className={`btn btn-xs ${link.isActive ? 'btn-ghost text-emerald-500' : 'btn-ghost text-gray-300'}`}
              title={link.isActive ? 'Active' : 'Inactive'}
            >
              {link.isActive ? <FiToggleRight className="text-lg" /> : <FiToggleLeft className="text-lg" />}
            </button>
            <button onClick={() => setEditing(true)} className="btn btn-ghost btn-xs">
              <FiEdit3 />
            </button>
            <button onClick={handleDelete} className="btn btn-danger btn-xs">
              <FiTrash2 />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
