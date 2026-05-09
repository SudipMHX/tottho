'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { BeamsBackground } from '@/components/ui/beams-background'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function BeamsTheme({ profile, links, username }: ThemeProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.4 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <BeamsBackground intensity="strong">
      <div className="min-h-dvh flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md mx-auto">

          {/* Avatar */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-5 select-none pointer-events-none"
          >
            {profile.avatar ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.2)] shrink-0">
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
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_40px_rgba(34,211,238,0.25)] shrink-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(200,85%,45%), hsl(240,85%,55%))',
                }}
              >
                {(profile.displayName || username)[0]?.toUpperCase()}
              </div>
            )}
          </motion.div>

          {/* Name */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-2"
          >
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              {profile.displayName || username}
            </h1>
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center mb-8"
            >
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                {profile.bio}
              </p>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {links.map((link) => (
              <LinkButton key={link._id} link={link} username={username} theme="beams" />
            ))}
          </motion.div>

          {/* Branding */}
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center text-xs text-white/20 mt-10"
          >
            Powered by{' '}
            <Link href="/" className="text-white/40 hover:text-cyan-300 transition-colors">
              Tottho
            </Link>
          </motion.p>

        </div>
      </div>
    </BeamsBackground>
  )
}
