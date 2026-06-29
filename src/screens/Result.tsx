import type { Level, Part } from '../types'
import type { AnsweredItem } from '../lib/storage'

interface Props {
  part: Part
  level: Level
  items: AnsweredItem[]
  onBackToPart: () => void
  onRetry: () => void
  onInsights: () => void
}

export function Result({ part, level, items, onBackToPart, onRetry, onInsights }: Props) {
  const correct = items.filter((i) => i.correct).length
  const total = items.length
  const pct = total ? Math.round((correct / total) * 100) : 0
  const cleared = correct === total

  // Topics missed in this attempt.
  const missed = Array.from(
    items.reduce((m, it) => {
      if (!it.correct) m.set(it.tag, (m.get(it.tag) ?? 0) + 1)
      return m
    }, new Map<string, number>()),
  )

  return (
    <main className="result">
      <div className="result-card">
        <div className="result-emoji">{cleared ? '🏆' : '💪'}</div>
        <h1>{cleared ? 'ผ่านด่าน!' : 'เกือบแล้ว!'}</h1>
        <p className="result-sub">
          {part.title} · {level.title}
        </p>

        <div className="result-score" style={{ color: part.color }}>{pct}%</div>
        <p className="result-count">ตอบถูก {correct} จาก {total} ข้อ</p>

        {cleared ? (
          <div className="result-note good">
            🎉 เยี่ยม! ด่านนี้ถูกบันทึกว่าผ่านแล้ว เคลียร์ทุกด่านเพื่อให้ Part {part.number} ครบ 100%
          </div>
        ) : (
          <div className="result-note bad">
            ต้องตอบถูก <strong>ทุกข้อ</strong> จึงจะผ่านด่าน ลองอีกครั้งได้เลย — ทุกครั้งที่เล่นช่วยจำดีขึ้น!
          </div>
        )}

        {missed.length > 0 && (
          <div className="result-missed">
            <span className="result-missed-title">จุดที่ยังพลาดในรอบนี้:</span>
            {missed.map(([tag, n]) => (
              <span key={tag} className="weak-chip">{tag} ×{n}</span>
            ))}
          </div>
        )}

        <button className="btn-primary wide" onClick={cleared ? onBackToPart : onRetry}>
          {cleared ? 'ไปด่านถัดไป →' : 'เล่นด่านนี้อีกครั้ง'}
        </button>
        <div className="result-links">
          <button onClick={onBackToPart}>กลับไปหน้า Part</button>
          <button onClick={onInsights}>ดูสถิติจุดอ่อน</button>
        </div>
      </div>
    </main>
  )
}
