'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { playPower, playTap } from '@/lib/sounds'

interface DSFrameProps {
  topScreen:      ReactNode
  bottomScreen:   ReactNode
  onPowerChange?: (on: boolean) => void
  shake?:         boolean
}

type PowerAnim = 'off' | 'on' | null

function fireKey(key: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
  playTap()
}

export default function DSFrame({ topScreen, bottomScreen, onPowerChange, shake }: DSFrameProps) {
  const [on,        setOn]        = useState(true)
  const [animating, setAnimating] = useState<PowerAnim>(null)

  function togglePower() {
    if (animating) return   // don't interrupt mid-animation
    playPower()

    if (on) {
      // Turning off: play CRT-collapse, then hide content
      setAnimating('off')
      setTimeout(() => {
        setOn(false)
        setAnimating(null)
        onPowerChange?.(false)
      }, 380)
    } else {
      // Turning on: show content immediately, play CRT-expand
      setOn(true)
      onPowerChange?.(true)
      setAnimating('on')
      setTimeout(() => setAnimating(null), 380)
    }
  }

  const screenAnim =
    animating === 'off' ? 'crt-powering-off' :
    animating === 'on'  ? 'crt-powering-on'  : ''

  return (
    <div className={`ds-device${shake ? ' ds-shake' : ''}`}>
      {/* ── Top half ── */}
      <div className="ds-top-half">
        <div className="ds-speakers ds-speakers-left" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        {/* Power LED — stops blinking when screen is off */}
        <div
          className="ds-power-led"
          style={on ? undefined : { background: '#3a1010', boxShadow: 'none', animation: 'none' }}
          aria-hidden="true"
        />

        <div className="ds-speakers ds-speakers-right" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        {/* Top screen */}
        <div className="ds-screen">
          <div className={`ds-screen-top ${screenAnim} ${!on ? 'ds-screen-dark' : ''}`}>
            {on && topScreen}
          </div>
        </div>
      </div>

      {/* ── Hinge ── */}
      <div className="ds-hinge" aria-hidden="true" />

      {/* ── Bottom half ── */}
      <div className="ds-bottom-half" style={{ position: 'relative' }}>
        <div className="ds-shoulders" aria-hidden="true">
          <div className="ds-shoulder" />
          <div className="ds-shoulder" />
        </div>

        {/* Bottom screen */}
        <div className="ds-screen">
          <div className={`ds-screen-bottom ${screenAnim} ${!on ? 'ds-screen-dark' : ''}`}>
            {on && bottomScreen}
          </div>
        </div>

        {/* Controls — d-pad and A/B are wired for Konami code input */}
        <div className="ds-controls">
          <div className="ds-dpad">
            <div className="ds-dpad-h" aria-hidden="true" />
            <div className="ds-dpad-v" aria-hidden="true" />
            <button className="ds-dpad-btn ds-dpad-up"    onClick={() => fireKey('ArrowUp')}    aria-label="Up"    tabIndex={-1} />
            <button className="ds-dpad-btn ds-dpad-down"  onClick={() => fireKey('ArrowDown')}  aria-label="Down"  tabIndex={-1} />
            <button className="ds-dpad-btn ds-dpad-left"  onClick={() => fireKey('ArrowLeft')}  aria-label="Left"  tabIndex={-1} />
            <button className="ds-dpad-btn ds-dpad-right" onClick={() => fireKey('ArrowRight')} aria-label="Right" tabIndex={-1} />
          </div>
          <div className="ds-center-btns" aria-hidden="true">
            <div className="ds-menu-btn" />
            <div className="ds-menu-btn" />
          </div>
          <div className="ds-face-buttons">
            <button className="ds-face-btn ds-face-btn-a" onClick={() => fireKey('a')} aria-label="A" tabIndex={-1}>A</button>
            <button className="ds-face-btn ds-face-btn-b" onClick={() => fireKey('b')} aria-label="B" tabIndex={-1}>B</button>
            <div className="ds-face-btn ds-face-btn-x" aria-hidden="true">X</div>
            <div className="ds-face-btn ds-face-btn-y" aria-hidden="true">Y</div>
          </div>
        </div>

        {/* ── Power button (right side edge) ── */}
        <button
          className={`ds-power-side-btn ${on ? 'ds-power-side-btn--on' : ''}`}
          onClick={togglePower}
          aria-label={on ? 'Turn screen off' : 'Turn screen on'}
          title={on ? 'Power off' : 'Power on'}
        />
      </div>
    </div>
  )
}
