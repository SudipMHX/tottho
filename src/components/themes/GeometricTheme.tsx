'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeProps } from './types'
import LinkButton from '@/components/profile/LinkButton'
import Link from 'next/link'

/* ── Floating pill shapes (from provided component) ── */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px] border-2 border-white/[0.15]',
            'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
          )}
        />
      </motion.div>
    </motion.div>
  )
}

/* ── Main theme ── */
export default function GeometricTheme({ profile, links, username }: ThemeProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden bg-[#030303] py-16 px-4">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl pointer-events-none" />

      {/* Floating pill shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[60%] md:top-[65%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[8%] md:top-[12%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[8%]" />
      </div>

      {/* Top + bottom fade vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Badge */}
        {/* <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <Circle className="h-2 w-2 fill-rose-500/80 text-rose-500/80" />
            <span className="text-xs text-white/50 tracking-wide">Tottho</span>
          </div>
        </motion.div> */}

        {/* Avatar */}
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-5 select-none pointer-events-none"
        >
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.displayName || username}
              width={88}
              height={88}
              className="w-22 h-22 rounded-full object-cover ring-2 ring-white/20 shadow-[0_0_32px_rgba(99,102,241,0.3)]"
            />
          ) : (
            <div
              className="w-22 h-22 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_32px_rgba(99,102,241,0.3)]"
              style={{
                width: 88,
                height: 88,
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
              }}
            >
              {(profile.displayName || username)[0]?.toUpperCase()}
            </div>
          )}
        </motion.div>

        {/* Name */}
        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-2"
        >
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.8))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {profile.displayName || username}
          </h1>
        </motion.div>

        {/* Bio */}
        {profile.bio && (
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-8"
          >
            <p className="text-white/40 text-sm leading-relaxed font-light tracking-wide max-w-xs mx-auto">
              {profile.bio}
            </p>
          </motion.div>
        )}

        {/* Links */}
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          {links.map((link) => (
            <LinkButton key={link._id} link={link} username={username}  theme="geometric" />
          ))}
        </motion.div>

        {/* Branding */}
        <motion.p
          custom={5}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-xs text-white/20 mt-10"
        >
          Powered by{' '}
          <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">
            Tottho
          </Link>
        </motion.p>
      </div>
    </div>
  )
}
