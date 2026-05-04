'use client'

import { useLang } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLang()

  return (
    <div style={{
      position: 'fixed',
      top: 12,
      right: 14,
      zIndex: 1000,
      display: 'flex',
      gap: 2,
      fontFamily: 'var(--font-pixel)',
      fontSize: 7,
      letterSpacing: 1,
    }}>
      <button
        onClick={() => setLang('en')}
        style={{
          background:  lang === 'en' ? 'var(--mint)' : 'transparent',
          color:       lang === 'en' ? '#0a1a14'     : 'var(--text-dim)',
          border:      '1px solid var(--mint)',
          padding:     '3px 6px',
          cursor:      'pointer',
          fontFamily:  'inherit',
          fontSize:    'inherit',
          letterSpacing: 'inherit',
          opacity:     lang === 'en' ? 1 : 0.5,
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLang('zh')}
        style={{
          background:  lang === 'zh' ? 'var(--mint)' : 'transparent',
          color:       lang === 'zh' ? '#0a1a14'     : 'var(--text-dim)',
          border:      '1px solid var(--mint)',
          padding:     '3px 6px',
          cursor:      'pointer',
          fontFamily:  'inherit',
          fontSize:    'inherit',
          letterSpacing: 'inherit',
          opacity:     lang === 'zh' ? 1 : 0.5,
        }}
      >
        中文
      </button>
    </div>
  )
}
