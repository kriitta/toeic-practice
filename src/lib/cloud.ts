import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

// localStorage keys we back up to the cloud per user.
const KEYS = {
  progress: 'toeic-quest-progress-v2',
  mocks: 'toeic-quest-mocks-v1',
  zombie: 'toeic-quest-zombie-v1',
}

interface Snapshot {
  progress?: unknown
  mocks?: unknown
  zombie?: unknown
}

function readLS(key: string): unknown {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
function writeLS(key: string, value: unknown) {
  try {
    if (value != null) localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export function getSnapshot(): Snapshot {
  return {
    progress: readLS(KEYS.progress),
    mocks: readLS(KEYS.mocks),
    zombie: readLS(KEYS.zombie),
  }
}

function applySnapshot(s: Snapshot) {
  writeLS(KEYS.progress, s.progress)
  writeLS(KEYS.mocks, s.mocks)
  writeLS(KEYS.zombie, s.zombie)
}

// ---- Merge helpers (used the first time a user logs in) ----------------

type NumMap = Record<string, number>
type BoolMap = Record<string, boolean>

function maxNumMap(a: NumMap = {}, b: NumMap = {}): NumMap {
  const out: NumMap = { ...a }
  for (const k in b) out[k] = Math.max(out[k] ?? -Infinity, b[k])
  return out
}
function orBoolMap(a: BoolMap = {}, b: BoolMap = {}): BoolMap {
  const out: BoolMap = { ...a }
  for (const k in b) out[k] = out[k] || b[k]
  return out
}

interface MockLike {
  id: string
  date: number
}

interface ProgressData {
  cleared?: BoolMap
  best?: NumMap
  stats?: Record<string, { seen: number; wrong: number }>
  answered?: number
}

function mergeProgress(a?: ProgressData, b?: ProgressData): ProgressData | undefined {
  if (!a) return b
  if (!b) return a
  const stats: ProgressData['stats'] = { ...(a.stats ?? {}) }
  for (const tag in b.stats ?? {}) {
    const x = a.stats?.[tag]
    const y = b.stats![tag]
    // Keep the record that reflects more attempts.
    stats![tag] = !x || y.seen > x.seen ? y : x
  }
  return {
    cleared: orBoolMap(a.cleared, b.cleared),
    best: maxNumMap(a.best, b.best),
    stats,
    answered: Math.max(a.answered ?? 0, b.answered ?? 0),
  }
}

function mergeMocks(a?: MockLike[], b?: MockLike[]): unknown {
  const all = [...(a ?? []), ...(b ?? [])]
  const seen = new Set<string>()
  const merged = all.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
  merged.sort((x, y) => y.date - x.date)
  return merged.slice(0, 12)
}

function mergeZombie(
  a?: { highScore?: number; gamesPlayed?: number },
  b?: { highScore?: number; gamesPlayed?: number },
): unknown {
  if (!a) return b
  if (!b) return a
  return {
    highScore: Math.max(a.highScore ?? 0, b.highScore ?? 0),
    gamesPlayed: Math.max(a.gamesPlayed ?? 0, b.gamesPlayed ?? 0),
  }
}

function mergeSnapshots(local: Snapshot, cloud: Snapshot | null): Snapshot {
  if (!cloud) return local
  return {
    progress: mergeProgress(local.progress as ProgressData, cloud.progress as ProgressData),
    mocks: mergeMocks(local.mocks as MockLike[], cloud.mocks as MockLike[]),
    zombie: mergeZombie(local.zombie as never, cloud.zombie as never),
  }
}

// ---- Firestore read / write -------------------------------------------

function userRef(uid: string) {
  return doc(db!, 'users', uid)
}

/**
 * On login: merge the cloud copy with whatever is on this device, write the
 * merged result back to both localStorage and the cloud. Returns true when the
 * local data was updated (so the app can reload its state).
 */
export async function pullAndMerge(uid: string): Promise<void> {
  if (!db) return
  const local = getSnapshot()
  let cloud: Snapshot | null = null
  try {
    const snap = await getDoc(userRef(uid))
    if (snap.exists()) {
      const raw = snap.data().json as string | undefined
      cloud = raw ? (JSON.parse(raw) as Snapshot) : null
    }
  } catch {
    return // offline / permission issue — keep local data
  }
  const merged = mergeSnapshots(local, cloud)
  applySnapshot(merged)
  await pushSnapshotData(uid, merged)
}

async function pushSnapshotData(uid: string, snap: Snapshot): Promise<void> {
  if (!db) return
  try {
    await setDoc(userRef(uid), { json: JSON.stringify(snap), updatedAt: Date.now() }, { merge: true })
  } catch {
    /* ignore transient write errors */
  }
}

/** Push the current localStorage snapshot to the cloud. */
export function pushSnapshot(uid: string): Promise<void> {
  return pushSnapshotData(uid, getSnapshot())
}

/** Notify listeners that local data changed (used by features that write
 * directly to localStorage, e.g. the zombie game). */
export function bumpCloudSync(): void {
  window.dispatchEvent(new Event('cloud-sync'))
}
