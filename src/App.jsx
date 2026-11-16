import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import CONFIG from './data.js'
import Block from './blocks.jsx'

export default function App() {
  const tabs = CONFIG.tabs
  const initial = Math.max(0, tabs.findIndex(t => '#' + t.id === window.location.hash))
  const [i, setI] = useState(initial)
  const [drawer, setDrawer] = useState(null)

  const go = n => {
    const next = (n + tabs.length) % tabs.length
    setI(next)
    setDrawer(null)
    history.replaceState(null, '', '#' + tabs[next].id)
  }

  useEffect(() => {
    const onKey = e => {
      if (e.target.tagName === 'SELECT') return
      if (e.key === 'Escape') setDrawer(null)
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(i + 1)
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(i - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const tab = tabs[i]

  return (
    <div className="app" style={{ '--accent': CONFIG.accent, '--accent2': CONFIG.accent2 || CONFIG.accent }}>
      <div className="glow g1" /><div className="glow g2" />
      <header className="top">
        <div className="brand">
          <img src="/wns-logo.png" alt="WNS" />
          <span className="divider" />
          <img src="/telkom-logo.png" alt="Telkom" />
        </div>
        <div className="title">
          <h1>{CONFIG.domain}</h1>
          <p>Welcome · {CONFIG.period} Executive Business Review</p>
        </div>
      </header>

      <main className="scene" key={tab.id}>
        <div className="scene-head">
          <span className="kicker">{String(i + 1).padStart(2, '0')} · {tab.label}</span>
          <h2>{tab.title}</h2>
        </div>
        <div className="grid" style={{ gridTemplateRows: tab.blocks[0].type === 'hero' ? 'auto' : undefined }}>
          {tab.blocks.map((b, n) => <Block key={n} b={b} open={setDrawer} idx={n} />)}
        </div>
      </main>

      <footer className="dock">
        <button className="arrow" aria-label="Previous section" onClick={() => go(i - 1)}><ChevronLeft size={18} /></button>
        <div className="steps-nav">
          {tabs.map((t, n) => (
            <button key={t.id} aria-current={n === i ? 'page' : undefined} onClick={() => go(n)}>
              <i className={n <= i ? 'on' : ''} />{t.label}
            </button>
          ))}
        </div>
        <button className="arrow" aria-label="Next section" onClick={() => go(i + 1)}><ChevronRight size={18} /></button>
        <span className="source">{CONFIG.source}</span>
      </footer>

      {drawer && (
        <div className="drawer-wrap" onClick={() => setDrawer(null)}>
          <aside className="drawer" onClick={e => e.stopPropagation()} role="dialog" aria-label={drawer.title}>
            <button className="close" aria-label="Close" onClick={() => setDrawer(null)}><X size={18} /></button>
            {drawer.tag && <span className="kicker">{drawer.tag}</span>}
            <h3>{drawer.title}</h3>
            {drawer.text && <p>{drawer.text}</p>}
            {drawer.rows && (
              <dl>{drawer.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            )}
            {drawer.points && <ul>{drawer.points.map(p => <li key={p}>{p}</li>)}</ul>}
          </aside>
        </div>
      )}
    </div>
  )
}
