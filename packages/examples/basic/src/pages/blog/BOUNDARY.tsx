import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import s from './BOUNDARY.module.css'

export default function BlogBoundary() {
  const error = useRouteError()
  const message = error instanceof Error
    ? error.message
    : isRouteErrorResponse(error)
      ? `${error.status} — ${error.statusText}`
      : 'Unknown error'

  return (
    <div className={s.wrapper}>
      <div className={s.badge}>BOUNDARY</div>
      <div className={s.icon}>🚧</div>
      <h1 className={s.title}>Guide layout error caught</h1>
      <p className={s.message}>{message}</p>
      <p className={s.hint}>
        Caught by <code>blog/BOUNDARY.tsx</code>.
        The Guide sidebar was replaced — this is the layout-level error boundary.
      </p>
      <Link to="/blog" className={s.btn}>Back to Guide</Link>
    </div>
  )
}
