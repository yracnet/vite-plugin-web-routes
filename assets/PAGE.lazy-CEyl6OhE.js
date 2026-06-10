import{t as e}from"./index-B_BzY7Mu.js";var t={article:`_article_ye17n_1`,date:`_date_ye17n_9`,title:`_title_ye17n_16`,lead:`_lead_ye17n_22`,h2:`_h2_ye17n_28`,p:`_p_ye17n_36`,dl:`_dl_ye17n_41`,dt:`_dt_ye17n_45`,dd:`_dd_ye17n_51`,pre:`_pre_ye17n_56`},n=e();function r(){return(0,n.jsxs)(`article`,{className:t.article,children:[(0,n.jsx)(`time`,{className:t.date,children:`2024-01-01`}),(0,n.jsx)(`h1`,{className:t.title,children:`Introduction to vite-plugin-web-routes`}),(0,n.jsxs)(`p`,{className:t.lead,children:[(0,n.jsx)(`code`,{children:`vite-plugin-web-routes`}),` turns your project's folder structure into React Router v6 routes. Instead of maintaining a manual route config file, you simply create files with semantic names.`]}),(0,n.jsx)(`h2`,{className:t.h2,children:`File roles`}),(0,n.jsxs)(`dl`,{className:t.dl,children:[(0,n.jsx)(`dt`,{className:t.dt,children:(0,n.jsx)(`code`,{children:`LAYOUT.tsx`})}),(0,n.jsxs)(`dd`,{className:t.dd,children:[`Wrapper with `,(0,n.jsx)(`code`,{children:`<Outlet />`}),`. Creates nested routes.`]}),(0,n.jsx)(`dt`,{className:t.dt,children:(0,n.jsx)(`code`,{children:`BOUNDARY.tsx`})}),(0,n.jsx)(`dd`,{className:t.dd,children:`Layout-level error boundary. Catches errors from any child. The full layout is replaced.`}),(0,n.jsx)(`dt`,{className:t.dt,children:(0,n.jsx)(`code`,{children:`PAGE.tsx`})}),(0,n.jsx)(`dd`,{className:t.dd,children:`The component rendered at that URL.`}),(0,n.jsx)(`dt`,{className:t.dt,children:(0,n.jsx)(`code`,{children:`ERROR.tsx`})}),(0,n.jsx)(`dd`,{className:t.dd,children:`Page-level error boundary. The layout stays visible.`}),(0,n.jsx)(`dt`,{className:t.dt,children:(0,n.jsx)(`code`,{children:`[param]/PAGE.tsx`})}),(0,n.jsxs)(`dd`,{className:t.dd,children:[`Dynamic parameter directory. `,(0,n.jsx)(`code`,{children:`[id]`}),` → `,(0,n.jsx)(`code`,{children:`:id`}),` segment in the route.`]}),(0,n.jsx)(`dt`,{className:t.dt,children:(0,n.jsx)(`code`,{children:`PAGE.lazy.tsx`})}),(0,n.jsxs)(`dd`,{className:t.dd,children:[`Same as PAGE.tsx or but automatically wrapped with `,(0,n.jsx)(`code`,{children:`React.lazy()`}),`. It will be apply to LAYOUT, BOUNDARY, PAGE, ERROR.`]})]}),(0,n.jsx)(`h2`,{className:t.h2,children:`Minimal setup`}),(0,n.jsx)(`pre`,{className:t.pre,children:`// vite.config.ts
import { webRoutes } from 'vite-plugin-web-routes'

export default defineConfig({
  plugins: [
    react(),
    webRoutes({
      moduleFile: 'src/routes.ts',
      dirs: [{ dir: 'src/pages', route: '' }],
    }),
  ],
})`}),(0,n.jsx)(`h2`,{className:t.h2,children:`Using the generated routes`}),(0,n.jsx)(`pre`,{className:t.pre,children:`// src/main.tsx
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={createBrowserRouter(routes)} />
)`})]})}export{r as default};