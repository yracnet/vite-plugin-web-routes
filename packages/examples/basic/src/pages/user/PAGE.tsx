import { Link } from 'react-router-dom'
import s from './PAGE.module.css'

const USERS = [
  { id: '1', name: 'Alice Chen',  role: 'Core maintainer' },
  { id: '2', name: 'Bob Rivera',  role: 'Plugin author'   },
  { id: '3', name: 'Carol Oduya', role: 'Contributor'     },
]

export default function UserListPage() {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Dynamic Routes</h1>
      <p className={s.sub}>
        Directories named <code>[param]</code> generate <code>:param</code> segments.
        <code>user/[id]/PAGE.tsx</code> maps to <code>/user/:id</code>.
      </p>
      <pre className={s.pre}>{`src/pages/user/[id]/PAGE.tsx  →  { path: "user/:id" }

// Inside the component:
const { id } = useParams<{ id: string }>()`}</pre>
      <div className={s.list}>
        {USERS.map((u) => (
          <Link key={u.id} to={`/user/${u.id}`} className={s.item}>
            <div className={s.avatar}>{u.name[0]}</div>
            <div>
              <p className={s.name}>{u.name}</p>
              <p className={s.role}>{u.role}</p>
            </div>
            <span className={s.path}>/user/{u.id}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
