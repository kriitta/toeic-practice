import { useCallback, useEffect, useRef, useState } from 'react'
import type { Choice, Question } from '../types'
import { speak, speakDialogue, speakSequence, speechSupported, stopSpeaking } from '../lib/speech'

interface Props {
  question: Question
  selected: string | null
  revealed: boolean
  setContinues?: boolean // Part 3/4: this question reuses the previous audio
  onSelect: (choiceId: string) => void
}

/** A TOEIC-style English direction line with a small Thai gloss. */
function Directions({ en, th }: { en: string; th: string }) {
  return (
    <p className="q-instruction">
      <span className="dir-en">{en}</span>
      <span className="dir-th">{th}</span>
    </p>
  )
}

const LETTERS = ['A', 'B', 'C', 'D']
const audioOff = !speechSupported()

/** Render the blank in a Part 5/6 sentence as a styled gap. */
function withBlank(text: string) {
  const parts = text.split('____')
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <span className="blank">_____</span>}
    </span>
  ))
}

export function QuestionView({ question, selected, revealed, setContinues, onSelect }: Props) {
  const q = question
  return (
    <div className="question">
      {q.kind === 'part1' && <Part1View q={q} revealed={revealed} />}
      {q.kind === 'part2' && <Part2View q={q} />}
      {(q.kind === 'part3' || q.kind === 'part4') &&
        (setContinues ? (
          <ScriptContinuation question={q.question} dialogue={q.kind === 'part3'} />
        ) : (
          <ScriptAudio
            qid={q.id}
            script={q.script}
            question={q.question}
            dialogue={q.kind === 'part3'}
          />
        ))}

      {q.kind === 'part5' && (
        <>
          <Directions
            en="Select the word or phrase that best completes the sentence."
            th="เลือกคำ/วลีที่เติมประโยคได้ถูกต้องที่สุด"
          />
          <p className="sentence">{withBlank(q.sentence)}</p>
        </>
      )}

      {q.kind === 'part6' && (
        <>
          <Directions
            en="Read the text and select the best answer to complete it."
            th="อ่านข้อความแล้วเลือกคำตอบที่เติมได้เหมาะสมที่สุด"
          />
          <p className="passage-box">{withBlank(q.passage)}</p>
        </>
      )}

      {q.kind === 'part7' && (
        <>
          <Directions
            en="Read the text below and answer the question."
            th="อ่านข้อความแล้วตอบคำถาม"
          />
          <article className="reading">
            <h3>{q.passageTitle}</h3>
            <p>{q.passage}</p>
          </article>
          <p className="q-question">{q.question}</p>
        </>
      )}

      <Choices question={q} selected={selected} revealed={revealed} onSelect={onSelect} />
    </div>
  )
}

// --------------------------------------------------------- play-once machinery

type Phase = 'idle' | 'playing' | 'done'

/**
 * Auto-plays an audio once per question and never replays — like the real test.
 * If the browser blocks autoplay (e.g. Safari), a one-time start button remains
 * until the audio actually begins.
 */
function useListenOnce(
  depKey: string,
  play: (cb: { onStart: () => void; onEnd: () => void }) => void,
) {
  const [phase, setPhase] = useState<Phase>('idle')
  const phaseRef = useRef<Phase>('idle')
  phaseRef.current = phase
  const playRef = useRef(play)
  playRef.current = play

  const start = useCallback(() => {
    if (phaseRef.current === 'playing' || phaseRef.current === 'done') return
    stopSpeaking()
    playRef.current({
      onStart: () => setPhase('playing'),
      onEnd: () => setPhase('done'),
    })
  }, [])

  useEffect(() => {
    setPhase('idle')
    phaseRef.current = 'idle'
    const t = window.setTimeout(start, 600) // brief delay, then play once
    return () => {
      window.clearTimeout(t)
      stopSpeaking()
    }
  }, [depKey, start])

  return { phase, start }
}

function AudioStatus({ phase, start }: { phase: Phase; start: () => void }) {
  if (audioOff) return null
  if (phase === 'idle') {
    return (
      <button className="big-play" onClick={start}>
        ▶︎ เริ่มฟัง (เล่นครั้งเดียว)
      </button>
    )
  }
  if (phase === 'playing') {
    return (
      <div className="audio-status playing">
        <span className="eq"><i /><i /><i /><i /></span> กำลังเล่นเสียง… (ฟังได้ครั้งเดียว)
      </div>
    )
  }
  return <div className="audio-status done">✓ เสียงเล่นจบแล้ว · เลือกคำตอบที่ดีที่สุด</div>
}

// --------------------------------------------------------- per-part audio views

function Part1View({ q, revealed }: { q: Extract<Question, { kind: 'part1' }>; revealed: boolean }) {
  const [imgError, setImgError] = useState(false)
  useEffect(() => setImgError(false), [q.id])

  const { phase, start } = useListenOnce(q.id, (cb) =>
    speakSequence(
      q.choices.map((c) => c.text),
      { gap: 850, rate: 0.9, ...cb },
    ),
  )

  return (
    <div className="audio-panel">
      <Directions
        en="Look at the picture. Listen to the four statements and choose the one that best describes the picture."
        th="🎧 ดูภาพ ฟังประโยค A–D (ครั้งเดียว) แล้วเลือกที่ตรงกับภาพที่สุด"
      />
      <div className="photo">
        {imgError ? (
          <span className="photo-emoji">{q.emoji}</span>
        ) : (
          <img
            className="photo-img"
            src={q.image}
            alt="TOEIC Part 1"
            loading="eager"
            onError={() => setImgError(true)}
          />
        )}
        {(revealed || imgError || audioOff) && <span className="photo-caption">{q.scene}</span>}
      </div>
      <AudioStatus phase={phase} start={start} />
      {audioOff && (
        <p className="warn">เบราว์เซอร์ไม่รองรับเสียง — แสดงข้อความตัวเลือกให้แทน</p>
      )}
    </div>
  )
}

function Part2View({ q }: { q: Extract<Question, { kind: 'part2' }> }) {
  // The audio plays the question, then the three responses, once — no text shown.
  const { phase, start } = useListenOnce(q.id, (cb) =>
    speakSequence([q.audio, ...q.choices.map((c) => c.text)], { gap: 850, rate: 0.9, ...cb }),
  )

  return (
    <div className="audio-panel">
      <Directions
        en="Listen to the question and the three responses, then choose the best response."
        th="🎧 ฟังคำถามและตัวเลือก A–C (ครั้งเดียว) แล้วเลือกคำตอบที่ดีที่สุด"
      />
      <AudioStatus phase={phase} start={start} />
      {audioOff && <p className="warn">เบราว์เซอร์ไม่รองรับเสียง — คำถาม: “{q.audio}”</p>}
    </div>
  )
}

function ScriptAudio({
  qid,
  script,
  question,
  dialogue,
}: {
  qid: string
  script: string
  question: string
  dialogue: boolean
}) {
  const { phase, start } = useListenOnce(qid, (cb) =>
    dialogue ? speakDialogue(script, { gap: 350, ...cb }) : speak(script, { rate: 0.9, ...cb }),
  )

  return (
    <div className="audio-panel">
      <Directions
        en={
          dialogue
            ? 'Listen to the conversation, then answer the questions.'
            : 'Listen to the talk, then answer the questions.'
        }
        th={`🎧 ฟัง${dialogue ? 'บทสนทนา' : 'บทพูด'} (ครั้งเดียว ใช้ตอบทั้ง 3 ข้อ) แล้วตอบคำถาม`}
      />
      <AudioStatus phase={phase} start={start} />
      {audioOff && <pre className="warn script-fallback">{script}</pre>}
      <p className="q-question">{question}</p>
    </div>
  )
}

/** Shown for the 2nd and 3rd questions of a Part 3/4 set — the audio is not replayed. */
function ScriptContinuation({ question, dialogue }: { question: string; dialogue: boolean }) {
  useEffect(() => () => stopSpeaking(), [])
  return (
    <div className="audio-panel">
      <Directions
        en="Answer the next question about what you just heard."
        th={`🎧 อ้างอิง${dialogue ? 'บทสนทนา' : 'บทพูด'}ที่เพิ่งฟัง (เล่นครั้งเดียว ไม่เล่นซ้ำ)`}
      />
      <div className="audio-status done">↳ ตอบต่อจากเสียงเดิมที่ฟังไปแล้ว</div>
      <p className="q-question">{question}</p>
    </div>
  )
}

// --------------------------------------------------------- choices

function Choices({ question, selected, revealed, onSelect }: Props) {
  const q = question
  // Part 1 & 2 options are "spoken" — text stays hidden until answered (unless
  // audio is unavailable, in which case we show the text so it stays playable).
  const hideText = (q.kind === 'part1' || q.kind === 'part2') && !audioOff

  return (
    <div className={`choices ${hideText ? 'audio-choices' : ''}`}>
      {q.choices.map((c: Choice, i) => {
        const isAnswer = c.id === q.answer
        const isPicked = c.id === selected
        let cls = 'choice'
        if (revealed) {
          if (isAnswer) cls += ' correct'
          else if (isPicked) cls += ' wrong'
        } else if (isPicked) {
          cls += ' picked'
        }
        return (
          <button key={c.id} className={cls} disabled={revealed} onClick={() => onSelect(c.id)}>
            <span className="letter">{LETTERS[i]}</span>
            {hideText ? (
              <span className="choice-text">
                {revealed ? c.text : <span className="hidden-option">ตัวเลือก {LETTERS[i]}</span>}
              </span>
            ) : (
              <span className="choice-text">{c.text}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
