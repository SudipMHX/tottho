'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import RainingLetters, { ScrambledTitle } from '@/components/ui/modern-animated-hero-section'
import { cn } from '@/lib/utils'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function MatrixTheme({ profile, links, username }: ThemeProps) {
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
    <RainingLetters>
      {/* Profile content */}
      <div className="min-h-full flex flex-col py-16 px-4">
        <div className="w-full max-w-md mx-auto my-auto">
          {/* Avatar */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center mb-5 select-none pointer-events-none"
          >
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.displayName || username}
                width={96}
                height={96}
                className="rounded-none object-cover border-2 border-[#00ff00] shadow-[0_0_20px_rgba(0,255,0,0.4)] filter grayscale brightness-125 contrast-125"
              />
            ) : (
              <div
                className="w-24 h-24 flex items-center justify-center text-black text-3xl font-bold font-mono shadow-[0_0_20px_rgba(0,255,0,0.4)] bg-[#00ff00]"
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
            <h1 className="text-3xl font-bold tracking-widest text-[#00ff00] font-mono">
              <ScrambledTitle text={profile.displayName || username} />
            </h1>
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-center mb-8"
            >
              <p className="text-[#00ff00]/70 text-sm leading-relaxed max-w-xs mx-auto font-mono">
                <ScrambledTitle text={profile.bio} />
              </p>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col gap-3"
          >
            {links.map((link) => (
              <LinkButton key={link._id} link={link} username={username}  theme="matrix" />
            ))}
          </motion.div>

          {/* Branding */}
          <motion.p
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center text-xs text-[#00ff00]/40 mt-10 font-mono"
          >
            SYSTEM BY{' '}
            <Link href="/" className="text-[#00ff00]/60 hover:text-[#00ff00] transition-colors">
              Tottho
            </Link>
          </motion.p>
        </div>
      </div>
    </RainingLetters>
  )
}
