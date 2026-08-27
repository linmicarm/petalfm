import { useCallback, useEffect, useRef, useState } from 'react'
import type { Track } from '../types'

interface AudioState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isReady: boolean
}

/**
 * Owns a single HTMLAudioElement for the app's lifetime and exposes transport
 * controls over it. One element (rather than one per track) means switching
 * tracks is just swapping .src, which keeps memory flat and playback gapless.
 */
export function useAudioPlayer(track: Track | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: track?.duration ?? 0,
    volume: 0.8,
    isReady: false,
  })

  // Create the element once. The ref guard makes this safe under React 18
  // StrictMode, which mounts effects twice in development.
  if (audioRef.current === null && typeof Audio !== 'undefined') {
    const el = new Audio()
    el.preload = 'metadata'
    el.volume = 0.8
    audioRef.current = el
  }

  // Wire event listeners once.
  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const onTime = () =>
      setState((s) => ({ ...s, currentTime: el.currentTime }))
    const onMeta = () =>
      setState((s) => ({ ...s, duration: el.duration, isReady: true }))
    const onPlay = () => setState((s) => ({ ...s, isPlaying: true }))
    const onPause = () => setState((s) => ({ ...s, isPlaying: false }))
    const onEnd = () => setState((s) => ({ ...s, isPlaying: false }))

    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnd)

    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnd)
    }
  }, [])

  // Load a new source when the track changes.
  useEffect(() => {
    const el = audioRef.current
    if (!el || !track) return
    el.src = track.src
    el.load()
    setState((s) => ({
      ...s,
      currentTime: 0,
      duration: track.duration,
      isReady: false,
    }))
  }, [track])

  // Pause on unmount so audio never outlives the app.
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      // Autoplay policies can reject; the play/pause events keep UI in sync.
    })
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) play()
    else pause()
  }, [play, pause])

  const seek = useCallback((time: number) => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = time
    setState((s) => ({ ...s, currentTime: time }))
  }, [])

  const setVolume = useCallback((v: number) => {
    const el = audioRef.current
    if (!el) return
    el.volume = v
    setState((s) => ({ ...s, volume: v }))
  }, [])

  return { ...state, play, pause, toggle, seek, setVolume }
}
