'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import DSFrame          from '@/components/DSFrame'
import CocktailPixelArt from '@/components/CocktailPixelArt'
import Confetti         from '@/components/Confetti'
import TypewriterText   from '@/components/TypewriterText'
import cocktailsEn      from '@/assets/cocktails.json'
import cocktailsZh      from '@/assets/cocktails.zh.json'
import { playSuccess }  from '@/lib/sounds'
import { addGlass, clearGlasses } from '@/lib/glassHistory'
import { useLang } from '@/context/LanguageContext'
import { UI } from '@/lib/translations'

const FLAVOR_COLORS: Record<string, string> = {
  sweet:  'var(--flavor-sweet)',
  sour:   'var(--flavor-sour)',
  bitter: 'var(--flavor-bitter)',
  salty:  'var(--flavor-salty)',
  umami:  'var(--flavor-umami)',
}

function ShareButton({ cocktailName, displayName, mbtiType }: { cocktailName: string; displayName: string; mbtiType: string }) {
  const { lang } = useLang()
  const t        = UI[lang]
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const url  = 'https://kl-a.github.io/Cocktail-Personality-DS-Game/'
    const text = t.shareText(displayName, mbtiType) + ' ' + url
    if (typeof navigator.share === 'function') {
      navigator.share({ title: t.shareTitle, text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      })
    }
  }

  return (
    <button
      className="start-btn"
      style={{ fontSize: 7, cursor: 'pointer', background: 'transparent' }}
      onClick={handleShare}
    >
      {copied ? t.copied : t.share}
    </button>
  )
}

function ResultContent() {
  const { lang }  = useLang()
  const t         = UI[lang]
  const params    = useSearchParams()
  const name      = params.get('cocktail') ?? ''

  // Always look up by English name; get the zh entry by same index
  const enIndex   = cocktailsEn.findIndex(c => c.cocktailName === name)
  const cocktailEn = enIndex >= 0 ? cocktailsEn[enIndex] : cocktailsEn[0]
  const cocktailZh = enIndex >= 0 ? cocktailsZh[enIndex] : cocktailsZh[0]
  const cocktail   = lang === 'zh' ? cocktailZh : cocktailEn

  const displayName = 'displayName' in cocktail
    ? (cocktail as typeof cocktailZh).displayName
    : cocktailEn.cocktailName

  const [screenOn,     setScreenOn]     = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const t = setTimeout(() => playSuccess(), 200)
    if (cocktailEn.cocktailName === 'Glass of Water') {
      clearGlasses()
    } else {
      addGlass(cocktailEn.cocktailName)
    }
    return () => clearTimeout(t)
  }, [name]) // eslint-disable-line react-hooks/exhaustive-deps

  const flavors  = cocktailEn.flavorProfile as Record<string, number>
  const maxScore = 5

  const topScreen = (
    <>
      <div className="screen-top-header">{t.yourResult}</div>
      <div className="cocktail-image-frame">
        <CocktailPixelArt cocktailName={cocktailEn.cocktailName} />
      </div>
    </>
  )

  const bottomScreen = (
    <>
      <div className="result-cocktail-name">{displayName}</div>
      <div className="result-mbti">{cocktail.mbtiType}</div>
      <div className="result-blurb">
        <TypewriterText text={cocktail.personalityBlurb} speed={16}/>
      </div>
      {cocktailEn.cocktailName === 'Glass of Water' && (
        <div style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 6,
          color: 'var(--blue)',
          margin: '10px 0 4px',
          letterSpacing: 1,
        }}>
          {t.tabCleared}
        </div>
      )}
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link href="/quiz" className="start-btn" style={{ fontSize: 7 }}>{t.again}</Link>
        <ShareButton
          cocktailName={cocktailEn.cocktailName}
          displayName={displayName}
          mbtiType={cocktail.mbtiType}
        />
      </div>
    </>
  )

  return (
    <>
      {showConfetti && <Confetti key={name}/>}
      <div className="result-layout">
        <DSFrame topScreen={topScreen} bottomScreen={bottomScreen} onPowerChange={setScreenOn} />

        {screenOn && (
          <div className="flavor-panel">
            <div className="flavor-panel-title">{t.flavourProfile}</div>
            <div className="flavor-panel-cocktail">{displayName}</div>
            <div className="flavor-bars">
              {Object.entries(flavors).map(([flavor, value]) => (
                <div className="flavor-row" key={flavor}>
                  <span className="flavor-label">{t.flavorLabels[flavor] ?? flavor}</span>
                  <div className="flavor-track">
                    <div
                      className="flavor-fill"
                      style={{
                        width: `${(value / maxScore) * 100}%`,
                        background: FLAVOR_COLORS[flavor] ?? 'var(--mint)',
                      }}
                    />
                  </div>
                  <span className="flavor-value">{value}/{maxScore}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function ResultPage() {
  const { lang } = useLang()
  const t        = UI[lang]
  return (
    <Suspense fallback={
      <DSFrame
        topScreen={<div className="screen-top-header">{t.loading}</div>}
        bottomScreen={<div className="question-text">{t.mixing}</div>}
      />
    }>
      <ResultContent />
    </Suspense>
  )
}
