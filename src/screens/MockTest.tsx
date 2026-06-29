import { useEffect, useMemo, useRef, useState } from 'react'
import type { PartId, Question } from '../types'
import { QuestionView } from '../components/QuestionView'
import { stopSpeaking } from '../lib/speech'
import { MOCK_DURATION_SEC, type MockAnswer, isListening } from '../lib/mock'

interface Props {
  questions: Question[]
  onSubmit: (answers: MockAnswer[], durationSec: number) => void
  onQuit: () => void
}

function fmt(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function scriptOf(q: Question): string | null {
  return q.kind === 'part3' || q.kind === 'part4' ? q.script : null
}

export function MockTest({ questions, onSubmit, onQuit }: Props) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(() => questions.map(() => null))
  const [remaining, setRemaining] = useState(MOCK_DURATION_SEC)
  const startRef = useRef(Date.now())

  const q = questions[index]
  const total = questions.length
  const isLast = index === total - 1
  const listening = isListening(q.kind as PartId)

  const setContinues =
    index > 0 && scriptOf(q) != null && scriptOf(questions[index - 1]) === scriptOf(q)

  const submit = useMemo(
    () => () => {
      stopSpeaking()
      const elapsed = Math.round((Date.now() - startRef.current) / 1000)
      onSubmit(
        questions.map((qq, i) => ({ qid: qq.id, selected: answers[i] })),
        elapsed,
      )
    },
    [answers, questions, onSubmit],
  )

  // Countdown — auto-submits when time runs out.
  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t)
          submit()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [submit])

  const select = (id: string) =>
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = id
      return next
    })

  const next = () => {
    if (isLast) {
      if (confirm('ส่งคำตอบและดูผลสอบ?')) submit()
      return
    }
    setIndex((i) => i + 1)
  }

  const lowTime = remaining <= 5 * 60
  const answeredCount = answers.filter((a) => a != null).length

  return (
    <div className="player mock">
      <div className="player-top">
        <button
          className="quit"
          onClick={() => {
            if (confirm('ออกจากการสอบ? คะแนนรอบนี้จะไม่ถูกบันทึก')) {
              stopSpeaking()
              onQuit()
            }
          }}
        >
          ✕
        </button>
        <div className="mock-meta">
          <span className={`mock-section ${listening ? 'listen' : 'read'}`}>
            {listening ? '🎧 Listening' : '📖 Reading'}
          </span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(index / total) * 100}%` }} />
          </div>
        </div>
        <span className={`mock-timer ${lowTime ? 'low' : ''}`}>⏱ {fmt(remaining)}</span>
      </div>

      <div className="player-body">
        <div className="mock-counter">
          ข้อ {index + 1} / {total} <span className="mock-answered">· ตอบแล้ว {answeredCount}</span>
        </div>
        <QuestionView
          question={q}
          selected={answers[index]}
          revealed={false}
          setContinues={setContinues}
          onSelect={select}
        />
      </div>

      <div className="player-footer">
        <button className="cta continue" onClick={next}>
          {isLast ? 'ส่งคำตอบและดูผล' : answers[index] == null ? 'ข้ามข้อนี้ →' : 'ถัดไป →'}
        </button>
      </div>
    </div>
  )
}
