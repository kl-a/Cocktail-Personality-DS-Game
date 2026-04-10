'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import DSFrame from '@/components/DSFrame'
import CocktailPixelArt from '@/components/CocktailPixelArt'
import cocktailsData from '@/assets/cocktails.json'

const FLAVOR_COLORS: Record<string, string> = {
  sweet:  'var(--flavor-sweet)',
  sour:   'var(--flavor-sour)',
  bitter: 'var(--flavor-bitter)',
  salty:  'var(--flavor-salty)',
  umami:  'var(--flavor-umami)',
}

function ResultContent() {
  const params   = useSearchParams()
  const name     = params.get('cocktail') ?? ''
  const cocktail = cocktailsData.find(c => c.cocktailName === name) ?? cocktailsData[0]

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

      <div className="result-blurb">{cocktail.personalityBlurb}</div>

      <hr className="screen-divider" />

      <div className="flavor-section-title">Flavour profile</div>
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

      <div style={{ marginTop: 16 }}>
        <Link href="/quiz" className="start-btn" style={{ fontSize: 7 }}>↺ AGAIN</Link>
      </div>
    </>
  )

  return <DSFrame topScreen={topScreen} bottomScreen={bottomScreen} />
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
