'use client'

import Image from 'next/image'
import LinkButton from '@/components/profile/LinkButton'
import { ThemeProps } from './types'
import { motion, Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

export default function GlassTheme({ profile, links, username }: ThemeProps) {
  return (
    <div
      className="min-h-dvh py-12 px-4 relative overflow-hidden"
      style={{
        background: "url('/images/theme-bg-01.jpg') center/cover no-repeat",
      }}
    >
      {/* Background blur orbs */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#FF5240]/20 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md mx-auto relative z-10"
      >
        <motion.div
          variants={fadeUpVariants}
          className="rounded-3xl p-8 text-center mb-6 bg-white/10 backdrop-blur-xs border border-white/20 shadow-2xl shadow-black/20"
        >
          {profile.avatar ? (
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl -z-10" />
              <Image
                src={profile.avatar}
                alt={profile.displayName || username}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover select-none pointer-events-none ring-4 ring-white/20 shadow-xl"
              />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-full mx-auto mb-4 bg-white/20 flex items-center justify-center text-white text-3xl font-bold shadow-xl border border-white/30 backdrop-blur-md"
            >
              {(profile.displayName || username)[0]?.toUpperCase()}
            </motion.div>
          )}

          <motion.h1 variants={fadeUpVariants} className="text-2xl font-bold text-white mb-1 drop-shadow-md">
            {profile.displayName || username}
          </motion.h1>

          {profile.bio && (
            <motion.p variants={fadeUpVariants} className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto drop-shadow">
              {profile.bio}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="flex flex-col gap-3">
          {links.map((link) => (
            <LinkButton link={link} username={username} theme="glass" />
          ))}
        </motion.div>

        <motion.p variants={fadeUpVariants} className="text-center text-xs text-white/40 mt-10">
          Powered by <a href="/" className="font-semibold text-white/70 hover:text-white transition-colors">Tottho</a>
        </motion.p>
      </motion.div>
    </div>
  )
}
