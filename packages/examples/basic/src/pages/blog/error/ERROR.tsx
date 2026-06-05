import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import s from './ERROR.module.css'

export default function BlogErrorBoundary() {
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
      <h1 className={s.title}>Page error caught</h1>
      <p className={s.message}>{message}</p>
      <p className={s.hint}>
        Caught by <code>blog/error/ERROR.tsx</code>.
        The Guide sidebar is still visible — only this page's content was replaced.
      </p>
      <Link to="/blog/error" className={s.btn}>Retry</Link>
    </div>
  )
}
