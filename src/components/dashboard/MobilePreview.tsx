'use client'

import { useEffect, useRef } from 'react'

export default function MobilePreview({ username, version }: { username: string, version: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Reload iframe when version changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = `/${username}?v=${version}`
    }
  }, [version, username])

  return (
    <div className="hidden xl:flex flex-col items-center justify-center w-[360px] border-l sticky top-0 h-screen overflow-hidden p-6 gap-4"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: '#0a0d14',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#4b5563' }}>
        Live Preview
      </p>

      {/* Phone mockup */}
      <div
        className="relative w-[260px] h-[560px] rounded-[36px] overflow-hidden shadow-[0_0_0_8px_#1a1f2e,0_0_0_10px_rgba(255,255,255,0.06)] ring-0"
        style={{ background: '#000' }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-24 h-5 bg-black rounded-full" />

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0 rounded-[36px]"
          title="Profile Preview"
          src={`/${username}?v=${version}`}
        />
      </div>

      <p className="text-xs" style={{ color: '#374151' }}>
        Updates automatically when you save
      </p>
    </div>
  )
}
