import s from './PAGE.module.css'

const FILE_ROLES = [
  ['PAGE.tsx',          'The page component rendered at that URL.'],
  ['PAGE.lazy.tsx',     'Same as PAGE.tsx but wrapped with React.lazy() — code-split automatically.'],
  ['LAYOUT.tsx',        'Segment wrapper. Must render <Outlet />. Creates route nesting.'],
  ['BOUNDARY.tsx',      'errorElement on the layout route. Catches errors from any child. Replaces the entire layout on error.'],
  ['ERROR.tsx',         'errorElement on the page route. The layout stays visible.'],
  ['[param]/PAGE.tsx',  'Dynamic parameter directory. [id] → :id segment in the generated route.'],
]

export default function GettingStartedPage() {
  return (
    <div className={s.wrapper}>
      <h1 className={s.heading}>Getting Started</h1>
      <p className={s.lead}>
        <code>vite-plugin-web-routes</code> scans your <code>src/pages/</code> folder at Vite
        startup and generates a <code>routes.ts</code> file you pass directly to{' '}
        <code>createBrowserRouter</code>. No route config to maintain.
      </p>

      <h2 className={s.h2}>1. Install</h2>
      <pre className={s.pre}>npm install -D vite-plugin-web-routes</pre>

      <h2 className={s.h2}>2. Configure Vite</h2>
      <pre className={s.pre}>{`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webRoutes } from 'vite-plugin-web-routes'

export default defineConfig({
  plugins: [
    react(),
    webRoutes({
      moduleId: '@web/routes.jsx',
      // moduleFile: '/src/routes.jsx',
      dirs: [{ dir: 'src/pages', route: '' }],
    }),
  ],
})`}</pre>

      <h2 className={s.h2}>3. Use in your app</h2>
      <pre className={s.pre}>{`// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from '@web/routes.jsx'
// import routes from './routes.jsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>,
)`}</pre>

      <h2 className={s.h2}>4. Create pages</h2>
      <p className={s.p}>
        Add files inside <code>src/pages/</code> using the naming conventions below.
        The plugin picks them up on startup and live-reloads when you add or remove files.
      </p>

      <h2 className={s.h2}>File roles</h2>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.th}>Filename</th>
            <th className={s.th}>Role</th>
          </tr>
        </thead>
        <tbody>
          {FILE_ROLES.map(([file, desc]) => (
            <tr key={file}>
              <td className={s.tdCode}><code>{file}</code></td>
              <td className={s.td}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={s.h2}>Plugin options</h2>
      <pre className={s.pre}>{`webRoutes({
  moduleFile: 'src/routes.ts',         // path for the generated file
  dirs: [
    { dir: 'src/pages', route: '' },   // dir + URL prefix
    { dir: 'src/admin', route: 'admin', lazy: true },
  ],
  allLazy: false,                      // lazy-load every page globally
  roleMapping: {                       // extend or override file roles
    'PRIVATE': { role: 'PAGE', lazy: false },
  },
})`}</pre>
    </div>
  )
}
