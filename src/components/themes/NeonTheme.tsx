import Image from 'next/image'
import LinkButton from '@/components/profile/LinkButton'
import { ThemeProps } from './types'
import Link from 'next/link'

export default function NeonTheme({ profile, links, username }: ThemeProps) {
  return (
    <div
      className="min-h-dvh py-12 px-4 relative bg-[#050505]"
    >
      {/* Neon grid background */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgb(59 99 247 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgb(59 99 247 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-md mx-auto relative z-10 animate-fade-in">
        <div className="text-center mb-5 select-none pointer-events-none">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.displayName || username}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover neon-glow"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold neon-glow"
              style={{ background: 'linear-gradient(135deg, #3b63f7, #8b5cf6)' }}
            >
              {(profile.displayName || username)[0]?.toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold text-white mb-1" style={{ textShadow: '0 0 20px rgba(59,99,247,0.8)' }}>
            {profile.displayName || username}
          </h1>
          {profile.bio && (
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{profile.bio}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <LinkButton key={String(link._id)} link={link} username={username} theme="neon" />
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-10">
          Powered by <Link href="/" className="font-semibold text-[#FF6B42] hover:underline">Tottho</Link>
        </p>
      </div>
    </div>
  )
}
