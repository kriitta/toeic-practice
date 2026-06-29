interface Props {
  active: 'home' | 'guide' | 'mock' | 'insights'
  onHome: () => void
  onGuide: () => void
  onVocab: () => void
  onMock: () => void
  onInsights: () => void
}

export function NavBar({ active, onHome, onGuide, onVocab, onMock, onInsights }: Props) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="logo" onClick={onHome}>
          <span className="logo-mark">🦉</span>
          <span className="logo-text">TOEIC&nbsp;Quest</span>
        </button>
        <nav className="nav-links">
          <button className={active === 'home' ? 'active' : ''} onClick={onHome}>
            บทเรียน
          </button>
          <button className={active === 'guide' ? 'active' : ''} onClick={onGuide}>
            เตรียมสอบ
          </button>
          <button onClick={onVocab}>เกมซอมบี้</button>
          <button className={active === 'mock' ? 'active' : ''} onClick={onMock}>
            สอบเสมือนจริง
          </button>
          <button className={active === 'insights' ? 'active' : ''} onClick={onInsights}>
            สถิติ
          </button>
        </nav>
      </div>
    </header>
  )
}
