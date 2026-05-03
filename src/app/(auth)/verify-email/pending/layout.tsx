import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Check your inbox to verify your Tottho account.',
  robots: { index: false, follow: false },
}

export default function VerifyPendingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
