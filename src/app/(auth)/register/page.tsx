'use client'

import { useActionState, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { FiMail, FiLock, FiLoader, FiCheck, FiX } from 'react-icons/fi'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import Image from 'next/image'

function useUsernameCheck(username: string) {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(false)

  const check = useCallback(async (name: string) => {
    if (name.length < 3) { setAvailable(null); return }
    setChecking(true)
    try {
      const res = await fetch(`/api/users?username=${encodeURIComponent(name)}`)
      const data = await res.json()
      setAvailable(data.available)
    } catch {
      setAvailable(null)
    } finally {
      setChecking(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => check(username), 400)
    return () => clearTimeout(timer)
  }, [username, check])

  return { available, checking }
}

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signup, undefined)
  const [username, setUsername] = useState('')
  const { available, checking } = useUsernameCheck(username)

  return (
    <div className="card w-full max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <Link href="/" className="flex justify-center items-center gap-2 font-display font-bold text-lg text-white shrink-0 hover:opacity-85 transition-opacity">
          <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
          <span>Tottho</span>
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">Create your page</h1>
        <p className="text-sm text-gray-500 mt-1">Free forever. No credit card required.</p>
      </div>

      {/* OAuth buttons */}
      <div className="flex flex-col gap-2 mb-5">
        <Link href="/api/auth/github" className="btn btn-secondary w-full text-sm">
          <FaGithub className="text-lg" />
          Continue with GitHub
        </Link>
        <Link href="/api/auth/google" className="btn btn-secondary w-full text-sm">
          <FaGoogle className="text-base text-[#ea4335]" />
          Continue with Google
        </Link>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-600">or sign up with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form action={action} className="flex flex-col gap-4">
        {/* Username */}
        <div className="field">
          <label htmlFor="username" className="label">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">@</span>
            <input
              id="username" name="username" autoComplete="username"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className={`input !pl-8 !pr-9 ${state?.errors?.username ? 'input-error' : ''}`}
            />
            {username.length >= 3 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                {checking
                  ? <FiLoader className="animate-spin text-gray-500" />
                  : available === true
                    ? <FiCheck className="text-emerald-400" />
                    : available === false
                      ? <FiX className="text-red-400" />
                      : null}
              </span>
            )}
          </div>
          {username.length >= 3 && !checking && (
            <p className={`text-xs mt-1 ${available ? 'text-emerald-400' : 'text-red-400'}`}>
              {available === true
                ? `tottho.app/${username} is available!`
                : available === false
                  ? 'This username is already taken.'
                  : ''}
            </p>
          )}
          {state?.errors?.username && <p className="field-error">{state.errors.username[0]}</p>}
        </div>

        {/* Email */}
        <div className="field">
          <label htmlFor="email" className="label">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              id="email" name="email" type="email" autoComplete="email"
              placeholder="you@example.com"
              className={`input !pl-9 ${state?.errors?.email ? 'input-error' : ''}`}
            />
          </div>
          {state?.errors?.email && <p className="field-error">{state.errors.email[0]}</p>}
        </div>

        {/* Password */}
        <div className="field">
          <label htmlFor="password" className="label">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              id="password" name="password" type="password" autoComplete="new-password"
              placeholder="Min. 8 characters"
              className={`input !pl-9 ${state?.errors?.password ? 'input-error' : ''}`}
            />
          </div>
          {state?.errors?.password && <p className="field-error">{state.errors.password[0]}</p>}
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary w-full mt-1">
          {pending ? <FiLoader className="animate-spin" /> : null}
          {pending ? 'Creating your page…' : 'Create free page'}
        </button>
      </form>

      <p className="text-center text-xs text-gray-600 mt-4">
        We&apos;ll send you a verification email to activate your account.
      </p>
      <p className="text-center text-xs text-gray-600 mt-2">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-gray-400 underline hover:text-gray-200">Terms</Link> and{' '}
        <Link href="/privacy" className="text-gray-400 underline hover:text-gray-200">Privacy Policy</Link>.
      </p>
      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#FF8C6A] hover:text-[#FFB499] hover:underline transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
