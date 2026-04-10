# A Night That Escalated Way Too Quickly

A cocktail personality quiz styled as a Nintendo DS game in the Touch Detective aesthetic. Answer 10 scenario questions, get matched to one of 16 cocktails based on your vibe.

Built with Next.js 16 (App Router), no Tailwind, pixel fonts (Press Start 2P + VT323), and pure CSS for the DS frame.

---

## Prerequisites

- **Node.js** v18 or higher (v20+ recommended)
- **npm** v9 or higher

---

## Local setup

```bash
# 1. Clone the repo
git clone git@github.com:kl-a/Cocktail-Personality-DS-Game.git
cd Cocktail-Personality-DS-Game

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Adding drink images

When you have the cocktail images ready, drop them into:

```
public/images/cocktails/
```

File naming uses this slug format — lowercase, apostrophes stripped, spaces/special chars become hyphens:

| Cocktail | Expected filename |
|---|---|
| Margarita | `margarita.png` |
| Piña Colada | `pina-colada.png` |
| Whiskey Sour | `whiskey-sour.png` |
| Old Fashioned | `old-fashioned.png` |
| Espresso Martini | `espresso-martini.png` |
| Dark 'n' Stormy | `dark-n-stormy.png` |
| Amaretto Sour | `amaretto-sour.png` |
| White Russian | `white-russian.png` |
| Moscow Mule | `moscow-mule.png` |
| Dry Martini | `dry-martini.png` |
| French 75 | `french-75.png` |
| Cosmopolitan | `cosmopolitan.png` |
| Mimosa | `mimosa.png` |
| Manhattan | `manhattan.png` |
| Aperol Spritz | `aperol-spritz.png` |
| Negroni | `negroni.png` |

Then in [`src/app/result/page.tsx`](src/app/result/page.tsx), replace the `<CocktailPixelArt>` component with a Next.js `<Image>` tag. The slug helper is already in [`src/lib/scoring.ts`](src/lib/scoring.ts):

```tsx
// Before (SVG placeholder):
import CocktailPixelArt from '@/components/CocktailPixelArt'
// ...
<CocktailPixelArt cocktailName={cocktail.cocktailName} />

// After (real image):
import Image from 'next/image'
import { cocktailSlug } from '@/lib/scoring'
// ...
<Image
  src={`/images/cocktails/${cocktailSlug(cocktail.cocktailName)}.png`}
  alt={cocktail.cocktailName}
  width={80}
  height={110}
  style={{ imageRendering: 'pixelated' }}
/>
```

Once images are wired up, `src/components/CocktailPixelArt.tsx` can be deleted.

---

## Other commands

```bash
npm run build    # production build
npm run start    # serve the production build locally
npm run lint     # run ESLint
```

---

## Project structure

```
src/
├── app/
│   ├── globals.css        # all styles — DS frame, pixel fonts, colour palette
│   ├── layout.tsx         # HTML shell
│   ├── page.tsx           # landing page
│   ├── quiz/
│   │   └── page.tsx       # 10-question quiz (client component)
│   └── result/
│       └── page.tsx       # result screen — blurb + flavour profile bars
├── assets/
│   ├── cocktails.json     # 16 cocktails with attributes, blurbs, flavour profiles
│   └── quiz.json          # 10 questions mapped to personality dimensions
├── components/
│   ├── DSFrame.tsx        # DS device frame wrapper (top screen + bottom screen), power toggle with CRT animation
│   ├── CocktailPixelArt.tsx # SVG pixel-art cocktail illustrations (placeholder until real images added)
│   ├── AudioPlayer.tsx    # optional lofi stream player — set STREAM_URL inside the file to enable
│   └── Sparkles.tsx       # decorative animated pixel sparkles rendered around the DS frame
└── lib/
    └── scoring.ts         # personality matching algorithm + cocktailSlug() helper for image paths

public/
└── images/cocktails/      # drop drink PNGs here
```

## How the scoring works

Each quiz question maps to one of four dimensions: `movement`, `speech`, `expressiveness`, or `attitude`. Answers score 1–5 on that dimension.

After all 10 questions, scores are averaged per dimension. Each cocktail has a target score on the same four dimensions. The algorithm picks the cocktail with the smallest Euclidean distance to your scores.
