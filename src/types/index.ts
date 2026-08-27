export type ThemeMode = 'day' | 'night'

export type MoodId =
  | 'rainy-day'
  | 'deep-focus'
  | 'dawn-calm'
  | 'late-night'
  | 'creative-flow'

export interface Mood {
  id: MoodId
  label: string
  blurb: string
  /** Tabler icon name, e.g. 'cloud-rain' -> ti-cloud-rain */
  icon: string
}

export interface Track {
  id: string
  title: string
  artist: string
  moodId: MoodId
  /** Seconds. Real value is read from the audio element on load; this is a fallback for UI. */
  duration: number
  /** Path under BASE_URL, e.g. 'audio/midnight-rain.mp3' */
  src: string
  /** Attribution shown in the credits panel + README. */
  credit: {
    author: string
    source: string
    license: string
    url: string
  }
}
