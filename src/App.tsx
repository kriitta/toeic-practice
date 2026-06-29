import { useEffect, useRef, useState } from 'react'
import type { Level, Part, Progress, Question } from './types'
import { PARTS } from './data/curriculum'
import { loadProgress, recordLevel, resetProgress, saveProgress, type AnsweredItem } from './lib/storage'
import {
  buildMock,
  clearMockHistory,
  gradeMock,
  loadMockHistory,
  saveMockResult,
  type MockAnswer,
  type MockResult as MockResultData,
} from './lib/mock'
import { useAuth } from './auth/AuthContext'
import { pullAndMerge, pushSnapshot } from './lib/cloud'
import { NavBar } from './components/NavBar'
import { Dashboard } from './screens/Dashboard'
import { PartView } from './screens/PartView'
import { Tips } from './screens/Tips'
import { LevelScreen } from './screens/Level'
import { Result } from './screens/Result'
import { Insights } from './screens/Insights'
import { Guide } from './screens/Guide'
import { MockHome } from './screens/MockHome'
import { MockTest } from './screens/MockTest'
import { MockResult } from './screens/MockResult'
import { MockReview } from './screens/MockReview'
import { ZombieGame } from './screens/ZombieGame'

type Route =
  | { name: 'home' }
  | { name: 'part'; part: Part }
  | { name: 'tips'; part: Part }
  | { name: 'level'; part: Part; level: Level }
  | { name: 'result'; part: Part; level: Level; items: AnsweredItem[] }
  | { name: 'guide' }
  | { name: 'vocab' }
  | { name: 'insights' }
  | { name: 'mock-home' }
  | { name: 'mock-test'; questions: Question[] }
  | { name: 'mock-result'; result: MockResultData; fresh: boolean }
  | { name: 'mock-review'; result: MockResultData }

export function App() {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const [mockHistory, setMockHistory] = useState<MockResultData[]>(() => loadMockHistory())
  const [route, setRoute] = useState<Route>({ name: 'home' })
  const syncedUid = useRef<string | null>(null)
  const pushTimer = useRef<number>(0)

  useEffect(() => saveProgress(progress), [progress])
  useEffect(() => window.scrollTo(0, 0), [route])

  // On login: pull the cloud copy, merge with local, then reload app state.
  useEffect(() => {
    if (!user) {
      syncedUid.current = null
      return
    }
    let cancelled = false
    void pullAndMerge(user.uid).then(() => {
      if (cancelled) return
      setProgress(loadProgress())
      setMockHistory(loadMockHistory())
      syncedUid.current = user.uid
    })
    return () => {
      cancelled = true
    }
  }, [user])

  // Push to the cloud (debounced) whenever data changes while logged in.
  useEffect(() => {
    if (!user || syncedUid.current !== user.uid) return
    const onChange = () => {
      window.clearTimeout(pushTimer.current)
      pushTimer.current = window.setTimeout(() => void pushSnapshot(user.uid), 900)
    }
    onChange()
    window.addEventListener('cloud-sync', onChange)
    return () => window.removeEventListener('cloud-sync', onChange)
  }, [user, progress, mockHistory])

  const goHome = () => setRoute({ name: 'home' })

  const finishLevel = (part: Part, level: Level, items: AnsweredItem[]) => {
    setProgress((p) => recordLevel(p, level.id, items))
    setRoute({ name: 'result', part, level, items })
  }

  const submitMock = (answers: MockAnswer[], durationSec: number) => {
    const result = gradeMock(answers, durationSec)
    setMockHistory(saveMockResult(result))
    setRoute({ name: 'mock-result', result, fresh: true })
  }

  // The full-screen players have their own chrome; every other route gets the nav.
  const showChrome =
    route.name !== 'level' && route.name !== 'mock-test' && route.name !== 'vocab'

  return (
    <div className="site">
      {showChrome && (
        <NavBar
          active={
            route.name === 'insights'
              ? 'insights'
              : route.name === 'guide'
              ? 'guide'
              : route.name.startsWith('mock')
              ? 'mock'
              : 'home'
          }
          onHome={goHome}
          onGuide={() => setRoute({ name: 'guide' })}
          onVocab={() => setRoute({ name: 'vocab' })}
          onMock={() => setRoute({ name: 'mock-home' })}
          onInsights={() => setRoute({ name: 'insights' })}
        />
      )}

      {route.name === 'home' && (
        <Dashboard
          parts={PARTS}
          progress={progress}
          onOpenPart={(part) => setRoute({ name: 'part', part })}
          onGuide={() => setRoute({ name: 'guide' })}
          onVocab={() => setRoute({ name: 'vocab' })}
          onMock={() => setRoute({ name: 'mock-home' })}
          onInsights={() => setRoute({ name: 'insights' })}
        />
      )}

      {route.name === 'part' && (
        <PartView
          part={route.part}
          progress={progress}
          onBack={goHome}
          onTips={() => setRoute({ name: 'tips', part: route.part })}
          onPlay={(level) => setRoute({ name: 'level', part: route.part, level })}
        />
      )}

      {route.name === 'tips' && (
        <Tips part={route.part} onBack={() => setRoute({ name: 'part', part: route.part })} />
      )}

      {route.name === 'level' && (
        <LevelScreen
          part={route.part}
          level={route.level}
          onQuit={() => setRoute({ name: 'part', part: route.part })}
          onFinish={(items) => finishLevel(route.part, route.level, items)}
        />
      )}

      {route.name === 'result' && (
        <Result
          part={route.part}
          level={route.level}
          items={route.items}
          onBackToPart={() => setRoute({ name: 'part', part: route.part })}
          onRetry={() => setRoute({ name: 'level', part: route.part, level: route.level })}
          onInsights={() => setRoute({ name: 'insights' })}
        />
      )}

      {route.name === 'guide' && <Guide onBack={goHome} />}

      {route.name === 'vocab' && <ZombieGame onBack={goHome} />}

      {route.name === 'mock-home' && (
        <MockHome
          history={mockHistory}
          onStart={() => setRoute({ name: 'mock-test', questions: buildMock() })}
          onOpenResult={(r) => setRoute({ name: 'mock-result', result: r, fresh: false })}
          onClearHistory={() => {
            clearMockHistory()
            setMockHistory([])
          }}
          onBack={goHome}
        />
      )}

      {route.name === 'mock-test' && (
        <MockTest
          questions={route.questions}
          onSubmit={submitMock}
          onQuit={() => setRoute({ name: 'mock-home' })}
        />
      )}

      {route.name === 'mock-result' && (
        <MockResult
          result={route.result}
          fresh={route.fresh}
          onReview={() => setRoute({ name: 'mock-review', result: route.result })}
          onBack={() => setRoute({ name: 'mock-home' })}
        />
      )}

      {route.name === 'mock-review' && (
        <MockReview
          result={route.result}
          onBack={() => setRoute({ name: 'mock-result', result: route.result, fresh: false })}
        />
      )}

      {route.name === 'insights' && (
        <Insights
          parts={PARTS}
          progress={progress}
          onBack={goHome}
          onReset={() => {
            if (confirm('ล้างความคืบหน้าทั้งหมดและเริ่มใหม่?')) setProgress(resetProgress())
          }}
        />
      )}

      {showChrome && (
        <footer className="site-footer">
          <span>🦉 TOEIC Quest</span>
          <span>ฝึกซ้อมแนวข้อสอบ TOEIC · เนื้อหาเขียนใหม่ ไม่ละเมิดลิขสิทธิ์ข้อสอบจริง</span>
        </footer>
      )}
    </div>
  )
}
