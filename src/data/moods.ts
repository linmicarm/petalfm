import type { Mood } from '../types'

export const MOODS: Mood[] = [
  {
    id: 'rainy-day',
    label: 'rainy day',
    blurb: 'soft rain and slow beats for grey afternoons',
    icon: 'cloud-rain',
  },
  {
    id: 'deep-focus',
    label: 'deep focus',
    blurb: 'minimal, steady textures to disappear into work',
    icon: 'target',
  },
  {
    id: 'dawn-calm',
    label: 'dawn calm',
    blurb: 'warm ambient tones for slow mornings',
    icon: 'sunrise',
  },
  {
    id: 'late-night',
    label: 'late night',
    blurb: 'hazy lo-fi for the quiet hours',
    icon: 'moon-stars',
  },
  {
    id: 'creative-flow',
    label: 'creative flow',
    blurb: 'gentle movement to keep ideas coming',
    icon: 'sparkles',
  },
]

export const getMood = (id: string): Mood | undefined =>
  MOODS.find((m) => m.id === id)
