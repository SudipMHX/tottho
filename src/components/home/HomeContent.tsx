'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiLink, FiZap, FiPieChart, FiStar, FiArrowRight, FiCheck,
  FiChevronDown, FiLayout, FiSmartphone, FiGlobe
} from 'react-icons/fi'
import { FaTiktok, FaInstagram, FaYoutube, FaTwitch, FaXTwitter } from 'react-icons/fa6'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
}

const item = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const faqs = [
  {
    q: "Is Tottho really free?",
    a: "Yes! Tottho is 100% free to use. We believe everyone should have access to a beautiful link-in-bio page without paying monthly subscriptions."
  },
  {
    q: "Can I use my own custom domain?",
    a: "Currently, all pages are hosted on our beautiful tottho.pro.bd domain (e.g., tottho.pro.bd/yourname). Custom domain support is on our roadmap!"
  },
  {
    q: "How many links can I add?",
    a: "There are absolutely no limits! You can add as many links as you want, categorize them, and reorder them anytime."
  },
  {
    q: "Do you provide analytics?",
    a: "Yes, every free account comes with a built-in analytics dashboard where you can track profile views and individual link clicks."
  }
]

const testimonials = [
  { name: 'Alex R.',   role: 'Streamer',  text: 'Switched from Linktree and never looked back. This is cleaner, faster, and free.' },
  { name: 'Priya S.',  role: 'Designer',  text: 'The themes are gorgeous. My followers love my profile page!' },
  { name: 'Marcus T.', role: 'Musician',  text: "Finally a bio link tool that doesn't charge for basic features. Amazing." },
]

export default function HomeContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-20 sm:pb-32 px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#FF5240]/10 blur-3xl" />
          <div className="absolute top-32 right-0 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="container-page text-center animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5240]/10 text-[#FF8C6A] text-sm font-semibold mb-8 border border-[#FF5240]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C6A] animate-pulse" />
            100% Free. Always.
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl mx-auto tracking-tight">
            One link for{' '}
            <span className="gradient-text">everything</span>{' '}
            you create
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create your free bio link page in seconds. Share your social profiles, content, and
            projects — all from one beautiful, customizable page. No credit card. No hidden fees. Ever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register" className="btn btn-primary btn-lg group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Get your free page <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
            <Link href="/showcase" className="btn btn-secondary btn-lg">
              See examples
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Logo Cloud ── */}
      <motion.section {...fadeIn} className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container-page text-center">
          <p className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Trusted by creators across</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-400 opacity-60">
            <FaYoutube className="text-4xl hover:text-white transition-colors" />
            <FaInstagram className="text-4xl hover:text-white transition-colors" />
            <FaTiktok className="text-4xl hover:text-white transition-colors" />
            <FaXTwitter className="text-4xl hover:text-white transition-colors" />
            <FaTwitch className="text-4xl hover:text-white transition-colors" />
          </div>
        </div>
      </motion.section>

      {/* ── Bento Grid Features ── */}
      <section className="py-24 px-4 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10" />
        
        <div className="container-page">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Everything you need,<br/>nothing you don't.</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              We stripped out all the bloat. Tottho gives you the premium features other platforms charge for, completely free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Big Bento 1 */}
            <motion.div {...fadeIn} className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-900/50 border border-gray-800 p-8 hover:border-gray-700 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5240]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FF5240]/20 flex items-center justify-center text-[#FF5240] text-2xl mb-6">
                    <FiLayout />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Stunning Themes</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">
                    Choose from beautifully crafted themes including Dark, Light, Glassmorphism, Neon, and many more. Match your brand's exact vibe with a single click.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Small Bento 1 */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="relative group overflow-hidden rounded-3xl bg-gray-900/50 border border-gray-800 p-8 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl mb-6">
                <FiPieChart />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Track views, click-through rates, and monitor exactly which links are driving the most traffic.
              </p>
            </motion.div>

            {/* Small Bento 2 */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="relative group overflow-hidden rounded-3xl bg-gray-900/50 border border-gray-800 p-8 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-2xl mb-6">
                <FiLink />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Unlimited Links</h3>
              <p className="text-gray-400 leading-relaxed">
                Never worry about limits. Add as many social profiles, websites, and content links as you desire.
              </p>
            </motion.div>

            {/* Big Bento 2 */}
            <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-900/50 border border-gray-800 p-8 hover:border-gray-700 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 text-2xl mb-6">
                    <FiGlobe />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">SEO Optimized & Fast</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">
                    Built on modern architecture ensuring your page loads instantly anywhere in the world. Fully optimized for Google search visibility with automated sitemaps.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-4 bg-gray-950">
        <div className="container-page">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Set up in under a minute</h2>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative"
          >
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent -z-0" />

            {[
              { step: '1', title: 'Claim your link', desc: 'Sign up and grab your unique username before someone else does.' },
              { step: '2', title: 'Add your content', desc: 'Drop in your social links, website, videos, or anything you want to share.' },
              { step: '3', title: 'Share with the world', desc: 'Add your new Tottho link to your TikTok, Instagram, or Twitter bio.' }
            ].map((s, i) => (
              <motion.div variants={item} key={s.step} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mb-6 shadow-xl relative group">
                  <div className="absolute inset-0 rounded-full bg-[#FF5240] opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                  <span className="text-3xl font-bold text-white">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 relative">
        <div className="container-page">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Loved by creators</h2>
            <p className="text-gray-400">Join thousands of others who upgraded their bio link.</p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {testimonials.map(({ name, role, text }, i) => (
              <motion.div variants={item} key={name} className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/80 transition-colors">
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                </div>
                <p className="text-gray-300 leading-relaxed mb-8">"{text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF5240] to-purple-500 flex items-center justify-center text-white font-bold">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 bg-gray-950">
        <div className="container-page max-w-3xl">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-800 rounded-2xl bg-gray-900/50 overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-gray-400"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-4 relative">
        <div className="container-page max-w-5xl">
          <motion.div 
            {...fadeIn}
            className="rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden isolate"
          >
            {/* Gradient Background */}
            <div 
              className="absolute inset-0 -z-10"
              style={{ background: 'linear-gradient(135deg, #FF5240, #9333ea, #ec4899)' }}
            />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay -z-10" />

            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to stand out?</h2>
            <p className="text-white/90 text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light">
              Claim your unique link today. Takes less than a minute. Free forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register" className="btn btn-lg bg-white text-gray-900 hover:bg-gray-100 shadow-2xl hover:scale-105 transition-transform">
                Claim your link <FiArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10 text-white/80 text-sm flex-wrap font-medium">
              {['No credit card', 'Unlimited links', 'Free forever'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <FiCheck size={12} />
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
