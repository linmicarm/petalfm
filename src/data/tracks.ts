import type { Track } from '../types'

// Audio paths are relative to BASE_URL so they resolve on GitHub Pages'
// subpath (linmicarm.github.io/petalfm/). Never start these with a leading
// slash — that would resolve against the domain root and 404 in production.
const base = import.meta.env.BASE_URL

/**
 * The bundled tracks are original ambient loops generated for this demo, so
 * the deployed app plays with no auth and no external dependency. To swap in
 * your own audio, drop files into public/audio/ and update src + credit here.
 * Track metadata (titles, mood tags) is the curation layer — the part of the
 * project that's genuinely mine.
 */
export const TRACKS: Track[] = [
  {
    id: 'midnight-rain',
    title: 'midnight rain',
    artist: 'petal.fm',
    moodId: 'rainy-day',
    duration: 48,
    src: `${base}audio/midnight-rain.mp3`,
    credit: {
      author: 'petal.fm',
      source: 'original ambient loop',
      license: 'CC0',
      url: '',
    },
  },
  {
    id: 'still-hours',
    title: 'still hours',
    artist: 'petal.fm',
    moodId: 'late-night',
    duration: 55,
    src: `${base}audio/still-hours.mp3`,
    credit: {
      author: 'petal.fm',
      source: 'original ambient loop',
      license: 'CC0',
      url: '',
    },
  },
  {
    id: 'first-light',
    title: 'first light',
    artist: 'petal.fm',
    moodId: 'dawn-calm',
    duration: 45,
    src: `${base}audio/first-light.mp3`,
    credit: {
      author: 'petal.fm',
      source: 'original ambient loop',
      license: 'CC0',
      url: '',
    },
  },
  {
    id: 'paper-lanterns',
    title: 'paper lanterns',
    artist: 'petal.fm',
    moodId: 'deep-focus',
    duration: 52,
    src: `${base}audio/paper-lanterns.mp3`,
    credit: {
      author: 'petal.fm',
      source: 'original ambient loop',
      license: 'CC0',
      url: '',
    },
  },
  {
    id: 'open-window',
    title: 'open window',
    artist: 'petal.fm',
    moodId: 'creative-flow',
    duration: 50,
    src: `${base}audio/open-window.mp3`,
    credit: {
      author: 'petal.fm',
      source: 'original ambient loop',
      license: 'CC0',
      url: '',
    },
  },
]

export const tracksByMood = (moodId: string): Track[] =>
  TRACKS.filter((t) => t.moodId === moodId)
