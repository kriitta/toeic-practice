import { useMemo, useState } from 'react'
import type { Level, Part } from '../types'
import type { AnsweredItem } from '../lib/storage'
import { QuestionView } from '../components/QuestionView'
import { stopSpeaking } from '../lib/speech'

interface Props {
  part: Part
  level: Level
  onQuit: () => void
  onFinish: (items: AnsweredItem[]) => void
}

/** Part 3/4 questions belong to a "set" that shares one audio script. */
function scriptOf(q: Level['questions'][number]): string | null {
  return q.kind === 'part3' || q.kind === 'part4' ? q.script : null
}

export function LevelScreen({ part, level, onQuit, onFinish }: Props) {
  // Part 3/4 must keep their original order so each audio set stays together;
  // other parts are shuffled for variety.
  const isSetBased = part.id === 'part3' || part.id === 'part4'
  const questions = useMemo(
    () => (isSetBased ? level.questions : [...level.questions].sort(() => Math.random() - 0.5)),
    [level, isSetBased],
  )

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [items, setItems] = useState<AnsweredItem[]>([])

  const q = questions[index]
  const total = questions.length
  const isLast = index === total - 1
  // True when this question continues the same audio set — don't replay the audio.
  const setContinues =
    index > 0 && scriptOf(q) != null && scriptOf(questions[index - 1]) === scriptOf(q)
  const wasCorrect = selected === q.answer
  const answerIndex = q.choices.findIndex((c) => c.id === q.answer)
  const answerLetter = ['A', 'B', 'C', 'D'][answerIndex] ?? '?'
  const answerText = q.choices[answerIndex]?.text ?? ''

  const check = () => {
    if (selected == null) return
    stopSpeaking()
    setRevealed(true)
    setItems((prev) => [...prev, { tag: q.tag, correct: wasCorrect }])
  }

  const next = () => {
    if (isLast) {
      onFinish(items)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setRevealed(false)
  }

  const pct = (index / total) * 100

  return (
    <div className="player">
      <div className="player-top">
        <button className="quit" onClick={() => { stopSpeaking(); onQuit() }}>✕</button>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%`, background: part.color }} />
        </div>
        <span className="qcount">{index + 1}/{total}</span>
      </div>

      <div className="player-body">
        <span className="player-tag">PART {part.number} · {q.tag}</span>
        <QuestionView
          question={q}
          selected={selected}
          revealed={revealed}
          setContinues={setContinues}
          onSelect={(id) => !revealed && setSelected(id)}
        />
      </div>

      <div className={`player-footer ${revealed ? (wasCorrect ? 'good' : 'bad') : ''}`}>
        {revealed && (
          <div className="feedback">
            <strong>{wasCorrect ? '✅ ถูกต้อง!' : '❌ ยังไม่ถูก'}</strong>
            <p className="fb-answer">
              เฉลย: ข้อ <b>{answerLetter}</b> — “{answerText}”
            </p>
            <p className="fb-explain">{q.explain}</p>
            <div className="fb-tip">
              <span className="fb-tip-label">💡 เคล็ดลับสังเกต</span>
              <p>{q.tip}</p>
            </div>
          </div>
        )}
        {!revealed ? (
          <button className="cta" disabled={selected == null} onClick={check}>ตรวจคำตอบ</button>
        ) : (
          <button className="cta continue" onClick={next}>{isLast ? 'ดูผลด่านนี้' : 'ถัดไป'}</button>
        )}
      </div>
    </div>
  )
}
