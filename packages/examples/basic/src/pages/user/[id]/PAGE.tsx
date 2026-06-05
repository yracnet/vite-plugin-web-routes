import { useParams, Link } from 'react-router-dom'
import s from './PAGE.module.css'

const USERS: Record<string, { name: string; role: string; bio: string }> = {
  '1': { name: 'Alice Chen',  role: 'Core maintainer', bio: 'Maintains the plugin and reviews PRs.' },
  '2': { name: 'Bob Rivera',  role: 'Plugin author',   bio: 'Built the initial filesystem scanner and code generator.' },
  '3': { name: 'Carol Oduya', role: 'Contributor',     bio: 'Added lazy-loading support and the BOUNDARY role.' },
}

export default function UserPage() {
  const { id } = useParams<{ id: string }>()
  const user = id ? USERS[id] : undefined

  if (!user) {
    return (
      <div className={s.notFound}>
        <div className={s.notFoundIcon}>🔍</div>
        <h1 className={s.notFoundTitle}>User not found</h1>
        <p className={s.notFoundSub}>No user with id <code>{id}</code>.</p>
        <Link to="/user" className={s.btn}>View all users</Link>
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <div className={s.avatar}>{user.name[0]}</div>
        <div>
          <p className={s.paramBadge}>params.id = <code>{id}</code></p>
          <h1 className={s.name}>{user.name}</h1>
          <p className={s.role}>{user.role}</p>
          <p className={s.bio}>{user.bio}</p>
        </div>
      </div>

      <div className={s.nav}>
        <p className={s.navLabel}>Other users</p>
        <div className={s.navLinks}>
          {Object.entries(USERS).map(([uid, u]) => (
            <Link
              key={uid}
              to={`/user/${uid}`}
              className={[s.navLink, uid === id ? s.navLinkActive : ''].join(' ')}
            >
              {u.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
