import { HeroPill } from './HeroPill'

export function SplashBanner() {
  return (
    <div className="splash-banner">
      <video
        className="splash-banner__video"
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
