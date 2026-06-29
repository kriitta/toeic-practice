// ============================================================ Question models
// Each question carries a `tag` (a fine-grained skill topic) so we can track
// which topics the learner misses most often — the weakness analysis.

export interface Choice {
  id: string
  text: string
}

interface BaseQuestion {
  id: string
  tag: string // e.g. "Prepositions", "Main Idea", "Verb Tense"
  choices: Choice[]
  answer: string // Choice id
  explain: string // why the correct answer is correct (shown after answering)
  tip: string // how to spot the answer — what to observe / the common trap
}

/** Part 1 — Photographs (Listening). A real photo is shown; 4 statements are spoken. */
export interface Part1Question extends BaseQuestion {
  kind: 'part1'
  image: string // URL of a real photograph (Unsplash CDN)
  scene: string // short caption, revealed only after answering
  emoji: string // fallback if the image fails to load
}

/** Part 2 — Question / Response (Listening). */
export interface Part2Question extends BaseQuestion {
  kind: 'part2'
  audio: string // spoken prompt
}

/** Part 3 — Conversations (Listening). */
export interface Part3Question extends BaseQuestion {
  kind: 'part3'
  script: string // multi-line dialogue, "A:" / "B:" prefixes alternate voices
  question: string
}

/** Part 4 — Short Talks (Listening). */
export interface Part4Question extends BaseQuestion {
  kind: 'part4'
  script: string
  question: string
}

/** Part 5 — Incomplete Sentences (Reading). */
export interface Part5Question extends BaseQuestion {
  kind: 'part5'
  sentence: string // contains "____"
}

/** Part 6 — Text Completion (Reading). */
export interface Part6Question extends BaseQuestion {
  kind: 'part6'
  passage: string // contains "____"
}

/** Part 7 — Reading Comprehension (Reading). */
export interface Part7Question extends BaseQuestion {
  kind: 'part7'
  passageTitle: string
  passage: string
  question: string
}

export type Question =
  | Part1Question
  | Part2Question
  | Part3Question
  | Part4Question
  | Part5Question
  | Part6Question
  | Part7Question

// ============================================================ Curriculum

export type Skill = 'listening' | 'reading'
export type PartId = 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'part6' | 'part7'

export interface Level {
  id: string
  title: string
  questions: Question[]
}

export interface Tip {
  title: string
  detail: string
}

export interface Part {
  id: PartId
  number: number
  title: string // English name
  thaiTitle: string
  skill: Skill
  icon: string
  color: string
  blurb: string // one-line description
  format: string // how this part works on the real test
  tips: Tip[]
  levels: Level[]
}

// ============================================================ Progress

export interface TagStat {
  seen: number
  wrong: number
}

export interface Progress {
  /** levelId -> true when the learner has cleared it perfectly (all correct). */
  cleared: Record<string, boolean>
  /** levelId -> best fraction correct (0..1). */
  best: Record<string, number>
  /** tag -> aggregate attempts/mistakes, for weakness analysis. */
  stats: Record<string, TagStat>
  /** Total questions answered, for a simple lifetime counter. */
  answered: number
}
