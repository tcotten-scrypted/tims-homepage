import { useEffect, useRef, useState } from 'react'

import { HeroPill } from './HeroPill'

export function SplashBanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mediaReady, setMediaReady] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const markReady = () => setMediaReady(true)
    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markReady()
      return
    }
    el.addEventListener('loadeddata', markReady)
    return () => el.removeEventListener('loadeddata', markReady)
  }, [])

  return (
    <div className="splash-banner">
      <video
        ref={videoRef}
        className={
          mediaReady ? 'splash-banner__video splash-banner__video--ready' : 'splash-banner__video'
        }
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/splash_1280_loader.jpg"
      >
        <source src="/splash_1280.mp4" type="video/mp4" />
      </video>
      <div className="splash-banner__overlay">
        <HeroPill />
      </div>
    </div>
  )
}
