'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import DSFrame        from '@/components/DSFrame'
import CocktailPixelArt from '@/components/CocktailPixelArt'
import Confetti       from '@/components/Confetti'
import TypewriterText from '@/components/TypewriterText'
import cocktailsData  from '@/assets/cocktails.json'
import { playSuccess } from '@/lib/sounds'
import { addGlass, clearGlasses } from '@/lib/glassHistory'

const FLAVOR_COLORS: Record<string, string> = {
  sweet:  'var(--flavor-sweet)',
  sour:   'var(--flavor-sour)',
  bitter: 'var(--flavor-bitter)',
  salty:  'var(--flavor-salty)',
  umami:  'var(--flavor-umami)',
}

function ShareButton({ cocktailName, mbtiType }: { cocktailName: string; mbtiType: string }) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const text = `✦ I got ${cocktailName} (${mbtiType}) on "A Night That Escalated Way Too Quickly" ✦\n\nTake the cocktail personality quiz!`
    if (typeof navigator.share === 'function') {
      navigator.share({ title: 'My Cocktail Personality', text }).catch(() => {})
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
      {copied ? '✓ COPIED!' : '◈ SHARE'}
    </button>
  )
}

function ResultContent() {
  const params   = useSearchParams()
  const name     = params.get('cocktail') ?? ''
  const cocktail = cocktailsData.find(c => c.cocktailName === name) ?? cocktailsData[0]
  const [screenOn, setScreenOn] = useState(true)

  // Fire success sound + confetti on mount; record glass for the shelf
  const [showConfetti, setShowConfetti] = useState(false)
  useEffect(() => {
    setShowConfetti(true)
    const t = setTimeout(() => playSuccess(), 200)
    if (cocktail.cocktailName === 'Glass of Water') {
      clearGlasses()   // redemption arc — the tab is wiped
    } else {
      addGlass(cocktail.cocktailName)
    }
    return () => clearTimeout(t)
  }, [name]) // eslint-disable-line react-hooks/exhaustive-deps

  const flavors  = cocktail.flavorProfile as Record<string, number>
  const maxScore = 5

  const topScreen = (
    <>
      <div className="screen-top-header">Your result</div>
      <div className="cocktail-image-frame">
        <CocktailPixelArt cocktailName={cocktail.cocktailName} />
      </div>
    </>
  )

  const bottomScreen = (
    <>
      <div className="result-cocktail-name">{cocktail.cocktailName}</div>
      <div className="result-mbti">{cocktail.mbtiType}</div>
      <div className="result-blurb">
        <TypewriterText text={cocktail.personalityBlurb} speed={16}/>
      </div>
      {cocktail.cocktailName === 'Glass of Water' && (
        <div style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 6,
          color: 'var(--blue)',
          margin: '10px 0 4px',
          letterSpacing: 1,
        }}>
          ✦ tab cleared ✦
        </div>
      )}
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link href="/quiz" className="start-btn" style={{ fontSize: 7 }}>↺ AGAIN</Link>
        <ShareButton cocktailName={cocktail.cocktailName} mbtiType={cocktail.mbtiType}/>
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
            <div className="flavor-panel-title">Flavour profile</div>
            <div className="flavor-panel-cocktail">{cocktail.cocktailName}</div>
            <div className="flavor-bars">
              {Object.entries(flavors).map(([flavor, value]) => (
                <div className="flavor-row" key={flavor}>
                  <span className="flavor-label">{flavor}</span>
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
  return (
    <Suspense fallback={
      <DSFrame
        topScreen={<div className="screen-top-header">Loading…</div>}
        bottomScreen={<div className="question-text">Mixing your drink…</div>}
      />
    }>
      <ResultContent />
    </Suspense>
  )
}
