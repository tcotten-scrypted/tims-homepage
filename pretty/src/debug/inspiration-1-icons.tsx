/** Inline SVGs for ethereum.org–style UI chrome (generic, not official assets). */

export function IconSearch(props: { className?: string }) {
  return (
    <svg className={props.className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconGlobe(props: { className?: string }) {
  return (
    <svg className={props.className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export function IconMoon(props: { className?: string }) {
  return (
    <svg className={props.className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3 8.5 8.5 0 1 0 21 14.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconCode(props: { className?: string }) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m8 9-3 3 3 3M16 9l3 3-3 3M13 5l-2 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconMenu(props: { className?: string }) {
  return (
    <svg className={props.className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconChevronDown(props: { className?: string }) {
  return (
    <svg className={props.className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconWallet(props: { className?: string }) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7a2 2 0 0 1 2-2h12v16H6a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M16 12h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" stroke="currentColor" strokeWidth="2" />
      <circle cx="15.5" cy="13.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function IconEthGlyph(props: { className?: string }) {
  return (
    <svg className={props.className} width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 4 8 16.5 16 12l8 4.5L16 4Z" fill="currentColor" opacity="0.9" />
      <path d="M8 17.5 16 28l8-10.5-8 4.5-8-4.5Z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

export function HeroNetworkGraphic() {
  return (
    <svg
      className="inspiration-1__hero-graphic"
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="insp-g1" x1="0" y1="0" x2="400" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#945AF4" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#4473EF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#1DD8A3" stopOpacity="0.15" />
        </linearGradient>
        <filter id="insp-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse cx="200" cy="120" rx="160" ry="100" fill="url(#insp-g1)" filter="url(#insp-blur)" />
      <circle cx="200" cy="130" r="8" fill="#6C24DF" />
      <circle cx="120" cy="90" r="5" fill="#4473EF" />
      <circle cx="290" cy="100" r="5" fill="#945AF4" />
      <circle cx="100" cy="170" r="5" fill="#1DD8A3" />
      <circle cx="310" cy="180" r="5" fill="#F6109E" />
      <path
        d="M200 130 120 90M200 130 290 100M200 130 100 170M200 130 310 180M120 90 290 100M100 170 310 180"
        stroke="#616161"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <rect x="60" y="40" width="280" height="200" rx="12" stroke="#CECECE" strokeWidth="1" fill="rgba(255,255,255,0.4)" />
    </svg>
  )
}

export function CardPlaceholderArt({
  hue,
  uid,
}: {
  hue: 'purple' | 'blue' | 'teal' | 'pink'
  uid: string
}) {
  const stops: Record<string, [string, string]> = {
    purple: ['#945AF4', '#6C24DF'],
    blue: ['#6995F7', '#3C4CEB'],
    teal: ['#58F6C9', '#0CB988'],
    pink: ['#FF51BC', '#F6109E'],
  }
  const [a, b] = stops[hue]
  const gid = `ca-${uid}`
  return (
    <svg viewBox="0 0 120 72" className="inspiration-1__card-art" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="120" y2="72">
          <stop stopColor={a} stopOpacity="0.5" />
          <stop offset="1" stopColor={b} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="120" height="72" rx="8" fill={`url(#${gid})`} />
      <circle cx="40" cy="36" r="14" fill="white" fillOpacity="0.35" />
      <circle cx="85" cy="28" r="8" fill="white" fillOpacity="0.2" />
    </svg>
  )
}
