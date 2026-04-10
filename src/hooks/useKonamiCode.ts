import { useEffect, useRef } from 'react'

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonamiCode(callback: () => void) {
  const pos = useRef(0)
  const cb  = useRef(callback)
  cb.current = callback

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const expected = SEQUENCE[pos.current]
      if (e.key === expected || e.key.toLowerCase() === expected) {
        pos.current++
        if (pos.current === SEQUENCE.length) {
          pos.current = 0
          cb.current()
        }
      } else {
        // Reset, but check if the failed key starts a new sequence
        pos.current = e.key === SEQUENCE[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
