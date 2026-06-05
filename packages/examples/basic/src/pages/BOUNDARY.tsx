import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import s from './BOUNDARY.module.css'

export default function RootBoundary() {
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
      <h1 className={s.title}>Layout error caught</h1>
      <p className={s.message}>{message}</p>
      <p className={s.hint}>
        Caught by <code>BOUNDARY.tsx</code> — the <code>errorElement</code> of the root layout route.
        The entire layout (header, footer) was replaced.
      </p>
      <Link to="/" className={s.btn}>Back to home</Link>
    </div>
  )
}
