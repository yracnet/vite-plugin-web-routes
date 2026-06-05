import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { webRoutes } from 'vite-plugin-web-routes'
import { webRoutes } from '../../plugin/src'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webRoutes({
      moduleFile: 'src/routes.ts',
      dirs: [
        { dir: 'src/pages', route: '' },
      ],
      exclude: ['node_modules', '.git'],
    }),
  ],
})
