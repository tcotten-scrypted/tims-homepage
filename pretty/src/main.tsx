import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const el = document.getElementById('root')!
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (import.meta.env.PROD) {
  hydrateRoot(el, tree)
} else {
  createRoot(el).render(tree)
}
