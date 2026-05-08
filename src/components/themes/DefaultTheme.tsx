import Image from 'next/image'
import LinkButton from '@/components/profile/LinkButton'
import { ThemeProps } from './types'
import Link from 'next/link'

export default function DefaultTheme({ profile, links, username }: ThemeProps) {
  return (
    <div className="min-h-dvh bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto animate-fade-in">
        {/* Avatar + Info */}
        <div className="text-center mb-8">
          {profile.avatar ? (
            <Image
              src={`/images/${username}` || profile.avatar}
              alt={profile.displayName || username}
              loading="eager"
              width={96}
              height={96}
              className="w-24 h-24 select-none pointer-events-none rounded-full mx-auto mb-4 object-cover ring-4 ring-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#FFA040] to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {(profile.displayName || username)[0]?.toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {profile.displayName || username}
          </h1>
          {profile.bio && (
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{profile.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <LinkButton key={String(link._id)} link={link} username={username} theme="default" />
          ))}
        </div>

        {/* Branding */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Powered by <Link href="/" className="font-semibold text-[#FF5240] hover:underline">Tottho</Link>
        </p>
      </div>
    </div>
  )
}
