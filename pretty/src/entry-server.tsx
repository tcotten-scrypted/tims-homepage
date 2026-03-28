/**
 * Server/prerender entry: same route tree as the client, wrapped in MemoryRouter.
 * Built with `vite build --ssr`; consumed by scripts/prerender.mjs.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

import { AppRoutes } from './appRoutes'

import './index.css'

export function renderRoute(pathname: string): string {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[pathname]} initialIndex={0}>
        <AppRoutes />
      </MemoryRouter>
    </StrictMode>,
  )
}
