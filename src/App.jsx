import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import CONFIG from './data.js'
import Block, { Icon, Pill } from './blocks.jsx'

export default function App() {
  const tabs = CONFIG.tabs
  const initial = Math.max(0, tabs.findIndex(t => '#' + t.id === window.location.hash))
  const [i, setI] = useState(initial)
  const [drawer, setDrawer] = useState(null)
  useEffect(() => {
    const onHash = () => { const n = tabs.findIndex(t => '#' + t.id === window.location.hash); if (n >= 0) { setI(n); setDrawer(null) } }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = n => {
    const next = (n + tabs.length) % tabs.length
    setI(next)
    setDrawer(null)
    history.replaceState(null, '', '#' + tabs[next].id)
  }

  const step = d => setDrawer(x => x && x.list.length > 1 ? { ...x, i: (x.i + d + x.list.length) % x.list.length } : x)

  useEffect(() => {
    const onKey = e => {
      if (e.target.tagName === 'SELECT') return
      if (e.key === 'Escape') return setDrawer(null)
      if (drawer) {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
        return
      }
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
          <div className="scene-k">
            <span className="kicker">{String(i + 1).padStart(2, '0')} · {tab.label}</span>
            {tab.owner && <span className="owner"><b>{tab.owner.name}</b>{tab.owner.role}</span>}
          </div>
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

      {drawer && <Spotlight d={drawer} close={() => setDrawer(null)} step={step} jump={n => setDrawer(x => ({ ...x, i: n }))} />}
    </div>
  )
}

function Spotlight({ d, close, step, jump }) {
  const x = d.list[d.i]
  const many = d.list.length > 1
  const big = x.now ?? x.value
  return (
    <div className="spot-wrap" onClick={close}>
      <section className="spot" onClick={e => e.stopPropagation()} role="dialog" aria-label={x.title} key={x.key}>
        <header className="spot-top">
          <span className="kicker">{x.tag}</span>
          <span className="spot-count">{many && `${d.i + 1} of ${d.list.length}`}</span>
          <button className="spot-x" aria-label="Close" onClick={close}><X size={20} /></button>
        </header>
        <div className="spot-head">
          {x.icon && <span className="spot-ico"><Icon name={x.icon} size={34} /></span>}
          <div>
            <h2>{x.title}</h2>
            {x.line && <p>{x.line}</p>}
            <div className="spot-tags">{x.status && <Pill s={x.status} text={x.statusText} />}{x.team && <span className="team">{x.team}</span>}</div>
          </div>
        </div>
        {x.then != null ? (
          <div className="spot-shift">
            <div><span>{x.thenLabel || 'Last EBR'}</span><b>{x.then}</b></div>
            <i><ChevronRight size={30} /></i>
            <div className="now"><span>{x.nowLabel || 'Now'}</span><strong className={x.tone || ''}>{x.now}</strong></div>
          </div>
        ) : big != null && <div className={'spot-big ' + (x.tone || '')}>{big}</div>}
        {x.text && <p className="spot-lead">{x.text}</p>}
        {x.rows && (
          <div className="spot-facts" style={{ gridTemplateColumns: `repeat(${Math.min(x.rows.length, 3)}, 1fr)` }}>
            {x.rows.map(([k, v], n) => <div key={k} style={{ animationDelay: `${120 + n * 80}ms` }}><span>{k}</span><b>{v}</b></div>)}
          </div>
        )}
        {x.points && <div className="spot-points">{x.points.map((p, n) => <span key={p} style={{ animationDelay: `${120 + n * 60}ms` }}>{p}</span>)}</div>}
        {many && (
          <footer className="spot-nav">
            <button onClick={() => step(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
            <div className="spot-dots">{d.list.map((p, n) => <i key={p.key} className={n === d.i ? 'on' : ''} onClick={() => jump(n)} title={p.title} />)}</div>
            <button onClick={() => step(1)} aria-label="Next"><ChevronRight size={20} /></button>
          </footer>
        )}
      </section>
    </div>
  )
}
