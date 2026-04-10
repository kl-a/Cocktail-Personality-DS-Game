// Floating pixel-art sparkles rendered left and right of the DS console.
// Defined as a static list so positions never jump between renders.

const SPARKLES = [
  // ── Left side ──────────────────────────────────────────────────────
  { id:  1, left:  '3%', top: '10%', color: 'var(--mint)',   delay: '0s',    dur: '5s'   },
  { id:  2, left:  '8%', top: '24%', color: 'var(--pink)',   delay: '0.8s',  dur: '4s'   },
  { id:  3, left:  '5%', top: '40%', color: 'var(--yellow)', delay: '1.6s',  dur: '6s'   },
  { id:  4, left: '12%', top: '54%', color: 'var(--purple)', delay: '2.4s',  dur: '4.5s' },
  { id:  5, left:  '2%', top: '68%', color: 'var(--mint)',   delay: '3.2s',  dur: '5.5s' },
  { id:  6, left: '10%', top: '82%', color: 'var(--pink)',   delay: '4s',    dur: '4s'   },
  { id:  7, left:  '7%', top: '16%', color: 'var(--yellow)', delay: '1.2s',  dur: '5s'   },
  { id:  8, left: '14%', top: '32%', color: 'var(--mint)',   delay: '2s',    dur: '6s'   },
  { id:  9, left:  '4%', top: '48%', color: 'var(--pink)',   delay: '2.8s',  dur: '4.5s' },
  { id: 10, left: '11%', top: '62%', color: 'var(--purple)', delay: '3.6s',  dur: '5s'   },
  { id: 11, left:  '6%', top: '76%', color: 'var(--mint)',   delay: '4.4s',  dur: '4s'   },
  { id: 12, left: '13%', top: '90%', color: 'var(--yellow)', delay: '0.4s',  dur: '6s'   },
  // ── Right side ─────────────────────────────────────────────────────
  { id: 13, left: '97%', top: '10%', color: 'var(--pink)',   delay: '0.6s',  dur: '5s'   },
  { id: 14, left: '92%', top: '24%', color: 'var(--mint)',   delay: '1.4s',  dur: '4s'   },
  { id: 15, left: '95%', top: '40%', color: 'var(--yellow)', delay: '2.2s',  dur: '5.5s' },
  { id: 16, left: '88%', top: '54%', color: 'var(--mint)',   delay: '3s',    dur: '4.5s' },
  { id: 17, left: '98%', top: '68%', color: 'var(--purple)', delay: '3.8s',  dur: '5s'   },
  { id: 18, left: '90%', top: '82%', color: 'var(--pink)',   delay: '4.6s',  dur: '4s'   },
  { id: 19, left: '93%', top: '16%', color: 'var(--mint)',   delay: '1s',    dur: '6s'   },
  { id: 20, left: '86%', top: '32%', color: 'var(--yellow)', delay: '1.8s',  dur: '5s'   },
  { id: 21, left: '96%', top: '48%', color: 'var(--purple)', delay: '2.6s',  dur: '4s'   },
  { id: 22, left: '89%', top: '62%', color: 'var(--pink)',   delay: '3.4s',  dur: '5.5s' },
  { id: 23, left: '94%', top: '76%', color: 'var(--mint)',   delay: '4.2s',  dur: '4.5s' },
  { id: 24, left: '87%', top: '90%', color: 'var(--yellow)', delay: '0.2s',  dur: '6s'   },
]

export default function Sparkles() {
  return (
    <div className="sparkle-layer" aria-hidden="true">
      {SPARKLES.map((s) => (
        <div
          key={s.id}
          className="sparkle-pixel"
          style={{
            left:              s.left,
            top:               s.top,
            color:             s.color,
            animationDuration: s.dur,
            animationDelay:    s.delay,
          }}
        />
      ))}
    </div>
  )
}
