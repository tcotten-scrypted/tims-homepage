#!/usr/bin/env node
/**
 * After prerender: inline critical (above-the-fold) CSS and async-load the rest via Critters.
 * Expects dist/index.html, dist/latest/index.html, dist/updates/index.html with stylesheet links.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Critters from 'critters'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const htmlFiles = [
  path.join(distDir, 'index.html'),
  path.join(distDir, 'latest', 'index.html'),
  path.join(distDir, 'updates', 'index.html'),
]

const critters = new Critters({
  path: distDir,
  publicPath: '/',
  // 'swap' in critters 0.0.23 never sets rel=preload (bug); print media is non-blocking.
  preload: 'media',
  pruneSource: true,
  fonts: false,
  logLevel: 'warn',
  // Critters matches selectors from [data-critters-container] only, so `body.home-shell …` never matches.
  // Home needs body vars + contained splash on first paint (widescreen).
  allowRules: [
    /^body\.home-shell$/,
    /^body\.home-shell \.splash-banner$/,
    /^body\.home-shell \.splash-banner--umap$/,
    /^body\.home-shell \.home-umap-caption$/,
    /^\.home-umap-hero$/,
    /^body\.home-shell \.home-nav/,
    /^\.splash-banner__placeholder/,
    /^\.splash-banner__ambient/,
    /^\.splash-banner__load-/,
    // Feed uses react-tweet under body.home-shell; Critters root is [data-critters-container].
    /^body\.home-shell \.home-feed-tile__post \.react-tweet-theme$/,
    // Subpages: [data-critters-container] sits *inside* <main>/<section>, so layout + shell type
    // for ancestors is never "seen" by Critters unless we force these selectors.
    /^\.home-main$/,
    /^\.home-main--subpage$/,
    /^\.home-section$/,
    /^\.home-section--muted$/,
    /^\.home-main__prose$/,
    /^\.home-main__prose--wide$/,
    /^body\.home-shell \.home-section__kicker$/,
    /^body\.home-shell \.home-main h1$/,
    /^body\.home-shell \.home-main h2$/,
    /^body\.home-shell \.home-main h3$/,
    /^body\.home-shell \.home-nav/,
    /^body\.home-shell p$/,
    /^body\.home-shell li$/,
  ],
})

for (const file of htmlFiles) {
  if (!existsSync(file)) {
    console.warn('inline-critical-css: skip missing', path.relative(distDir, file))
    continue
  }
  const html = readFileSync(file, 'utf8')
  if (!html.includes('stylesheet')) {
    console.warn('inline-critical-css: no stylesheet in', path.relative(distDir, file))
    continue
  }
  let out = await critters.process(html)
  // Critters clones the async stylesheet link into <noscript> including media=print + onload (broken without JS).
  out = out.replace(
    /<noscript><link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)" media="print" onload="this\.media='all'"><\/noscript>/g,
    '<noscript><link rel="stylesheet" crossorigin href="$1"></noscript>',
  )
  writeFileSync(file, out)
}

console.log('Critical CSS inlined (Critters) for prerendered HTML')
