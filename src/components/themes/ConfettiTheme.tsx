'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import ConfettiBackground from '@/components/ui/confetti-background'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function ConfettiTheme({ profile, links, username }: ThemeProps) {
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
    <div className="relative min-h-dvh w-full overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0f172a, #312e81)' }}>
      {/* Background Component */}
      <ConfettiBackground />

      {/* Profile content */}
      <div className="relative z-10 min-h-dvh flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md mx-auto">
          {/* Avatar */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center mb-5 select-none pointer-events-none"
          >
            {profile.avatar ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.3)] shrink-0">
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
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_4px_24px_rgba(0,0,0,0.3)] ring-2 ring-white/30 shrink-0"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #818cf8)' }}
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
              <p className="text-indigo-200 text-sm leading-relaxed max-w-xs mx-auto">
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
              <LinkButton key={link._id} link={link} username={username} theme="confetti" />
            ))}
          </motion.div>

          {/* Branding */}
          <motion.p
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center text-xs text-indigo-300/50 mt-10"
          >
            Powered by{' '}
            <Link href="/" className="text-indigo-300/80 hover:text-white transition-colors">
              Tottho
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
