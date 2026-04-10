const KEY = 'td-glass-history'
const MAX = 5

export function addGlass(cocktailName: string): void {
  if (typeof localStorage === 'undefined') return
  const history = getGlasses()
  if (history.length >= MAX) return   // capped — no more room at the bar
  localStorage.setItem(KEY, JSON.stringify([...history, cocktailName]))
}

export function clearGlasses(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(KEY)
}

export function getGlasses(): string[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(0, MAX) : []
  } catch { return [] }
}
