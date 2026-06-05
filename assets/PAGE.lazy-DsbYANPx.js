import{t as e}from"./index-DhJqgo72.js";var t={article:`_article_1h287_1`,date:`_date_1h287_9`,title:`_title_1h287_16`,lead:`_lead_1h287_22`,h2:`_h2_1h287_28`,p:`_p_1h287_36`,pre:`_pre_1h287_41`},n=e();function r(){return(0,n.jsxs)(`article`,{className:t.article,children:[(0,n.jsx)(`time`,{className:t.date,children:`2024-01-15`}),(0,n.jsx)(`h1`,{className:t.title,children:`Route Generation: LAYOUT, PAGE and BOUNDARY`}),(0,n.jsx)(`p`,{className:t.lead,children:`The plugin scans your configured directories and builds a route tree. Here are the rules that determine the generated output.`}),(0,n.jsx)(`h2`,{className:t.h2,children:`LAYOUT creates nesting`}),(0,n.jsxs)(`p`,{className:t.p,children:[`When a directory has a `,(0,n.jsx)(`code`,{children:`LAYOUT.tsx`}),`, all pages inside become`,` `,(0,n.jsx)(`em`,{children:`children`}),` of that route. The layout controls the content area via`,` `,(0,n.jsx)(`code`,{children:`<Outlet />`}),`.`]}),(0,n.jsx)(`pre`,{className:t.pre,children:`blog/
  LAYOUT.tsx    →  { path: "blog", element: <BlogLayout /> }
  BOUNDARY.tsx  →    errorElement: <BlogBoundary />
  PAGE.tsx      →    { index: true, element: <BlogIndex /> }
  intro/
    PAGE.tsx    →    { path: "intro", element: <BlogIntro /> }`}),(0,n.jsx)(`h2`,{className:t.h2,children:`Without LAYOUT, routes are flat`}),(0,n.jsxs)(`p`,{className:t.p,children:[`Without `,(0,n.jsx)(`code`,{children:`LAYOUT.tsx`}),`, pages are generated as sibling routes with concatenated paths. This avoids accidental nesting where no `,(0,n.jsx)(`code`,{children:`<Outlet />`}),` exists.`]}),(0,n.jsx)(`pre`,{className:t.pre,children:`products/
  PAGE.tsx        →  { path: "products" }
  detail/
    PAGE.tsx      →  { path: "products/detail" }
              ↑ concatenated path, no nesting`}),(0,n.jsx)(`h2`,{className:t.h2,children:`Dynamic segments`}),(0,n.jsxs)(`p`,{className:t.p,children:[`Directories named `,(0,n.jsx)(`code`,{children:`[param]`}),` generate `,(0,n.jsx)(`code`,{children:`:param`}),` segments.`]}),(0,n.jsx)(`pre`,{className:t.pre,children:`user/[id]/PAGE.tsx  →  { path: "user/:id" }

// In the component:
const { id } = useParams<{ id: string }>()`}),(0,n.jsx)(`h2`,{className:t.h2,children:`Multiple roots`}),(0,n.jsx)(`p`,{className:t.p,children:`Configure several source directories with different URL prefixes.`}),(0,n.jsx)(`pre`,{className:t.pre,children:`webRoutes({
  dirs: [
    { dir: 'src/pages', route: ''      },  // /
    { dir: 'src/admin', route: 'admin' },  // /admin
  ],
})`})]})}export{r as default};