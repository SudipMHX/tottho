'use client'

import { useState, useEffect } from 'react'
import { logout, resendVerification } from '@/app/actions/auth'
import { FiMail, FiLoader, FiCheck, FiRefreshCw, FiLogOut } from 'react-icons/fi'

export default function VerifyPendingPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  async function handleResend() {
    setStatus('sending')
    try {
      // We pass a placeholder — server resolves email from session
      const result = await resendVerification('')
      setMessage(result.message)
      setStatus(result.success ? 'sent' : 'error')
      if (result.success) setCooldown(60)
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="card w-full max-w-md animate-fade-in text-center">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5240]/15 ring-1 ring-blue-500/30">
          <FiMail className="w-8 h-8 text-[#FF8C6A]" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your inbox</h1>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        We sent a verification link to your email address.
        Click the link to activate your account and access your dashboard.
      </p>

      {/* Status message */}
      {message && (
        <div className={`mb-5 p-3 rounded-xl text-sm border ${
          status === 'sent'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {status === 'sent' && <FiCheck className="inline mr-1" />}
          {message}
        </div>
      )}

      {/* Resend button */}
      <button
        onClick={handleResend}
        disabled={status === 'sending' || cooldown > 0}
        className="btn btn-secondary w-full mb-3 disabled:opacity-50"
      >
        {status === 'sending'
          ? <><FiLoader className="animate-spin" /> Sending…</>
          : cooldown > 0
            ? <><FiRefreshCw /> Resend in {cooldown}s</>
            : <><FiRefreshCw /> Resend verification email</>
        }
      </button>

      <div className="text-xs text-gray-400 mb-6">
        Check your spam folder if you don&apos;t see it within a few minutes.
      </div>

      {/* Sign out */}
      <div className="border-t border-white/10 pt-5">
        <form action={logout}>
          <button type="submit" className="btn btn-ghost btn-sm w-full text-gray-500">
            <FiLogOut />
            Sign out and use a different account
          </button>
        </form>
      </div>
    </div>
  )
}
