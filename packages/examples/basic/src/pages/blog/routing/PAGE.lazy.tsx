import s from './PAGE.module.css'

export default function BlogRoutingPage() {
  return (
    <article className={s.article}>
      <time className={s.date}>2024-01-15</time>
      <h1 className={s.title}>Route Generation: LAYOUT, PAGE and BOUNDARY</h1>
      <p className={s.lead}>
        The plugin scans your configured directories and builds a route tree.
        Here are the rules that determine the generated output.
      </p>

      <h2 className={s.h2}>LAYOUT creates nesting</h2>
      <p className={s.p}>
        When a directory has a <code>LAYOUT.tsx</code>, all pages inside become{' '}
        <em>children</em> of that route. The layout controls the content area via{' '}
        <code>&lt;Outlet /&gt;</code>.
      </p>
      <pre className={s.pre}>{`blog/
  LAYOUT.tsx    →  { path: "blog", element: <BlogLayout /> }
  BOUNDARY.tsx  →    errorElement: <BlogBoundary />
  PAGE.tsx      →    { index: true, element: <BlogIndex /> }
  intro/
    PAGE.tsx    →    { path: "intro", element: <BlogIntro /> }`}</pre>

      <h2 className={s.h2}>Without LAYOUT, routes are flat</h2>
      <p className={s.p}>
        Without <code>LAYOUT.tsx</code>, pages are generated as sibling routes with
        concatenated paths. This avoids accidental nesting where no <code>&lt;Outlet /&gt;</code> exists.
      </p>
      <pre className={s.pre}>{`products/
  PAGE.tsx        →  { path: "products" }
  detail/
    PAGE.tsx      →  { path: "products/detail" }
              ↑ concatenated path, no nesting`}</pre>

      <h2 className={s.h2}>Dynamic segments</h2>
      <p className={s.p}>
        Directories named <code>[param]</code> generate <code>:param</code> segments.
      </p>
      <pre className={s.pre}>{`user/[id]/PAGE.tsx  →  { path: "user/:id" }

// In the component:
const { id } = useParams<{ id: string }>()`}</pre>

      <h2 className={s.h2}>Multiple roots</h2>
      <p className={s.p}>Configure several source directories with different URL prefixes.</p>
      <pre className={s.pre}>{`webRoutes({
  dirs: [
    { dir: 'src/pages', route: ''      },  // /
    { dir: 'src/admin', route: 'admin' },  // /admin
  ],
})`}</pre>
    </article>
  )
}
