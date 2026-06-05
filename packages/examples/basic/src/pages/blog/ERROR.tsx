import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import s from './ERROR.module.css'

export default function BlogError() {
  const error = useRouteError()
  const message = error instanceof Error
    ? error.message
    : isRouteErrorResponse(error)
      ? `${error.status} — ${error.statusText}`
      : 'Unknown error'

  return (
    <div className={s.wrapper}>
      <div className={s.badge}>ERROR</div>
      <div className={s.icon}>✕</div>
      <h1 className={s.title}>Guide page error caught</h1>
      <p className={s.message}>{message}</p>
      <p className={s.hint}>
        Caught by <code>blog/ERROR.tsx</code>.
        The Guide sidebar is still visible — this is the page-level error boundary.
      </p>
      <Link to="/blog" className={s.btn}>Back to Guide</Link>
    </div>
  )
}
