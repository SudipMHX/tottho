// Shared theme props type using plain objects (not Mongoose docs)
export type SerializedProfile = {
  _id: string
  displayName: string
  bio: string
  avatar: string
  theme: 'default' | 'dark' | 'gradient' | 'glass' | 'neon' | 'geometric' | 'gooey' | 'beams' | 'smoke' | 'aurora' | 'paper' | 'grain' | 'grid-light' | 'grid-dark' | 'confetti' | 'glow-dark' | 'glow-lime' | 'interactive' | 'stars' | 'hills' | 'vine' | 'matrix'
  isShowcased: boolean
  seoTitle: string
  seoDescription: string
}

export type SerializedLink = {
  _id: string
  title: string
  url: string
  icon: string
  isActive: boolean
  clicks: number
  order: number
}

export type ThemeProps = {
  profile: SerializedProfile
  links: SerializedLink[]
  username: string
}
