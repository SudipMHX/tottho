import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomeContent from '@/components/home/HomeContent'

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

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HomeContent />
      <Footer />
    </>
  )
}
