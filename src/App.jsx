import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Printer } from 'lucide-react'
import { DOMAINS } from './domains.js'
import CONFIG from './data.js'
import Block from './blocks.jsx'

export default function App() {
  const tabs = CONFIG.tabs
  const initial = Math.max(0, tabs.findIndex(t => '#' + t.id === window.location.hash))
  const [i, setI] = useState(initial)

  const go = n => {
    const next = (n + tabs.length) % tabs.length
    setI(next)
    history.replaceState(null, '', '#' + tabs[next].id)
  }

  useEffect(() => {
    const onKey = e => {
      if (e.target.tagName === 'SELECT') return
      if (e.key === 'ArrowRight') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const tab = tabs[i]

  return (
    <div className="app" style={{ '--accent': CONFIG.accent, '--accent-soft': CONFIG.accentSoft }}>
      <header className="top">
        <div className="brand">
          <img src="/wns-logo.png" alt="WNS" />
          <span className="divider" />
          <img src="/telkom-logo.png" alt="Telkom" />
        </div>
        <div className="title">
          <h1>{CONFIG.title}</h1>
          <p>Welcome to the {CONFIG.period} Executive Business Review · {CONFIG.domain}</p>
        </div>
        <nav className="domains" aria-label="EBR domains">
          {DOMAINS.map(d => (
            <a key={d.key} href={d.url} aria-current={d.key === CONFIG.key ? 'page' : undefined}>{d.label}</a>
          ))}
        </nav>
      </header>

      <nav className="tabs" aria-label="Sections">
        {tabs.map((t, n) => (
          <button key={t.id} aria-current={n === i ? 'page' : undefined} onClick={() => go(n)}>
            <span>{String(n + 1).padStart(2, '0')}</span>{t.label}
          </button>
        ))}
        <div className="tab-tools">
          <button aria-label="Previous section" onClick={() => go(i - 1)}><ChevronLeft size={16} /></button>
          <button aria-label="Next section" onClick={() => go(i + 1)}><ChevronRight size={16} /></button>
          <button aria-label="Print" onClick={() => window.print()}><Printer size={15} /></button>
        </div>
      </nav>

      <main className="main">
        <div className="section-head">
          <h2>{tab.title}</h2>
          {tab.sub && <p>{tab.sub}</p>}
        </div>
        <div className="grid" key={tab.id} style={{ gridTemplateRows: tab.blocks[0].type === 'kpis' ? 'auto' : undefined }}>
          {tab.blocks.map((b, n) => <Block key={n} b={b} />)}
        </div>
      </main>

      <footer className="foot">
        <span>WNS × Telkom Shared Services · {CONFIG.domain} EBR · Confidential</span>
        <span>{CONFIG.source}</span>
      </footer>
    </div>
  )
}
