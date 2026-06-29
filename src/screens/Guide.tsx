import { useState } from 'react'
import { GUIDE, type GuideSection } from '../data/guide'

interface Props {
  onBack: () => void
}

export function Guide({ onBack }: Props) {
  const [active, setActive] = useState(0)
  const chapter = GUIDE[active]

  return (
    <main className="guide">
      <button className="back" onClick={onBack}>← กลับหน้าหลัก</button>

      <header className="guide-hero">
        <span className="guide-hero-icon">🎓</span>
        <div>
          <h1>เตรียมตัวก่อนสอบ</h1>
          <p>รวมทุกเทคนิคและความรู้ที่ช่วยให้ทำข้อสอบ TOEIC ได้ไวและแม่นขึ้น — อ่านจำก่อนลงสนามจริง</p>
        </div>
      </header>

      <div className="guide-layout">
        {/* Chapter navigation */}
        <nav className="guide-toc">
          {GUIDE.map((c, i) => (
            <button
              key={c.id}
              className={`toc-item ${i === active ? 'active' : ''}`}
              style={i === active ? { borderColor: c.color, background: `${c.color}14` } : undefined}
              onClick={() => setActive(i)}
            >
              <span className="toc-icon">{c.icon}</span>
              <span className="toc-text">
                <strong>{c.title}</strong>
                <small>{c.subtitle}</small>
              </span>
            </button>
          ))}
        </nav>

        {/* Chapter content */}
        <article className="guide-content">
          <div className="guide-chapter-head" style={{ background: chapter.color }}>
            <span className="gch-icon">{chapter.icon}</span>
            <div>
              <h2>{chapter.title}</h2>
              <span className="gch-read">⏱️ อ่าน ~{chapter.read}</span>
            </div>
          </div>

          {chapter.sections.map((s, i) => (
            <Section key={i} section={s} color={chapter.color} />
          ))}

          <div className="guide-nav-buttons">
            <button disabled={active === 0} onClick={() => setActive((a) => Math.max(0, a - 1))}>
              ← บทก่อนหน้า
            </button>
            <span className="guide-progress">{active + 1} / {GUIDE.length}</span>
            <button
              disabled={active === GUIDE.length - 1}
              onClick={() => setActive((a) => Math.min(GUIDE.length - 1, a + 1))}
            >
              บทถัดไป →
            </button>
          </div>
        </article>
      </div>
    </main>
  )
}

function Section({ section, color }: { section: GuideSection; color: string }) {
  return (
    <section className="guide-section">
      {section.heading && <h3>{section.heading}</h3>}
      {section.body && <p className="gs-body">{section.body}</p>}

      {section.bullets && (
        <ul className="gs-bullets">
          {section.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="gs-table-wrap">
          <table className="gs-table">
            <thead>
              <tr>
                {section.table.head.map((h, i) => (
                  <th key={i} style={{ background: `${color}18`, color }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.note && (
        <div className="gs-note" style={{ borderColor: color }}>
          <span className="gs-note-label" style={{ color }}>📌 จำให้ขึ้นใจ</span>
          <p>{section.note}</p>
        </div>
      )}
    </section>
  )
}
