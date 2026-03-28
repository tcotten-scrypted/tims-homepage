#!/usr/bin/env node
/**
 * Injects SSR HTML for selected routes into dist HTML files so crawlers see real content.
 * Run after: vite build && vite build --ssr src/entry-server.tsx --outDir dist/server
 */

import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from 'node:fs'
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

function buildPage(innerHtml) {
  return template.slice(0, idx) + `<div id="root">${innerHtml}</div>` + template.slice(idx + ROOT_MARKER.length)
}

const routes = [
  { pathname: '/', outFile: indexPath },
  { pathname: '/latest', outFile: path.join(distDir, 'latest', 'index.html') },
]

let count = 0
for (const { pathname, outFile } of routes) {
  const inner = renderRoute(pathname)
  const out = buildPage(inner)
  if (pathname !== '/') {
    mkdirSync(path.dirname(outFile), { recursive: true })
  }
  writeFileSync(outFile, out)
  count++
}

const serverDir = path.join(distDir, 'server')
if (existsSync(serverDir)) {
  rmSync(serverDir, { recursive: true, force: true })
}

console.log(`Prerendered ${count} route(s) (removed dist/server for static deploy)`)
