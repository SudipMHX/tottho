'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { cn } from '@/lib/utils'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function AuroraTheme({ profile, links, username }: ThemeProps) {
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
    <BackgroundGradientAnimation
      // Hot pink → violet → electric blue colour palette
      firstColor="242, 0, 137"
      secondColor="209, 0, 209"
      thirdColor="161, 0, 242"
      fourthColor="45, 0, 247"
      fifthColor="242, 0, 137"
      pointerColor="209, 0, 209"
      bgStart="#000000"
      bgEnd="#000000"
      blendingValue="hard-light"
      size="60%"
      interactive={true}
      containerClassName="min-h-dvh w-full"
      className="relative z-20 min-h-dvh flex items-center justify-center py-16 px-4"
    >
      <div className="w-full max-w-md mx-auto">

        {/* Avatar */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex justify-center mb-5 select-none pointer-events-none"
        >
          {profile.avatar ? (
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-pink-400/40 shadow-[0_0_40px_rgba(209,0,209,0.45)] shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.displayName || username}
                width={96}
                height={96}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_40px_rgba(209,0,209,0.5)] shrink-0"
              style={{ background: 'linear-gradient(135deg, #f20089, #a100f2)' }}
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
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-[0_2px_16px_rgba(209,0,209,0.6)]">
            {profile.displayName || username}
          </h1>
        </motion.div>

        {/* Bio */}
        {profile.bio && (
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center mb-8"
          >
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
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
            <LinkButton key={link._id} link={link} username={username} theme="aurora" />
          ))}
        </motion.div>

        {/* Branding */}
        <motion.p
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="text-center text-xs text-white/25 mt-10"
        >
          Powered by{' '}
          <Link href="/" className="text-white/40 hover:text-pink-300 transition-colors">
            Tottho
          </Link>
        </motion.p>

      </div>
    </BackgroundGradientAnimation>
  )
}
