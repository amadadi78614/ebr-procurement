import { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler,
} from 'chart.js'
import CONFIG from './data.js'
import { ArrowDownRight, ArrowUpRight, ArrowRight } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler)
ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif'
ChartJS.defaults.color = '#64748b'

const STATUS = {
  live: ['Live', 'green'], delivered: ['Delivered', 'green'], implemented: ['Implemented', 'green'], complete: ['Complete', 'green'],
  progress: ['In progress', 'blue'], inflight: ['In flight', 'blue'], test: ['In test', 'blue'], uat: ['UAT', 'blue'], expanded: ['Expanded', 'green'], enhanced: ['Enhanced', 'green'],
  planned: ['Planned', 'grey'], pipeline: ['Pipeline', 'grey'], proposed: ['Proposed', 'grey'],
  hold: ['On hold', 'red'], confirm: ['To confirm', 'amber'],
}

export function Pill({ status, text }) {
  const [label, tone] = STATUS[status] || [text || status, 'grey']
  return <span className={'pill ' + tone}>{text || label}</span>
}

function Card({ b, children, className = '' }) {
  const style = { gridColumn: `span ${b.span || 12}`, gridRow: `span ${b.rows || 1}` }
  return (
    <section className={'card ' + className} style={style}>
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

function Kpis({ b }) {
  return (
    <div className="kpis" style={{ gridColumn: `span ${b.span || 12}` }}>
      {b.items.map(k => {
        const Icon = k.trend === 'up' ? ArrowUpRight : k.trend === 'down' ? ArrowDownRight : null
        return (
          <article key={k.label} className="kpi">
            <div className="kpi-top">
              <strong>{k.value}</strong>
              {Icon && <Icon size={18} className={k.good === false ? 'bad' : 'good'} />}
            </div>
            <p>{k.label}</p>
            {k.note && <small>{k.note}</small>}
          </article>
        )
      })}
    </div>
  )
}

const PALETTE = ['var(--accent)', '#94a3b8', '#0f766e', '#d97706', '#7c3aed', '#2563eb']
const css = v => (v === 'var(--accent)' ? CONFIG.accent : v)

function ChartBlock({ b }) {
  const horizontal = !!b.horizontal
  const suffix = b.suffix ?? ''
  const datasets = b.datasets.map((d, n) => {
    const base = d.color || PALETTE[n]
    const colors = d.colors ? d.colors.map(css) : css(base)
    return b.kind === 'line'
      ? { label: d.label, data: d.data, borderColor: colors, backgroundColor: colors, borderWidth: d.dashed ? 1.5 : 2.5, borderDash: d.dashed ? [5, 5] : [], pointRadius: d.dashed ? 0 : 3, tension: 0.3 }
      : { label: d.label, data: d.data, backgroundColor: colors, borderRadius: 4, maxBarThickness: horizontal ? 18 : 44 }
  })
  const valueAxis = { min: b.min ?? 0, max: b.max, grid: { color: '#eef2f6' }, ticks: { callback: v => v + suffix, font: { size: 10 } }, border: { display: false } }
  const catAxis = { grid: { display: false }, ticks: { font: { size: 10 } }, border: { display: false } }
  const options = {
    responsive: true, maintainAspectRatio: false, indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      legend: { display: datasets.length > 1, position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } },
      tooltip: { callbacks: { label: c => `${c.dataset.label ? c.dataset.label + ': ' : ''}${c.raw}${suffix}` } },
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

function Compare({ b }) {
  return (
    <Card b={b}>
      <div className="compare">
        {b.items.map(c => (
          <div key={c.label} className="compare-row">
            <span className="compare-label">{c.label}</span>
            <span className="from">{c.from}</span>
            <ArrowRight size={14} />
            <span className="to">{c.to}</span>
            {c.note && <small>{c.note}</small>}
          </div>
        ))}
      </div>
    </Card>
  )
}

function List({ b }) {
  return (
    <Card b={b}>
      <ul className="list">
        {b.items.map(it => (
          <li key={it.title}>
            <div>
              <b>{it.title}</b>
              {it.text && <p>{it.text}</p>}
            </div>
            <div className="list-side">
              {it.metric && <em>{it.metric}</em>}
              {it.status && <Pill status={it.status} />}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function Cards({ b }) {
  return (
    <Card b={b}>
      <div className="cards" style={{ gridTemplateColumns: `repeat(${b.cols || 3}, minmax(0,1fr))` }}>
        {b.items.map(it => (
          <article key={it.title}>
            {it.tag && <span className="tag">{it.tag}</span>}
            <b>{it.title}</b>
            {it.text && <p>{it.text}</p>}
            {it.status && <Pill status={it.status} />}
          </article>
        ))}
      </div>
    </Card>
  )
}

function Steps({ b }) {
  return (
    <Card b={b}>
      <ol className="steps" style={{ gridTemplateColumns: `repeat(${b.items.length}, minmax(0,1fr))` }}>
        {b.items.map((s, n) => (
          <li key={s.title}>
            <span className="step-no">{String(n + 1).padStart(2, '0')}</span>
            {s.period && <small>{s.period}</small>}
            <b>{s.title}</b>
            {s.text && <p>{s.text}</p>}
            {s.points && <ul>{s.points.map(p => <li key={p}>{p}</li>)}</ul>}
            {s.status && <Pill status={s.status} />}
          </li>
        ))}
      </ol>
    </Card>
  )
}

function Table({ b }) {
  return (
    <Card b={b}>
      <div className="table-wrap">
        <table>
          <thead><tr>{b.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, n) => <tr key={n}>{r.map((c, m) => <td key={m}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </Card>
  )
}

function Asks({ b }) {
  return (
    <Card b={b} className="asks">
      <ol>{b.items.map(a => <li key={a}>{a}</li>)}</ol>
    </Card>
  )
}

function BusinessUnits({ b }) {
  const keys = Object.keys(b.data)
  const [bu, setBu] = useState(keys[0])
  const d = b.data[bu]
  const fmt = v => 'R' + v.toLocaleString('en-ZA', { maximumFractionDigits: 1 }) + 'm'
  const chart = {
    type: 'chart', kind: 'bar', horizontal: true, suffix: 'm',
    labels: b.series, datasets: [{ label: bu, data: d }],
  }
  return (
    <Card b={b}>
      <label className="select">Business unit
        <select value={bu} onChange={e => setBu(e.target.value)}>{keys.map(k => <option key={k}>{k}</option>)}</select>
      </label>
      <div className="bu-metrics">{b.headline.map(([label, idx]) => <div key={label}><span>{label}</span><strong>{fmt(d[idx])}</strong></div>)}</div>
      <div className="chart"><ChartInner b={chart} /></div>
      {b.footnote && <p className="footnote">{b.footnote}</p>}
    </Card>
  )
}

function ChartInner({ b }) {
  const options = {
    responsive: true, maintainAspectRatio: false, indexAxis: 'y',
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => 'R' + c.raw + 'm' } } },
    scales: { x: { grid: { color: '#eef2f6' }, border: { display: false } }, y: { grid: { display: false }, border: { display: false } } },
  }
  return <Bar data={{ labels: b.labels, datasets: [{ data: b.datasets[0].data, backgroundColor: css('var(--accent)'), borderRadius: 4, maxBarThickness: 16 }] }} options={options} />
}

export default function Block({ b }) {
  switch (b.type) {
    case 'kpis': return <Kpis b={b} />
    case 'chart': return <ChartBlock b={b} />
    case 'compare': return <Compare b={b} />
    case 'list': return <List b={b} />
    case 'cards': return <Cards b={b} />
    case 'steps': return <Steps b={b} />
    case 'table': return <Table b={b} />
    case 'asks': return <Asks b={b} />
    case 'bu': return <BusinessUnits b={b} />
    default: return null
  }
}
