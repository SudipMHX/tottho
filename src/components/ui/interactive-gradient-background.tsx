'use client'

import { useEffect, useRef } from 'react'

type InteractiveGradientBackgroundProps = {
  className?: string
  children?: React.ReactNode
  intensity?: number
  interactive?: boolean
  initialOffset?: { x?: number; y?: number }
  dark?: boolean
}

export default function InteractiveGradientBackground({
  className = '',
  children,
  intensity = 1,
  interactive = true,
  initialOffset,
  dark = true,
}: InteractiveGradientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)

  const updatePosition = () => {
    rafRef.current = null

    const host = ref.current
    const pos = pendingRef.current

    if (!host || !pos) return

    host.style.setProperty('--x', `${pos.x}px`)
    host.style.setProperty('--y', `${pos.y}px`)
  }

  useEffect(() => {
    const host = ref.current
    if (!host) return

    host.style.setProperty('--x', `${initialOffset?.x ?? 0}px`)
    host.style.setProperty('--y', `${initialOffset?.y ?? 0}px`)

    if (!interactive) return

    const handleMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()

      const x = (e.clientX - rect.width / 2) * intensity
      const y = (e.clientY - rect.height / 2) * intensity

      pendingRef.current = {
        x: x * 0.04,
        y: y * 0.04,
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition)
      }
    }

    const reset = () => {
      host.style.setProperty('--x', '0px')
      host.style.setProperty('--y', '0px')
    }

    host.addEventListener('pointermove', handleMove, { passive: true })
    host.addEventListener('pointerleave', reset)

    return () => {
      host.removeEventListener('pointermove', handleMove)
      host.removeEventListener('pointerleave', reset)

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [interactive, intensity, initialOffset])

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          '--x': '0px',
          '--y': '0px',
        } as React.CSSProperties
      }
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: dark
              ? `
                radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 30%),
                radial-gradient(circle at 80% 0%, rgba(59,130,246,0.25), transparent 35%),
                radial-gradient(circle at 50% 100%, rgba(236,72,153,0.18), transparent 40%),
                linear-gradient(to bottom right, #050505, #0f0f12)
              `
              : `
                radial-gradient(circle at 20% 20%, rgba(168,85,247,0.18), transparent 30%),
                radial-gradient(circle at 80% 0%, rgba(59,130,246,0.18), transparent 35%),
                radial-gradient(circle at 50% 100%, rgba(236,72,153,0.14), transparent 40%),
                linear-gradient(to bottom right, #ffffff, #f4f4f5)
              `,
          }}
        />

        {/* Interactive glow */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: 'translate3d(var(--x), var(--y), 0)',
            background: `
              radial-gradient(circle at center,
              rgba(255,255,255,0.08),
              transparent 45%)
            `,
            filter: 'blur(80px)',
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%271%27%3E%3Ccircle cx=%273%27 cy=%273%27 r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-dvh">
        {children}
      </div>
    </div>
  )
}