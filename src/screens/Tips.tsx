import type { Part } from '../types'

interface Props {
  part: Part
  onBack: () => void
}

export function Tips({ part, onBack }: Props) {
  return (
    <main className="tips-page">
      <button className="back" onClick={onBack}>← กลับไปด่านฝึก</button>

      <header className="tips-hero" style={{ background: part.color }}>
        <span className="tips-hero-icon">💡</span>
        <div>
          <span className="part-hero-num">PART {part.number} · เทคนิคทำข้อสอบ</span>
          <h1>{part.title}</h1>
        </div>
      </header>

      <div className="format-card">
        <strong>📋 รูปแบบข้อสอบ</strong>
        <p>{part.format}</p>
      </div>

      <div className="tips-list">
        {part.tips.map((tip, i) => (
          <div key={i} className="tip-card">
            <span className="tip-num" style={{ background: part.color }}>{i + 1}</span>
            <div>
              <h3>{tip.title}</h3>
              <p>{tip.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-primary wide" onClick={onBack}>เริ่มฝึกเลย →</button>
    </main>
  )
}
