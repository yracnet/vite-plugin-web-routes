import { useState } from 'react'
import { Link } from 'react-router-dom'
import s from './PAGE.module.css'

const ARTICLES = [
  {
    to: '/blog/intro',
    title: 'Introduction to vite-plugin-web-routes',
    date: '2024-01-01',
    summary: 'Learn the core concepts of filesystem-based routing and set up the plugin in five minutes.',
  },
  {
    to: '/blog/routing',
    title: 'Route Generation: LAYOUT, PAGE and BOUNDARY',
    date: '2024-01-15',
    summary: 'How LAYOUT creates nesting, how flat routes work without a layout, and how dynamic segments are generated.',
  },
  {
    to: '/blog/error',
    title: 'Error Boundaries: BOUNDARY vs ERROR',
    date: '2024-02-01',
    summary: 'The difference between layout-level and page-level error handling, with interactive demos.',
  },
]

export default function BlogIndexPage() {
  const [crash, setCrash] = useState(false)
  if (crash) throw new Error('Intentional page crash — caught by blog/ERROR.tsx')

  return (
    <div>
      <h1 className={s.title}>Guide</h1>
      <p className={s.sub}>Docs and tutorials for <strong>vite-plugin-web-routes</strong>.</p>

      <div className={s.list}>
        {ARTICLES.map((a) => (
          <article key={a.to} className={s.card}>
            <time className={s.date}>{a.date}</time>
            <h2 className={s.cardTitle}>
              <Link to={a.to} className={s.cardLink}>{a.title}</Link>
            </h2>
            <p className={s.cardSummary}>{a.summary}</p>
            <Link to={a.to} className={s.readMore}>Read more →</Link>
          </article>
        ))}
      </div>

      <div className={s.demoRow}>
        <div className={s.demoCard}>
          <p className={s.demoLabel}>Page error → ERROR</p>
          <p className={s.demoDesc}>The sidebar <strong>stays visible</strong>.</p>
          <button onClick={() => setCrash(true)} className={s.throwBtn}>
            Throw page error
          </button>
        </div>
        <div className={s.demoCard}>
          <p className={s.demoLabel}>Layout error → BOUNDARY</p>
          <p className={s.demoDesc}>The sidebar <strong>disappears</strong>.</p>
          <p className={s.demoHint}>↑ button in the sidebar</p>
        </div>
      </div>
    </div>
  )
}
