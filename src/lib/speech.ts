// Thin wrapper around the Web Speech API (SpeechSynthesis), tuned to imitate the
// pacing of a real TOEIC Listening test: a clear, measured delivery with distinct
// pauses between statements, and alternating voices for conversations.
//
// In the real test you hear each audio ONCE — the UI layer never offers a replay.

let cachedVoices: SpeechSynthesisVoice[] = []

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  const v = window.speechSynthesis.getVoices()
  if (v.length) cachedVoices = v
  return cachedVoices
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = () => loadVoices()
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export type Accent = 'US' | 'UK' | 'AU'

/** Pick a natural English voice biased toward the requested accent (TOEIC mixes US/UK/AU/CA). */
function pickVoice(prefer: Accent = 'US'): SpeechSynthesisVoice | undefined {
  const voices = loadVoices()
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  if (!en.length) return undefined
  const want = prefer === 'UK' ? 'en-gb' : prefer === 'AU' ? 'en-au' : 'en-us'
  return (
    en.find((v) => v.lang.toLowerCase() === want) ??
    en.find((v) => v.lang.toLowerCase().startsWith(want.slice(0, 2))) ??
    en.find((v) => v.lang.toLowerCase().startsWith('en-us')) ??
    en[0]
  )
}

// A clear, slightly measured pace — close to the real TOEIC narration speed.
const TOEIC_RATE = 0.9

interface SpeakOptions {
  accent?: Accent
  rate?: number
  onStart?: () => void
  onEnd?: () => void
}

function utter(text: string, accent: Accent, rate: number): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text)
  const voice = pickVoice(accent)
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? 'en-US'
  u.rate = rate
  u.pitch = 1
  return u
}

/** Speak a single block of text once (used for Part 4 monologues). */
export function speak(text: string, opts: SpeakOptions = {}): void {
  if (!speechSupported()) {
    opts.onEnd?.()
    return
  }
  window.speechSynthesis.cancel()
  const u = utter(text, opts.accent ?? 'US', opts.rate ?? TOEIC_RATE)
  if (opts.onStart) u.onstart = () => opts.onStart!()
  if (opts.onEnd) u.onend = () => opts.onEnd!()
  window.speechSynthesis.speak(u)
}

interface SequenceOptions extends SpeakOptions {
  gap?: number // pause (ms) inserted between items, like the test's spacing
}

/**
 * Speak several texts in order, with a real pause between each — used for the
 * spoken statements in Part 1 (A–D) and the question + responses in Part 2.
 */
export function speakSequence(texts: string[], opts: SequenceOptions = {}): void {
  if (!speechSupported()) {
    opts.onEnd?.()
    return
  }
  window.speechSynthesis.cancel()
  const items = texts.map((t) => t.trim()).filter(Boolean)
  const gap = opts.gap ?? 700
  const rate = opts.rate ?? TOEIC_RATE
  const accent = opts.accent ?? 'US'
  let i = 0
  let announced = false
  const next = () => {
    if (i >= items.length) {
      opts.onEnd?.()
      return
    }
    const u = utter(items[i++], accent, rate)
    if (!announced) {
      announced = true
      u.onstart = () => opts.onStart?.()
    }
    u.onend = () => window.setTimeout(next, gap)
    window.speechSynthesis.speak(u)
  }
  next()
}

/**
 * Speak a multi-speaker script once. Lines like "M:" / "W:" alternate between a
 * US and a UK voice to mimic the two speakers in a TOEIC conversation.
 */
export function speakDialogue(script: string, opts: SpeakOptions & { gap?: number } = {}): void {
  if (!speechSupported()) {
    opts.onEnd?.()
    return
  }
  window.speechSynthesis.cancel()
  const lines = script
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const gap = opts.gap ?? 350
  let i = 0
  let announced = false
  const next = () => {
    if (i >= lines.length) {
      opts.onEnd?.()
      return
    }
    const line = lines[i++]
    const m = line.match(/^([A-Za-z]+)\s*:\s*(.*)$/)
    const speakerKey = m ? m[1].toUpperCase() : ''
    const content = m ? m[2] : line
    // Second speaker (B / W) uses a UK voice; first speaker (A / M) uses US.
    const accent: Accent = speakerKey === 'B' || speakerKey === 'W' ? 'UK' : 'US'
    const u = utter(content, accent, opts.rate ?? 0.94)
    if (!announced) {
      announced = true
      u.onstart = () => opts.onStart?.()
    }
    u.onend = () => window.setTimeout(next, gap)
    window.speechSynthesis.speak(u)
  }
  next()
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel()
}
