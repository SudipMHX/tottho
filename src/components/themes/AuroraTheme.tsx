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
      className="relative top-0 z-50 h-full w-full overflow-y-auto py-10"
    >
      <div className="h-full w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center md:content-center">

        <div className='text-center md:text-left px-0 md:px-6'>
          {/* Avatar */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center md:justify-start mb-5 select-none pointer-events-none"
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
            className="mb-2"
          >
            <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-[0_2px_16px_rgba(209,0,209,0.6)]">
              {profile.displayName || username}
            </h1>
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="mb-8"
            >
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 text-center md:text-left">
                {profile.bio}
              </p>
            </motion.div>
          )}
        </div>

        {/* Links */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 md:gap-4 md:max-h-[70vh] md:overflow-y-auto p-4 md:rounded-md"
        >
          {links.map((link) => (
            <LinkButton
              key={link._id}
              link={link}
              username={username}
              theme="aurora"
            />
          ))}
        </motion.div>

        {/* Branding */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="md:col-span-2 text-center text-xs text-white/25 md:mt-4 pb-6 md:pb-0"
        >
          Powered by{" "}
          <Link
            href="/"
            className="text-white/40 hover:text-pink-300 transition-colors"
          >
            Tottho
          </Link>
        </motion.p>

      </div>
    </BackgroundGradientAnimation>
  )
}
