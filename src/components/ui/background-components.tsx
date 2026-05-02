import { cn } from '@/lib/utils'

/**
 * Soft yellow radial glow overlay (multiply blend on white)
 */
export function YellowGlowBackground({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 z-0', className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #FFF991 0%, transparent 70%)',
          opacity: 0.6,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}

/**
 * Dot-grid paper texture overlay
 */
export function PaperTextureBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute inset-0 z-0', className)}
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
        `,
        backgroundSize: '8px 8px, 32px 32px, 32px 32px',
      }}
    />
  )
}
