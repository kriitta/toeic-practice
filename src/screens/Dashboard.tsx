import type { Part, Progress } from '../types'
import { overallProgress, partProgress, weaknesses } from '../lib/storage'
import { ProgressRing } from '../components/ProgressRing'

interface Props {
  parts: Part[]
  progress: Progress
  onOpenPart: (part: Part) => void
  onGuide: () => void
  onVocab: () => void
  onMock: () => void
  onInsights: () => void
}

export function Dashboard({ parts, progress, onOpenPart, onGuide, onVocab, onMock, onInsights }: Props) {
  const overall = overallProgress(progress, parts)
  const listening = parts.filter((p) => p.skill === 'listening')
  const reading = parts.filter((p) => p.skill === 'reading')
  const topWeak = weaknesses(progress).slice(0, 3)
  const started = progress.answered > 0

  const firstUnfinished =
    parts.find((p) => partProgress(progress, p).pct < 100) ?? parts[0]

  return (
    <main className="dashboard">
      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="hero-text">
          <span className="badge">เตรียมสอบ TOEIC · ฝึกเป็นด่าน</span>
          <h1>
            พิชิต TOEIC <br />ทีละด่าน อย่างเป็นระบบ
          </h1>
          <p>
            ฝึกครบทั้ง 7 Part จริง ทั้ง Listening และ Reading พร้อมเทคนิคทำข้อสอบ
            และระบบวิเคราะห์จุดอ่อนของคุณ — เคลียร์ทุกด่านในแต่ละ Part ให้ครบ 100%
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onOpenPart(firstUnfinished)}>
              {started ? 'ฝึกต่อ' : 'เริ่มฝึกเลย'} →
            </button>
            <button className="btn-ghost" onClick={onGuide}>
              📘 อ่านคู่มือเตรียมสอบ
            </button>
            <button className="btn-ghost" onClick={onInsights}>
              ดูสถิติของฉัน
            </button>
          </div>
        </div>
        <div className="hero-ring">
          <ProgressRing pct={overall} size={150} stroke={14} label={`${overall}%`} />
          <span className="hero-ring-cap">ความคืบหน้ารวม</span>
        </div>
      </section>

      {/* ---- Weakness teaser ---- */}
      {topWeak.length > 0 && (
        <button className="weak-teaser" onClick={onInsights}>
          <span>🎯 จุดอ่อนที่ควรเก็บ:</span>
          {topWeak.map((w) => (
            <span key={w.tag} className="weak-chip">
              {w.tag} · {w.accuracy}%
            </span>
          ))}
          <span className="weak-cta">ดูทั้งหมด →</span>
        </button>
      )}

      {/* ---- Mock test + Vocab game CTAs ---- */}
      <div className="cta-row">
        <button className="mock-banner" onClick={onMock}>
          <span className="mock-banner-icon">📝</span>
          <span className="mock-banner-text">
            <strong>พร้อมวัดระดับแล้ว? ลองสอบเสมือนจริง</strong>
            <small>ข้อสอบเต็มชุด 200 ข้อ · จับเวลา 120 นาที · คะแนน /990 · เก็บประวัติย้อนดูได้</small>
          </span>
          <span className="mock-banner-go">เริ่มสอบ →</span>
        </button>
        <button className="vocab-banner" onClick={onVocab}>
          <span className="mock-banner-icon">🧟</span>
          <span className="mock-banner-text">
            <strong>Zombie TOEIC — เกมล่าซอมบี้คำศัพท์</strong>
            <small>เลือกความหมายถูก = ยิงซอมบี้ · ตอบผิด = แพ้ทันที · เก็บ highscore</small>
          </span>
          <span className="mock-banner-go">เล่นเลย →</span>
        </button>
      </div>

      {/* ---- Listening ---- */}
      <h2 className="section-title">
        🎧 Listening <small>Part 1–4</small>
      </h2>
      <div className="part-grid">
        {listening.map((part) => (
          <PartCard key={part.id} part={part} progress={progress} onOpen={() => onOpenPart(part)} />
        ))}
      </div>

      {/* ---- Reading ---- */}
      <h2 className="section-title">
        📖 Reading <small>Part 5–7</small>
      </h2>
      <div className="part-grid">
        {reading.map((part) => (
          <PartCard key={part.id} part={part} progress={progress} onOpen={() => onOpenPart(part)} />
        ))}
      </div>
    </main>
  )
}

function PartCard({
  part,
  progress,
  onOpen,
}: {
  part: Part
  progress: Progress
  onOpen: () => void
}) {
  const pr = partProgress(progress, part)
  const complete = pr.pct === 100
  return (
    <button className={`part-card ${complete ? 'complete' : ''}`} onClick={onOpen}>
      <div className="part-top" style={{ background: part.color }}>
        <span className="part-icon">{part.icon}</span>
        <span className="part-num">PART {part.number}</span>
      </div>
      <div className="part-body">
        <div className="part-headrow">
          <h3>
            {part.title} <span className="part-thai">{part.thaiTitle}</span>
          </h3>
          <ProgressRing pct={pr.pct} size={48} stroke={6} color={part.color} />
        </div>
        <p>{part.blurb}</p>
        <div className="part-foot">
          <span>
            {complete ? '✅ ผ่านครบทุกด่าน' : `เคลียร์แล้ว ${pr.done}/${pr.total} ด่าน`}
          </span>
          <span className="go">{complete ? 'ทบทวน' : pr.done > 0 ? 'ไปต่อ' : 'เริ่ม'} →</span>
        </div>
      </div>
    </button>
  )
}
