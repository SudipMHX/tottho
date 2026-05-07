import { cn } from '@/lib/utils'

export function MagentaOrbGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 overflow-hidden bg-white",
        className
      )}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.46) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(circle at center, black 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 45%, transparent 100%)",
        }}
      />

      {/* Main Orb */}
      <div
        className="absolute left-1/2 top-1/2 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80"
        style={{
          background: `
            radial-gradient(
              circle,
              rgba(236,72,153,0.22) 0%,
              rgba(168,85,247,0.14) 35%,
              rgba(59,130,246,0.08) 55%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Floating Accent */}
      <div
        className="absolute top-[18%] right-[20%] w-56 h-56 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)",
        }}
      />

      {/* Bottom Glow */}
      <div
        className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[300px] blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.35\"%3E%3Ccircle cx=\"1\" cy=\"1\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      {/* Soft White Fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.75), rgba(255,255,255,0.92))",
        }}
      />
    </div>
  )
}

export function DarkSmallGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 overflow-hidden bg-black",
        className
      )}
    >
      {/* Main Grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff5a 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff5a 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }}
      />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_65%)]" />

      {/* Noise Effect */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"1\" cy=\"1\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  )
}