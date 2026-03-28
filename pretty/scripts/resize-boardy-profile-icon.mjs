#!/usr/bin/env node
/**
 * Build public/boardy_profile_icon.jpg from assets/boardy_profile_icon_source.png
 * (default Boardy CTA background #22c55e so square corners don’t show white on the button).
 * Display size in CSS: 28×28 px → 84×84 @ 3×.
 * Run: npm run resize-boardy-profile-icon
 */

import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const sourcePath = path.join(root, 'assets', 'boardy_profile_icon_source.png')
const outPath = path.join(root, 'public', 'boardy_profile_icon.jpg')
/** Matches BoardyIntroButton default backgroundColor */
const MATT = '#22c55e'
const SIZE = 28 * 3

if (!existsSync(sourcePath)) {
  console.error('Missing', sourcePath)
  process.exit(1)
}

const raw = await readFile(sourcePath)
const meta = await sharp(raw).metadata()
await sharp(raw)
  .rotate()
  .flatten({ background: MATT })
  .resize(SIZE, SIZE, {
    fit: 'cover',
    position: 'centre',
    kernel: sharp.kernel.lanczos3,
  })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outPath)

console.log(
  `Wrote ${outPath} (${meta.width}×${meta.height} → ${SIZE}×${SIZE}, JPEG on ${MATT})`,
)
