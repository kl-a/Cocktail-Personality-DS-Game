'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  { text: 'COCKTAIL BAR STORIES',     ms: 100  },
  { text: '──────────────────',      ms: 550  },
  { text: 'COCKTAIL UNIT  v2.4',     ms: 950  },
  { text: '',                         ms: 1300 },
  { text: 'CHECKING VIBES........',  ms: 1600 },
  { text: '▓▓▓▓▓▓▓░░░  70%',        ms: 2200 },
  { text: '▓▓▓▓▓▓▓▓▓▓ 100%',        ms: 2700 },
  { text: '',                         ms: 3000 },
  { text: 'READY.',                  ms: 3100 },
]

export default function BootScreen() {
  const [lines,   setLines]   = useState<string[]>([])
  const [visible, setVisible] = useState(false)
  const [fading,  setFading]  = useState(false)

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (sessionStorage.getItem('td-booted')) return
    sessionStorage.setItem('td-booted', '1')

    setVisible(true)
    STEPS.forEach(step => {
      setTimeout(() => setLines(prev => [...prev, step.text]), step.ms)
    })
    setTimeout(() => setFading(true),   3600)
    setTimeout(() => setVisible(false), 4300)
  }, [])

  if (!visible) return null

  return (
    <div className={`boot-screen${fading ? ' boot-screen--fade' : ''}`} aria-hidden="true">
      <div className="boot-lines">
        {lines.map((line, i) => (
          <div
            key={i}
            className="boot-line"
            style={{
              color:
                i === 0              ? 'var(--mint)'      :
                line === 'READY.'    ? 'var(--yellow)'    :
                line.startsWith('▓') ? 'var(--blue)'      :
                'var(--text-dim)',
              fontSize: i === 0 ? 10 : undefined,
            }}
          >
            {line}
          </div>
        ))}
        <span className="boot-cursor">_</span>
      </div>
    </div>
  )
}
