'use client'

import { useState, useTransition } from 'react'
import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import LinkCard from '@/components/dashboard/LinkCard'
import IconPicker from '@/components/dashboard/IconPicker'
import { addLink, reorderLinks } from '@/app/actions/profile'
import { FiPlus, FiX, FiLink } from 'react-icons/fi'
import { getIcon } from '@/lib/icons'

type Link = {
  _id: string
  title: string
  url: string
  icon: string
  isActive: boolean
  clicks: number
}

export default function LinksManager({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState(initialLinks)
  const [showAdd, setShowAdd] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newIcon, setNewIcon] = useState('FaLink')
  const [, startTransition] = useTransition()
  const [error, setError] = useState('')


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = links.findIndex((l) => l._id === active.id)
    const newIndex = links.findIndex((l) => l._id === over.id)
    const reordered = arrayMove(links, oldIndex, newIndex)
    setLinks(reordered)

    startTransition(() => reorderLinks(reordered.map((l) => l._id)))
  }

  async function handleAddLink() {
    if (!newTitle || !newUrl) return
    setError('')
    try {
      const fd = new FormData()
      fd.append('title', newTitle)
      fd.append('url', newUrl)
      fd.append('icon', newIcon)
      await addLink(fd)
      setNewTitle('')
      setNewUrl('')
      setNewIcon('FaLink')
      setShowAdd(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const newIconKey = newIcon
  const NewIcon = getIcon(newIconKey)

  return (
    <div className="flex flex-col gap-4">
      {/* Add new link */}
      {showAdd ? (
        <div className="card border-[#FF5240]/20 bg-[#FF5240]/10/50">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-gray-300">Add new link</p>
            <button onClick={() => setShowAdd(false)} className="btn btn-ghost btn-icon btn-sm text-gray-400">
              <FiX />
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <div className="flex flex-col gap-3">
            <input
              className="input"
              placeholder="Link title (e.g. My YouTube)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              className="input"
              placeholder="URL (https://...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowIconPicker(!showIconPicker)}
                className="btn btn-secondary gap-2"
              >
                <span className="text-lg">{React.createElement(NewIcon)}</span>
                Change icon
              </button>
            </div>
            {showIconPicker && (
              <IconPicker
                selected={newIcon}
                onSelect={setNewIcon}
                onClose={() => setShowIconPicker(false)}
              />
            )}
            <div className="flex gap-2 mt-1">
              <button onClick={handleAddLink} className="btn btn-primary flex-1">
                <FiPlus /> Add link
              </button>
              <button onClick={() => setShowAdd(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="btn btn-primary w-full"
        >
          <FiPlus /> Add new link
        </button>
      )}

      {/* Link list */}
      {links.length === 0 ? (
        <div className="card text-center py-12">
          <FiLink className="mx-auto text-4xl text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">No links yet. Add your first one above!</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={links.map((l) => l._id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <LinkCard key={link._id} link={link} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
