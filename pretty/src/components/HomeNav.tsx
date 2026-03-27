const PRIMARY_NAV: { href: string; label: string }[] = [
  { href: '#home-intro', label: 'About' },
  { href: '#thesis', label: 'Thesis' },
  { href: '#building', label: 'Building' },
  { href: '#skills', label: 'Skills' },
  { href: '#research-contributions', label: 'Research' },
  { href: '#public-repositories', label: 'Repos' },
  { href: '#work-experience', label: 'Experience' },
  { href: '#writings', label: 'Writings' },
]

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" />
      <path d="M7.5 7.5l2 2M14.5 14.5l2 2M16.5 7.5l-2 2M9.5 14.5l-2 2" strokeLinecap="round" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HomeNav() {
  return (
    <header className="home-nav" role="banner">
      <div className="home-nav__inner">
        <a className="home-nav__brand" href="#top" aria-label="Top of page">
          <span className="home-nav__mark" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path
                d="M 22.5 9 C 16.5 4.5 7 6.5 5.5 14 C 4 21.5 12.5 27.5 22.5 23"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.85"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
        <nav className="home-nav__links" aria-label="Page sections">
          {PRIMARY_NAV.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="home-nav__actions">
          <a className="home-nav__icon" href="https://scrypted.ai" aria-label="Scrypted">
            <IconSpark />
          </a>
          <a className="home-nav__icon" href="mailto:tim@cotten.io" aria-label="Email Tim">
            <IconMail />
          </a>
        </div>
      </div>
    </header>
  )
}
