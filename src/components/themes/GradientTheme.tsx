import Image from 'next/image'
import LinkButton from '@/components/profile/LinkButton'
import { ThemeProps } from './types'
import Link from 'next/link'

export default function GradientTheme({ profile, links, username }: ThemeProps) {
  return (
    <div
      className="min-h-dvh py-12 px-4 animate-gradient"
      style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2, #f64f59, #c471ed)',
        backgroundSize: '300% 300%',
      }}
    >
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="text-center mb-8">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.displayName || username}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4 select-none pointer-events-none object-cover ring-4 ring-white/40 shadow-2xl"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
              {(profile.displayName || username)[0]?.toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold text-white mb-1 drop-shadow">
            {profile.displayName || username}
          </h1>
          {profile.bio && (
            <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto">{profile.bio}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <LinkButton key={String(link._id)} link={link} username={username} theme="gradient" />
          ))}
        </div>

        <p className="text-center text-xs text-white/50 mt-10">
          Powered by <Link href="/" className="font-semibold text-white/80 hover:text-white hover:underline">Tottho</Link>
        </p>
      </div>
    </div>
  )
}
