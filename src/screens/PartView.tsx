import type { Level, Part, Progress } from '../types'
import { partProgress } from '../lib/storage'
import { ProgressRing } from '../components/ProgressRing'

interface Props {
  part: Part
  progress: Progress
  onBack: () => void
  onTips: () => void
  onPlay: (level: Level) => void
}

export function PartView({ part, progress, onBack, onTips, onPlay }: Props) {
  const pr = partProgress(progress, part)

  const status = (i: number, level: Level): 'cleared' | 'open' | 'locked' => {
    if (progress.cleared[level.id]) return 'cleared'
    const prevCleared = i === 0 || progress.cleared[part.levels[i - 1].id]
    return prevCleared ? 'open' : 'locked'
  }

  return (
    <main className="partview">
      <button className="back" onClick={onBack}>← กลับหน้าหลัก</button>

      <header className="part-hero" style={{ background: part.color }}>
        <div className="part-hero-main">
          <span className="part-hero-icon">{part.icon}</span>
          <div>
            <span className="part-hero-num">PART {part.number} · {part.skill === 'listening' ? 'Listening' : 'Reading'}</span>
            <h1>{part.title}</h1>
            <p>{part.thaiTitle} — {part.blurb}</p>
          </div>
        </div>
        <ProgressRing pct={pr.pct} size={88} stroke={10} color="#fff" />
      </header>

      <div className="format-card">
        <strong>📋 รูปแบบข้อสอบจริง</strong>
        <p>{part.format}</p>
        <button className="tips-btn" onClick={onTips}>💡 ดูเทคนิคทำ Part {part.number} ({part.tips.length} ข้อ)</button>
      </div>

      <h2 className="levels-title">ด่านฝึก ({pr.done}/{pr.total} ผ่านแล้ว)</h2>
      <div className="level-list">
        {part.levels.map((level, i) => {
          const st = status(i, level)
          const best = progress.best[level.id]
          return (
            <button
              key={level.id}
              className={`level-row ${st}`}
              disabled={st === 'locked'}
              onClick={() => onPlay(level)}
            >
              <span className="level-badge" style={st !== 'locked' ? { background: part.color } : undefined}>
                {st === 'locked' ? '🔒' : st === 'cleared' ? '⭐' : i + 1}
              </span>
              <span className="level-info">
                <strong>{level.title}</strong>
                <small>
                  {level.questions.length} ข้อ
                  {st === 'cleared'
                    ? ' · ผ่านแล้ว 100%'
                    : best != null
                    ? ` · ดีที่สุด ${Math.round(best * 100)}%`
                    : st === 'locked'
                    ? ' · ผ่านด่านก่อนหน้าเพื่อปลดล็อก'
                    : ' · พร้อมเล่น'}
                </small>
              </span>
              <span className="level-go">{st === 'locked' ? '' : st === 'cleared' ? 'เล่นซ้ำ' : 'เล่น'}</span>
            </button>
          )
        })}
      </div>

      {pr.pct === 100 && (
        <div className="part-done-banner">🏆 เยี่ยมมาก! คุณผ่าน Part {part.number} ครบ 100% แล้ว</div>
      )}
    </main>
  )
}
