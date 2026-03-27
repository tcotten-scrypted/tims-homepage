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
 *   DEPLOY_S3_BUCKET   — bucket name (no s3:// prefix)
 * Optional:
 *   DEPLOY_AWS_PROFILE — AWS CLI profile name (default: DEPLOY_AWS_PROFILE or AWS_PROFILE)
 *   AWS_PROFILE        — used if DEPLOY_AWS_PROFILE unset
 *   DEPLOY_S3_PREFIX   — key prefix inside bucket, e.g. "" or "site/" (no leading slash)
 *   DEPLOY_CLOUDFRONT_DISTRIBUTION_ID — if set, create invalidation for /*
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

// Long cache for fingerprinted assets; HTML should revalidate quickly.
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
  '--cache-control',
  'public,max-age=31536000,immutable',
])

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

if (distributionId) {
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
  console.log(
    'Skipping CloudFront (set DEPLOY_CLOUDFRONT_DISTRIBUTION_ID in .env.deploy to enable).',
  )
}

console.log('Done.')
