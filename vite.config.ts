// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/docs': {
        target: 'https://jjmbeba-your-bible-48.mintlify.dev',
        changeOrigin: true,
      },
    },
  },
  plugins: [tsConfigPaths(), tanstackStart({
    target: 'vercel'
  })],
  ssr: {
    noExternal: ['@clerk/tanstack-react-start']
  }
})