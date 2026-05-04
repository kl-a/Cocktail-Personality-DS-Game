'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { UI } from '@/lib/translations'

export default function BootScreen() {
  const { lang }                    = useLang()
  const t                           = UI[lang]
  const [lines,   setLines]         = useState<string[]>([])
  const [visible, setVisible]       = useState(false)
  const [fading,  setFading]        = useState(false)

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (sessionStorage.getItem('td-booted')) return
    sessionStorage.setItem('td-booted', '1')

    const STEPS = [
      { text: t.bootTitle,    ms: 100  },
      { text: '──────────────────', ms: 550  },
      { text: t.bootUnit,     ms: 950  },
      { text: '',             ms: 1300 },
      { text: t.bootChecking, ms: 1600 },
      { text: '▓▓▓▓▓▓▓░░░  70%', ms: 2200 },
      { text: '▓▓▓▓▓▓▓▓▓▓ 100%', ms: 2700 },
      { text: '',             ms: 3000 },
      { text: t.bootReady,    ms: 3100 },
    ]

    setVisible(true)
    STEPS.forEach(step => {
      setTimeout(() => setLines(prev => [...prev, step.text]), step.ms)
    })
    setTimeout(() => setFading(true),   3600)
    setTimeout(() => setVisible(false), 4300)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
                i === 0                    ? 'var(--mint)'   :
                line === t.bootReady       ? 'var(--yellow)' :
                line.startsWith('▓')       ? 'var(--blue)'   :
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
