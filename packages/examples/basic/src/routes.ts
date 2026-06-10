import { lazy, createElement } from "react";

import _pages_LAYOUT from "./pages/LAYOUT.tsx";
import _pages_BOUNDARY from "./pages/BOUNDARY.tsx";
import _pages_PAGE from "./pages/PAGE.tsx";
import _pages_ERROR from "./pages/ERROR.tsx";
import _pages_about_PAGE from "./pages/about/PAGE.tsx";
import _pages_about_PAGE_2 from "./pages/about/$$/PAGE.jsx";
import _pages_blog_LAYOUT from "./pages/blog/LAYOUT.tsx";
import _pages_blog_BOUNDARY from "./pages/blog/BOUNDARY.tsx";
import _pages_blog_PAGE from "./pages/blog/PAGE.tsx";
import _pages_blog_ERROR from "./pages/blog/ERROR.tsx";
import _pages_blog_error_ERROR from "./pages/blog/error/ERROR.tsx";
import _pages_blog_PAGE_2 from "./pages/blog/[]/PAGE.tsx";
import _pages_contact_PAGE from "./pages/contact/PAGE.tsx";
import _pages_user_PAGE from "./pages/user/PAGE.tsx";
import _pages_user_id_PAGE from "./pages/user/[id]/PAGE.tsx";

const _pages_blog_error_PAGE_lazy = lazy(() => import("./pages/blog/error/PAGE.lazy.tsx"));
const _pages_blog_intro_PAGE_lazy = lazy(() => import("./pages/blog/intro/PAGE.lazy.tsx"));
const _pages_blog_routing_PAGE_lazy = lazy(() => import("./pages/blog/routing/PAGE.lazy.tsx"));

const routes = [
  {
    path: "/",
    element: createElement(_pages_LAYOUT),
    errorElement: createElement(_pages_BOUNDARY),
    children: [
      {
        index: true,
        element: createElement(_pages_PAGE),
        errorElement: createElement(_pages_ERROR),
      },
      {
        path: "about",
        element: createElement(_pages_about_PAGE),
      },
      {
        path: "about/*",
        element: createElement(_pages_about_PAGE_2),
      },
      {
        path: "blog",
        element: createElement(_pages_blog_LAYOUT),
        errorElement: createElement(_pages_blog_BOUNDARY),
        children: [
          {
            index: true,
            element: createElement(_pages_blog_PAGE),
            errorElement: createElement(_pages_blog_ERROR),
          },
          {
            path: "error",
            element: createElement(_pages_blog_error_PAGE_lazy),
            errorElement: createElement(_pages_blog_error_ERROR),
          },
          {
            path: "intro",
            element: createElement(_pages_blog_intro_PAGE_lazy),
          },
          {
            path: "routing",
            element: createElement(_pages_blog_routing_PAGE_lazy),
          },
          {
            path: "*",
            element: createElement(_pages_blog_PAGE_2),
          },
        ],
      },
      {
        path: "contact",
        element: createElement(_pages_contact_PAGE),
      },
      {
        path: "user",
        element: createElement(_pages_user_PAGE),
      },
      {
        path: "user/:id",
        element: createElement(_pages_user_id_PAGE),
      },
    ],
  },
];

export default routes;