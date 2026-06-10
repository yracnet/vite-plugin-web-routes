import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
//@ts-ignore
import routes from '@web/routes.jsx'

const router = createHashRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div style={{ padding: '2rem', fontFamily: 'system-ui' }}>Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
