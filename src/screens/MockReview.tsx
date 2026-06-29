import { useMemo } from 'react'
import type { PartId, Question } from '../types'
import { PART_BY_ID, getQuestion, type MockResult } from '../lib/mock'

interface Props {
  result: MockResult
  onBack: () => void
}

const LETTERS = ['A', 'B', 'C', 'D']
const ORDER: PartId[] = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7']

interface WrongItem {
  q: Question
  selected: string | null
  number: number // position in the paper
}

export function MockReview({ result, onBack }: Props) {
  // Collect wrong (or unanswered) questions, keeping paper order.
  const grouped = useMemo(() => {
    const byPart: Record<string, WrongItem[]> = {}
    result.answers.forEach((a, i) => {
      const q = getQuestion(a.qid)
      if (!q) return
      const isWrong = a.selected == null || a.selected !== q.answer
      if (!isWrong) return
      const pid = q.kind
      ;(byPart[pid] ??= []).push({ q, selected: a.selected, number: i + 1 })
    })
    return byPart
  }, [result])

  const totalWrong = Object.values(grouped).reduce((n, arr) => n + arr.length, 0)

  return (
    <main className="mockreview">
      <button className="back" onClick={onBack}>← กลับไปหน้าผลสอบ</button>
      <h1 className="insights-title">📖 เฉลยข้อที่ผิด ({totalWrong} ข้อ)</h1>
      {totalWrong === 0 ? (
        <p className="empty-note">🎉 เก่งมาก! รอบนี้ไม่มีข้อผิดเลย</p>
      ) : (
        ORDER.filter((pid) => grouped[pid]?.length).map((pid) => {
          const part = PART_BY_ID[pid]
          return (
            <section key={pid} className="review-part">
              <h2 className="review-part-title" style={{ borderColor: part.color }}>
                <span style={{ color: part.color }}>Part {part.number}</span> {part.thaiTitle}
                <span className="review-count">ผิด {grouped[pid].length} ข้อ</span>
              </h2>
              {grouped[pid].map((item) => (
                <ReviewCard key={`${item.q.id}-${item.number}`} item={item} color={part.color} />
              ))}
            </section>
          )
        })
      )}
      <button className="btn-primary wide" onClick={onBack}>กลับไปหน้าผลสอบ</button>
    </main>
  )
}

function Prompt({ q }: { q: Question }) {
  switch (q.kind) {
    case 'part1':
      return (
        <div className="rv-prompt">
          <img className="rv-img" src={q.image} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <p className="rv-cap">🖼️ {q.scene}</p>
        </div>
      )
    case 'part2':
      return <p className="rv-prompt">🎧 <b>คำถาม:</b> {q.audio}</p>
    case 'part3':
    case 'part4':
      return (
        <div className="rv-prompt">
          <pre className="rv-script">{q.script}</pre>
          <p className="rv-q">{q.question}</p>
        </div>
      )
    case 'part5':
      return <p className="rv-prompt rv-sentence">{q.sentence.replace('____', ' _____ ')}</p>
    case 'part6':
      return <p className="rv-prompt rv-passage">{q.passage.replace('____', ' _____ ')}</p>
    case 'part7':
      return (
        <div className="rv-prompt">
          <strong>{q.passageTitle}</strong>
          <pre className="rv-script">{q.passage}</pre>
          <p className="rv-q">{q.question}</p>
        </div>
      )
  }
}

function ReviewCard({ item, color }: { item: WrongItem; color: string }) {
  const { q, selected, number } = item
  return (
    <div className="review-card">
      <div className="rv-top">
        <span className="rv-num" style={{ background: color }}>ข้อ {number}</span>
        <span className="rv-tag">{q.tag}</span>
      </div>

      <Prompt q={q} />

      <div className="rv-choices">
        {q.choices.map((c, i) => {
          const isAnswer = c.id === q.answer
          const isPicked = c.id === selected
          let cls = 'rv-choice'
          if (isAnswer) cls += ' correct'
          else if (isPicked) cls += ' wrong'
          return (
            <div key={c.id} className={cls}>
              <span className="rv-letter">{LETTERS[i]}</span>
              <span>{c.text}</span>
              {isAnswer && <span className="rv-mark">✓ คำตอบที่ถูก</span>}
              {isPicked && !isAnswer && <span className="rv-mark red">✗ คุณตอบข้อนี้</span>}
            </div>
          )
        })}
        {selected == null && <p className="rv-skipped">— คุณไม่ได้ตอบข้อนี้ —</p>}
      </div>

      <div className="rv-explain">
        <p>{q.explain}</p>
        <div className="fb-tip">
          <span className="fb-tip-label">💡 เคล็ดลับสังเกต</span>
          <p>{q.tip}</p>
        </div>
      </div>
    </div>
  )
}
