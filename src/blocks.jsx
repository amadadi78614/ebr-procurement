import { useEffect, useRef, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler,
} from 'chart.js'
import * as Icons from 'lucide-react'
import CONFIG from './data.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler)
ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif'
ChartJS.defaults.color = '#5B6B7F'

const ACC = CONFIG.accent
const ACC2 = CONFIG.accent2 || CONFIG.accent
const col = c => (c === 'accent' ? ACC : c === 'accent2' ? ACC2 : c)

const TONE = {
  live: ['Live', 'green'], delivered: ['Delivered', 'green'], complete: ['Complete', 'green'],
  progress: ['In progress', 'blue'], test: ['In test', 'blue'], pilot: ['Pilot', 'violet'],
  planned: ['Planned', 'grey'], proposed: ['Proposed', 'violet'], confirm: ['To confirm', 'amber'], risk: ['At risk', 'red'],
}
export function Pill({ s, text }) {
  const [label, tone] = TONE[s] || [text || s, 'grey']
  return <span className={'pill ' + tone}>{text || label}</span>
}

export function Icon({ name, size = 20 }) {
  const C = Icons[name] || Icons.Sparkles
  return <C size={size} strokeWidth={1.75} />
}

function useMounted(delay = 60) {
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t) }, [delay])
  return on
}

// Animated number: animates the first number found in the string, keeps prefix/suffix.
export function CountUp({ value, ms = 1100 }) {
  const m = String(value).match(/^([^\d−-]*)([−-]?)([\d,]*\.?\d+)(.*)$/)
  const [shown, setShown] = useState(m ? 0 : null)
  const raf = useRef()
  useEffect(() => {
    if (!m) return
    const target = parseFloat(m[3].replace(/,/g, ''))
    const start = performance.now()
    const tick = t => {
      const p = Math.min(1, (t - start) / ms)
      const e = 1 - Math.pow(1 - p, 3)
      setShown(target * e)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [value])
  if (!m) return <>{value}</>
  const decimals = (m[3].split('.')[1] || '').length
  const hasComma = m[3].includes(',')
  let n = shown.toFixed(decimals)
  if (hasComma) n = Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return <>{m[1]}{m[2]}{n}{m[4]}</>
}

function Card({ b, children, className = '', onClick }) {
  const style = { gridColumn: `span ${b.span || 12}`, gridRow: `span ${b.rows || 1}`, animationDelay: `${(b._i || 0) * 70}ms` }
  return (
    <section className={'card ' + className + (onClick ? ' clickable' : '')} style={style} onClick={onClick}>
      {b.title && (
        <div className="card-head">
          <h3>{b.title}</h3>
          {b.note && <small>{b.note}</small>}
        </div>
      )}
      {children}
    </section>
  )
}


/* ---------- Spotlight payloads ---------- */
const toSpot = (x, b) => ({
  key: x.name || x.label, title: x.name || x.label, tag: (b.title || '').split(' · click')[0], icon: x.icon, status: x.status, statusText: x.statusText,
  team: x.team, value: x.value ?? x.metric, then: x.then, now: x.now, thenLabel: b.thenLabel, nowLabel: b.nowLabel,
  line: x.line || x.sub, tone: { green: 'good', amber: 'warn', red: 'bad' }[x.tone] || x.tone, pct: x.pct, ...(x.detail || {}),
})
function spot(b, open, item, all = true) {
  const pool = all ? b.items : b.items.filter(x => x.detail)
  const list = pool.map(x => toSpot(x, b))
  const i = list.findIndex(p => p.key === (item.name || item.label))
  return () => open({ list, i })
}

/* ---------- Hero stats ---------- */
function Hero({ b, open }) {
  return (
    <div className="hero" style={{ gridColumn: `span ${b.span || 12}`, gridTemplateColumns: `repeat(${b.items.length}, 1fr)` }}>
      {b.items.map((k, n) => (
        <article key={k.label} className={'stat' + (k.detail ? ' clickable' : '')} style={{ animationDelay: `${n * 90}ms` }}
          onClick={k.detail ? spot(b, open, k, false) : undefined}>
          <strong className={k.tone || ''}><CountUp value={k.value} /></strong>
          <p>{k.label}</p>
          {k.sub && <small>{k.sub}</small>}
        </article>
      ))}
    </div>
  )
}

/* ---------- Ring gauges ---------- */
function Ring({ pct, size = 120, stroke = 10, label, value, color = ACC }) {
  const on = useMounted()
  const r = (size - stroke) / 2, c = 2 * Math.PI * r
  return (
    <div className="ring" style={{ width: size }}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="#fff" stroke="#E8EDF3" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={on ? c * (1 - Math.min(pct, 100) / 100) : c}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)' }} />
      </svg>
      <div className="ring-c"><b><CountUp value={value ?? pct + '%'} /></b></div>
      {label && <span>{label}</span>}
    </div>
  )
}
function Rings({ b, open }) {
  return (
    <Card b={b}>
      <div className="rings">
        {b.items.map(k => (
          <div key={k.label} className={k.detail ? 'clickable' : ''} onClick={k.detail ? spot(b, open, k, false) : undefined}>
            <Ring pct={k.pct} value={k.value} label={k.label} color={col(k.color || 'accent')} size={b.size || 120} />
            {k.sub && <small className="ring-sub">{k.sub}</small>}
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ---------- Process flow ---------- */
function Flow({ b, open }) {
  return (
    <Card b={b} className="flow-card">
      <div className="flow">
        <div className="flow-line"><i /></div>
        {b.items.map((s, n) => (
          <button key={s.name} className="node" style={{ animationDelay: `${n * 150}ms` }}
            onClick={spot(b, open, s)}>
            <Ring pct={s.pct} value={s.value} size={b.size || 104} stroke={9} color={col(s.color || 'accent')} />
            <b>{s.name}</b>
            {s.status && <Pill s={s.status} />}
          </button>
        ))}
      </div>
      {b.footnote && <p className="footnote">{b.footnote}</p>}
    </Card>
  )
}

/* ---------- Chart ---------- */
function ChartBlock({ b }) {
  const horizontal = !!b.horizontal
  const suffix = b.suffix ?? ''
  const pal = [ACC, '#B8C2CC', ACC2, '#FECB5E', '#6D8A9C']
  const datasets = b.datasets.map((d, n) => {
    const c = d.colors ? d.colors.map(col) : col(d.color || pal[n])
    return b.kind === 'line'
      ? { label: d.label, data: d.data, borderColor: c, backgroundColor: c + '22', fill: !!d.fill, borderWidth: d.dashed ? 1.5 : 3, borderDash: d.dashed ? [6, 6] : [], pointRadius: d.dashed ? 0 : 3, tension: 0.35 }
      : { label: d.label, data: d.data, backgroundColor: c, borderRadius: 6, maxBarThickness: horizontal ? 16 : 42 }
  })
  const valueAxis = { min: b.min ?? 0, max: b.max, grid: { color: '#EEF2F6' }, ticks: { callback: v => v + suffix, font: { size: 10 } }, border: { display: false } }
  const catAxis = { grid: { display: false }, ticks: { font: { size: 11 }, color: '#3D4752' }, border: { display: false } }
  const options = {
    responsive: true, maintainAspectRatio: false, indexAxis: horizontal ? 'y' : 'x',
    animation: { duration: 1100, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: datasets.length > 1, position: 'bottom', labels: { boxWidth: 10, boxHeight: 10, font: { size: 10 }, color: '#3D4752' } },
      tooltip: { backgroundColor: '#fff', titleColor: '#231F20', bodyColor: '#3D4752', borderColor: '#E3E8EF', borderWidth: 1, callbacks: { label: c => `${c.dataset.label ? c.dataset.label + ': ' : ''}${c.raw}${suffix}` } },
    },
    scales: horizontal ? { x: valueAxis, y: catAxis } : { x: catAxis, y: valueAxis },
  }
  const C = b.kind === 'line' ? Line : Bar
  return (
    <Card b={b}>
      <div className="chart"><C data={{ labels: b.labels, datasets }} options={options} /></div>
      {b.footnote && <p className="footnote">{b.footnote}</p>}
    </Card>
  )
}

/* ---------- Before / after ---------- */
function Shift({ b }) {
  return (
    <Card b={b}>
      <div className="shift">
        {b.items.map(s => (
          <div key={s.label}>
            <span>{s.label}</span>
            <div className="shift-row"><em>{s.from}</em><Icons.ArrowRight size={18} /><strong><CountUp value={s.to} /></strong></div>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ---------- Status tiles ---------- */
function Tiles({ b, open }) {
  return (
    <Card b={b}>
      <div className="tiles" style={{ gridTemplateColumns: `repeat(${b.cols || 4}, 1fr)` }}>
        {b.items.map((t, n) => (
          <button key={t.label} className={'tile ' + (t.tone || 'green')} style={{ animationDelay: `${n * 40}ms` }}
            onClick={spot(b, open, t)}>
            <b>{t.value}</b><span>{t.label}</span>
          </button>
        ))}
      </div>
      {b.footnote && <p className="footnote">{b.footnote}</p>}
    </Card>
  )
}

/* ---------- Icon cards (initiatives, agents) ---------- */
function Cards({ b, open }) {
  return (
    <Card b={b}>
      <div className={'icards' + (b.list ? ' list' : (b.cols || 3) <= 3 ? ' roomy' : '')} style={{ gridTemplateColumns: `repeat(${b.cols || 3}, 1fr)` }}>
        {b.items.map((it, n) => (
          <button key={it.name} className={'icard' + (b.agent ? ' agent' : '')} style={{ animationDelay: `${n * 60}ms` }}
            onClick={spot(b, open, it)}>
            {b.list ? <>
              <span className="ico"><Icon name={it.icon} /></span>
              <span className="lst-body"><b>{it.name}</b>{it.line && <small>{it.line}</small>}</span>
              <span className="lst-side">{it.status && <Pill s={it.status} text={it.statusText} />}{it.team && <span className="team">{it.team}</span>}</span>
            </> : <>
            <div className="icard-top"><span className="ico"><Icon name={it.icon} /></span>{it.status && <Pill s={it.status} text={it.statusText} />}</div>
            <b>{it.name}</b>
            {it.line && <small>{it.line}</small>}
            {it.team && <span className="team">{it.team}</span>}
            </>}
            {it.metric && <em>{it.metric}</em>}
          </button>
        ))}
      </div>
    </Card>
  )
}

/* ---------- Maturity staircase ---------- */
function Staircase({ b }) {
  const on = useMounted(200)
  const n = b.levels.length
  return (
    <Card b={b}>
      <div className="stairs">
        {b.levels.map((l, k) => {
          const h = 28 + (k / (n - 1)) * 62
          const isNow = Math.floor(b.current) === k
          const isTarget = b.target === k
          return (
            <div key={l} className={'stair' + (k <= b.current ? ' done' : '') + (isTarget ? ' target' : '')}>
              {isNow && <span className="marker now">Today</span>}
              {isTarget && <span className="marker tgt">{b.targetLabel || 'Target'}</span>}
              <div className="bar" style={{ height: on ? `${h}%` : '4%', transitionDelay: `${k * 120}ms` }} />
              <b>{l}</b>
            </div>
          )
        })}
      </div>
      {b.footnote && <p className="footnote">{b.footnote}</p>}
    </Card>
  )
}

/* ---------- Flagship use case stepper ---------- */
function Stepper({ b }) {
  const [k, setK] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setK(x => (x + 1) % b.steps.length), 3200)
    return () => clearInterval(t)
  }, [auto, b.steps.length])
  const s = b.steps[k]
  return (
    <Card b={b} className="stepper">
      <div className="st-rail">
        {b.steps.map((x, n) => (
          <button key={x.name} className={n === k ? 'on' : n < k ? 'past' : ''} onClick={() => { setK(n); setAuto(false) }}>
            <span className="st-dot"><Icon name={x.icon} size={16} /></span>
            <small>{x.name}</small>
          </button>
        ))}
        <div className="st-prog"><i style={{ width: `${(k / (b.steps.length - 1)) * 100}%` }} /></div>
      </div>
      <div className="st-body" key={k}>
        <h4>{s.title}</h4>
        <div className="st-points">{s.points.map(p => <span key={p}>{p}</span>)}</div>
      </div>
      {b.footnote && <p className="footnote">{b.footnote}</p>}
    </Card>
  )
}

/* ---------- Roadmap waves ---------- */
function Waves({ b, open }) {
  return (
    <Card b={b}>
      <div className="waves" style={{ gridTemplateColumns: `repeat(${b.items.length}, 1fr)` }}>
        {b.items.map((w, n) => (
          <div key={w.name} className={'wave w' + n} style={{ animationDelay: `${n * 120}ms` }}>
            <small>{w.when}</small>
            <b>{w.name}</b>
            <ul>{w.items.map(x => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ---------- Then and now ---------- */
function Journey({ b, open }) {
  return (
    <Card b={b} className="journey">
      <div className="jr-head">
        <span>{b.thenLabel || 'Last EBR'}</span><i /><span className="now">{b.nowLabel || 'Now'}</span>
      </div>
      <div className="jr-rows">
        {b.items.map((r, n) => (
          <button key={r.label} className="jr-row clickable" style={{ animationDelay: `${n * 110}ms` }}
            onClick={spot(b, open, r)}>
            <span className="jr-label"><Icon name={r.icon} size={16} />{r.label}</span>
            <span className="jr-then">{r.then}</span>
            <span className="jr-arrow" style={{ animationDelay: `${300 + n * 110}ms` }}><i /><Icons.ChevronRight size={14} /></span>
            <span className={'jr-now ' + (r.tone || 'good')}><CountUp value={r.now} /></span>
            {r.status ? <Pill s={r.status} /> : <span />}
          </button>
        ))}
      </div>
    </Card>
  )
}

/* ---------- Decisions ---------- */
function Asks({ b }) {
  return (
    <Card b={b} className="asks">
      <div className="asks-list">
        {b.items.map((a, n) => <div key={a}><span>{n + 1}</span><p>{a}</p></div>)}
      </div>
    </Card>
  )
}

/* ---------- Business unit selector ---------- */
function Units({ b }) {
  const keys = Object.keys(b.data)
  const [u, setU] = useState(keys[0])
  const d = b.data[u]
  return (
    <Card b={b}>
      <div className="units-tabs">{keys.map(k => <button key={k} className={k === u ? 'on' : ''} onClick={() => setU(k)}>{k}</button>)}</div>
      <div className="units-body" key={u}>
        <Ring pct={d.conv} value={d.conv + '%'} size={130} stroke={11} color={d.conv >= d.target ? '#0E9F6E' : '#E07B00'} label="Conversion" />
        <div className="units-stats">
          {d.stats.map(([l, v]) => <div key={l}><span>{l}</span><b><CountUp value={v} /></b></div>)}
          <div><span>Target</span><b>{d.target}%</b></div>
        </div>
      </div>
    </Card>
  )
}

export default function Block({ b, open, idx }) {
  b = { ...b, _i: idx }
  switch (b.type) {
    case 'hero': return <Hero b={b} open={open} />
    case 'rings': return <Rings b={b} open={open} />
    case 'flow': return <Flow b={b} open={open} />
    case 'chart': return <ChartBlock b={b} />
    case 'shift': return <Shift b={b} />
    case 'tiles': return <Tiles b={b} open={open} />
    case 'cards': return <Cards b={b} open={open} />
    case 'stairs': return <Staircase b={b} />
    case 'stepper': return <Stepper b={b} />
    case 'waves': return <Waves b={b} open={open} />
    case 'asks': return <Asks b={b} />
    case 'units': return <Units b={b} />
    case 'journey': return <Journey b={b} open={open} />
    default: return null
  }
}
