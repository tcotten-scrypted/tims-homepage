import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './hero-ux-playground.css'

export type UxAccent = 'none' | 'cyan' | 'electric' | 'amber'

export interface UxHeroFlags {
  bgVignette: boolean
  bgTopBalance: boolean
  bgDepth: boolean
  parallax: boolean
  glassBlur: boolean
  glassInnerHighlight: boolean
  glassNoise: boolean
  glassTealGradient: boolean
  glowRim: boolean
  cardElevation: boolean
  nameGradient: boolean
  nameTightTracking: boolean
  founderEmphasis: boolean
  avatarRingGlow: boolean
  avatarZoom: boolean
  avatarSharp: boolean
  avatarFloat: boolean
  motionEntrance: boolean
  motionIdle: boolean
  motionBreathe: boolean
  motionHover: boolean
  accent: UxAccent
  contextTags: boolean
  atmoFog: boolean
  atmoParticles: boolean
}

const DEFAULT_FLAGS: UxHeroFlags = {
  bgVignette: true,
  bgTopBalance: true,
  bgDepth: true,
  parallax: true,
  glassBlur: true,
  glassInnerHighlight: true,
  glassNoise: true,
  glassTealGradient: true,
  glowRim: true,
  cardElevation: true,
  nameGradient: false,
  nameTightTracking: true,
  founderEmphasis: true,
  avatarRingGlow: true,
  avatarZoom: true,
  avatarSharp: true,
  avatarFloat: false,
  motionEntrance: false,
  motionIdle: false,
  motionBreathe: false,
  motionHover: true,
  accent: 'cyan',
  contextTags: false,
  atmoFog: true,
  atmoParticles: false,
}

const PROD_LIKE: UxHeroFlags = {
  ...DEFAULT_FLAGS,
  glassBlur: false,
  glassInnerHighlight: false,
  glassNoise: false,
  glassTealGradient: false,
  glowRim: false,
  cardElevation: false,
  bgVignette: false,
  bgTopBalance: false,
  bgDepth: false,
  parallax: false,
  nameGradient: false,
  nameTightTracking: false,
  founderEmphasis: false,
  avatarRingGlow: false,
  avatarZoom: false,
  avatarSharp: false,
  atmoFog: false,
  motionHover: false,
  accent: 'none',
}

const ALL_OFF: UxHeroFlags = {
  bgVignette: false,
  bgTopBalance: false,
  bgDepth: false,
  parallax: false,
  glassBlur: false,
  glassInnerHighlight: false,
  glassNoise: false,
  glassTealGradient: false,
  glowRim: false,
  cardElevation: false,
  nameGradient: false,
  nameTightTracking: false,
  founderEmphasis: false,
  avatarRingGlow: false,
  avatarZoom: false,
  avatarSharp: false,
  avatarFloat: false,
  motionEntrance: false,
  motionIdle: false,
  motionBreathe: false,
  motionHover: false,
  accent: 'none',
  contextTags: false,
  atmoFog: false,
  atmoParticles: false,
}

function boolData(v: boolean) {
  return v ? 'true' : 'false'
}

export function HeroUxPlayground() {
  const [flags, setFlags] = useState<UxHeroFlags>(DEFAULT_FLAGS)
  const [entranceKey, setEntranceKey] = useState(0)
  const [entranceShot, setEntranceShot] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const showEntranceClass = flags.motionEntrance || entranceShot
  const stageRef = useRef<HTMLDivElement>(null)
  const prevMotionEntrance = useRef(false)

  useEffect(() => {
    if (flags.motionEntrance && !prevMotionEntrance.current) {
      setEntranceKey((k) => k + 1)
    }
    prevMotionEntrance.current = flags.motionEntrance
  }, [flags.motionEntrance])

  const onStageMove = useCallback(
    (e: React.MouseEvent) => {
      if (!flags.parallax) {
        setParallax({ x: 0, y: 0 })
        return
      }
      const el = stageRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      setParallax({ x: dx * 14, y: dy * 10 })
    },
    [flags.parallax],
  )

  const onStageLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 })
  }, [])

  const dataAttrs = useMemo(
    () => ({
      'data-bg-vignette': boolData(flags.bgVignette),
      'data-bg-top-balance': boolData(flags.bgTopBalance),
      'data-bg-depth': boolData(flags.bgDepth),
      'data-glass-blur': boolData(flags.glassBlur),
      'data-glass-inner-highlight': boolData(flags.glassInnerHighlight),
      'data-glass-noise': boolData(flags.glassNoise),
      'data-glass-teal-gradient': boolData(flags.glassTealGradient),
      'data-glow-rim': boolData(flags.glowRim),
      'data-card-elevation': boolData(flags.cardElevation),
      'data-name-gradient': boolData(flags.nameGradient),
      'data-name-tight-tracking': boolData(flags.nameTightTracking),
      'data-founder-emphasis': boolData(flags.founderEmphasis),
      'data-avatar-ring-glow': boolData(flags.avatarRingGlow),
      'data-avatar-zoom': boolData(flags.avatarZoom),
      'data-avatar-sharp': boolData(flags.avatarSharp),
      'data-avatar-float': boolData(flags.avatarFloat),
      'data-motion-entrance': boolData(flags.motionEntrance),
      'data-motion-idle': boolData(flags.motionIdle),
      'data-motion-breathe': boolData(flags.motionBreathe),
      'data-motion-hover': boolData(flags.motionHover),
      'data-accent': flags.accent,
      'data-context-tags': boolData(flags.contextTags),
      'data-atmo-fog': boolData(flags.atmoFog),
      'data-atmo-particles': boolData(flags.atmoParticles),
    }),
    [flags],
  )

  const toggle = (key: keyof UxHeroFlags) => {
    setFlags((f) => {
      const cur = f[key]
      if (key === 'accent') return f
      return { ...f, [key]: !cur }
    })
  }

  const setAccent = (accent: UxAccent) => setFlags((f) => ({ ...f, accent }))

  return (
    <div className="hero-ux-playground" {...dataAttrs}>
      <div className="hero-ux-playground__top">
        <strong>Debug · UX components</strong>
        <Link to="/">← Home</Link>
      </div>

      <div
        ref={stageRef}
        className="hero-ux-stage"
        onMouseMove={onStageMove}
        onMouseLeave={onStageLeave}
      >
        <div
          className="hero-ux-stage__video-wrap"
          style={{
            transform: flags.parallax
              ? `translate(${parallax.x}px, ${parallax.y}px) scale(1.06)`
              : undefined,
          }}
        >
          <video
            className="hero-ux-stage__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/splash_1280_loader.jpg"
          >
            <source src="/splash_1280.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-ux-layer hero-ux-layer--top" aria-hidden />
        <div className="hero-ux-layer hero-ux-layer--vignette" aria-hidden />
        <div className="hero-ux-layer hero-ux-layer--depth" aria-hidden />
        <div className="hero-ux-layer hero-ux-layer--fog" aria-hidden />
        <div className="hero-ux-particles" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-ux-overlay-center">
          <div
            key={entranceKey}
            className={`hero-ux-card ${showEntranceClass ? 'hero-ux-card--entrance' : ''}`}
            onAnimationEnd={(e) => {
              if (String(e.animationName).includes('hero-ux-entrance')) {
                setEntranceShot(false)
              }
            }}
          >
            <img
              className="hero-ux-avatar"
              src="/profile_avatar.jpg"
              alt=""
              width={112}
              height={112}
              decoding="async"
            />
            <header className="hero-ux-header">
              <h1 className="hero-ux-title">Tim Cotten</h1>
              <p className="hero-ux-tagline">
                <strong className="hero-ux-strong--neutral">AI engineer</strong>{' '}
                turned{' '}
                <strong className="hero-ux-strong--founder">Founder</strong>
              </p>
              <div className="hero-ux-tags">
                <span className="hero-ux-tag">LLMs</span>
                <span className="hero-ux-tag">Startups</span>
                <span className="hero-ux-tag">AI systems</span>
              </div>
            </header>
          </div>
        </div>
      </div>

      <div className="hero-ux-controls">
        <h2>Background integration</h2>
        <div className="hero-ux-grid">
          <Toggle
            label="Spotlight vignette (bright center)"
            checked={flags.bgVignette}
            onChange={() => toggle('bgVignette')}
          />
          <Toggle
            label="Top balance (darken / mute upper band)"
            checked={flags.bgTopBalance}
            onChange={() => toggle('bgTopBalance')}
          />
          <Toggle
            label="Depth tunnel behind card"
            checked={flags.bgDepth}
            onChange={() => toggle('bgDepth')}
          />
          <Toggle
            label="Mouse parallax on video"
            checked={flags.parallax}
            onChange={() => toggle('parallax')}
          />
          <Toggle
            label="Atmospheric fog (mid haze)"
            checked={flags.atmoFog}
            onChange={() => toggle('atmoFog')}
          />
          <Toggle
            label="Floating particles"
            checked={flags.atmoParticles}
            onChange={() => toggle('atmoParticles')}
          />
        </div>

        <h2>Glass card</h2>
        <div className="hero-ux-grid">
          <Toggle
            label="Backdrop blur + frost"
            checked={flags.glassBlur}
            onChange={() => toggle('glassBlur')}
          />
          <Toggle
            label="Teal → navy → black gradient"
            checked={flags.glassTealGradient}
            onChange={() => toggle('glassTealGradient')}
          />
          <Toggle
            label="Inner top highlight"
            checked={flags.glassInnerHighlight}
            onChange={() => toggle('glassInnerHighlight')}
          />
          <Toggle
            label="Noise texture"
            checked={flags.glassNoise}
            onChange={() => toggle('glassNoise')}
          />
          <Toggle
            label="Soft cyan glow rim"
            checked={flags.glowRim}
            onChange={() => toggle('glowRim')}
          />
          <Toggle
            label="Elevation shadow"
            checked={flags.cardElevation}
            onChange={() => toggle('cardElevation')}
          />
        </div>

        <h2>Typography</h2>
        <div className="hero-ux-grid">
          <Toggle
            label="Name: subtle gradient fill"
            checked={flags.nameGradient}
            onChange={() => toggle('nameGradient')}
          />
          <Toggle
            label="Name: tighter tracking"
            checked={flags.nameTightTracking}
            onChange={() => toggle('nameTightTracking')}
          />
          <Toggle
            label="Founder emphasis (accent + glow)"
            checked={flags.founderEmphasis}
            onChange={() => toggle('founderEmphasis')}
          />
        </div>

        <h2>Accent (Founder + glows)</h2>
        <div className="hero-ux-accent-row">
          {(
            [
              ['none', 'None'],
              ['cyan', 'Soft cyan'],
              ['electric', 'Electric blue'],
              ['amber', 'Warm amber'],
            ] as const
          ).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name="ux-accent"
                checked={flags.accent === value}
                onChange={() => setAccent(value)}
              />
              {label}
            </label>
          ))}
        </div>

        <h2>Avatar</h2>
        <div className="hero-ux-grid">
          <Toggle
            label="Ring glow"
            checked={flags.avatarRingGlow}
            onChange={() => toggle('avatarRingGlow')}
          />
          <Toggle
            label="Face crop / zoom"
            checked={flags.avatarZoom}
            onChange={() => toggle('avatarZoom')}
          />
          <Toggle
            label="Contrast / sharpness"
            checked={flags.avatarSharp}
            onChange={() => toggle('avatarSharp')}
          />
          <Toggle
            label="Micro float animation"
            checked={flags.avatarFloat}
            onChange={() => toggle('avatarFloat')}
          />
        </div>

        <h2>Motion</h2>
        <div className="hero-ux-grid">
          <Toggle
            label="Entrance (slide + ease)"
            checked={flags.motionEntrance}
            onChange={() => toggle('motionEntrance')}
          />
          <Toggle
            label="Idle vertical drift"
            checked={flags.motionIdle}
            onChange={() => toggle('motionIdle')}
          />
          <Toggle
            label="Glow breathing"
            checked={flags.motionBreathe}
            onChange={() => toggle('motionBreathe')}
          />
          <Toggle
            label="Hover lift + avatar react"
            checked={flags.motionHover}
            onChange={() => toggle('motionHover')}
          />
        </div>

        <h2>Optional UI chrome</h2>
        <div className="hero-ux-grid">
          <Toggle
            label="Context tags (LLMs / Startups / …)"
            checked={flags.contextTags}
            onChange={() => toggle('contextTags')}
          />
        </div>

        <div className="hero-ux-actions">
          <button
            type="button"
            onClick={() => {
              setEntranceShot(true)
              setEntranceKey((k) => k + 1)
            }}
          >
            Replay entrance
          </button>
          <button type="button" onClick={() => setFlags(DEFAULT_FLAGS)}>
            Preset: reviewer mix
          </button>
          <button type="button" onClick={() => setFlags(PROD_LIKE)}>
            Preset: prod-like (minimal)
          </button>
          <button type="button" onClick={() => setFlags(ALL_OFF)}>
            All overlays off
          </button>
        </div>
      </div>
    </div>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  )
}
