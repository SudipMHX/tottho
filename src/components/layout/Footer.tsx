import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/8 pt-10" style={{ background: '#0c0f18' }}>
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg text-white mb-3">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className='text-white'>Tottho</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              The free, beautiful bio link platform. No credit card required. No hidden fees. Ever.
            </p>
          </div>

          {/* Product links */}
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-3">Product</p>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/showcase', 'Showcase'], ['/about', 'About']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-gray-200 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-3">Legal</p>
            <ul className="space-y-2">
              {[['/terms', 'Terms'], ['/privacy', 'Privacy'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-gray-200 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 py-3 text-center text-xs text-gray-600">
          © {year} Tottho. All rights reserved. Free forever. | Developed by{' '}
          <Link href="https://sudipmhx.pro.bd" target="_blank" rel="noopener noreferrer" className="text-gray-400 font-semibold hover:text-[#FF8C6A] transition-colors">
            Mahatab Hossen Sudip
          </Link>
        </div>
      </div>
    </footer>
  )
}
