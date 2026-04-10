'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

const COLORS = ['#7dcfb6', '#f75c9b', '#ffd23f', '#c084fc', '#64b5f6']

interface Piece {
  id:       number
  left:     string
  top:      string
  dx:       string
  dy:       string
  color:    string
  size:     number
  duration: string
  delay:    string
}

export default function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([])
  const [gone,   setGone]   = useState(false)

  useEffect(() => {
    const newPieces: Piece[] = Array.from({ length: 52 }, (_, i) => {
      const angle = Math.random() * 2 * Math.PI
      const dist  = 80 + Math.random() * 280
      return {
        id:       i,
        left:     `${42 + Math.random() * 16}%`,
        top:      `${30 + Math.random() * 20}%`,
        dx:       `${(Math.cos(angle) * dist).toFixed(1)}px`,
        dy:       `${(Math.sin(angle) * dist - 80).toFixed(1)}px`,
        color:    COLORS[i % COLORS.length],
        size:     2 + (i % 4),
        duration: `${(0.9 + Math.random() * 0.7).toFixed(2)}s`,
        delay:    `${(Math.random() * 0.2).toFixed(2)}s`,
      }
    })
    setPieces(newPieces)
    const t = setTimeout(() => setGone(true), 2500)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null

  return (
    <div
      style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:999, overflow:'hidden' }}
      aria-hidden="true"
    >
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position:  'absolute',
            left:      p.left,
            top:       p.top,
            width:     p.size,
            height:    p.size,
            background: p.color,
            '--dx':    p.dx,
            '--dy':    p.dy,
            animation: `confetti-burst ${p.duration} ${p.delay} ease-out forwards`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}
