import { useCallback, useEffect, useState } from 'react'
import type { ThemeMode } from '../types'
import { applyTheme } from '../theme/themes'

const STORAGE_KEY = 'petalfm-theme'

function getInitialTheme(): ThemeMode {
  // 1. honour a saved choice
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'day' || saved === 'night') return saved
  } catch {
    // localStorage can throw in private mode; fall through to system pref
  }
  // 2. otherwise match the visitor's OS setting so a dark-mode recruiter
  //    lands in night mode automatically
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: light)').matches
  ) {
    return 'day'
  }
  return 'night'
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    applyTheme(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore write failures (private mode)
    }
  }, [mode])

  const toggle = useCallback(() => {
    setMode((m) => (m === 'night' ? 'day' : 'night'))
  }, [])

  return { mode, toggle, setMode }
}
