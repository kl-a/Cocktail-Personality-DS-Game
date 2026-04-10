'use client'

import CocktailPixelArt from './CocktailPixelArt'

interface Props {
  glasses: string[]
}

export default function GlassShelf({ glasses }: Props) {
  if (glasses.length === 0) return null

  return (
    <div className="glass-shelf" aria-hidden="true">
      <div className="glass-shelf-label">the tab</div>
      <div className="glass-shelf-glasses">
        {glasses.map((name, i) => (
          <div
            key={i}
            className="glass-shelf-item"
            style={{ animationDelay: `${i * 0.1}s` }}
            title={name}
          >
            <CocktailPixelArt cocktailName={name} empty svgWidth={52} svgHeight={65} />
          </div>
        ))}
      </div>
      <div className="glass-shelf-bar" />
      <div className="glass-shelf-count">{glasses.length} / 5</div>
    </div>
  )
}
