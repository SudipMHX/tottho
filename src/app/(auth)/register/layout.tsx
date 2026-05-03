import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Your Free Page',
  description: 'Create your free Tottho bio link page in seconds. Share all your links in one beautiful page. No credit card required.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Create Your Free Bio Link Page — Tottho',
    description: 'Join thousands of creators sharing their links in one beautiful page. Free forever.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Tottho — Create your free page' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Your Free Bio Link Page — Tottho',
    description: 'Join thousands of creators. Free forever.',
    images: ['/og-default.png'],
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
