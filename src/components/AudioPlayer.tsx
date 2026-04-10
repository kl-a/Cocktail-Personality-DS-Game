'use client'

/**
 * ── HOW TO GET A LOFI STREAM URL ─────────────────────────────────────────────
 *
 * Option A — lofi.cafe (what you originally asked for):
 *   1. Open https://www.lofi.cafe in Chrome/Firefox
 *   2. F12 → Network tab → filter by "Media" or type "audio" in the filter box
 *   3. Press play on the site — a streaming URL will appear in the Network tab
 *   4. Copy that URL and paste it below as STREAM_URL
 *
 * Option B — SomaFM (free, no ads, no sign-in):
 *   Visit https://somafm.com/listen/ and click any station → "Listen in iTunes"
 *   or right-click the MP3 link to copy the stream URL directly.
 *   Good picks: Groove Salad (ambient), Beat Blender (electronic), DEF CON Radio
 *
 * Option C — YouTube embed (easiest, but may show ads without Premium):
 *   Swap the <audio> for an <iframe> — see the commented block below.
 *   Lofi Girl 24/7 YouTube stream: https://www.youtube.com/watch?v=jfKfPfyJRdk
 *   Use: https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1
 *
 * Leave STREAM_URL empty to hide the player entirely.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const STREAM_URL = ''

import { useState, useRef } from 'react'

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  if (!STREAM_URL) return null

  function toggle() {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <div className="audio-player">
      {/* Swap <audio> for the <iframe> below if you prefer a YouTube embed:
          <iframe
            src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1&controls=0&rel=0"
            allow="autoplay"
            style={{ display: 'none' }}
            title="lofi radio"
          />
      */}
      <audio ref={audioRef} src={STREAM_URL} preload="none" />

      <button
        className="audio-play-btn"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? '■' : '▶'}
      </button>

      <span className="audio-player-label">♫ LOFI</span>

      {playing && (
        <div className="audio-waveform" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      )}
    </div>
  )
}
