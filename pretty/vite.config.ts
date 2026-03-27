import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// boardy-intro-react is a file: dep that may carry its own react@18; React 19 rejects
// those elements (minified error #525). Force one React for the bundle.
const reactRoot = path.resolve(__dirname, 'node_modules/react')
const reactDomRoot = path.resolve(__dirname, 'node_modules/react-dom')

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: reactRoot,
      'react/jsx-runtime': path.join(reactRoot, 'jsx-runtime.js'),
      'react/jsx-dev-runtime': path.join(reactRoot, 'jsx-dev-runtime.js'),
      'react-dom': reactDomRoot,
      'react-dom/client': path.join(reactDomRoot, 'client.js'),
    },
  },
})
