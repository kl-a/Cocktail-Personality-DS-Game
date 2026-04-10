// 8-bit sound effects synthesized with Web Audio API — no audio files needed.

let _ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!_ctx) _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    return _ctx
  } catch { return null }
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  vol = 0.06,
  startOffset = 0,
) {
  const c = getCtx()
  if (!c) return
  try {
    const osc  = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = type
    osc.frequency.setValueAtTime(freq, c.currentTime + startOffset)
    gain.gain.setValueAtTime(vol, c.currentTime + startOffset)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + startOffset + duration)
    osc.start(c.currentTime + startOffset)
    osc.stop(c.currentTime + startOffset + duration + 0.01)
  } catch { /* ignore if AudioContext is suspended */ }
}

// 5 distinct answer tones — C major pentatonic spread
const ANSWER_TONES = [262, 330, 392, 523, 659] // C4 E4 G4 C5 E5

/** Play one of 5 distinct tones by slot index (0–4) */
export function playAnswerTone(slotIndex: number) {
  const freq = ANSWER_TONES[slotIndex % ANSWER_TONES.length]
  tone(freq, 0.09, 'square', 0.07)
}

/** Confirm chime — after selecting an answer */
export function playConfirm() {
  tone(523, 0.08, 'square', 0.05)
  tone(659, 0.08, 'square', 0.05, 0.09)
  tone(784, 0.12, 'square', 0.04, 0.18)
}

/** Victory fanfare — result page reveal */
export function playSuccess() {
  const notes = [523, 659, 784, 1047]
  notes.forEach((f, i) => tone(f, 0.14, 'square', 0.05, i * 0.09))
}

/** Soft thud — power button toggle */
export function playPower() {
  tone(180, 0.12, 'square', 0.04)
}

/** Ascending melody — Konami code triggered */
export function playKonami() {
  const melody = [659, 784, 880, 1047, 880, 784, 659]
  melody.forEach((f, i) => tone(f, 0.1, 'square', 0.05, i * 0.08))
}
