'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GooeyFilter } from '@/components/ui/gooey-filter'
import { PixelTrail } from '@/components/ui/pixel-trail'
import { useScreenSize } from '@/hooks/use-screen-size'
import { cn } from '@/lib/utils'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Main theme ── */
export default function GooeyTheme({ profile, links, username }: ThemeProps) {
  const screenSize = useScreenSize()

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
    }),
  }

  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden py-16 px-4"
      style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}
    >
      {/* Gooey SVG filter definition */}
      <GooeyFilter id="gooey-profile-trail" strength={6} />

      {/* Interactive pixel trail layer */}
      <div
        className="absolute inset-0 z-0"
        style={{ filter: 'url(#gooey-profile-trail)' }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 20 : 40}
          fadeDuration={0}
          delay={600}
          pixelClassName="bg-violet-400/60"
        />
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Profile card — sits above the trail */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Avatar */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-5 select-none pointer-events-none"
        >
          {profile.avatar ? (
            <div className="w-24 h-24 overflow-hidden rounded-[30%] ring-2 ring-violet-400/50 shadow-[0_0_40px_rgba(167,139,250,0.4)] shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.displayName || username}
                width={96}
                height={96}
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_40px_rgba(167,139,250,0.4)] shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
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
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">
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
            <LinkButton key={link._id} link={link} username={username}  theme="gooey" />
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
          <Link href="/" className="text-white/40 hover:text-violet-300 transition-colors">
            Tottho
          </Link>
        </motion.p>
      </div>
    </div>
  )
}
