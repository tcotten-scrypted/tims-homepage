import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'

import {
  preloadUmapAssets,
  UMAP_APP_SRC,
  UMAP_EMBED_SRC,
  UMAP_VIEWER_PATH,
} from '../umap/preloadUmapAssets'

const UmapHeroPlaceholderShader = lazy(() =>
  import('./UmapHeroPlaceholderShader').then((m) => ({
    default: m.UmapHeroPlaceholderShader,
  })),
)

type ViewerPhase = 'idle' | 'loading' | 'mounting' | 'ready' | 'error'

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: string
}

export type UmapViewerVariant = 'hero' | 'fullscreen'

const UMAP_KEY_CODES = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyQ',
  'KeyE',
  'Space',
  'ShiftLeft',
  'ShiftRight',
  'KeyH',
  'KeyL',
  'KeyJ',
  'KeyK',
  'KeyN',
  'KeyM',
  'KeyR',
  'KeyO',
  'Equal',
  'Minus',
  'NumpadAdd',
  'NumpadSubtract',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
])

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  return target.isContentEditable
}

function forwardKeyToUmapEmbed(
  iframe: HTMLIFrameElement | null,
  code: string,
  phase: 'down' | 'up' | 'clear',
) {
  if (!iframe?.contentWindow) return
  iframe.contentWindow.postMessage({ type: 'vumap-key', code, phase }, window.location.origin)
}

type UmapViewerShellProps = {
  variant: UmapViewerVariant
  /** When false, render static loader shell only (SSR / first paint). */
  interactive?: boolean
}

function shouldDeferAutoLoad(): boolean {
  if (typeof navigator === 'undefined') return false
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!conn) return false
  if (conn.saveData) return true
  return conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g'
}

function scheduleIdleStart(run: () => void): () => void {
  const start = () => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(run, { timeout: 2200 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(run, 1500)
    return () => window.clearTimeout(id)
  }

  if (document.readyState === 'complete') {
    return start()
  }

  let cancelIdle: (() => void) | undefined
  const onLoad = () => {
    cancelIdle = start()
  }
  window.addEventListener('load', onLoad, { once: true })
  return () => {
    window.removeEventListener('load', onLoad)
    cancelIdle?.()
  }
}

function phaseTargetProgress(phase: ViewerPhase, progress: number, mountT: number): number {
  switch (phase) {
    case 'idle':
      return 0.06
    case 'loading':
      return 0.1 + progress * 0.75
    case 'mounting':
      return 0.88 + mountT * 0.1
    case 'ready':
      return 1
    default:
      return 0.06
  }
}

function UmapViewerStaticShell({ variant }: { variant: UmapViewerVariant }) {
  return (
    <>
      <div className="splash-banner__placeholder-wrap">
        <div className="splash-banner__placeholder-fallback" aria-hidden />
        <div className="splash-banner__load-ui" aria-live="polite">
          <p className="splash-banner__load-label">Llama-3-8B · 128k token UMAP</p>
          <div
            className="splash-banner__load-bar splash-banner__load-bar--idle"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={6}
          >
            <span
              className="splash-banner__load-bar-fill"
              style={{ transform: 'scaleX(0.06)' }}
            />
          </div>
        </div>
      </div>
      {variant === 'hero' ? (
        <a className="splash-banner__fullscreen" href={UMAP_VIEWER_PATH}>
          <Maximize2 size={16} strokeWidth={2} aria-hidden />
          Fullscreen
        </a>
      ) : null}
    </>
  )
}

function focusEmbedIframe(iframe: HTMLIFrameElement | null) {
  if (!iframe) return
  iframe.focus({ preventScroll: true })
  try {
    iframe.contentWindow?.focus()
  } catch {
    // Same-origin embed; ignore if the browser blocks focus.
  }
}

function UmapViewerShellInteractive({ variant }: { variant: UmapViewerVariant }) {
  const [phase, setPhase] = useState<ViewerPhase>('idle')
  const [progress, setProgress] = useState(0)
  const [mountT, setMountT] = useState(0)
  const [barProgress, setBarProgress] = useState(0.06)
  const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined)
  const [loadChromeVisible, setLoadChromeVisible] = useState(true)
  const startedRef = useRef(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const iframeTarget = variant === 'hero' ? UMAP_EMBED_SRC : UMAP_APP_SRC

  const beginLoad = () => {
    if (startedRef.current) return
    startedRef.current = true
    setPhase('loading')

    void preloadUmapAssets(setProgress)
      .then(() => {
        setPhase('mounting')
        setIframeSrc(iframeTarget)
      })
      .catch((err: unknown) => {
        console.warn('UmapViewerShell: preload failed', err)
        setPhase('error')
      })
  }

  useEffect(() => {
    if (variant === 'fullscreen') {
      if (shouldDeferAutoLoad()) return undefined
      beginLoad()
      return undefined
    }
    if (shouldDeferAutoLoad()) return undefined
    return scheduleIdleStart(beginLoad)
  }, [variant])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== 'vumap-ready') return
      setPhase('ready')
      if (variant === 'hero') {
        focusEmbedIframe(iframeRef.current)
        window.requestAnimationFrame(() => focusEmbedIframe(iframeRef.current))
      }
      window.setTimeout(() => setLoadChromeVisible(false), 450)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [variant])

  useEffect(() => {
    if (variant !== 'hero' || phase !== 'ready') return undefined

    const onKeyDown = (event: KeyboardEvent) => {
      if (!UMAP_KEY_CODES.has(event.code)) return
      if (isTypingTarget(event.target)) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      forwardKeyToUmapEmbed(iframeRef.current, event.code, 'down')
      event.preventDefault()
    }

    const onKeyUp = (event: KeyboardEvent) => {
      if (!UMAP_KEY_CODES.has(event.code)) return
      forwardKeyToUmapEmbed(iframeRef.current, event.code, 'up')
      event.preventDefault()
    }

    const onVisibilityChange = () => {
      if (document.hidden) forwardKeyToUmapEmbed(iframeRef.current, '', 'clear')
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      forwardKeyToUmapEmbed(iframeRef.current, '', 'clear')
    }
  }, [variant, phase])

  useEffect(() => {
    if (phase !== 'mounting') return undefined
    setMountT(0)
    const start = performance.now()
    const id = window.setInterval(() => {
      setMountT(Math.min((performance.now() - start) / 10000, 1))
    }, 80)
    return () => window.clearInterval(id)
  }, [phase])

  const target = phaseTargetProgress(phase, progress, mountT)
  useEffect(() => {
    setBarProgress((prev) => (target > prev ? target : prev))
  }, [target])

  const showProgressBar = phase === 'idle' || phase === 'loading' || phase === 'mounting'
  const shaderOverlay = iframeSrc !== undefined

  const statusLabel =
    phase === 'idle'
      ? 'Llama-3-8B · 128k token UMAP'
      : phase === 'loading'
        ? `Loading manifold… ${Math.round(progress * 100)}%`
        : phase === 'mounting'
          ? 'Starting viewer…'
          : phase === 'error'
            ? 'Could not load visualization'
            : ''

  return (
    <>
      {iframeSrc ? (
        <iframe
          ref={iframeRef}
          className={
            phase === 'ready'
              ? 'splash-banner__umap splash-banner__umap--ready'
              : 'splash-banner__umap'
          }
          src={iframeSrc}
          title="Llama-3-8B token embeddings — 3D UMAP"
          tabIndex={-1}
        />
      ) : null}

      <div
        className={
          shaderOverlay
            ? 'splash-banner__ambient splash-banner__ambient--overlay'
            : 'splash-banner__ambient'
        }
        aria-hidden
      >
        <Suspense fallback={<div className="splash-banner__placeholder-fallback" aria-hidden />}>
          <UmapHeroPlaceholderShader progress={barProgress} intensity={shaderOverlay ? 0.55 : 1} />
        </Suspense>
      </div>

      {loadChromeVisible ? (
        <div
          className={
            phase === 'ready'
              ? 'splash-banner__placeholder-wrap splash-banner__placeholder-wrap--out'
              : 'splash-banner__placeholder-wrap'
          }
        >
          <div className="splash-banner__load-ui" aria-live="polite">
            <p className="splash-banner__load-label">{statusLabel}</p>
            {showProgressBar ? (
              <div
                className={
                  phase === 'idle'
                    ? 'splash-banner__load-bar splash-banner__load-bar--idle'
                    : 'splash-banner__load-bar'
                }
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(barProgress * 100)}
              >
                <span
                  className="splash-banner__load-bar-fill"
                  style={{ transform: `scaleX(${Math.max(barProgress, 0.04)})` }}
                />
              </div>
            ) : null}
            {phase === 'idle' && shouldDeferAutoLoad() ? (
              <button type="button" className="splash-banner__load-cta" onClick={beginLoad}>
                Load interactive visualization
              </button>
            ) : null}
            {phase === 'error' ? (
              <button
                type="button"
                className="splash-banner__load-cta"
                onClick={() => {
                  startedRef.current = false
                  setLoadChromeVisible(true)
                  beginLoad()
                }}
              >
                Retry
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {variant === 'hero' ? (
        <a className="splash-banner__fullscreen" href={UMAP_VIEWER_PATH}>
          <Maximize2 size={16} strokeWidth={2} aria-hidden />
          Fullscreen
        </a>
      ) : null}
    </>
  )
}

export function UmapViewerShell({ variant, interactive = true }: UmapViewerShellProps) {
  return interactive ? (
    <UmapViewerShellInteractive variant={variant} />
  ) : (
    <UmapViewerStaticShell variant={variant} />
  )
}
