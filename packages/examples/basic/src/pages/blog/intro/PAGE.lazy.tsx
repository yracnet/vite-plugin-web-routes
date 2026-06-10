import s from './PAGE.module.css'

export default function BlogIntroPage() {
  return (
    <article className={s.article}>
      <time className={s.date}>2024-01-01</time>
      <h1 className={s.title}>Introduction to vite-plugin-web-routes</h1>
      <p className={s.lead}>
        <code>vite-plugin-web-routes</code> turns your project's folder structure into
        React Router v6 routes. Instead of maintaining a manual route config file,
        you simply create files with semantic names.
      </p>

      <h2 className={s.h2}>File roles</h2>
      <dl className={s.dl}>
        <dt className={s.dt}><code>LAYOUT.tsx</code></dt>
        <dd className={s.dd}>Wrapper with <code>&lt;Outlet /&gt;</code>. Creates nested routes.</dd>
        <dt className={s.dt}><code>BOUNDARY.tsx</code></dt>
        <dd className={s.dd}>Layout-level error boundary. Catches errors from any child. The full layout is replaced.</dd>
        
        <dt className={s.dt}><code>PAGE.tsx</code></dt>
        <dd className={s.dd}>The component rendered at that URL.</dd>
        <dt className={s.dt}><code>ERROR.tsx</code></dt>
        <dd className={s.dd}>Page-level error boundary. The layout stays visible.</dd>
        
        <dt className={s.dt}><code>[param]/PAGE.tsx</code></dt>
        <dd className={s.dd}>Dynamic parameter directory. <code>[id]</code> → <code>:id</code> segment in the route.</dd>

        <dt className={s.dt}><code>PAGE.lazy.tsx</code></dt>
        <dd className={s.dd}>Same as PAGE.tsx or but automatically wrapped with <code>React.lazy()</code>. It will be apply to LAYOUT, BOUNDARY, PAGE, ERROR.</dd>
      </dl>

      <h2 className={s.h2}>Minimal setup</h2>
      <pre className={s.pre}>{`// vite.config.ts
import { webRoutes } from 'vite-plugin-web-routes'

export default defineConfig({
  plugins: [
    react(),
    webRoutes({
      moduleFile: 'src/routes.ts',
      dirs: [{ dir: 'src/pages', route: '' }],
    }),
  ],
})`}</pre>

      <h2 className={s.h2}>Using the generated routes</h2>
      <pre className={s.pre}>{`// src/main.tsx
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={createBrowserRouter(routes)} />
)`}</pre>
    </article>
  )
}
