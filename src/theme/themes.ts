import type { ThemeMode } from '../types'

type Tokens = Record<string, string>

/**
 * Palettes are applied as CSS custom properties on <html data-theme="...">.
 * Keeping them here (rather than in CSS) lets the toggle animate and lets us
 * derive both modes from one shared token vocabulary.
 */
export const THEMES: Record<ThemeMode, Tokens> = {
  night: {
    '--bg': '#141020',
    '--surface': '#1a1726',
    '--surface-raised': '#211c30',
    '--border': '#2e2942',
    '--text': '#efe8fa',
    '--text-soft': '#9d90bd',
    '--text-faint': '#7d7299',
    '--accent': '#b39ddb',
    '--accent-contrast': '#211c30',
    '--art': '#3a2f52',
    '--art-icon': '#c9b8e8',
    '--track': '#3a3352',
    '--chip': '#2a2440',
  },
  day: {
    '--bg': '#f5f0fc',
    '--surface': '#faf6ff',
    '--surface-raised': '#f3ecfb',
    '--border': '#e8def5',
    '--text': '#3a2f52',
    '--text-soft': '#8a7ba8',
    '--text-faint': '#a99bc4',
    '--accent': '#9575cd',
    '--accent-contrast': '#ffffff',
    '--art': '#e4d9f5',
    '--art-icon': '#8266b0',
    '--track': '#e0d6f0',
    '--chip': '#ede4fa',
  },
}

export const applyTheme = (mode: ThemeMode) => {
  const tokens = THEMES[mode]
  const root = document.documentElement
  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(key, value)
  }
  root.setAttribute('data-theme', mode)
}
