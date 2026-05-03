import Link from 'next/link'
import { FiLink, FiZap, FiPieChart, FiStar, FiArrowRight, FiCheck } from 'react-icons/fi'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Tottho — Your Free Bio Link Page',
  description: 'Create a stunning bio link page in seconds. Share all your links in one place. Free forever — no credit card required.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Tottho — Your Free Bio Link Page',
    description: 'Create a stunning bio link page in seconds. Share all your links in one place. Free forever.',
    url: '/',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Tottho — Your Free Bio Link Page' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tottho — Your Free Bio Link Page',
    description: 'Create a stunning bio link page in seconds. Free forever.',
    images: ['/og-default.png'],
  },
}

const features = [
  { icon: FiZap,      title: 'Set up in 30 seconds',  desc: 'Register, add your links, and share your page. No complicated settings.' },
  { icon: FiStar,     title: '5 beautiful themes',    desc: 'Choose from Default, Dark, Gradient, Glass, and Neon themes.' },
  { icon: FiLink,     title: 'Unlimited links',       desc: 'Add as many links as you want. Drag to reorder them instantly.' },
  { icon: FiPieChart, title: 'Real analytics',        desc: "Track views and link clicks with beautiful charts. Know what's working." },
]

const testimonials = [
  { name: 'Alex R.',   role: 'Streamer',  text: 'Switched from Linktree and never looked back. This is cleaner, faster, and free.' },
  { name: 'Priya S.',  role: 'Designer',  text: 'The themes are gorgeous. My followers love my profile page!' },
  { name: 'Marcus T.', role: 'Musician',  text: "Finally a bio link tool that doesn't charge for basic features. Amazing." },
]

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-20 pb-32 px-4">
          {/* Background glows */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#FF5240]/10 blur-3xl" />
            <div className="absolute top-32 right-0 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
          </div>

          <div className="container-page text-center animate-fade-in">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5240]/100/10 text-[#FF8C6A] text-sm font-semibold mb-8 border border-[#FF5240]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              100% Free. Always.
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl mx-auto">
              One link for{' '}
              <span className="gradient-text">everything</span>{' '}
              you create
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create your free bio link page in seconds. Share your social profiles, content, and
              projects — all from one beautiful, customizable page. No credit card. No hidden fees. Ever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/register" className="btn btn-primary btn-lg">
                Get your free page <FiArrowRight />
              </Link>
              <Link href="/showcase" className="btn btn-secondary btn-lg">
                See examples
              </Link>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-24 px-4" style={{ background: '#0c0f18' }}>
          <div className="container-page">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-white mb-4">Everything you need, nothing you don't</h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                We stripped out all the bloat. Tottho is just the features that matter.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card hover:shadow-lg transition-shadow group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #FFA040, #FF3366)' }}>
                    <Icon />
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 px-4">
          <div className="container-page">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-white mb-4">Loved by creators</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {testimonials.map(({ name, role, text }) => (
                <div key={name} className="card relative">
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => <FiStar key={i} />)}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">"{text}"</p>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-4">
          <div className="container-page">
            <div
              className="rounded-3xl p-12 text-center text-white animate-gradient"
              style={{ background: 'linear-gradient(135deg, #3b63f7, #8b5cf6, #ec4899)', backgroundSize: '200% 200%' }}
            >
              <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                Create your free page in under a minute. No credit card required.
              </p>
              <Link href="/register" className="btn btn-lg bg-white text-[#e8432f] hover:bg-gray-100 shadow-xl">
                Create my free page <FiArrowRight />
              </Link>
              <div className="flex items-center justify-center gap-6 mt-6 text-white/70 text-sm flex-wrap">
                {['No credit card', 'Unlimited links', 'Free forever'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <FiCheck className="text-white" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
