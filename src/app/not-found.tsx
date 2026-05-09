'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiHome, FiSearch } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ background: '#0a0d14' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#FF5240]/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <motion.div 
        className="z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 5, 0],
            y: [0, -10, 0, -10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="text-9xl font-black mb-4 gradient-text opacity-80 select-none"
        >
          404
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Houston, we have a problem.
        </h1>
        
        <div className="space-y-4 text-gray-400 mb-10 text-lg">
          <p>
            The page you&apos;re looking for has been abducted by aliens, swallowed by a black hole, or maybe it just never existed. 🛸
          </p>
          <p className="text-sm text-gray-500 italic">
            (Or maybe you just typed the URL wrong. We won&apos;t judge.)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
            <FiHome /> Take me home
          </Link>
          <Link href="/showcase" className="btn btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
            <FiSearch /> Browse cool pages
          </Link>
        </div>
      </motion.div>
      
      {/* Floating elements animation */}
      <motion.div 
        className="absolute top-1/4 right-1/4 text-4xl opacity-20"
        animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🛰️
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 left-1/4 text-5xl opacity-20"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ☄️
      </motion.div>
    </div>
  )
}
