import { motion } from 'framer-motion'
import type { ThemeMode } from '../types'
import styles from './ThemeToggle.module.css'

interface Props {
  mode: ThemeMode
  onToggle: () => void
}

export function ThemeToggle({ mode, onToggle }: Props) {
  const isNight = mode === 'night'
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      role="switch"
      aria-checked={isNight}
      aria-label={`Switch to ${isNight ? 'day' : 'night'} theme`}
    >
      <motion.span
        className={styles.knob}
        animate={{ x: isNight ? 26 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        <i className={`ti ti-${isNight ? 'moon' : 'sun'}`} aria-hidden="true" />
      </motion.span>
    </button>
  )
}
