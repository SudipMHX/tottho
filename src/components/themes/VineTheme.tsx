'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import LivingVineBackground from '@/components/ui/living-vine-background'
import { cn } from '@/lib/utils'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'

/* ── Main theme ── */
export default function VineTheme({ profile, links, username }: ThemeProps) {
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

  const glow = "0 0 10px rgba(45,255,190,0.4)"

  return (
    <LivingVineBackground className="text-emerald-200">
      {/* Profile content */}
      <div className="relative z-10 min-h-dvh flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md mx-auto">
          {/* Avatar */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center mb-5"
          >
            {profile.avatar ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-emerald-500/30 shadow-[0_0_20px_rgba(45,255,190,0.2)] shrink-0">
                <Image
                  src={`/images/${username}` || profile.avatar}
                  alt={profile.displayName || username}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-[#00050a] text-3xl font-bold shadow-[0_0_20px_rgba(45,255,190,0.2)] ring-2 ring-emerald-500/30 shrink-0"
                style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}
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
            <h1
              className="text-3xl font-bold tracking-tight text-emerald-100"
              style={{ textShadow: glow }}
            >
              {profile.displayName || username}
            </h1>
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-center mb-8"
            >
              <p className="text-emerald-200/60 text-sm leading-relaxed max-w-xs mx-auto">
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
              <LinkButton key={link._id} link={link} username={username} theme="vine" />
            ))}
          </motion.div>

          {/* Branding */}
          <motion.p
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center text-xs text-emerald-200/30 mt-10"
          >
            Powered by{' '}
            <a href="/" className="text-emerald-200/50 hover:text-emerald-400 transition-colors">
              Tottho
            </a>
          </motion.p>
        </div>
      </div>
    </LivingVineBackground>
  )
}
