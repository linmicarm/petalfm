import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { TRACKS, tracksByMood } from './data/tracks'
import { ThemeToggle } from './components/ThemeToggle'
import { Player } from './components/Player'
import { MoodStrip } from './components/MoodStrip'
import type { MoodId } from './types'
import styles from './App.module.css'

export default function App() {
  const { mode, toggle } = useTheme()
  const [activeMood, setActiveMood] = useState<MoodId>('rainy-day')
  const [trackIndex, setTrackIndex] = useState(0)

  // Tracks in the selected mood; fall back to the full list if a mood is empty.
  const queue = useMemo(() => {
    const inMood = tracksByMood(activeMood)
    return inMood.length ? inMood : TRACKS
  }, [activeMood])

  const track = queue[trackIndex % queue.length] ?? null
  const audio = useAudioPlayer(track)

  const handleMood = (id: MoodId) => {
    setActiveMood(id)
    setTrackIndex(0)
  }

  const handleSkip = (dir: -1 | 1) => {
    setTrackIndex((i) => {
      const len = queue.length
      return (i + dir + len) % len
    })
  }

  return (
    <div className={styles.app}>
      <motion.main
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <header className={styles.header}>
          <span className={styles.logo}>
            petal<span className={styles.dot}>.fm</span>
          </span>
          <ThemeToggle mode={mode} onToggle={toggle} />
        </header>

        {track && (
          <Player
            track={track}
            isPlaying={audio.isPlaying}
            currentTime={audio.currentTime}
            duration={audio.duration}
            volume={audio.volume}
            onToggle={audio.toggle}
            onSeek={audio.seek}
            onVolume={audio.setVolume}
            onSkip={handleSkip}
          />
        )}

        <MoodStrip activeMood={activeMood} onSelect={handleMood} />
      </motion.main>
    </div>
  )
}
