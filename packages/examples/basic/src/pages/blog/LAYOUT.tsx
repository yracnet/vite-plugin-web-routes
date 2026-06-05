import { useState, Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import s from './LAYOUT.module.css'

const GUIDE_LINKS = [
  { to: '/blog',         label: 'Overview',        end: true },
  { to: '/blog/intro',   label: 'Introduction'               },
  { to: '/blog/routing', label: 'Route Generation'           },
  { to: '/blog/error',   label: 'Error Boundaries'           },
  { to: '/blog/notFound',label: 'Not Found'           },
]

export default function BlogLayout() {
  const [crash, setCrash] = useState(false)
  if (crash) throw new Error('Intentional layout crash — caught by blog/BOUNDARY.tsx')

  return (
    <div className={s.wrapper}>
      <aside className={s.aside}>
        <p className={s.asideLabel}>Guide</p>
        <nav className={s.asideNav}>
          {GUIDE_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => [s.asideLink, isActive ? s.asideLinkActive : ''].join(' ')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={s.throwArea}>
          <button onClick={() => setCrash(true)} className={s.throwBtn}>
            Throw layout error → BOUNDARY
          </button>
        </div>
      </aside>
      <div className={s.content}>
        <Suspense fallback={<div className={s.loading}>Loading…</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
