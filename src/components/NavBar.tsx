import { useAuth } from '../auth/AuthContext'

interface Props {
  active: 'home' | 'guide' | 'mock' | 'insights'
  onHome: () => void
  onGuide: () => void
  onVocab: () => void
  onMock: () => void
  onInsights: () => void
}

export function NavBar({ active, onHome, onGuide, onVocab, onMock, onInsights }: Props) {
  const { user, loading, configured, signIn, signOut } = useAuth()

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="logo" onClick={onHome}>
          <span className="logo-mark">🦉</span>
          <span className="logo-text">TOEIC&nbsp;Quest</span>
        </button>

        <nav className="nav-links">
          <button className={active === 'home' ? 'active' : ''} onClick={onHome}>บทเรียน</button>
          <button className={active === 'guide' ? 'active' : ''} onClick={onGuide}>เตรียมสอบ</button>
          <button onClick={onVocab}>เกมซอมบี้</button>
          <button className={active === 'mock' ? 'active' : ''} onClick={onMock}>สอบเสมือนจริง</button>
          <button className={active === 'insights' ? 'active' : ''} onClick={onInsights}>สถิติ</button>
        </nav>

        {configured && (
          <div className="nav-auth">
            {loading ? null : user ? (
              <div className="auth-user">
                {user.photoURL ? (
                  <img className="auth-avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                ) : (
                  <span className="auth-avatar fallback">{(user.displayName ?? 'U')[0]}</span>
                )}
                <span className="auth-name">{user.displayName?.split(' ')[0] ?? 'บัญชี'}</span>
                <button className="auth-out" onClick={() => void signOut()} title="ออกจากระบบ">ออก</button>
              </div>
            ) : (
              <button className="auth-in" onClick={() => void signIn()}>
                <span className="g-mark">G</span> เข้าสู่ระบบ
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
