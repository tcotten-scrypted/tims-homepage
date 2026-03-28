import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const BuildingAccentShader = lazy(() =>
  import('./BuildingAccentShader').then((m) => ({ default: m.BuildingAccentShader })),
)

/**
 * Defers downloading/instantiating the WebGL accent until the section nears the viewport,
 * then starts the chunk after an idle slice so it stays off the critical path.
 * Static mesh gradient lives on `.home-split__accent` in CSS until the canvas is ready.
 */
export function BuildingAccentLazyMount() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const start = () => {
      const run = () => setShouldLoad(true)
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(run, { timeout: 2200 })
      } else {
        window.setTimeout(run, 1)
      }
    }

    if (typeof IntersectionObserver === 'undefined') {
      start()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        start()
      },
      { root: null, rootMargin: '380px 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="home-split__accent">
      {shouldLoad ? (
        <Suspense fallback={null}>
          <BuildingAccentShader />
        </Suspense>
      ) : null}
    </div>
  )
}
