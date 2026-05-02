import { cn } from '@/lib/utils'

export function MagentaOrbGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute inset-0 z-0', className)}
      style={{
        background: 'white',
        backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
        `,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
      }}
    />
  )
}

export function DarkSmallGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute inset-0 z-0', className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, #262626 1px, transparent 1px),
          linear-gradient(to bottom, #262626 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    />
  )
}
