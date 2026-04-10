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
