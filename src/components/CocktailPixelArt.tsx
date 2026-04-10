import type React from 'react'

/**
 * Pixel-art SVG cocktail illustrations — one per result.
 * ViewBox 0 0 80 110. Drawn with flat colours, thick outlines, and pixel-grid
 * coordinates to match the Touch Detective / Nintendo DS aesthetic.
 *
 * When you have real images, replace <CocktailPixelArt> in result/page.tsx with
 * an <Image src={imgSrc} … /> and delete this file.
 */

const OUT  = '#111820'   // outline colour
const GLS  = '#8ec4b0'   // glass body / rim stroke (mint-gray, visible on dark screen)
const ICE  = '#c8dce8'   // ice fill
const ICES = '#9ab8c8'   // ice stroke
const FOAM = '#dedad0'   // foam fill
const FOAMS= '#b8b4a8'   // foam stroke

// ── Shared sub-elements ──────────────────────────────────────────────────────

function IceBlock({ x, y, w, h }: { x:number; y:number; w:number; h:number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={ICE} stroke={ICES} strokeWidth={1.5}/>
      <rect x={x+2} y={y+2} width={w/3} height={h/4} fill="#e8f4f8" strokeWidth={0}/>
    </g>
  )
}

function IceCubes({ x, y }: { x:number; y:number }) {
  const cubes = [{ x: x+4, y: y+4 }, { x: x+22, y: y+8 }, { x: x+40, y: y+2 }]
  return (
    <>
      {cubes.map((c,i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={14} height={14} rx={1} fill={ICE} stroke={ICES} strokeWidth={1.5}/>
          <rect x={c.x+2} y={c.y+2} width={4} height={3} fill="#e8f4f8" strokeWidth={0}/>
        </g>
      ))}
    </>
  )
}

function FoamTop({ x, y, w }: { x:number; y:number; w:number }) {
  return <rect x={x} y={y} width={w} height={9} fill={FOAM} stroke={FOAMS} strokeWidth={1.5}/>
}

function Bubbles({ xs, ys }: { xs:number[]; ys:number[] }) {
  return (
    <>
      {xs.map((cx,i) => (
        <circle key={i} cx={cx} cy={ys[i]} r={1.5} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1}/>
      ))}
    </>
  )
}

// ── Garnishes ────────────────────────────────────────────────────────────────

function Lime({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill="#4a9040" stroke="#2a5020" strokeWidth={1.5}/>
      <circle cx={x} cy={y} r={4} fill="#70c060" stroke="none"/>
      <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="#2a5020" strokeWidth={1}/>
      <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="#2a5020" strokeWidth={1}/>
      <line x1={x-3} y1={y-3} x2={x+3} y2={y+3} stroke="#2a5020" strokeWidth={1}/>
    </g>
  )
}

function Cherry({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <line x1={x} y1={y-2} x2={x+6} y2={y-9} stroke="#3a1808" strokeWidth={1.5}/>
      <circle cx={x} cy={y+3} r={5} fill="#c81830" stroke="#801020" strokeWidth={1.5}/>
      <circle cx={x-1} cy={y+1} r={1.5} fill="#e04060" strokeWidth={0}/>
    </g>
  )
}

function OrangePeel({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <rect x={x-6} y={y-3} width={12} height={5} rx={2.5} fill="#f08020" stroke="#c06010" strokeWidth={1.5}/>
      <rect x={x-3} y={y-1} width={7} height={2} rx={1} fill="#f8b050" strokeWidth={0}/>
    </g>
  )
}

function Olive({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <line x1={x-12} y1={y} x2={x+12} y2={y} stroke="#c8b880" strokeWidth={1.5}/>
      {([-8,0,8] as number[]).map(dx => (
        <g key={dx}>
          <ellipse cx={x+dx} cy={y} rx={4} ry={5} fill="#4a8030" stroke="#2a5018" strokeWidth={1.5}/>
          <circle  cx={x+dx} cy={y} r={1.5} fill="#c87030" strokeWidth={0}/>
        </g>
      ))}
    </g>
  )
}

function Pineapple({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <polygon points={`${x},${y-10} ${x-5},${y-2} ${x},${y-4} ${x+5},${y-2}`} fill="#3a8020"/>
      <polygon points={`${x-3},${y-8} ${x-8},${y-2} ${x-3},${y-3}`} fill="#4a9030"/>
      <polygon points={`${x+3},${y-8} ${x+8},${y-2} ${x+3},${y-3}`} fill="#4a9030"/>
      <polygon points={`${x-6},${y-2} ${x+6},${y-2} ${x+7},${y+9} ${x-7},${y+9}`}
               fill="#e8c028" stroke="#c09010" strokeWidth={1.5}/>
      <line x1={x-2} y1={y+1} x2={x+2} y2={y+4} stroke="#c09010" strokeWidth={0.8}/>
      <line x1={x+2} y1={y+1} x2={x-2} y2={y+4} stroke="#c09010" strokeWidth={0.8}/>
    </g>
  )
}

function CoffeeBeans({ x, y }: { x:number; y:number }) {
  return (
    <>
      {([[-7,0],[0,-3],[7,0]] as [number,number][]).map(([dx,dy],i) => (
        <g key={i}>
          <ellipse cx={x+dx} cy={y+dy} rx={3.5} ry={2.5} fill="#3a1808" stroke="#201008" strokeWidth={1}/>
          <line x1={x+dx} y1={y+dy-2} x2={x+dx} y2={y+dy+2} stroke="#201008" strokeWidth={0.6}/>
        </g>
      ))}
    </>
  )
}

function LemonTwist({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <path d={`M${x},${y} Q${x+9},${y-5} ${x+7},${y+5}`} fill="none" stroke="#e8d820" strokeWidth={2.5}/>
      <circle cx={x-1} cy={y+5} r={2.5} fill="#e8d820" stroke="#c0b010" strokeWidth={1}/>
    </g>
  )
}

function Lavender({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <line x1={x} y1={y+10} x2={x} y2={y} stroke="#7a7040" strokeWidth={1.5}/>
      {([[-2,8],[ 2,5],[-2,2],[ 2,-1]] as [number,number][]).map(([dx,dy],i) => (
        <circle key={i} cx={x+dx} cy={y+dy} r={1.5} fill="#9070c0" strokeWidth={0}/>
      ))}
    </g>
  )
}

function OrangeSlices({ x, y }: { x:number; y:number }) {
  return (
    <g>
      <path d={`M${x-9},${y} A9,9 0 0,1 ${x+9},${y}`} fill="#f07030" stroke="#c04010" strokeWidth={1.5}/>
      <line x1={x} y1={y-9} x2={x} y2={y} stroke="#c04010" strokeWidth={1}/>
      <line x1={x-6} y1={y-7} x2={x+6} y2={y-7} stroke="#c04010" strokeWidth={0.8}/>
    </g>
  )
}

// ── Glass drawing functions ──────────────────────────────────────────────────
// Every function receives the visual spec and returns a full SVG fragment.
// Structure: ice → liquid bottom → liquid top / layer → foam → glass outline → garnish → bubbles

interface Spec {
  liquid:   string
  rim?:     'salt' | 'sugar' | null
  foam?:    boolean
  garnish?: string | null
  ice?:     'block' | 'cubes' | null
  layer?:   { top: string; bottom: string } | null
  bubbles?: boolean
}

function RocksGlass(s: Spec) {
  const lx = 16, ly = 40, lw = 48, lh = 50   // liquid inner rect
  const gPts = '12,36 68,36 64,92 16,92'      // glass outer polygon
  return (
    <>
      {s.ice === 'block'  && <IceBlock x={18} y={52} w={36} h={32}/>}
      {s.ice === 'cubes'  && <IceCubes x={lx} y={ly+4}/>}
      {s.layer ? (
        <>
          <polygon points={`${lx},${ly+lh/2} ${lx+lw},${ly+lh/2} ${lx+lw},${ly+lh} ${lx},${ly+lh}`} fill={s.layer.bottom}/>
          <polygon points={`${lx},${ly} ${lx+lw},${ly} ${lx+lw},${ly+lh/2} ${lx},${ly+lh/2}`} fill={s.layer.top}/>
        </>
      ) : (
        <polygon points={`${lx},${ly} ${lx+lw},${ly} ${lx+lw},${ly+lh} ${lx},${ly+lh}`} fill={s.liquid}/>
      )}
      {s.foam && <FoamTop x={lx} y={ly} w={lw}/>}
      <polygon points={gPts} fill="none" stroke={GLS} strokeWidth={2.5} strokeLinejoin="miter"/>
      {/* Rim highlight */}
      <line x1={12} y1={36} x2={68} y2={36} stroke={GLS} strokeWidth={4} strokeOpacity={0.4}/>
      {s.garnish === 'cherry'      && <Cherry x={36} y={28}/>}
      {s.garnish === 'orange-peel' && <OrangePeel x={58} y={32}/>}
      {s.garnish === 'lime'        && <Lime x={62} y={30}/>}
    </>
  )
}

function MartiniGlass(s: Spec) {
  // Very wide V-shape bowl
  const bPts = '4,18 76,18 40,64'
  return (
    <>
      <polygon points="8,22 72,22 40,62" fill={s.liquid}/>
      <polygon points={bPts} fill="none" stroke={GLS} strokeWidth={2.5} strokeLinejoin="miter"/>
      <rect x={38} y={64} width={4} height={20} fill={GLS} stroke={OUT} strokeWidth={1}/>
      <rect x={25} y={84} width={30} height={6}  fill={GLS} stroke={OUT} strokeWidth={1}/>
      {s.garnish === 'olive'       && <Olive x={40} y={30}/>}
      {s.garnish === 'orange-peel' && <OrangePeel x={66} y={18}/>}
    </>
  )
}

function MargaritaGlass(s: Spec) {
  const bPts = '8,22 72,22 60,60 20,60'
  return (
    <>
      {s.rim === 'salt' && (
        <line x1={8} y1={22} x2={72} y2={22} stroke="#e8e4d8" strokeWidth={5} strokeDasharray="3,2"/>
      )}
      <polygon points="11,26 69,26 58,58 22,58" fill={s.liquid}/>
      <polygon points={bPts} fill="none" stroke={GLS} strokeWidth={2.5} strokeLinejoin="miter"/>
      <rect x={37} y={60} width={6}  height={24} fill={GLS} stroke={OUT} strokeWidth={1}/>
      <rect x={24} y={84} width={32} height={6}  fill={GLS} stroke={OUT} strokeWidth={1}/>
      {s.garnish === 'lime' && <Lime x={66} y={22}/>}
    </>
  )
}

function CoupeGlass(s: Spec) {
  const bPts = '6,30 74,30 66,54 14,54'
  const lx = 9, ly = 33, lw = 62, lh = 20
  return (
    <>
      <polygon points={`${lx},${ly} ${lx+lw},${ly} ${lx+lw-2},${ly+lh} ${lx+2},${ly+lh}`} fill={s.liquid}/>
      {s.foam && <FoamTop x={lx} y={ly} w={lw}/>}
      <polygon points={bPts} fill="none" stroke={GLS} strokeWidth={2.5} strokeLinejoin="miter"/>
      <rect x={38} y={54} width={4}  height={30} fill={GLS} stroke={OUT} strokeWidth={1}/>
      <rect x={25} y={84} width={30} height={6}  fill={GLS} stroke={OUT} strokeWidth={1}/>
      {s.foam && s.garnish === 'coffee-beans' && <CoffeeBeans x={40} y={36}/>}
      {s.garnish === 'cherry'   && <Cherry x={36} y={24}/>}
      {s.garnish === 'lavender' && <Lavender x={58} y={26}/>}
      {!s.foam && s.garnish === 'coffee-beans' && <CoffeeBeans x={40} y={36}/>}
    </>
  )
}

function ChampagneFlute(s: Spec) {
  const bPts = '32,8 48,8 52,76 28,76'
  return (
    <>
      <polygon points="34,10 46,10 50,74 30,74" fill={s.liquid}/>
      {s.bubbles && <Bubbles xs={[38,42,36,40,44]} ys={[60,45,30,20,55]}/>}
      <polygon points={bPts} fill="none" stroke={GLS} strokeWidth={2.5} strokeLinejoin="miter"/>
      <rect x={38} y={76} width={4}  height={10} fill={GLS} stroke={OUT} strokeWidth={1}/>
      <rect x={27} y={86} width={26} height={6}  fill={GLS} stroke={OUT} strokeWidth={1}/>
      {s.garnish === 'lemon' && <LemonTwist x={44} y={10}/>}
    </>
  )
}

function HurricaneGlass(s: Spec) {
  const bPts = '28,8 52,8 60,30 58,54 52,80 50,94 30,94 28,80 22,54 20,30'
  const lPts = '31,12 49,12 57,32 55,56 49,88 31,88 25,56 23,32'
  return (
    <>
      <polygon points={lPts} fill={s.liquid}/>
      <polygon points={bPts} fill="none" stroke={GLS} strokeWidth={2.5} strokeLinejoin="miter"/>
      {s.garnish === 'pineapple' && <Pineapple x={50} y={8}/>}
    </>
  )
}

function WineGlass(s: Spec) {
  const bPts = '8,14 72,14 66,62 14,62'
  const lx = 11, ly = 17
  return (
    <>
      {s.ice === 'cubes' && <IceCubes x={lx} y={ly+4}/>}
      <polygon points={`${lx},${ly} ${lx+58},${ly} ${lx+54},${58} ${lx+2},${58}`} fill={s.liquid}/>
      {s.bubbles && <Bubbles xs={[30,44,22,52,38]} ys={[50,36,40,30,24]}/>}
      <polygon points={bPts} fill="none" stroke={GLS} strokeWidth={2.5} strokeLinejoin="miter"/>
      <rect x={38} y={62} width={4}  height={22} fill={GLS} stroke={OUT} strokeWidth={1}/>
      <rect x={25} y={84} width={30} height={6}  fill={GLS} stroke={OUT} strokeWidth={1}/>
      {s.garnish === 'orange-slices' && <OrangeSlices x={52} y={28}/>}
    </>
  )
}

function CopperMug(s: Spec) {
  return (
    <>
      {s.ice === 'cubes' && <IceCubes x={18} y={34}/>}
      <rect x={16} y={30} width={48} height={58} fill={s.liquid}/>
      {/* Body */}
      <rect x={14} y={28} width={52} height={62} rx={2} fill="none" stroke="#b87a40" strokeWidth={3}/>
      {/* Rim */}
      <rect x={12} y={24} width={56} height={6}  rx={1} fill="#c88040" stroke="#a06020" strokeWidth={2}/>
      {/* Bottom detail */}
      <rect x={14} y={86} width={52} height={4}  rx={1} fill="#a06020" stroke="none"/>
      {/* Handle */}
      <rect x={64} y={38} width={8}  height={3} fill="#c88040" stroke="#a06020" strokeWidth={1.5}/>
      <rect x={68} y={38} width={4}  height={24} fill="#c88040" stroke="#a06020" strokeWidth={1.5}/>
      <rect x={64} y={59} width={8}  height={3} fill="#c88040" stroke="#a06020" strokeWidth={1.5}/>
      {/* Rivet dots */}
      <circle cx={20} cy={34} r={1.5} fill="#a06020"/>
      <circle cx={60} cy={34} r={1.5} fill="#a06020"/>
      {s.garnish === 'lime' && <Lime x={60} y={24}/>}
    </>
  )
}

// ── Cocktail → visual spec mapping ──────────────────────────────────────────

type GlassType = 'rocks'|'martini'|'margarita'|'coupe'|'flute'|'hurricane'|'wine'|'mug'

interface Visual extends Spec { glass: GlassType }

const VISUALS: Record<string, Visual> = {
  'Margarita':        { glass:'margarita', liquid:'#70b858', rim:'salt',   garnish:'lime'          },
  'Cosmopolitan':     { glass:'martini',   liquid:'#e05878',               garnish:'orange-peel'   },
  'Whiskey Sour':     { glass:'rocks',     liquid:'#b87030', foam:true,    garnish:'cherry'        },
  'Pina Colada':      { glass:'hurricane', liquid:'#f0ece0',               garnish:'pineapple'     },
  'Old Fashioned':    { glass:'rocks',     liquid:'#903820', ice:'block',  garnish:'orange-peel'   },
  'Mimosa':           { glass:'flute',     liquid:'#e8c040', bubbles:true                          },
  'Dry Martini':      { glass:'martini',   liquid:'#c8dcd0',               garnish:'olive'         },
  'White Russian':    { glass:'rocks',     liquid:'#3a1808',
                        layer:{ top:'#e8e0d0', bottom:'#3a1808' }                                  },
  'Moscow Mule':      { glass:'mug',       liquid:'#c0d898', ice:'cubes',  garnish:'lime'          },
  'Espresso Martini': { glass:'coupe',     liquid:'#1a0806', foam:true,    garnish:'coffee-beans'  },
  "Dark 'n' Stormy":  { glass:'rocks',     liquid:'#c8c888',
                        layer:{ top:'#181008', bottom:'#c8c888' }                                  },
  'Amaretto Sour':    { glass:'coupe',     liquid:'#c07838', foam:true,    garnish:'lavender'      },
  'Manhattan':        { glass:'coupe',     liquid:'#782018',               garnish:'cherry'        },
  'Aperol Spritz':    { glass:'wine',      liquid:'#e86828', ice:'cubes',  garnish:'orange-slices', bubbles:true },
  'Negroni':          { glass:'rocks',     liquid:'#b01808', ice:'block'                           },
  'French 75':        { glass:'flute',     liquid:'#d8cc58', bubbles:true, garnish:'lemon'         },
}

const GLASS_FN: Record<GlassType, (s: Spec) => React.ReactElement> = {
  rocks:     RocksGlass,
  martini:   MartiniGlass,
  margarita: MargaritaGlass,
  coupe:     CoupeGlass,
  flute:     ChampagneFlute,
  hurricane: HurricaneGlass,
  wine:      WineGlass,
  mug:       CopperMug,
}

// Table surface line at the bottom of every illustration
function TableLine() {
  return <line x1={4} y1={100} x2={76} y2={100} stroke="#1e3030" strokeWidth={1.5} opacity={0.6}/>
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function CocktailPixelArt({ cocktailName }: { cocktailName: string }) {
  const visual = VISUALS[cocktailName] ?? VISUALS['Margarita']
  const DrawGlass = GLASS_FN[visual.glass]

  return (
    <svg
      viewBox="0 0 80 110"
      xmlns="http://www.w3.org/2000/svg"
      width={120}
      height={150}
      style={{ imageRendering: 'pixelated', display: 'block' }}
      aria-label={`${cocktailName} illustration`}
    >
      <TableLine/>
      <DrawGlass {...visual}/>
    </svg>
  )
}
