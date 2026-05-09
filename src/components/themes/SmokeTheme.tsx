'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

// Smoke accent colour — purple tinted to complement the shader's dark palette
const SMOKE_COLOR = '#7c3aed'

/* ── Main theme ── */
export default function SmokeTheme({ profile, links, username }: ThemeProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.12,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    // Full-page WebGL smoke canvas
    <div className="fixed inset-0 min-h-dvh w-full overflow-hidden bg-[#141414]">
      <div className="absolute inset-0">
        <SmokeBackground smokeColor={SMOKE_COLOR} className="w-full h-full block" />
      </div>

      {/* Dark vignette so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Profile content */}
      <div className="relative z-10 h-full w-full overflow-y-auto no-scrollbar flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md mx-auto">

          {/* Avatar */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center mb-5 select-none pointer-events-none"
          >
            {profile.avatar ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-purple-400/30 shadow-[0_0_48px_rgba(124,58,237,0.35)] shrink-0">
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
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_48px_rgba(124,58,237,0.4)] shrink-0"
                style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)' }}
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
            <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(124,58,237,0.5)]">
              {profile.displayName || username}
            </h1>
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-center mb-8"
            >
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
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
              <LinkButton key={link._id} link={link} username={username} theme="smoke" />
            ))}
          </motion.div>

          {/* Branding */}
          <motion.p
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center text-xs text-white/20 mt-10"
          >
            Powered by{' '}
            <Link href="/" className="text-white/40 hover:text-purple-300 transition-colors">
              Tottho
            </Link>
          </motion.p>

        </div>
      </div>
    </div>
  )
}
