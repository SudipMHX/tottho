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
  keywords: ['bio link', 'link in bio', 'linktree alternative', 'free bio link page'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'Tottho',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} style={{ colorScheme: 'dark' }}>
      <body>{children}</body>
    </html>
  )
}
