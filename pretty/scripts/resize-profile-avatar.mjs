#!/usr/bin/env node
/**
 * Build public/profile_avatar.jpg from a PNG master (white matte, no alpha).
 * Master: public/profile_avatar_source.png (high-res square; script resizes to 216×216 for ~72 CSS px @ 3×).
 * Run: npm run resize-profile-avatar
 */

import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const sourcePath = path.join(publicDir, 'profile_avatar_source.png')
const outPath = path.join(publicDir, 'profile_avatar.jpg')
const SIZE = 216

if (!existsSync(sourcePath)) {
  console.error('Missing', sourcePath, '\nAdd a square PNG master named profile_avatar_source.png')
  process.exit(1)
}

const raw = await readFile(sourcePath)
const meta = await sharp(raw).metadata()
await sharp(raw)
  .rotate()
  .flatten({ background: '#ffffff' })
  .resize(SIZE, SIZE, {
    fit: 'cover',
    position: 'centre',
    kernel: sharp.kernel.lanczos3,
  })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outPath)

console.log(
  `Wrote ${outPath} (${meta.width}×${meta.height} → ${SIZE}×${SIZE}, JPEG on white, lanczos3)`,
)
