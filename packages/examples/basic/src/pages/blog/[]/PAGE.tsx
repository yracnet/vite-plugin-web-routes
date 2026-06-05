import { useLocation, Link } from 'react-router-dom'
import s from './PAGE.module.css'

export default function BlogNotFound() {
  const { pathname } = useLocation()

  return (
    <div className={s.wrapper}>
      <div className={s.icon}>404</div>
      <h1 className={s.title}>Page not found</h1>
      <p className={s.path}>{pathname}</p>
      <p className={s.hint}>
        No route matched this path inside <code>/blog</code>.
        This page is served by <code>blog/[]/PAGE.tsx</code> — a catch-all
        route generated as <code>path: "*"</code>.
      </p>
      <pre className={s.pre}>{`blog/
  LAYOUT.tsx       →  /blog  (layout)
  PAGE.tsx         →  /blog  (index)
  intro/PAGE.tsx   →  /blog/intro
  []/PAGE.tsx      →  /blog/*  ← catches everything else`}</pre>
      <Link to="/blog" className={s.btn}>Back to Guide</Link>
    </div>
  )
}
