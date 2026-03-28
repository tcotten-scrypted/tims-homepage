#!/usr/bin/env node
/**
 * Generates favicons, PWA icons, maskable icons, and Open Graph art from source assets.
 *
 * Inputs (in public/):
 *   - profile_avatar.png: square avatar (masked to a circle; optional accent ring)
 *   - ref_for_socialgraph.png: wide hero reference → og-image.jpg (1200×630 cover crop)
 *
 * Outputs (in public/):
 *   - favicon.ico (16, 32, 48): ring variant for small-size clarity
 *   - apple-touch-icon.png (180×180)
 *   - icons/icon-192.png, icons/icon-512.png
 *   - icons/icon-maskable-512.png: safe-zone padding on solid background
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

const AVATAR = path.join(publicDir, 'profile_avatar.png')
const OG_SRC = path.join(publicDir, 'ref_for_socialgraph.png')

/** Matches home-shell accent family */
const RING_HEX = '#6b4ce8'
const MASKABLE_BG = '#faf9fc'

function circleMaskSvg(size) {
  const r = size / 2
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${r}" cy="${r}" r="${r}" fill="#ffffff"/>
    </svg>`,
  )
}

function ringOverlaySvg(size, strokePx) {
  const c = size / 2
  const radius = c - strokePx / 2
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${c}" cy="${c}" r="${radius}" fill="none" stroke="${RING_HEX}" stroke-width="${strokePx}"/>
    </svg>`,
  )
}

function strokeForSize(size) {
  return Math.max(2, Math.round(size * 0.034))
}

/**
 * @param {boolean} withRing
 */
async function renderAvatarPng(size, withRing) {
  const stroke = strokeForSize(size)
  let pipeline = sharp(AVATAR)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .composite([{ input: circleMaskSvg(size), blend: 'dest-in' }])

  if (withRing) {
    pipeline = sharp(await pipeline.png().toBuffer()).composite([
      { input: ringOverlaySvg(size, stroke), blend: 'over' },
    ])
  }

  return pipeline.png().toBuffer()
}

async function writeMaskable512() {
  const canvas = 512
  const inner = Math.round(canvas * 0.62)
  const top = Math.floor((canvas - inner) / 2)
  const left = top
  const face = await renderAvatarPng(inner, true)

  await sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: MASKABLE_BG,
    },
  })
    .composite([{ input: face, left, top }])
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-512.png'))
}

async function main() {
  if (!existsSync(AVATAR)) {
    console.error('Missing', AVATAR)
    process.exit(1)
  }
  mkdirSync(iconsDir, { recursive: true })

  const ring16 = await renderAvatarPng(16, true)
  const ring32 = await renderAvatarPng(32, true)
  const ring48 = await renderAvatarPng(48, true)
  const ico = await pngToIco([ring16, ring32, ring48])
  writeFileSync(path.join(publicDir, 'favicon.ico'), ico)

  const ring180 = await renderAvatarPng(180, true)
  await sharp(ring180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))

  const ring192 = await renderAvatarPng(192, true)
  await sharp(ring192).png().toFile(path.join(iconsDir, 'icon-192.png'))

  const ring512 = await renderAvatarPng(512, true)
  await sharp(ring512).png().toFile(path.join(iconsDir, 'icon-512.png'))

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

  console.log('Wrote favicon.ico, apple-touch-icon.png, icons/*')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
