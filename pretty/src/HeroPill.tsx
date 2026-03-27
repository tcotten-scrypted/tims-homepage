import './hero-pill.css'

export function HeroPill() {
  return (
    <div className="hero-pill">
      <img
        className="hero-pill__avatar"
        src="/profile_avatar.png"
        alt=""
        width={112}
        height={112}
        decoding="async"
      />
      <header className="hero-pill__header">
        <h1 className="hero-pill__title">Tim Cotten</h1>
        <p className="hero-pill__tagline">
          <strong>AI engineer</strong> turned <strong>Founder</strong>
        </p>
      </header>
    </div>
  )
}
