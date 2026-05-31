import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['prop-types', 'react-swipeable-list'],
  },
  resolve: {
    mainFields: ['module', 'jsnext:main', 'jsnext', 'main'],
    alias: {
      'react-swipeable-list$': resolve(
        __dirname,
        'node_modules/react-swipeable-list/dist/react-swipeable-list.esm.js',
      ),
    },
  },
})
