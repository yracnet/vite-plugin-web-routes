# vite-plugin-web-routes

Plugin de Vite que genera rutas para **React Router v6+** a partir del filesystem.

El archivo de rutas se escribe en disco en cada inicio y ante cada cambio — sin scanning en runtime.

---

## Instalación

```ts
// vite.config.ts
import { webRoutes } from 'vite-plugin-web-routes'

export default defineConfig({
  plugins: [
    webRoutes({
      moduleFile: 'src/routes.ts',
      dirs: [{ dir: 'src/pages', route: '' }],
    }),
  ],
})
```

```tsx
// main.tsx
import routes from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={createBrowserRouter(routes)} />
)
```

---

## Opciones

```ts
webRoutes({
  root?:       string          // cwd por defecto
  moduleFile?: string          // ruta del archivo generado — default ".web/routes.jsx"
  routeBase?:  string          // prefijo global de rutas
  dirs:        DirOpt[]        // directorios de páginas (requerido)
  allLazy?:    boolean         // todas las páginas lazy — default false
  exclude?:    string[]        // directorios a ignorar — default ["node_modules", ".git"]
  include?:    string[]        // patrones adicionales de inclusión
  roleMapping?: RoleMapping    // mapa de nombres de archivo → rol (ver más abajo)
})
```

### DirOpt

```ts
{
  dir:    string   // ruta relativa al root
  route:  string   // prefijo de ruta — "" para raíz "/"
  skip?:  boolean  // excluye el directorio completamente
  lazy?:  boolean  // todas las páginas de este dir son lazy
}
```

---

## Archivos especiales

| Archivo | Rol | Descripción |
|---|---|---|
| `PAGE.tsx` | PAGE | Componente de la página |
| `PAGE.lazy.tsx` | PAGE (lazy) | Igual, cargado con `React.lazy()` |
| `LAYOUT.tsx` | LAYOUT | Wrapper con `<Outlet />` — crea anidamiento |
| `LAYOUT.lazy.tsx` | LAYOUT (lazy) | Igual, cargado con `React.lazy()` |
| `ERROR.tsx` | ERROR | `errorElement` del route de la página |
| `ERROR.lazy.tsx` | ERROR (lazy) | Igual, cargado con `React.lazy()` |
| `BOUNDARY.tsx` | BOUNDARY | `errorElement` del route del layout |
| `BOUNDARY.lazy.tsx` | BOUNDARY (lazy) | Igual, cargado con `React.lazy()` |

### ERROR vs BOUNDARY

```
src/pages/
  LAYOUT.tsx      ← layout raíz
  BOUNDARY.tsx    ← errorElement del layout (captura errores de cualquier hijo)
  PAGE.tsx        ← página raíz
  ERROR.tsx       ← errorElement de la página (solo captura errores de PAGE)
```

- **BOUNDARY** reemplaza el layout completo (cabecera, sidebar desaparecen).
- **ERROR** reemplaza solo el contenido de la página; el layout sigue visible.

---

## Parámetros de URL

Los directorios con `[param]` generan segmentos dinámicos `:param`:

```
src/pages/user/[id]/PAGE.tsx     →  /user/:id
src/pages/[category]/[slug]/PAGE.tsx  →  /:category/:slug
```

```tsx
// user/[id]/PAGE.tsx
import { useParams } from 'react-router-dom'

export default function UserPage() {
  const { id } = useParams<{ id: string }>()
  return <p>Usuario: {id}</p>
}
```

---

## Reglas de routing

### Con LAYOUT → rutas anidadas

```
src/pages/
  LAYOUT.tsx      →  { path: "/", element: <Layout> }
  PAGE.tsx        →  { index: true, element: <Page> }
  about/PAGE.tsx  →  { path: "about", element: <About> }
```

```
/           → Layout > Page (index)
/about      → Layout > About
```

### Sin LAYOUT → rutas planas

```
src/pages/
  PAGE.tsx        →  { path: "/", element: <Page> }
  about/PAGE.tsx  →  { path: "about", element: <About> }
```

### Multi-root

```ts
dirs: [
  { dir: 'src/pages', route: '' },    // /
  { dir: 'src/admin', route: 'admin' }, // /admin/*
]
```

Cada directorio es un módulo de rutas aislado. Todos se combinan en el array final.

---

## Lazy loading

Hay tres formas de marcar páginas como lazy:

```ts
// 1. Toda la aplicación
webRoutes({ allLazy: true, dirs: [...] })

// 2. Por directorio
dirs: [{ dir: 'src/pages', route: '', lazy: true }]

// 3. Por archivo — sufijo .lazy en el nombre
// src/pages/blog/intro/PAGE.lazy.tsx
```

Los tres niveles se combinan: `allLazy || dir.lazy || file.lazy`.

---

## roleMapping

Permite extender o redefinir qué nombres de archivo se reconocen como roles:

```ts
webRoutes({
  dirs: [{ dir: 'src/pages', route: '' }],
  roleMapping: {
    // alias: INDEX.tsx → mismo rol que PAGE
    'INDEX': { role: 'PAGE', lazy: false },
    // alias: CATCH.tsx → mismo rol que BOUNDARY
    'CATCH':  { role: 'BOUNDARY', lazy: false },
  },
})
```

El mapping del usuario se fusiona con el mapping por defecto. Los roles disponibles son: `PAGE`, `LAYOUT`, `ERROR`, `BOUNDARY`.

---

## Output

El archivo generado es TypeScript/JavaScript estático:

```ts
// src/routes.ts — generado automáticamente
import { lazy, createElement } from "react"
import type { RouteObject } from "react-router-dom"

import _pages_LAYOUT from "./pages/LAYOUT.tsx"
import _pages_PAGE from "./pages/PAGE.tsx"
const _pages_blog_PAGE = lazy(() => import("./pages/blog/PAGE.lazy.tsx"))

const routes: RouteObject[] = [
  {
    path: "/",
    element: createElement(_pages_LAYOUT),
    errorElement: createElement(_pages_BOUNDARY),
    children: [
      { index: true, element: createElement(_pages_PAGE) },
      { path: "blog", element: createElement(_pages_blog_PAGE) },
    ],
  },
]

export default routes
```

---

## Principios

- El filesystem es la fuente de verdad.
- Sin runtime — las rutas se compilan al iniciar Vite.
- Output determinista en disco, commitable al repositorio.
- Multi-root: cada `dir` es un módulo de rutas aislado.

> Routes are compiled, not declared.
