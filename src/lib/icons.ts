// Shared types and the dynamic icon map for profile link buttons
import * as FaIcons from 'react-icons/fa'
import { FaXTwitter, FaThreads, FaBluesky } from 'react-icons/fa6'

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ...FaIcons,
  FaXTwitter,
  FaThreads,
  FaBluesky,
}

export const ALL_ICONS = Object.keys(ICON_MAP)

export function getIcon(name: string) {
  return ICON_MAP[name] || FaIcons.FaLink
}
