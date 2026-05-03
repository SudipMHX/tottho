'use client'

import { useActionState } from 'react'
import { updateProfile } from '@/app/actions/profile'
import { FiLoader, FiCheck } from 'react-icons/fi'

type Props = {
  displayName: string
  bio: string
  seoTitle: string
  seoDescription: string
}

export default function SettingsForm({ displayName, bio, seoTitle, seoDescription }: Props) {
  const [state, action, pending] = useActionState(updateProfile, undefined)

  return (
    <form action={action} className="flex flex-col gap-6">
      {state?.success && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <FiCheck /> {state.message}
        </div>
      )}

      <div className="card">
        <h2 className="font-semibold text-white mb-5">Profile info</h2>
        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="displayName" className="label">Display name</label>
            <input
              id="displayName"
              name="displayName"
              defaultValue={displayName}
              className={`input ${state?.errors?.displayName ? 'input-error' : ''}`}
              placeholder="Your name"
            />
            {state?.errors?.displayName && (
              <p className="field-error">{state.errors.displayName[0]}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="bio" className="label">
              Bio <span className="text-gray-400 font-normal">(max 160 chars)</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={bio}
              maxLength={160}
              rows={3}
              className="input resize-none"
              placeholder="Tell the world a bit about yourself…"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-1">SEO settings</h2>
        <p className="text-sm text-gray-400 mb-5">Customize how your profile appears in search results.</p>
        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="seoTitle" className="label">Page title <span className="text-gray-400 font-normal">(max 60 chars)</span></label>
            <input
              id="seoTitle"
              name="seoTitle"
              defaultValue={seoTitle}
              maxLength={60}
              className="input"
              placeholder="My links — Tottho"
            />
          </div>
          <div className="field">
            <label htmlFor="seoDescription" className="label">Meta description <span className="text-gray-400 font-normal">(max 160 chars)</span></label>
            <textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={seoDescription}
              maxLength={160}
              rows={3}
              className="input resize-none"
              placeholder="A short description for search engines…"
            />
          </div>
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary self-start">
        {pending ? <><FiLoader className="animate-spin" /> Saving…</> : 'Save changes'}
      </button>
    </form>
  )
}
