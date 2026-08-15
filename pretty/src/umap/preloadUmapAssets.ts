export type UmapManifest = {
  data_file?: string
  search_file?: string
  displays_file?: string
  n_points?: number
}

export const UMAP_VIEWER_PATH = '/research/tokens/llama-8b-token-3d-viewer/' as const

const UMAP_BASE = UMAP_VIEWER_PATH.replace(/\/$/, '')

function contentLength(resp: Response): number {
  const raw = resp.headers.get('content-length')
  if (!raw) return 0
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) ? n : 0
}

async function readResponseWithProgress(
  resp: Response,
  onChunk: (loadedDelta: number) => void,
): Promise<void> {
  if (!resp.body) {
    onChunk(contentLength(resp))
    return
  }
  const reader = resp.body.getReader()
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    onChunk(value.byteLength)
  }
}

/**
 * Warm the HTTP cache for UMAP assets before mounting the iframe.
 * Progress is weighted by Content-Length when available.
 */
export async function preloadUmapAssets(onProgress: (ratio: number) => void): Promise<void> {
  const manifestResp = await fetch(`${UMAP_BASE}/manifest.json`, { cache: 'force-cache' })
  if (!manifestResp.ok) {
    throw new Error(`manifest.json: ${manifestResp.status}`)
  }

  const manifest = (await manifestResp.json()) as UmapManifest
  const searchPath = manifest.search_file ?? 'search.idx'
  const displaysPath = manifest.displays_file ?? 'displays.bin'
  const dataPath = manifest.data_file ?? 'data.bin'

  const [searchResp, displaysResp, dataResp] = await Promise.all([
    fetch(`${UMAP_BASE}/${searchPath}`, { cache: 'force-cache' }),
    fetch(`${UMAP_BASE}/${displaysPath}`, { cache: 'force-cache' }),
    fetch(`${UMAP_BASE}/${dataPath}`, { cache: 'force-cache' }),
  ])

  if (!searchResp.ok) {
    throw new Error(`${searchPath}: ${searchResp.status}`)
  }
  if (!displaysResp.ok) {
    throw new Error(`${displaysPath}: ${displaysResp.status}`)
  }
  if (!dataResp.ok) {
    throw new Error(`${dataPath}: ${dataResp.status}`)
  }

  const totalBytes =
    contentLength(manifestResp) +
      contentLength(searchResp) +
      contentLength(displaysResp) +
      contentLength(dataResp) || 1
  let loadedBytes = 0

  const bump = (delta: number) => {
    loadedBytes += delta
    onProgress(Math.min(loadedBytes / totalBytes, 0.98))
  }

  bump(contentLength(manifestResp))
  await readResponseWithProgress(searchResp, bump)
  await readResponseWithProgress(displaysResp, bump)
  await readResponseWithProgress(dataResp, bump)

  onProgress(1)
}

export const UMAP_APP_SRC = `${UMAP_BASE}/app/` as const
export const UMAP_EMBED_SRC = `${UMAP_APP_SRC}?embed=1`
