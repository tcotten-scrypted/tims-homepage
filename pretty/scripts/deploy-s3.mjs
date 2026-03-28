#!/usr/bin/env node
/**
 * Sync ./dist to S3 and optionally invalidate CloudFront.
 * Uses a dedicated AWS CLI profile so your default ~/.aws/credentials user is untouched.
 *
 * Config (first match wins):
 *   - Environment variables already set in the shell
 *   - File .env.deploy in this directory (KEY=value lines, # comments)
 *
 * Required:
 *   DEPLOY_S3_BUCKET: bucket name (no s3:// prefix)
 * Optional:
 *   DEPLOY_AWS_PROFILE: AWS CLI profile name (default: DEPLOY_AWS_PROFILE or AWS_PROFILE)
 *   AWS_PROFILE: used if DEPLOY_AWS_PROFILE unset
 *   DEPLOY_S3_PREFIX: key prefix inside bucket, e.g. "" or "site/" (no leading slash)
 *   DEPLOY_CLOUDFRONT_DISTRIBUTION_ID: required: create invalidation for /* after upload
 *   DEPLOY_SKIP_CLOUDFRONT=1: skip CloudFront (S3-only / no distribution)
 */

import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prettyRoot = path.resolve(__dirname, '..')

function loadDotEnv(filePath) {
  if (!existsSync(filePath)) return
  const text = readFileSync(filePath, 'utf8')
  for (const line of text.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    let val = t.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

loadDotEnv(path.join(prettyRoot, '.env.deploy'))

const bucket = process.env.DEPLOY_S3_BUCKET?.trim()
const prefix = (process.env.DEPLOY_S3_PREFIX ?? '')
  .trim()
  .replace(/^\/+/, '')
  .replace(/([^/])$/, '$1/')
const profile =
  process.env.DEPLOY_AWS_PROFILE?.trim() ||
  process.env.AWS_PROFILE?.trim() ||
  ''
const distributionId = process.env.DEPLOY_CLOUDFRONT_DISTRIBUTION_ID?.trim()
const skipCloudFront = process.env.DEPLOY_SKIP_CLOUDFRONT?.trim() === '1'

if (!bucket) {
  console.error(
    'Missing DEPLOY_S3_BUCKET. Copy deploy.env.example to .env.deploy and fill in values.',
  )
  process.exit(1)
}

if (!profile) {
  console.error(
    'Set DEPLOY_AWS_PROFILE (or AWS_PROFILE) to an AWS CLI profile for this site, e.g.\n' +
      '  DEPLOY_AWS_PROFILE=tim-site npm run deploy\n' +
      'Configure that profile with: aws configure --profile tim-site',
  )
  process.exit(1)
}

if (!distributionId && !skipCloudFront) {
  console.error(
    'Missing DEPLOY_CLOUDFRONT_DISTRIBUTION_ID. Deploy runs CloudFront invalidation for /* after upload.\n' +
      'Set it in .env.deploy, or set DEPLOY_SKIP_CLOUDFRONT=1 for S3-only (no invalidation).',
  )
  process.exit(1)
}

const s3Base = `s3://${bucket}/${prefix}`.replace(/\/+$/, '/')

function aws(args) {
  const r = spawnSync('aws', args, {
    stdio: 'inherit',
    env: { ...process.env, AWS_PROFILE: profile },
    shell: false,
  })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

const distDir = path.join(prettyRoot, 'dist')
if (!existsSync(distDir)) {
  console.error('No dist/ folder. Run npm run build first.')
  process.exit(1)
}

console.log(`Deploying to ${s3Base} (profile: ${profile})`)

const longCache =
  'public,max-age=31536000,immutable'
const shortCache =
  'public,max-age=86400,must-revalidate'

// Long cache for fingerprinted assets only. Favicons / manifest / PWA icons must not be
// immutable (same URL forever) or browsers and CDNs keep the wrong icon for months.
aws([
  's3',
  'sync',
  distDir,
  s3Base,
  '--delete',
  '--profile',
  profile,
  '--exclude',
  'index.html',
  '--exclude',
  'favicon.ico',
  '--exclude',
  'favicon.svg',
  '--exclude',
  'apple-touch-icon.png',
  '--exclude',
  'site.webmanifest',
  '--exclude',
  'icons/*',
  '--cache-control',
  longCache,
])

const shortCacheRootFiles = [
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'site.webmanifest',
]
for (const rel of shortCacheRootFiles) {
  const local = path.join(distDir, rel)
  if (!existsSync(local)) continue
  aws([
    's3',
    'cp',
    local,
    `${s3Base}${rel}`,
    '--profile',
    profile,
    '--cache-control',
    shortCache,
  ])
}

const distIcons = path.join(distDir, 'icons')
if (existsSync(distIcons)) {
  aws([
    's3',
    'sync',
    distIcons,
    `${s3Base}icons/`,
    '--delete',
    '--profile',
    profile,
    '--cache-control',
    shortCache,
  ])
}

aws([
  's3',
  'cp',
  path.join(distDir, 'index.html'),
  `${s3Base}index.html`,
  '--profile',
  profile,
  '--cache-control',
  'public,max-age=0,must-revalidate',
])

if (distributionId && !skipCloudFront) {
  console.log(`Invalidating CloudFront distribution ${distributionId} (/*)`)
  aws([
    'cloudfront',
    'create-invalidation',
    '--distribution-id',
    distributionId,
    '--paths',
    '/*',
    '--profile',
    profile,
  ])
} else {
  console.log('Skipping CloudFront invalidation (DEPLOY_SKIP_CLOUDFRONT=1 or no distribution ID).')
}

console.log('Done.')
