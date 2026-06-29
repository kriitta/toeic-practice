import { useCallback, useState } from 'react'
import { VOCAB, type VocabWord } from '../data/vocab'
import { bumpCloudSync } from '../lib/cloud'

interface Props {
  onBack: () => void
}

const HKEY = 'toeic-quest-zombie-v1'
interface ZombieStats {
  highScore: number
  gamesPlayed: number
}
function loadStats(): ZombieStats {
  try {
    const raw = localStorage.getItem(HKEY)
    return raw ? (JSON.parse(raw) as ZombieStats) : { highScore: 0, gamesPlayed: 0 }
  } catch {
    return { highScore: 0, gamesPlayed: 0 }
  }
}
function saveStats(s: ZombieStats) {
  try {
    localStorage.setItem(HKEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Choice {
  text: string
  correct: boolean
}
interface Question {
  word: string
  pos: string
  answer: string
  choices: Choice[]
}

function buildQuestion(word: VocabWord): Question {
  const distractors: string[] = []
  let tries = 0
  while (distractors.length < 2 && tries < 60) {
    tries++
    const cand = VOCAB[Math.floor(Math.random() * VOCAB.length)].meaning
    if (cand !== word.meaning && !distractors.includes(cand)) distractors.push(cand)
  }
  const choices = shuffle([
    { text: word.meaning, correct: true },
    ...distractors.map((d) => ({ text: d, correct: false })),
  ])
  return { word: word.word, pos: word.pos, answer: word.meaning, choices }
}

type Phase = 'idle' | 'playing' | 'over'

export function ZombieGame({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [stats, setStats] = useState<ZombieStats>(() => loadStats())

  const [q, setQ] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0) // increments per zombie (re-triggers walk-in)
  const [locked, setLocked] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  const [shooting, setShooting] = useState(false)
  const [dead, setDead] = useState(false) // current zombie dying
  const [hurt, setHurt] = useState(false) // wrong answer — zombie lunges

  const newWord = useCallback(() => {
    setQ(buildQuestion(VOCAB[Math.floor(Math.random() * VOCAB.length)]))
    setPicked(null)
    setShooting(false)
    setDead(false)
    setHurt(false)
    setLocked(false)
    setRound((r) => r + 1)
  }, [])

  const start = () => {
    setScore(0)
    newWord()
    setPhase('playing')
  }

  const endGame = (finalScore: number) => {
    setPhase('over')
    setStats((prev) => {
      const next = {
        highScore: Math.max(prev.highScore, finalScore),
        gamesPlayed: prev.gamesPlayed + 1,
      }
      saveStats(next)
      return next
    })
    bumpCloudSync()
  }

  const answer = (choice: Choice) => {
    if (locked || !q) return
    setLocked(true)
    setPicked(choice.text)

    if (choice.correct) {
      setShooting(true)
      setDead(true)
      const nextScore = score + 1
      setScore(nextScore)
      window.setTimeout(() => newWord(), 650) // shoot → next zombie walks in
    } else {
      setHurt(true) // zombie reaches the hero — game over
      window.setTimeout(() => endGame(score), 900)
    }
  }

  // ---------------- Idle ----------------
  if (phase === 'idle') {
    return (
      <main className="zg-menu">
        <button className="back" onClick={onBack}>← กลับหน้าหลัก</button>
        <section className="zg-card">
          <span className="zg-card-icon">🧟</span>
          <h1>Zombie TOEIC</h1>
          <p>คำศัพท์โผล่ขึ้นมา ซอมบี้กำลังเข้ามา! เลือกความหมายให้ถูกเพื่อยิงมัน — แต่ถ้าตอบผิดแม้แต่ครั้งเดียว จบเกมทันที</p>
          <div className="zg-rules">
            <div><b>✅</b><span>ตอบถูก = ยิงซอมบี้ +1</span></div>
            <div><b>❌</b><span>ตอบผิด = แพ้ทันที</span></div>
            <div><b>🏆</b><span>ทำสกอร์ให้ได้สูงสุด</span></div>
          </div>
          <button className="btn-primary wide zg-start" onClick={start}>เริ่มเกม →</button>
          <div className="zg-best">🏆 สถิติสูงสุด: <b>{stats.highScore}</b> · เล่นแล้ว {stats.gamesPlayed} ครั้ง</div>
        </section>
      </main>
    )
  }

  // ---------------- Over ----------------
  if (phase === 'over') {
    const isHigh = score >= stats.highScore && score > 0
    return (
      <main className="zg-menu">
        <section className="zg-card over">
          <span className="zg-card-icon">{isHigh ? '🏆' : '💀'}</span>
          <h1>{isHigh ? 'สถิติใหม่!' : 'Game Over'}</h1>
          <div className="zg-final">{score}</div>
          <p className="zg-final-cap">ยิงซอมบี้ได้ {score} ตัว</p>
          <div className="zg-best">🏆 สถิติสูงสุด: <b>{stats.highScore}</b></div>
          <button className="btn-primary wide zg-start" onClick={start}>เล่นอีกครั้ง</button>
          <button className="ghost wide" onClick={onBack}>กลับหน้าหลัก</button>
        </section>
      </main>
    )
  }

  // ---------------- Playing ----------------
  return (
    <div className={`zg ${hurt ? 'flash' : ''}`}>
      <div className="zg-hud">
        <button className="quit" onClick={onBack}>✕</button>
        <div className="zg-kills">🧟 {score}</div>
        <div className="zg-high">🏆 {Math.max(stats.highScore, score)}</div>
      </div>

      <div className="zg-stage">
        <div className="zg-word">
          {q?.word}
          <span className="zg-pos">{q?.pos}</span>
        </div>

        <div className="zg-arena">
          <div className={`zg-hero ${shooting ? 'shoot' : ''}`}>
            <span className="zg-person">🧑🏽</span>
            <span className="zg-gun">🔫</span>
            {shooting && <span className="zg-flash">✦</span>}
          </div>

          {shooting && <div className="zg-bullet" />}

          <div key={round} className={`zg-zombie ${dead ? 'dead' : ''} ${hurt ? 'lunge' : ''}`}>
            🧟
            {dead && <span className="zg-boom">💥</span>}
          </div>
        </div>
      </div>

      <div className="zg-choices">
        {q?.choices.map((c) => {
          let cls = 'zg-choice'
          if (locked) {
            if (c.correct) cls += ' correct'
            else if (c.text === picked) cls += ' wrong'
            else cls += ' dim'
          }
          return (
            <button key={c.text} className={cls} disabled={locked} onClick={() => answer(c)}>
              {c.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
