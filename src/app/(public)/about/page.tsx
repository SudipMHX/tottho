import Link from 'next/link'
import { FiHeart, FiZap, FiShield, FiArrowRight } from 'react-icons/fi'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Tottho',
  description: 'Learn about Tottho — the free, no-paywall bio link platform built for creators.',
}

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About <span className='gradient-text'>Tottho</span></h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            We believe the tools creators need should be free. No premium tiers. No paywalls. Ever.
          </p>
        </div>

        <div className="grid gap-6 mb-16">
          {[
            {
              icon: FiHeart,
              title: 'Built for creators',
              text: 'Tottho started as a simple idea: give every creator a beautiful, fast bio link page without charging them. Whether you\'re a musician, developer, writer, or artist — your page should look amazing.',
            },
            {
              icon: FiZap,
              title: 'Fast and simple',
              text: 'We obsess over performance. Your profile page loads in milliseconds. No bloat, no unnecessary scripts, no cookie consent banners. Just your links, beautifully presented.',
            },
            {
              icon: FiShield,
              title: 'Privacy first',
              text: 'We don\'t sell your data. We don\'t run ads. We don\'t track your visitors with third-party analytics. What happens on your page stays on your page.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card flex gap-4">
              <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #FFA040, #FF3366)' }}>
                <Icon />
              </div>
              <div>
                <h2 className="font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/register" className="btn btn-primary btn-lg">
            Create your free page <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}
