import type { Part, Progress } from '../types'
import { overallProgress, partProgress, weaknesses } from '../lib/storage'

interface Props {
  parts: Part[]
  progress: Progress
  onBack: () => void
  onReset: () => void
}

function barColor(acc: number): string {
  if (acc >= 80) return '#22c55e'
  if (acc >= 60) return '#f59e0b'
  return '#ef4444'
}

export function Insights({ parts, progress, onBack, onReset }: Props) {
  const overall = overallProgress(progress, parts)
  const weak = weaknesses(progress)
  const totalCleared = parts.reduce((n, p) => n + partProgress(progress, p).done, 0)
  const totalLevels = parts.reduce((n, p) => n + p.levels.length, 0)

  return (
    <main className="insights">
      <button className="back" onClick={onBack}>← กลับหน้าหลัก</button>
      <h1 className="insights-title">📊 สถิติ &amp; จุดอ่อนของคุณ</h1>

      <div className="kpi-row">
        <div className="kpi">
          <span className="kpi-num">{overall}%</span>
          <span className="kpi-cap">ความคืบหน้ารวม</span>
        </div>
        <div className="kpi">
          <span className="kpi-num">{totalCleared}/{totalLevels}</span>
          <span className="kpi-cap">ด่านที่ผ่าน</span>
        </div>
        <div className="kpi">
          <span className="kpi-num">{progress.answered}</span>
          <span className="kpi-cap">ข้อที่ฝึกแล้ว</span>
        </div>
      </div>

      {/* Per-part progress */}
      <h2 className="section-title">ความคืบหน้าแต่ละ Part</h2>
      <div className="part-progress-list">
        {parts.map((part) => {
          const pr = partProgress(progress, part)
          return (
            <div key={part.id} className="pp-row">
              <span className="pp-label">
                <b>P{part.number}</b> {part.thaiTitle}
              </span>
              <div className="pp-bar">
                <div className="pp-fill" style={{ width: `${pr.pct}%`, background: part.color }} />
              </div>
              <span className="pp-pct">{pr.pct}%</span>
            </div>
          )
        })}
      </div>

      {/* Weakness analysis */}
      <h2 className="section-title">🎯 หัวข้อที่พลาดบ่อย</h2>
      {weak.length === 0 ? (
        <p className="empty-note">
          ยังมีข้อมูลไม่พอ — ฝึกเพิ่มอีกหน่อยแล้วระบบจะวิเคราะห์ให้ว่าคุณอ่อนเรื่องไหน
          และควรทบทวน Part อะไรเป็นพิเศษ
        </p>
      ) : (
        <>
          <p className="weak-intro">
            เรียงจากเรื่องที่ความแม่นยำต่ำสุด ลองกลับไปอ่านเทคนิคของ Part ที่เกี่ยวข้องแล้วฝึกซ้ำ
          </p>
          <div className="weak-list">
            {weak.map((w) => (
              <div key={w.tag} className="weak-row">
                <div className="weak-head">
                  <span className="weak-tag">{w.tag}</span>
                  <span className="weak-acc" style={{ color: barColor(w.accuracy) }}>{w.accuracy}%</span>
                </div>
                <div className="weak-bar">
                  <div className="weak-bar-fill" style={{ width: `${w.accuracy}%`, background: barColor(w.accuracy) }} />
                </div>
                <span className="weak-meta">พลาด {w.wrong} จาก {w.seen} ครั้ง</span>
              </div>
            ))}
          </div>
        </>
      )}

      <button className="reset-link" onClick={onReset}>ล้างความคืบหน้าทั้งหมด</button>
    </main>
  )
}
