import DefaultTheme from '../themes/DefaultTheme'
import DarkTheme from '../themes/DarkTheme'
import GradientTheme from '../themes/GradientTheme'
import GlassTheme from '../themes/GlassTheme'
import NeonTheme from '../themes/NeonTheme'
import GeometricTheme from '../themes/GeometricTheme'
import GooeyTheme from '../themes/GooeyTheme'
import BeamsTheme from '../themes/BeamsTheme'
import SmokeTheme from '../themes/SmokeTheme'
import AuroraTheme from '../themes/AuroraTheme'
import PaperTheme from '../themes/PaperTheme'
import GrainTheme from '../themes/GrainTheme'
import GridLightTheme from '../themes/GridLightTheme'
import GridDarkTheme from '../themes/GridDarkTheme'
import ConfettiTheme from '../themes/ConfettiTheme'
import GlowDarkTheme from '../themes/GlowDarkTheme'
import GlowLimeTheme from '../themes/GlowLimeTheme'
import InteractiveTheme from '../themes/InteractiveTheme'
import StarsTheme from '../themes/StarsTheme'
import HillsTheme from '../themes/HillsTheme'
import VineTheme from '../themes/VineTheme'
import MatrixTheme from '../themes/MatrixTheme'
import { ThemeProps } from '../themes/types'

type Props = ThemeProps

export default function ProfileRenderer({ profile, links, username }: Props) {
  const activeLinks = links.filter((l) => l.isActive)

  const themeProps = { profile, links: activeLinks, username }

  switch (profile.theme) {
    case 'dark':       return <DarkTheme {...themeProps} />
    case 'gradient':   return <GradientTheme {...themeProps} />
    case 'glass':      return <GlassTheme {...themeProps} />
    case 'neon':       return <NeonTheme {...themeProps} />
    case 'geometric':  return <GeometricTheme {...themeProps} />
    case 'gooey':      return <GooeyTheme {...themeProps} />
    case 'beams':      return <BeamsTheme {...themeProps} />
    case 'smoke':      return <SmokeTheme {...themeProps} />
    case 'aurora':     return <AuroraTheme {...themeProps} />
    case 'paper':      return <PaperTheme {...themeProps} />
    case 'grain':      return <GrainTheme {...themeProps} />
    case 'grid-light': return <GridLightTheme {...themeProps} />
    case 'grid-dark':  return <GridDarkTheme {...themeProps} />
    case 'confetti':   return <ConfettiTheme {...themeProps} />
    case 'glow-dark':  return <GlowDarkTheme {...themeProps} />
    case 'glow-lime':  return <GlowLimeTheme {...themeProps} />
    case 'interactive':return <InteractiveTheme {...themeProps} />
    case 'stars':      return <StarsTheme {...themeProps} />
    case 'hills':      return <HillsTheme {...themeProps} />
    case 'vine':       return <VineTheme {...themeProps} />
    case 'matrix':     return <MatrixTheme {...themeProps} />
    default:           return <DefaultTheme {...themeProps} />
  }
}
