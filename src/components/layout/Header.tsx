'use client'

import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="container-page mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
          <span>Tottho</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/showcase" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Showcase
          </Link>
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Testimonials
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
            Log in
          </Link>
          <Link href="/register" className="btn btn-primary text-sm px-4 py-2">
            Sign up free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-xl px-4 py-6 flex flex-col gap-4 animate-fade-in">
          <Link href="/showcase" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-gray-700 p-2 hover:bg-gray-50 rounded-lg">
            Showcase
          </Link>
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-gray-700 p-2 hover:bg-gray-50 rounded-lg">
            Features
          </a>
          <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-gray-700 p-2 hover:bg-gray-50 rounded-lg">
            Testimonials
          </a>
          <hr className="border-gray-100 my-2" />
          <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-base font-semibold text-gray-900 p-2 hover:bg-gray-50 rounded-lg">
            Log in
          </Link>
          <Link href="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary w-full mt-2 justify-center py-3">
            Sign up free
          </Link>
        </div>
      )}
    </header>
  )
}
