export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,69,237,0.18) 0%, transparent 70%), #0a0d14' }}>
      {children}
    </div>
  )
}
