'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GradientBackground } from '@/components/ui/paper-design-shader-background'
import { cn } from '@/lib/utils'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function GrainTheme({ profile, links, username }: ThemeProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.3 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <div className="relative min-h-dvh w-full overflow-hidden flex items-center justify-center">
      {/* Background shader */}
      <GradientBackground />

      {/* Subtle overlay to enhance text readability */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-md mx-auto py-16 px-4 min-h-dvh flex flex-col justify-center">
        {/* Avatar */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex justify-center mb-5 select-none pointer-events-none"
        >
          {profile.avatar ? (
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-orange-500/30 shadow-[0_0_30px_rgba(255,165,0,0.3)] shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.displayName || username}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(255,165,0,0.3)] ring-2 ring-orange-500/30 shrink-0"
              style={{ background: 'linear-gradient(135deg, hsl(14, 100%, 57%), hsl(340, 82%, 52%))' }}
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
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-md">
            {profile.displayName || username}
          </h1>
        </motion.div>

        {/* Bio */}
        {profile.bio && (
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center mb-8"
          >
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto drop-shadow-sm">
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
            <LinkButton key={link._id} link={link} username={username}  theme="grain" />
          ))}
        </motion.div>

        {/* Branding */}
        <motion.p
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="text-center text-xs text-white/40 mt-10"
        >
          Powered by{' '}
          <Link href="/" className="text-white/60 hover:text-orange-300 transition-colors">
            Tottho
          </Link>
        </motion.p>
      </div>
    </div>
  )
}
