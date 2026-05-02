'use client'

import { updateTheme } from '@/app/actions/profile'
import { useTransition } from 'react'
import { FiCheck } from 'react-icons/fi'

const THEMES = [
  {
    id: 'default',
    name: 'Default',
    preview: 'bg-gray-50 border-gray-200',
    accent: 'bg-gray-800',
    description: 'Clean & minimal',
  },
  {
    id: 'dark',
    name: 'Dark',
    preview: 'bg-gray-950 border-gray-800',
    accent: 'bg-gray-600',
    description: 'Pure black elegance',
  },
  {
    id: 'gradient',
    name: 'Gradient',
    preview: 'border-purple-300',
    accent: 'bg-white/30',
    previewStyle: { background: 'linear-gradient(135deg, #667eea, #764ba2)' },
    description: 'Vibrant & colorful',
  },
  {
    id: 'glass',
    name: 'Glass',
    preview: 'border-[#FF5240]/20',
    accent: 'bg-white/20',
    previewStyle: { background: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
    description: 'Frosted glass effect',
  },
  {
    id: 'neon',
    name: 'Neon',
    preview: 'bg-black border-[#FF5240]/30',
    accent: 'bg-[#FF5240]/50',
    description: 'Electric glow',
  },
  {
    id: 'geometric',
    name: 'Geometric',
    preview: 'border-indigo-900',
    accent: 'bg-indigo-500/40',
    previewStyle: { background: '#030303' },
    description: 'Floating shapes',
  },
  {
    id: 'gooey',
    name: 'Gooey',
    preview: 'border-violet-900',
    accent: 'bg-violet-500/40',
    previewStyle: { background: 'linear-gradient(135deg, #0f0c29, #302b63)' },
    description: 'Interactive trail',
  },
  {
    id: 'beams',
    name: 'Beams',
    preview: 'border-cyan-900',
    accent: 'bg-cyan-400/30',
    previewStyle: { background: '#0a0a0a' },
    description: 'Light beam canvas',
  },
  {
    id: 'smoke',
    name: 'Smoke',
    preview: 'border-purple-900',
    accent: 'bg-purple-500/30',
    previewStyle: { background: '#141414' },
    description: 'WebGL smoke',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    preview: 'border-pink-700',
    accent: 'bg-pink-500/40',
    previewStyle: { background: 'linear-gradient(135deg, #0d0010, #00003a)' },
    description: 'Gradient blobs',
  },
  {
    id: 'paper',
    name: 'Paper',
    preview: 'border-amber-200',
    accent: 'bg-amber-400/60',
    previewStyle: { background: '#faf9f6' },
    description: 'Warm & minimal',
  },
  {
    id: 'grain',
    name: 'Grain',
    preview: 'border-orange-800',
    accent: 'bg-orange-500/50',
    previewStyle: { background: 'linear-gradient(135deg, hsl(14,100%,30%), hsl(340,82%,30%))' },
    description: 'Warm noise gradient',
  },
  {
    id: 'grid-light',
    name: 'Orb Grid',
    preview: 'border-pink-300',
    accent: 'bg-pink-400/60',
    previewStyle: { background: 'white' },
    description: 'Magenta orb grid',
  },
  {
    id: 'grid-dark',
    name: 'Dark Grid',
    preview: 'border-gray-700',
    accent: 'bg-gray-500/60',
    previewStyle: { background: '#0f0f0f' },
    description: 'Small dark grid',
  },
  {
    id: 'confetti',
    name: 'Confetti',
    preview: 'border-indigo-600',
    accent: 'bg-indigo-300/80',
    previewStyle: { background: 'linear-gradient(135deg, #0f172a, #312e81)' },
    description: '3D falling confetti',
  },
  {
    id: 'glow-dark',
    name: 'Dark Glow',
    preview: 'border-slate-800',
    accent: 'bg-slate-500/50',
    previewStyle: { background: 'radial-gradient(circle at 50% 0%, #3e3e3e, #020617)' },
    description: 'Minimal slate glow',
  },
  {
    id: 'glow-lime',
    name: 'Lime Glow',
    preview: 'border-lime-900',
    accent: 'bg-lime-500/50',
    previewStyle: { background: 'radial-gradient(circle at 50% 0%, rgba(132,204,22,0.4), #020617)' },
    description: 'Neon lime glow',
  },
  {
    id: 'interactive',
    name: 'Fluid',
    preview: 'border-cyan-800',
    accent: 'bg-cyan-500/50',
    previewStyle: { background: 'linear-gradient(115deg, #0f1e14, #000)' },
    description: 'Interactive gradient',
  },
  {
    id: 'stars',
    name: 'Stars',
    preview: 'border-indigo-500/30',
    accent: 'bg-indigo-300/60',
    previewStyle: { background: 'radial-gradient(ellipse at bottom, #262626 0%, #000 100%)' },
    description: 'Interactive starfield',
  },
  {
    id: 'hills',
    name: 'GLSL Hills',
    preview: 'border-gray-600',
    accent: 'bg-gray-400/60',
    previewStyle: { background: '#111' },
    description: '3D wireframe mesh',
  },
  {
    id: 'vine',
    name: 'Living Vine',
    preview: 'border-emerald-600',
    accent: 'bg-emerald-400/80',
    previewStyle: { background: '#00050a' },
    description: 'Organic mouse trails',
  },
  {
    id: 'matrix',
    name: 'Matrix Rain',
    preview: 'border-green-600',
    accent: 'bg-[#00ff00]/60',
    previewStyle: { background: '#000' },
    description: 'Terminal letters',
  },
]

export default function ThemeSelector({ currentTheme }: { currentTheme: string }) {
  const [isPending, startTransition] = useTransition()

  function handleSelect(themeId: string) {
    startTransition(() => updateTheme(themeId))
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {THEMES.map((theme) => {
        const isActive = currentTheme === theme.id
        return (
          <button
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            disabled={isPending}
            className={`
              relative flex flex-col gap-2 p-3 rounded-2xl border-2 transition-all text-left
              ${isActive ? 'border-[#FF5240] ring-2 ring-[#FF5240]/20' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            {/* Mini preview */}
            <div
              className={`h-16 rounded-xl border ${theme.preview} flex flex-col items-center justify-center gap-1`}
              style={theme.previewStyle}
            >
              <div className="w-6 h-6 rounded-full bg-white/30" />
              <div className={`w-12 h-1.5 rounded-full ${theme.accent} opacity-80`} />
              <div className={`w-10 h-1.5 rounded-full ${theme.accent} opacity-60`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{theme.name}</p>
              <p className="text-xs text-gray-400">{theme.description}</p>
            </div>
            {isActive && (
              <span className="absolute top-2 right-2 rounded-full p-0.5 text-xs text-white" style={{ background: 'linear-gradient(135deg, #FFA040, #FF3366)' }}>
                <FiCheck />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
