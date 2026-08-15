import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpToLine,
  BookOpen,
  Briefcase,
  FlaskConical,
  FolderGit2,
  Layers,
  Lightbulb,
  Menu,
  Rocket,
  Rss,
  Trophy,
  UserRound,
  Users,
  X,
} from 'lucide-react'

import { HOME_FRIENDS_SECTION_ENABLED } from '../friends/friends'

/** Order matches `HomePage` main column top → bottom (after splash). */
const SECTION_NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/#home-intro', label: 'About', icon: UserRound },
  { href: '/#updates', label: 'Updates', icon: Rss },
  { href: '/#friends', label: 'Friends', icon: Users },
  { href: '/#thesis', label: 'Thesis', icon: Lightbulb },
  { href: '/#building', label: 'Building', icon: Rocket },
  { href: '/#hackathon-wins', label: 'Hackathons', icon: Trophy },
  { href: '/#research-contributions', label: 'Research', icon: FlaskConical },
  { href: '/#public-repositories', label: 'Repos', icon: FolderGit2 },
  { href: '/#career', label: 'Career', icon: Briefcase },
  { href: '/#skills', label: 'Skills', icon: Layers },
  { href: '/#media', label: 'Media', icon: BookOpen },
].filter((item) => HOME_FRIENDS_SECTION_ENABLED || item.href !== '/#friends')

const TOP_ITEM = {
  href: '/#top',
  label: 'Top of page',
  icon: ArrowUpToLine,
} as const

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

function NavIcon({ icon: Icon, compact }: { icon: LucideIcon; compact?: boolean }) {
  return (
    <span className="home-nav__icon-slot" aria-hidden>
      <Icon className="home-nav__lucide" size={compact ? 15 : 17} strokeWidth={2} />
    </span>
  )
}

export function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const sheetId = useId()

  const close = useCallback(() => setMenuOpen(false), [])
  const toggle = useCallback(() => setMenuOpen((v) => !v), [])

  useEffect(() => {
    document.body.classList.toggle('home-nav-open', menuOpen)
    return () => document.body.classList.remove('home-nav-open')
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, close])

  const onNavClick = () => {
    close()
  }

  return (
    <header className="home-nav" role="banner">
      <div className="home-nav__inner">
        <a href="/#top" className="home-nav__home">
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
          <span className="home-nav__home-label">Tim Cotten</span>
        </a>

        <nav className="home-nav__links" aria-label="Page sections">
          {SECTION_NAV.map(({ href, label, icon }) => (
            <a key={href} href={href}>
              <NavIcon icon={icon} compact />
              <span>{label}</span>
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
          <button
            ref={toggleRef}
            type="button"
            className="home-nav__menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={sheetId}
            onClick={toggle}
          >
            {menuOpen ? <X size={22} strokeWidth={2} aria-hidden /> : <Menu size={22} strokeWidth={2} aria-hidden />}
            <span className="home-nav__menu-toggle-label">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`home-nav__backdrop${menuOpen ? ' is-open' : ''}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={close}
      />

      <div
        id={sheetId}
        ref={sheetRef}
        className={`home-nav__sheet${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
      >
        <div className="home-nav__sheet-head">
          <p className="home-nav__sheet-kicker">Navigate</p>
          <button type="button" className="home-nav__sheet-close" onClick={close}>
            <X size={20} strokeWidth={2} aria-hidden />
            <span>Close</span>
          </button>
        </div>
        <nav className="home-nav__sheet-nav" aria-label="Page sections">
          <a
            href={TOP_ITEM.href}
            className="home-nav__sheet-link home-nav__sheet-link--top"
            onClick={onNavClick}
          >
            <NavIcon icon={TOP_ITEM.icon} />
            <span>{TOP_ITEM.label}</span>
          </a>
          <ul className="home-nav__sheet-list">
            {SECTION_NAV.map(({ href, label, icon }) => (
              <li key={href}>
                <a href={href} className="home-nav__sheet-link" onClick={onNavClick}>
                  <NavIcon icon={icon} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
