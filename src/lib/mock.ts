import { PARTS } from '../data/curriculum'
import { MOCK_EXAM } from '../data/mockExam'
import type { Part, PartId, Question } from '../types'

// Official TOEIC Listening & Reading distribution — 200 questions total.
export const MOCK_COUNTS: Record<PartId, number> = {
  part1: 6,
  part2: 25,
  part3: 39, // 13 conversations × 3
  part4: 30, // 10 talks × 3
  part5: 30,
  part6: 16, // 4 texts × 4
  part7: 54,
}
export const MOCK_TOTAL = 200
export const MOCK_DURATION_SEC = 120 * 60 // 45 min Listening + 75 min Reading
const LISTENING: PartId[] = ['part1', 'part2', 'part3', 'part4']

export const PART_BY_ID: Record<PartId, Part> = Object.fromEntries(
  PARTS.map((p) => [p.id, p]),
) as Record<PartId, Part>

export function isListening(pid: PartId): boolean {
  return LISTENING.includes(pid)
}

// ---- Question lookup ---------------------------------------------------

// The mock exam is a fixed, dedicated 200-question set (separate from the
// practice bank). Index both so review can look up any question by id.
const QUESTION_INDEX: Record<string, Question> = {}
for (const part of PARTS) {
  for (const lvl of part.levels) {
    for (const q of lvl.questions) QUESTION_INDEX[q.id] = q
  }
}
for (const q of MOCK_EXAM) QUESTION_INDEX[q.id] = q

export function getQuestion(id: string): Question | undefined {
  return QUESTION_INDEX[id]
}

/** Return the full 200-question paper in real-test order (Part 1 → Part 7). */
export function buildMock(): Question[] {
  return [...MOCK_EXAM]
}

// ---- Grading -----------------------------------------------------------

export interface MockAnswer {
  qid: string
  selected: string | null
}

export interface PartStat {
  total: number
  wrong: number
}

export interface MockResult {
  id: string
  date: number
  durationSec: number
  total: number
  correct: number
  score990: number
  listening: number // scaled 5–495
  reading: number // scaled 5–495
  perPart: Record<PartId, PartStat>
  answers: MockAnswer[]
}

/** Approximate raw→scaled conversion (each section 5–495, rounded to nearest 5). */
function scaleSection(correct: number, total: number): number {
  if (total === 0) return 5
  const scaled = Math.round((5 + (correct / total) * 490) / 5) * 5
  return Math.max(5, Math.min(495, scaled))
}

function emptyPerPart(): Record<PartId, PartStat> {
  return {
    part1: { total: 0, wrong: 0 },
    part2: { total: 0, wrong: 0 },
    part3: { total: 0, wrong: 0 },
    part4: { total: 0, wrong: 0 },
    part5: { total: 0, wrong: 0 },
    part6: { total: 0, wrong: 0 },
    part7: { total: 0, wrong: 0 },
  }
}

export function gradeMock(answers: MockAnswer[], durationSec: number): MockResult {
  const perPart = emptyPerPart()
  let correct = 0
  for (const a of answers) {
    const q = getQuestion(a.qid)
    if (!q) continue
    const pid = q.kind as PartId
    perPart[pid].total++
    const ok = a.selected != null && a.selected === q.answer
    if (ok) correct++
    else perPart[pid].wrong++
  }

  const sum = (ids: PartId[], pick: (s: PartStat) => number) =>
    ids.reduce((n, id) => n + pick(perPart[id]), 0)
  const lTotal = sum(LISTENING, (s) => s.total)
  const lCorrect = sum(LISTENING, (s) => s.total - s.wrong)
  const rTotal = sum(['part5', 'part6', 'part7'], (s) => s.total)
  const rCorrect = sum(['part5', 'part6', 'part7'], (s) => s.total - s.wrong)

  const listening = scaleSection(lCorrect, lTotal)
  const reading = scaleSection(rCorrect, rTotal)

  return {
    id: String(Date.now()),
    date: Date.now(),
    durationSec,
    total: answers.length,
    correct,
    score990: listening + reading,
    listening,
    reading,
    perPart,
    answers,
  }
}

// ---- History persistence ----------------------------------------------

const HKEY = 'toeic-quest-mocks-v1'
const MAX_HISTORY = 12

export function loadMockHistory(): MockResult[] {
  try {
    const raw = localStorage.getItem(HKEY)
    return raw ? (JSON.parse(raw) as MockResult[]) : []
  } catch {
    return []
  }
}

export function saveMockResult(r: MockResult): MockResult[] {
  const next = [r, ...loadMockHistory()].slice(0, MAX_HISTORY)
  try {
    localStorage.setItem(HKEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
  return next
}

export function clearMockHistory(): void {
  try {
    localStorage.removeItem(HKEY)
  } catch {
    /* ignore */
  }
}
