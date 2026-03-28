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
  Rocket,
  Rss,
  Trophy,
  UserRound,
  Users,
} from 'lucide-react'

import { HOME_FRIENDS_SECTION_ENABLED } from '../friends/friends'

/** Order matches `HomePage` main column top → bottom (after splash). */
const SECTION_NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/#home-intro', label: 'About', icon: UserRound },
  { href: '/#updates', label: 'Updates', icon: Rss },
  { href: '/#friends', label: 'Friends', icon: Users },
  { href: '/#thesis', label: 'Thesis', icon: Lightbulb },
  { href: '/#building', label: 'Building', icon: Rocket },
  { href: '/#skills', label: 'Skills', icon: Layers },
  { href: '/#hackathon-wins', label: 'Hackathons', icon: Trophy },
  { href: '/#research-contributions', label: 'Research', icon: FlaskConical },
  { href: '/#public-repositories', label: 'Repos', icon: FolderGit2 },
  { href: '/#career', label: 'Career', icon: Briefcase },
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

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`home-nav__chevron${open ? ' home-nav__chevron--open' : ''}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 4.5 6 7.5 9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((v) => !v), [])

  useEffect(() => {
    if (!open) return

    const onDocMouseDown = (e: MouseEvent) => {
      const el = wrapRef.current
      if (el && !el.contains(e.target as Node)) close()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <header className="home-nav" role="banner">
      <div className="home-nav__inner">
        <div className="home-nav__brand-wrap" ref={wrapRef}>
          <button
            ref={triggerRef}
            type="button"
            className={`home-nav__brand-trigger${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-haspopup="true"
            aria-controls={menuId}
            onClick={toggle}
          >
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
            <IconChevron open={open} />
            <span className="home-nav__brand-trigger-label">Section menu</span>
          </button>

          <div
            id={menuId}
            className={`home-nav__dropdown${open ? ' is-open' : ''}`}
            role="region"
            aria-label="Shortcuts on this page"
            aria-hidden={!open}
          >
            <p className="home-nav__dropdown-kicker">Jump to</p>
            <ul className="home-nav__dropdown-list">
              <li>
                <a
                  href={TOP_ITEM.href}
                  className="home-nav__dropdown-link home-nav__dropdown-link--top"
                  onClick={close}
                >
                  <NavIcon icon={TOP_ITEM.icon} />
                  <span className="home-nav__dropdown-text">{TOP_ITEM.label}</span>
                </a>
              </li>
              <li className="home-nav__dropdown-sep" aria-hidden="true" />
              {SECTION_NAV.map(({ href, label, icon }) => (
                <li key={href}>
                  <a href={href} className="home-nav__dropdown-link" onClick={close}>
                    <NavIcon icon={icon} />
                    <span className="home-nav__dropdown-text">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
        </div>
      </div>
    </header>
  )
}
