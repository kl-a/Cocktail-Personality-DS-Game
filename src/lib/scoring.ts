import cocktailsData from '@/assets/cocktails.json'
import quizData from '@/assets/quiz.json'

export type Cocktail = (typeof cocktailsData)[0]
type Question = (typeof quizData.questions)[0]

/**
 * Each dimension's "high" pole maps to quiz score 5 (the most expressive end).
 * We compare the user's average per-dimension score against the cocktail's
 * positive-pole attribute value using Euclidean distance.
 */
const POSITIVE_POLES: Record<string, string> = {
  movement:       'quick',
  speech:         'direct',
  expressiveness: 'varied',
  attitude:       'relaxed',
}

const DIMENSIONS = ['movement', 'speech', 'expressiveness', 'attitude'] as const

/** answers: { q1: 3, q2: 5, ... } */
export function calculateResult(answers: Record<string, number>): Cocktail {
  const questions: Question[] = quizData.questions

  // Bucket scores by dimension
  const bucket: Record<string, number[]> = {
    movement: [], speech: [], expressiveness: [], attitude: [],
  }
  for (const q of questions) {
    const score = answers[q.id]
    if (score != null && q.dimension in bucket) {
      bucket[q.dimension].push(score)
    }
  }

  // Average each dimension (fallback to midpoint 3 if somehow empty)
  const userVec: Record<string, number> = {}
  for (const dim of DIMENSIONS) {
    const arr = bucket[dim]
    userVec[dim] = arr.length > 0
      ? arr.reduce((a, b) => a + b, 0) / arr.length
      : 3
  }

  // Euclidean distance to every cocktail's attribute vector
  let best: Cocktail = cocktailsData[0]
  let bestDist = Infinity

  // Exclude special/Easter-egg cocktails that aren't reachable through normal play
  const EXCLUDED = new Set(["Glass of Water", "The Bartender's Secret"])

  for (const cocktail of cocktailsData) {
    if (EXCLUDED.has(cocktail.cocktailName)) continue
    const attrs = cocktail.attributes as Record<string, Record<string, number>>
    let distSq = 0
    for (const dim of DIMENSIONS) {
      const pole = POSITIVE_POLES[dim]
      const cScore = attrs[dim][pole]
      distSq += (userVec[dim] - cScore) ** 2
    }
    if (distSq < bestDist) {
      bestDist = distSq
      best = cocktail
    }
  }

  return best
}

/** Converts a cocktail name to a filesystem-safe slug for image paths. */
export function cocktailSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
