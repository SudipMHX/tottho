'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LimeRadialGlow } from '@/components/ui/radial-glow-background'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function GlowLimeTheme({ profile, links, username }: ThemeProps) {
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
    <div className="fixed inset-0 w-full overflow-hidden bg-[#020617]">
      {/* Background Component */}
      <LimeRadialGlow />

      {/* Profile content */}
      <div className="relative z-10 h-full w-full overflow-y-auto no-scrollbar flex flex-col py-16 px-4">
        <div className="w-full max-w-md mx-auto my-auto">
          {/* Avatar */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center mb-5 select-none pointer-events-none"
          >
            {profile.avatar ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-lime-500/40 shadow-[0_4px_30px_rgba(132,204,34,0.2)] shrink-0">
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
                className="w-24 h-24 rounded-full flex items-center justify-center text-[#020617] text-3xl font-bold shadow-[0_4px_30px_rgba(132,204,34,0.2)] ring-2 ring-lime-500/40 shrink-0"
                style={{ background: 'linear-gradient(135deg, #a3e635, #65a30d)' }}
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
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
              {profile.displayName || username}
            </h1>
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-center mb-8"
            >
              <p className="text-lime-100/60 text-sm leading-relaxed max-w-xs mx-auto">
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
              <LinkButton key={link._id} link={link} username={username} theme="glowLime" />
            ))}
          </motion.div>

          {/* Branding */}
          <motion.p
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center text-xs text-lime-100/30 mt-10"
          >
            Powered by{' '}
            <Link href="/" className="text-lime-100/50 hover:text-lime-400 transition-colors">
              Tottho
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
