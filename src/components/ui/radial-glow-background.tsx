import { cn } from '@/lib/utils'

export function DarkRadialGlow({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute inset-0 z-0', className)}
      style={{
        backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
      }}
    />
  )
}

export function LimeRadialGlow({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute inset-0 z-0', className)}
      style={{
        backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(132,204,22,0.4), transparent)`,
      }}
    />
  )
}
