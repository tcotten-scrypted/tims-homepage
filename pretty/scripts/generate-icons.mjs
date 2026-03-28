#!/usr/bin/env node
/**
 * Generates favicons, PWA icons, maskable icons, and Open Graph art.
 *
 * Inputs (in public/):
 *   - favicon.svg: C mark (rasterized for .ico, apple-touch, PWA sizes)
 *   - ref_for_socialgraph.png: wide hero reference → og-image.jpg (1200×630 cover crop)
 *
 * Outputs (in public/):
 *   - favicon.ico (16, 32, 48)
 *   - apple-touch-icon.png (180×180, solid background for iOS)
 *   - icons/icon-192.png, icons/icon-512.png (transparent)
 *   - icons/icon-maskable-512.png: C on safe-zone padding
 *   - og-image.jpg
 *
 * Run from repo: npm run icons
 */

import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const iconsDir = path.join(publicDir, 'icons')

const FAVICON_SVG = path.join(publicDir, 'favicon.svg')
const OG_SRC = path.join(publicDir, 'ref_for_socialgraph.png')

const MASKABLE_BG = '#faf9fc'

/** Raster C mark to square PNG (transparent around stroke). */
async function rasterCMark(size) {
  return sharp(FAVICON_SVG).resize(size, size).png().toBuffer()
}

/** C mark composited on solid background (better for apple-touch-icon). */
async function rasterCMarkOnBackground(size, background = MASKABLE_BG) {
  const fg = await rasterCMark(size)
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: fg, left: 0, top: 0 }])
    .png()
    .toBuffer()
}

async function writeMaskable512() {
  const canvas = 512
  const inner = Math.round(canvas * 0.62)
  const top = Math.floor((canvas - inner) / 2)
  const left = top
  const mark = await sharp(FAVICON_SVG).resize(inner, inner).png().toBuffer()

  await sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: MASKABLE_BG,
    },
  })
    .composite([{ input: mark, left, top }])
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-512.png'))
}

async function main() {
  if (!existsSync(FAVICON_SVG)) {
    console.error('Missing', FAVICON_SVG)
    process.exit(1)
  }
  mkdirSync(iconsDir, { recursive: true })

  const png16 = await rasterCMark(16)
  const png32 = await rasterCMark(32)
  const png48 = await rasterCMark(48)
  const ico = await pngToIco([png16, png32, png48])
  writeFileSync(path.join(publicDir, 'favicon.ico'), ico)

  const touch180 = await rasterCMarkOnBackground(180)
  await sharp(touch180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))

  const png192 = await rasterCMark(192)
  await sharp(png192).png().toFile(path.join(iconsDir, 'icon-192.png'))

  const png512 = await rasterCMark(512)
  await sharp(png512).png().toFile(path.join(iconsDir, 'icon-512.png'))

  await writeMaskable512()

  if (existsSync(OG_SRC)) {
    await sharp(OG_SRC)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(publicDir, 'og-image.jpg'))
    console.log('Wrote og-image.jpg from ref_for_socialgraph.png')
  } else {
    console.warn('Skip og-image.jpg: missing', OG_SRC)
  }

  console.log('Wrote favicon.ico, apple-touch-icon.png, icons/* from favicon.svg')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
