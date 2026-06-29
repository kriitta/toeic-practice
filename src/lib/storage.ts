import type { Part, Progress } from '../types'

const KEY = 'toeic-quest-progress-v2'

export function defaultProgress(): Progress {
  return { cleared: {}, best: {}, stats: {}, answered: 0 }
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress()
    return { ...defaultProgress(), ...(JSON.parse(raw) as Progress) }
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

export interface AnsweredItem {
  tag: string
  correct: boolean
}

/**
 * Record the outcome of a finished level.
 * - Updates per-tag stats (for weakness analysis).
 * - Keeps the best score.
 * - Marks the level "cleared" when every question was answered correctly.
 */
export function recordLevel(
  prev: Progress,
  levelId: string,
  items: AnsweredItem[],
): Progress {
  const stats = { ...prev.stats }
  for (const it of items) {
    const s = stats[it.tag] ?? { seen: 0, wrong: 0 }
    stats[it.tag] = { seen: s.seen + 1, wrong: s.wrong + (it.correct ? 0 : 1) }
  }
  const correct = items.filter((i) => i.correct).length
  const score = items.length ? correct / items.length : 0
  const perfect = correct === items.length

  return {
    cleared: { ...prev.cleared, [levelId]: prev.cleared[levelId] || perfect },
    best: { ...prev.best, [levelId]: Math.max(prev.best[levelId] ?? 0, score) },
    stats,
    answered: prev.answered + items.length,
  }
}

export function resetProgress(): Progress {
  const p = defaultProgress()
  saveProgress(p)
  return p
}

// ---- Derived helpers ---------------------------------------------------

/** How many of a part's levels are cleared, and the percentage. */
export function partProgress(p: Progress, part: Part): { done: number; total: number; pct: number } {
  const total = part.levels.length
  const done = part.levels.filter((l) => p.cleared[l.id]).length
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
}

/** Overall percentage across every part. */
export function overallProgress(p: Progress, parts: Part[]): number {
  const total = parts.reduce((n, part) => n + part.levels.length, 0)
  const done = parts.reduce((n, part) => n + part.levels.filter((l) => p.cleared[l.id]).length, 0)
  return total ? Math.round((done / total) * 100) : 0
}

export interface Weakness {
  tag: string
  seen: number
  wrong: number
  accuracy: number // 0..100
}

/** Topics sorted worst-first. Only includes tags attempted at least `minSeen` times. */
export function weaknesses(p: Progress, minSeen = 2): Weakness[] {
  return Object.entries(p.stats)
    .map(([tag, s]) => ({
      tag,
      seen: s.seen,
      wrong: s.wrong,
      accuracy: s.seen ? Math.round(((s.seen - s.wrong) / s.seen) * 100) : 100,
    }))
    .filter((w) => w.seen >= minSeen)
    .sort((a, b) => a.accuracy - b.accuracy || b.wrong - a.wrong)
}
