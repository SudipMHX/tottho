'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { DarkSmallGrid } from '@/components/ui/grid-background'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function GridDarkTheme({ profile, links, username }: ThemeProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <div className="relative min-h-dvh w-full bg-[#0f0f0f] overflow-hidden text-white">
      {/* Background Component */}
      <DarkSmallGrid />

      {/* Fade overlay for readability at top and bottom if needed, though this grid is quite subtle */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f0f0f]/50 via-transparent to-[#0f0f0f]/50 pointer-events-none" />

      {/* Profile content */}
      <div className="relative z-10 min-h-dvh flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md mx-auto">
          {/* Avatar */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center mb-5 select-none pointer-events-none"
          >
            {profile.avatar ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-gray-700 shadow-[0_4px_24px_rgba(0,0,0,0.6)] shrink-0">
                <Image
                  src={`/images/${username}` || profile.avatar}
                  alt={profile.displayName || username}
                  loading="eager"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_4px_24px_rgba(0,0,0,0.6)] ring-2 ring-gray-700 shrink-0"
                style={{ background: 'linear-gradient(135deg, #333, #111)' }}
              >
                {(profile.displayName || username)[0]?.toUpperCase()}
              </div>
            )}
          </motion.div>

          {/* Name */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center mb-2"
          >
            <h1 className="text-3xl font-bold tracking-tight">
              {profile.displayName || username}
            </h1>
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-center mb-8"
            >
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                {profile.bio}
              </p>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col gap-3"
          >
            {links.map((link) => (
              <LinkButton key={link._id} link={link} username={username} theme="gridDark" />
            ))}
          </motion.div>

          {/* Branding */}
          <motion.p
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center text-xs text-gray-500 mt-10"
          >
            Powered by{' '}
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Tottho
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
