import { motion, AnimatePresence } from 'framer-motion'
import type { Track } from '../types'
import { getMood } from '../data/moods'
import { formatTime } from '../hooks/formatTime'
import styles from './Player.module.css'

interface Props {
  track: Track
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  onToggle: () => void
  onSeek: (t: number) => void
  onVolume: (v: number) => void
  onSkip: (dir: -1 | 1) => void
}

export function Player({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  onToggle,
  onSeek,
  onVolume,
  onSkip,
}: Props) {
  const mood = getMood(track.moodId)
  const pct = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className={styles.player}>
      <motion.div
        className={styles.art}
        animate={
          isPlaying
            ? { scale: [1, 1.015, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <i className={`ti ti-${mood?.icon ?? 'music'}`} aria-hidden="true" />
      </motion.div>

      <div className={styles.meta}>
        <AnimatePresence mode="wait">
          <motion.h1
            key={track.id}
            className={styles.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {track.title}
          </motion.h1>
        </AnimatePresence>
        <p className={styles.sub}>
          {track.artist} · {mood?.label}
        </p>
      </div>

      <div className={styles.seek}>
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          aria-label="Seek"
          className={styles.range}
          style={{ '--pct': `${pct}%` } as React.CSSProperties}
        />
        <div className={styles.times}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => onSkip(-1)}
          aria-label="Previous track"
          className={styles.ctrl}
        >
          <i className="ti ti-player-skip-back" aria-hidden="true" />
        </button>
        <button
          onClick={onToggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className={styles.play}
        >
          <i
            className={`ti ti-player-${isPlaying ? 'pause' : 'play'}`}
            aria-hidden="true"
          />
        </button>
        <button
          onClick={() => onSkip(1)}
          aria-label="Next track"
          className={styles.ctrl}
        >
          <i className="ti ti-player-skip-forward" aria-hidden="true" />
        </button>
      </div>

      <div className={styles.volume}>
        <i className="ti ti-volume" aria-hidden="true" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolume(Number(e.target.value))}
          aria-label="Volume"
          className={styles.range}
          style={{ '--pct': `${volume * 100}%` } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
