import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import s from './LAYOUT.module.css'

const NAV_LINKS = [
  { to: '/',        label: 'Home',            end: true },
  { to: '/about',   label: 'Getting Started'            },
  { to: '/blog',    label: 'Guide'                      },
  { to: '/user',    label: 'Examples'                   },
  { to: '/contact', label: 'Contact'                    },
]

export default function RootLayout() {
  const [crash, setCrash] = useState(false)
  if (crash) throw new Error('Intentional layout crash — caught by BOUNDARY.tsx')

  return (
    <div className={s.root}>
      <header className={s.header}>
        <nav className={s.nav}>
          <span className={s.brand}>
            <span className={s.brandIcon}>⚡</span>
            web-routes
          </span>
          <div className={s.links}>
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => [s.link, isActive ? s.linkActive : ''].join(' ')}
              >
                {label}
              </NavLink>
            ))}
            <a
              href="https://www.npmjs.com/package/vite-plugin-web-routes"
              target="_blank"
              rel="noreferrer"
              className={s.link}
            >
              npm ↗
            </a>
          </div>
        </nav>
      </header>
      <main className={s.main}>
        <Outlet />
      </main>
      <footer className={s.footer}>
        <p className={s.footerText}>
          <strong>vite-plugin-web-routes</strong> — filesystem-based routing for React Router v6
        </p>
        <button onClick={() => setCrash(true)} className={s.throwBtn}>
          Throw layout error → BOUNDARY
        </button>
      </footer>
    </div>
  )
}
