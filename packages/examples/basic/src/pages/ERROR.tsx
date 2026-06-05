import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import s from './ERROR.module.css'

export default function RootError() {
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
        Caught by <code>ERROR.tsx</code> — the <code>errorElement</code> of the page route.
        The layout (header, footer) is still visible.
      </p>
      <Link to="/" className={s.btn}>Back to home</Link>
    </div>
  )
}
