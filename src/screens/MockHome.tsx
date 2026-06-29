import { MOCK_COUNTS, MOCK_TOTAL, type MockResult } from '../lib/mock'

interface Props {
  history: MockResult[]
  onStart: () => void
  onOpenResult: (r: MockResult) => void
  onClearHistory: () => void
  onBack: () => void
}

function fmtDate(ms: number): string {
  const d = new Date(ms)
  return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }) +
    ' ' + d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
}

export function MockHome({ history, onStart, onOpenResult, onClearHistory, onBack }: Props) {
  const best = history.reduce((m, r) => Math.max(m, r.score990), 0)

  return (
    <main className="mockhome">
      <button className="back" onClick={onBack}>← กลับหน้าหลัก</button>

      <section className="mock-hero">
        <span className="mock-hero-icon">📝</span>
        <h1>สอบเสมือนจริง (Mock Test)</h1>
        <p>จำลองการสอบ TOEIC จริง 1 ชุดเต็ม — จับเวลา ไม่มีเฉลยระหว่างทาง แล้วดูคะแนน /990 พร้อมเฉลยข้อที่ผิด</p>
        <div className="mock-facts">
          <div><b>{MOCK_TOTAL}</b><span>ข้อ</span></div>
          <div><b>120</b><span>นาที</span></div>
          <div><b>990</b><span>คะแนนเต็ม</span></div>
          <div><b>7</b><span>Part</span></div>
        </div>
        <button className="btn-primary wide" onClick={() => { if (confirm('เริ่มการสอบเสมือนจริง? จะจับเวลา 120 นาที และไม่มีเฉลยจนกว่าจะส่งคำตอบ')) onStart() }}>
          เริ่มสอบเลย →
        </button>
        <p className="mock-note">
          สัดส่วนข้อตามจริง: Part1 {MOCK_COUNTS.part1} · Part2 {MOCK_COUNTS.part2} · Part3 {MOCK_COUNTS.part3} ·
          Part4 {MOCK_COUNTS.part4} · Part5 {MOCK_COUNTS.part5} · Part6 {MOCK_COUNTS.part6} · Part7 {MOCK_COUNTS.part7}
        </p>
      </section>

      <div className="mock-history-head">
        <h2 className="section-title">ประวัติการสอบ {history.length > 0 && `(สูงสุด ${best}/990)`}</h2>
        {history.length > 0 && (
          <button className="reset-link" onClick={() => { if (confirm('ลบประวัติการสอบทั้งหมด?')) onClearHistory() }}>
            ล้างประวัติ
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="empty-note">ยังไม่มีประวัติการสอบ — ลองทำชุดแรกเพื่อวัดระดับตัวเองดูสิ!</p>
      ) : (
        <div className="mock-history">
          {history.map((r) => (
            <button key={r.id} className="hist-row" onClick={() => onOpenResult(r)}>
              <span className="hist-score">{r.score990}<small>/990</small></span>
              <span className="hist-info">
                <strong>{fmtDate(r.date)}</strong>
                <small>
                  ถูก {r.correct}/{r.total} · 🎧 {r.listening} · 📖 {r.reading}
                </small>
              </span>
              <span className="hist-go">ดูผล &amp; เฉลย →</span>
            </button>
          ))}
        </div>
      )}
    </main>
  )
}
