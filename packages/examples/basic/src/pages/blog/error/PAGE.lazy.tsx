import { useState } from 'react'
import s from './PAGE.module.css'

export default function BlogErrorPage() {
  const [crash, setCrash] = useState(false)
  if (crash) throw new Error('Intentional error thrown from the article')

  return (
    <article className={s.article}>
      <time className={s.date}>2024-02-01</time>
      <h1 className={s.title}>Error Boundaries: BOUNDARY vs ERROR</h1>
      <p className={s.lead}>
        React Router v6 lets you define an <code>errorElement</code> per route.
        This plugin exposes two semantic files to control it: <code>BOUNDARY.tsx</code> and <code>ERROR.tsx</code>.
      </p>

      <h2 className={s.h2}>BOUNDARY — layout error</h2>
      <p className={s.p}>
        Becomes the <code>errorElement</code> of the route that contains <code>LAYOUT.tsx</code>.
        When triggered, it replaces the entire layout — header, sidebar, and any visual
        structure at that level disappear.
      </p>
      <pre className={s.pre}>{`blog/
  LAYOUT.tsx    →  element: <BlogLayout />
  BOUNDARY.tsx  →  errorElement: <BlogBoundary />  ← this level`}</pre>

      <h2 className={s.h2}>ERROR — page error</h2>
      <p className={s.p}>
        Becomes the <code>errorElement</code> of the page route (index or with a path).
        Only the page content is replaced; the layout keeps rendering.
      </p>
      <pre className={s.pre}>{`blog/error/
  PAGE.lazy.tsx →  element: <BlogErrorPage />
  ERROR.tsx     →  errorElement: <BlogErrorBoundary />  ← this page only`}</pre>

      <h2 className={s.h2}>Interactive demo</h2>
      <p className={s.p}>
        The button below throws an error in this page.
        The Guide sidebar <strong>stays visible</strong> — caught by <code>blog/error/ERROR.tsx</code>.
      </p>
      <button onClick={() => setCrash(true)} className={s.throwBtn}>
        Throw page error → ERROR
      </button>
    </article>
  )
}
