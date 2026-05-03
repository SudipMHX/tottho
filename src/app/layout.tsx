import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tottho — Your Free Bio Link Page',
    template: '%s | Tottho',
  },
  description:
    'Create your free bio link page in seconds. Share all your links, social profiles, and content in one beautiful page.',
  keywords: ['tottho', 'tottho.pro.bd', 'share url', 'link share', 'profile page', 'bio link', 'link in bio', 'linktree alternative', 'free bio link page', 'Bangladesh', 'page builder', 'digital presence', 'social media tools', ''],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'Tottho',
    locale: 'en_US',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Tottho — Your Free Bio Link Page' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tottho',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} style={{ colorScheme: 'dark' }} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
