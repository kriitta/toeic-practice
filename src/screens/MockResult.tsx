import type { PartId } from '../types'
import { PART_BY_ID, type MockResult } from '../lib/mock'

interface Props {
  result: MockResult
  fresh?: boolean // just finished (vs. opened from history)
  onReview: () => void
  onBack: () => void
}

const ORDER: PartId[] = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7']

function accColor(acc: number): string {
  if (acc >= 80) return '#22c55e'
  if (acc >= 60) return '#f59e0b'
  return '#ef4444'
}

export function MockResult({ result, fresh, onReview, onBack }: Props) {
  const wrong = result.total - result.correct

  // Worst part by accuracy (only parts that had questions).
  const rows = ORDER.map((pid) => {
    const s = result.perPart[pid]
    const acc = s.total ? Math.round(((s.total - s.wrong) / s.total) * 100) : 0
    return { pid, ...s, acc }
  }).filter((r) => r.total > 0)
  const worst = rows.reduce((a, b) => (b.acc < a.acc ? b : a), rows[0])

  return (
    <main className="mockresult">
      <button className="back" onClick={onBack}>← กลับหน้าสอบเสมือนจริง</button>

      <section className="score-hero">
        {fresh && <span className="badge">สอบเสร็จแล้ว 🎉</span>}
        <div className="score-big">{result.score990}<span>/990</span></div>
        <div className="score-sub">
          <span>🎧 Listening <b>{result.listening}</b></span>
          <span>📖 Reading <b>{result.reading}</b></span>
        </div>
        <div className="score-line">
          ตอบถูก <b>{result.correct}</b> / {result.total} ข้อ · ผิด <b className="rednum">{wrong}</b> ข้อ
          <span className="muted"> · ใช้เวลา {Math.floor(result.durationSec / 60)} นาที</span>
        </div>
      </section>

      <div className="worst-callout">
        🎯 Part ที่ผิดเยอะที่สุด: <b>Part {PART_BY_ID[worst.pid].number} {PART_BY_ID[worst.pid].thaiTitle}</b>
        {' '}(ถูก {worst.acc}% · ผิด {worst.wrong}/{worst.total}) — ควรกลับไปทบทวนเป็นพิเศษ
      </div>

      <h2 className="section-title">ผลรายละเอียดแต่ละ Part</h2>
      <div className="mock-part-table">
        <div className="mpt-head">
          <span>Part</span><span>ตอบถูก</span><span>ผิด</span><span>ความแม่นยำ</span>
        </div>
        {rows.map((r) => {
          const part = PART_BY_ID[r.pid]
          return (
            <div key={r.pid} className={`mpt-row ${r.pid === worst.pid ? 'worst' : ''}`}>
              <span className="mpt-name">
                <b style={{ color: part.color }}>P{part.number}</b> {part.thaiTitle}
              </span>
              <span>{r.total - r.wrong}/{r.total}</span>
              <span className="rednum">{r.wrong}</span>
              <span className="mpt-acc">
                <span className="mpt-bar">
                  <span className="mpt-fill" style={{ width: `${r.acc}%`, background: accColor(r.acc) }} />
                </span>
                <b style={{ color: accColor(r.acc) }}>{r.acc}%</b>
              </span>
            </div>
          )
        })}
      </div>

      <button className="btn-primary wide" onClick={onReview}>
        📖 ดูเฉลยข้อที่ผิด ({wrong} ข้อ) พร้อมเทคนิค
      </button>
      <button className="ghost wide" onClick={onBack}>กลับหน้าสอบเสมือนจริง</button>

      <p className="disclaimer">
        * คะแนน /990 เป็นการประมาณการจากสัดส่วนข้อถูกในแต่ละ section เพื่อให้เห็นภาพระดับของตัวเอง
        อาจไม่ตรงกับการคิดคะแนนจริงของ ETS แบบเป๊ะ ๆ
      </p>
    </main>
  )
}
