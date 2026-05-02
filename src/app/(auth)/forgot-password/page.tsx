import Image from 'next/image'
import Link from 'next/link'
import { FiMail, FiArrowLeft, FiLink } from 'react-icons/fi'

export default function ForgotPasswordPage() {
  return (
    <div className="card w-full max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <Link href="/" className="flex justify-center items-center gap-2 font-display font-bold text-lg text-white shrink-0 hover:opacity-85 transition-opacity">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span>Tottho</span>
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">Reset password</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="field">
          <label htmlFor="email" className="label">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input !pl-9"
            />
          </div>
        </div>

        <div className="rounded-xl bg-[#FF5240]/10 border border-[#FF5240]/15 p-3 text-sm text-[#e8432f]">
          Password reset via email is coming soon. For now, please contact support.
        </div>

        <button type="button" className="btn btn-primary w-full" disabled>
          Send reset link (coming soon)
        </button>
      </form>

      <div className="text-center mt-6">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <FiArrowLeft className="text-xs" />
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
