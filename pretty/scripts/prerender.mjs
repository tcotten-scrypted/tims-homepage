#!/usr/bin/env node
/**
 * Injects SSR HTML for selected routes into dist/index.html so crawlers see real content.
 * Run after: vite build && vite build --ssr src/entry-server.tsx --outDir dist/server
 */

import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prettyRoot = path.resolve(__dirname, '..')
const distDir = path.join(prettyRoot, 'dist')
const serverEntry = path.join(distDir, 'server', 'entry-server.js')
const indexPath = path.join(distDir, 'index.html')

const ROOT_MARKER = '<div id="root"></div>'

if (!existsSync(serverEntry)) {
  console.error('Missing SSR bundle:', serverEntry, '\nRun vite build --ssr src/entry-server.tsx --outDir dist/server')
  process.exit(1)
}

if (!existsSync(indexPath)) {
  console.error('Missing', indexPath, '\nRun vite build first.')
  process.exit(1)
}

const { renderRoute } = await import(pathToFileURL(serverEntry).href)
const template = readFileSync(indexPath, 'utf8')
const idx = template.indexOf(ROOT_MARKER)
if (idx === -1) {
  console.error('Could not find', ROOT_MARKER, 'in dist/index.html')
  process.exit(1)
}

const routes = ['/']
let count = 0
for (const pathname of routes) {
  const html = renderRoute(pathname)
  if (pathname === '/') {
    const out =
      template.slice(0, idx) + `<div id="root">${html}</div>` + template.slice(idx + ROOT_MARKER.length)
    writeFileSync(indexPath, out)
    count++
  }
}

const serverDir = path.join(distDir, 'server')
if (existsSync(serverDir)) {
  rmSync(serverDir, { recursive: true, force: true })
}

console.log(`Prerendered ${count} route(s) into dist/index.html (removed dist/server for static deploy)`)
