import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
  type User,
} from 'firebase/auth'
import { auth, googleProvider, isAuthConfigured } from '../lib/firebase'

interface AuthState {
  user: User | null
  loading: boolean
  configured: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthCtx = createContext<AuthState>({
  user: null,
  loading: false,
  configured: false,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isAuthConfigured)

  useEffect(() => {
    if (!isAuthConfigured || !auth) {
      setLoading(false)
      return
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const signIn = async () => {
    if (!isAuthConfigured || !auth || !googleProvider) {
      alert('ยังไม่ได้ตั้งค่า Firebase — โปรดเพิ่ม environment variables (ดู README)')
      return
    }
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e) {
      const err = e as { code?: string }
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        alert('เข้าสู่ระบบไม่สำเร็จ: ' + (err.code ?? 'unknown error'))
      }
    }
  }

  const signOut = async () => {
    if (auth) await fbSignOut(auth)
  }

  return (
    <AuthCtx.Provider value={{ user, loading, configured: isAuthConfigured, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
