'use client'

import { useActionState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { login } from '@/app/actions/auth'
import { FiLink, FiMail, FiLock, FiLoader } from 'react-icons/fi'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import Image from 'next/image'

function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  const searchParams = useSearchParams()
  const oauthError = searchParams.get('error')

  return (
    <div className="card w-full max-w-md animate-fade-in">
      {/* Logo */}
      <div className="text-center mb-8">
        {/* Logo */}
        <Link href="/" className="flex justify-center items-center gap-2 font-display font-bold text-lg text-white shrink-0 hover:opacity-85 transition-opacity">
          <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
          <span>Tottho</span>
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
      </div>

      {/* OAuth error */}
      {oauthError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {oauthError === 'banned'
            ? 'Your account has been suspended.'
            : 'OAuth sign-in failed. Please try again or use email.'}
        </div>
      )}

      {/* OAuth buttons */}
      <div className="flex flex-col gap-2 mb-5">
        <a href="/api/auth/github" className="btn btn-secondary w-full text-sm">
          <FaGithub className="text-lg" />
          Continue with GitHub
        </a>
        <a href="/api/auth/google" className="btn btn-secondary w-full text-sm">
          <FaGoogle className="text-base text-[#ea4335]" />
          Continue with Google
        </a>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-600">or sign in with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {state?.message && !state?.errors && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.message}
        </div>
      )}

      <form action={action} className="flex flex-col gap-4">
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

        <div className="field">
          <label htmlFor="password" className="label">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              id="password" name="password" type="password" autoComplete="current-password"
              placeholder="••••••••"
              className={`input !pl-9 ${state?.errors?.password ? 'input-error' : ''}`}
            />
          </div>
          {state?.errors?.password && <p className="field-error">{state.errors.password[0]}</p>}
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs text-[#FF8C6A] hover:text-[#FFB499] hover:underline transition-colors">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary w-full mt-1">
          {pending ? <FiLoader className="animate-spin" /> : null}
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{' '}
        <Link href="/register" className="font-semibold text-[#FF8C6A] hover:text-[#FFB499] hover:underline transition-colors">
          Sign up free
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="card w-full max-w-md flex justify-center py-12">
        <FiLoader className="animate-spin text-2xl text-gray-500" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
