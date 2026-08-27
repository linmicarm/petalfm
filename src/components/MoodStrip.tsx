import { MOODS } from '../data/moods'
import type { MoodId } from '../types'
import styles from './MoodStrip.module.css'

interface Props {
  activeMood: MoodId
  onSelect: (id: MoodId) => void
}

export function MoodStrip({ activeMood, onSelect }: Props) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>moods</p>
      <div className={styles.chips} role="tablist" aria-label="Moods">
        {MOODS.map((mood) => {
          const active = mood.id === activeMood
          return (
            <button
              key={mood.id}
              role="tab"
              aria-selected={active}
              className={`${styles.chip} ${active ? styles.active : ''}`}
              onClick={() => onSelect(mood.id)}
              title={mood.blurb}
            >
              <i className={`ti ti-${mood.icon}`} aria-hidden="true" />
              {mood.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
