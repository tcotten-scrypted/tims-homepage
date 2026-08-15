#!/usr/bin/env node
/**
 * Injects SSR HTML for selected routes into dist HTML files so crawlers see real content.
 * Run after: vite build && vite build --ssr src/entry-server.tsx --outDir dist/server
 *
 * Home (/) uses Vite-injected meta from siteMeta. Subpages patch title + canonical + og/twitter URL/title.
 * Keep LATEST_UPDATES_HTML_TITLE / UPDATES_HTML_TITLE in sync with src/seo/siteMeta.ts.
 */

import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prettyRoot = path.resolve(__dirname, '..')
const distDir = path.join(prettyRoot, 'dist')
const serverEntry = path.join(distDir, 'server', 'entry-server.js')
const indexPath = path.join(distDir, 'index.html')

const SITE_ORIGIN = 'https://cotten.io'
/** Sync: siteMeta.latestUpdatesHtmlTitle */
const LATEST_UPDATES_HTML_TITLE = 'Latest updates | Tim Cotten | Builds Autonomous AI Agents'
/** Distinct tab title for /updates (same page component as /latest) */
const UPDATES_HTML_TITLE = 'Updates | Tim Cotten | Builds Autonomous AI Agents'
const UMAP_VIEWER_HTML_TITLE =
  'Token Relationships in 3D (Llama-3-8B) | Tim Cotten | Builds Autonomous AI Agents'

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

/** Home + /latest + /updates use home-shell CSS; SSR HTML must set this so Critters inlines body.home-shell rules (e.g. contained splash). Client useEffect also adds it. */
function applyHomeShellBody(html) {
  return html.replace('<body>', '<body class="home-shell">')
}

/**
 * @param {string} html
 * @param {{ title: string; canonical: string; ogUrl: string; ogTitle: string }} m
 */
function applySubpageMeta(html, m) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${m.title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${m.canonical}" />`)
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${m.ogUrl}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${m.ogTitle}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${m.ogTitle}" />`,
    )
}

const routes = [
  { pathname: '/', outFile: indexPath, meta: null, homeShell: true },
  {
    pathname: '/latest',
    outFile: path.join(distDir, 'latest', 'index.html'),
    meta: {
      title: LATEST_UPDATES_HTML_TITLE,
      canonical: `${SITE_ORIGIN}/latest/`,
      ogUrl: `${SITE_ORIGIN}/latest/`,
      ogTitle: LATEST_UPDATES_HTML_TITLE,
    },
    homeShell: true,
  },
  {
    pathname: '/updates',
    outFile: path.join(distDir, 'updates', 'index.html'),
    meta: {
      title: UPDATES_HTML_TITLE,
      canonical: `${SITE_ORIGIN}/updates/`,
      ogUrl: `${SITE_ORIGIN}/updates/`,
      ogTitle: UPDATES_HTML_TITLE,
    },
    homeShell: true,
  },
  {
    pathname: '/research/tokens/llama-8b-token-3d-viewer/',
    outFile: path.join(
      distDir,
      'research',
      'tokens',
      'llama-8b-token-3d-viewer',
      'index.html',
    ),
    meta: {
      title: UMAP_VIEWER_HTML_TITLE,
      canonical: `${SITE_ORIGIN}/research/tokens/llama-8b-token-3d-viewer/`,
      ogUrl: `${SITE_ORIGIN}/research/tokens/llama-8b-token-3d-viewer/`,
      ogTitle: UMAP_VIEWER_HTML_TITLE,
    },
    homeShell: false,
  },
]

let count = 0
for (const { pathname, outFile, meta, homeShell = false } of routes) {
  const inner = renderRoute(pathname)
  let out = buildPage(inner)
  if (meta) {
    out = applySubpageMeta(out, meta)
  }
  if (homeShell) {
    out = applyHomeShellBody(out)
  }
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
