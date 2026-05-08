import Image from 'next/image'
import LinkButton from '@/components/profile/LinkButton'
import { ThemeProps } from './types'
import Link from 'next/link'

export default function DarkTheme({ profile, links, username }: ThemeProps) {
  return (
    <div className="min-h-dvh bg-gray-950 py-12 px-4">
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="text-center mb-8">
          {profile.avatar ? (
            <Image
              src={`/images/${username}` || profile.avatar}
              alt={profile.displayName || username}
              loading="eager"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-gray-800 select-none pointer-events-none"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white text-3xl font-bold">
              {(profile.displayName || username)[0]?.toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold text-white mb-1">
            {profile.displayName || username}
          </h1>
          {profile.bio && (
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{profile.bio}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <LinkButton key={String(link._id)} link={link} username={username} theme="dark" />
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-10">
          Powered by <Link href="/" className="font-semibold text-gray-400 hover:text-white hover:underline">Tottho</Link>
        </p>
      </div>
    </div>
  )
}
