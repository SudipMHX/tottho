import Link from 'next/link'
import type { Metadata } from 'next'
import { FiX, FiClock, FiLink } from 'react-icons/fi'

export const metadata: Metadata = { title: 'Verify Email' }

const MESSAGES: Record<string, { title: string; body: string }> = {
  expired: {
    title: 'Link expired',
    body: 'This verification link has expired (72-hour limit). Please request a new one.',
  },
  invalid: {
    title: 'Invalid link',
    body: 'This verification link is invalid or has already been used. Please request a new one.',
  },
}

export default async function VerifyEmailErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const info = MESSAGES[error ?? ''] ?? MESSAGES.invalid

  const isExpired = error === 'expired'

  return (
    <div className="card w-full max-w-md animate-fade-in text-center">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ${
          isExpired
            ? 'bg-amber-600/15 ring-amber-500/30'
            : 'bg-red-600/15 ring-red-500/30'
        }`}>
          {isExpired
            ? <FiClock className="w-8 h-8 text-amber-400" />
            : <FiX className="w-8 h-8 text-red-400" />
          }
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h1>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{info.body}</p>

      <Link href="/verify-email/pending" className="btn btn-primary w-full mb-3">
        Request a new verification link
      </Link>

      <Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
        <FiLink className="w-3 h-3" />
        Back to Tottho
      </Link>
    </div>
  )
}
