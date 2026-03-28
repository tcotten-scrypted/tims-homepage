import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CardPlaceholderArt,
  HeroNetworkGraphic,
  IconChevronDown,
  IconCode,
  IconEthGlyph,
  IconGlobe,
  IconMenu,
  IconMoon,
  IconSearch,
  IconWallet,
} from './inspiration-1-icons'
import './inspiration-1.css'

const STACK_ROWS: [string, string][] = [
  ['Runtime / package manager', 'Node.js, pnpm'],
  ['Framework', 'Next.js 14 (App Router, SSG, SSR, i18n, Image)'],
  ['UI library', 'React + TypeScript'],
  ['Styling', 'Tailwind CSS (utilities + design tokens in CSS)'],
  ['Components', 'shadcn/ui on top of Radix UI primitives'],
  ['Search', 'Algolia (see repo docs/site-search.md)'],
  ['i18n', 'Crowdin + JSON under src/intl; MDX/Markdown in public/content'],
  ['CI/CD', 'GitHub Actions'],
  ['Hosting', 'Netlify (DNS + primary host for production branch)'],
  ['UI QA', 'Storybook + Chromatic visual review'],
  ['Animations', 'tailwindcss-animate plugin'],
]

const TYPO_SCALE: [string, string, string][] = [
  ['7xl', '4rem', 'line-height 1.1'],
  ['6xl', '3.75rem', '1.2'],
  ['5xl', '3rem', '1.2'],
  ['4xl', '2.25rem', '1.2'],
  ['3xl', '1.875rem', '1.3'],
  ['2xl', '1.5rem', '1.3'],
  ['xl', '1.25rem', '1.4'],
  ['lg', '1.125rem', '1.6 (paired “base” leading)'],
  ['md', '1rem', '1.6'],
  ['sm', '0.875rem', '1.6'],
  ['xs', '0.75rem', '1.6'],
  ['2xs', '0.625rem', '1.6'],
]

const Z_INDEX: [string, string][] = [
  ['hide', '-1'],
  ['base', '0'],
  ['docked', '10'],
  ['dropdown', '1000'],
  ['sticky', '1100'],
  ['banner', '1200'],
  ['overlay', '1300'],
  ['modal', '1400'],
  ['popover', '1500'],
  ['skipLink', '1600'],
  ['toast', '1700'],
  ['tooltip', '1800'],
]

const APP_CARDS: {
  title: string
  desc: string
  hue: 'purple' | 'blue' | 'teal' | 'pink'
  pills: string[]
  uid: string
}[] = [
  {
    title: 'Example dapp',
    desc: 'Privacy-first portfolio and analytics: pattern after ethereum.org app cards.',
    hue: 'purple',
    pills: ['Productivity', 'Open source'],
    uid: 'a',
  },
  {
    title: 'Collectibles hub',
    desc: 'Bookmarks for life events as on-chain memories: card + category chips.',
    hue: 'pink',
    pills: ['Collectibles', 'NFT'],
    uid: 'b',
  },
  {
    title: 'L2 explorer',
    desc: 'Low fees, Ethereum security: teal accent like accent-c tokens.',
    hue: 'teal',
    pills: ['Layer 2', 'DeFi'],
    uid: 'c',
  },
]

export function Inspiration1Page() {
  useEffect(() => {
    document.body.classList.add('inspiration-1-body')
    return () => document.body.classList.remove('inspiration-1-body')
  }, [])

  return (
    <div className="inspiration-1">
      <div className="inspiration-1__debug-bar">
        <span>
          Debug: ethereum.org visual reference (unofficial): compare with{' '}
          <a href="https://ethereum.org/en/">ethereum.org</a>
        </span>
        <Link to="/">← cotten.io home</Link>
      </div>

      {/* Site chrome: layout/IA similar to ethereum.org marketing shell */}
      <header className="inspiration-1__site-nav">
        <a className="inspiration-1__brand" href="#inspiration-1-visual">
          <span className="inspiration-1__brand-mark" aria-hidden>
            <IconEthGlyph />
          </span>
          Ethereum
        </a>
        <nav className="inspiration-1__nav-links" aria-label="Primary">
          <a href="#inspiration-1-visual">
            Use Ethereum <IconChevronDown className="inspiration-1__chev" />
          </a>
          <a href="#inspiration-1-visual">Build</a>
          <a href="#inspiration-1-visual">Participate</a>
          <a href="#inspiration-1-visual">Research</a>
        </nav>
        <div className="inspiration-1__nav-actions">
          <button type="button" className="inspiration-1__icon-btn" aria-label="Search">
            <IconSearch />
          </button>
          <button type="button" className="inspiration-1__icon-btn" aria-label="Language">
            <IconGlobe />
          </button>
          <button type="button" className="inspiration-1__icon-btn" aria-label="Dark mode">
            <IconMoon />
          </button>
          <button type="button" className="inspiration-1__icon-btn inspiration-1__menu-mob" aria-label="Menu">
            <IconMenu />
          </button>
        </div>
      </header>

      <div id="inspiration-1-visual" className="inspiration-1__hero-wrap">
        <div className="inspiration-1__hero-bg" aria-hidden />
        <div className="inspiration-1__hero-inner">
          <div>
            <p className="inspiration-1__hero-kicker">Visual mirror · not affiliated with EF</p>
            <h1 className="inspiration-1__hero-title">Welcome to Ethereum</h1>
            <p className="inspiration-1__hero-sub">
              Homepage-style hero: Inter, purple/blue radial wash, sticky glass nav, icon buttons, and CTA
              tiles; approximates the public marketing layer of ethereum.org so you can judge spacing,
              type scale, and component rhythm side-by-side with the live site.
            </p>
            <div className="inspiration-1__hero-actions">
              <a className="inspiration-1__btn-primary" href="#inspiration-1-doc">
                Read implementation notes
              </a>
              <a
                className="inspiration-1__btn-ghost"
                href="https://ethereum.org/en/"
                target="_blank"
                rel="noreferrer"
              >
                Open real ethereum.org
              </a>
            </div>
          </div>
          <HeroNetworkGraphic />
        </div>

        <div className="inspiration-1__cta-row">
          <a className="inspiration-1__cta-tile" href="https://ethereum.org/wallets/find-wallet/">
            <span className="inspiration-1__cta-icon" aria-hidden>
              <IconWallet />
            </span>
            <strong>Pick a wallet</strong>
            <span>Create accounts &amp; manage assets</span>
          </a>
          <a className="inspiration-1__cta-tile" href="https://ethereum.org/get-eth/">
            <span className="inspiration-1__cta-icon" aria-hidden>
              <IconEthGlyph />
            </span>
            <strong>Get ETH</strong>
            <span>The currency of Ethereum</span>
          </a>
          <a className="inspiration-1__cta-tile" href="https://ethereum.org/apps/">
            <span className="inspiration-1__cta-icon" aria-hidden>
              <IconGlobe />
            </span>
            <strong>Try apps</strong>
            <span>Finance, gaming, social</span>
          </a>
          <a className="inspiration-1__cta-tile" href="https://ethereum.org/developers/">
            <span className="inspiration-1__cta-icon" aria-hidden>
              <IconCode />
            </span>
            <strong>Start building</strong>
            <span>Create your first app</span>
          </a>
        </div>
      </div>

      <section className="inspiration-1__section inspiration-1__section--muted" aria-labelledby="insp-what">
        <p className="inspiration-1__section-head" id="insp-what">
          Network
        </p>
        <h2 className="inspiration-1__section-title">What is Ethereum?</h2>
        <p className="inspiration-1__section-lede">
          Section pattern: small uppercase label, large H2, muted body; same cadence as ethereum.org
          content bands. Stats below mimic the homepage metric strip.
        </p>
        <div className="inspiration-1__stats">
          <div className="inspiration-1__stat">
            <strong>$52.87B</strong>
            <span>Value in DeFi (example)</span>
          </div>
          <div className="inspiration-1__stat">
            <strong>$76.04B</strong>
            <span>Securing Ethereum (example)</span>
          </div>
          <div className="inspiration-1__stat">
            <strong>$0.0011</strong>
            <span>Avg tx cost (example)</span>
          </div>
          <div className="inspiration-1__stat">
            <strong>13.34M</strong>
            <span>Tx / 24h (example)</span>
          </div>
        </div>
      </section>

      <section className="inspiration-1__section" aria-labelledby="insp-apps">
        <p className="inspiration-1__section-head" id="insp-apps">
          Apps of the week
        </p>
        <h2 className="inspiration-1__section-title">Discover apps on Ethereum</h2>
        <p className="inspiration-1__section-lede">
          Card grid with gradient header art + title + description + category pills (structure only;
          artwork is generic SVG, not ethereum.org illustrations).
        </p>
        <div className="inspiration-1__card-row">
          {APP_CARDS.map((c) => (
            <article key={c.uid} className="inspiration-1__app-card">
              <CardPlaceholderArt hue={c.hue} uid={c.uid} />
              <div className="inspiration-1__app-body">
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
                <div className="inspiration-1__pill-row">
                  {c.pills.map((p) => (
                    <span key={p} className="inspiration-1__pill">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reference documentation */}
      <main id="inspiration-1-doc" className="inspiration-1__main">
        <nav className="inspiration-1__doc-nav" aria-label="Documentation sections">
          <a href="#inspiration-1-overview">Overview</a>
          <a href="#inspiration-1-architecture">Architecture</a>
          <a href="#inspiration-1-philosophy">Philosophy</a>
          <a href="#inspiration-1-tokens">Tokens</a>
          <a href="#inspiration-1-type">Typography</a>
          <a href="#inspiration-1-components">Components</a>
          <a href="#inspiration-1-content">Content</a>
          <a href="#inspiration-1-ux">UX patterns</a>
          <a href="#inspiration-1-retheme">Retheme checklist</a>
          <a href="#inspiration-1-sources">Sources</a>
        </nav>

        <h2 id="inspiration-1-overview">About this page</h2>
        <div className="inspiration-1__note">
          <strong>Fonts.</strong> This route adds <code>body.inspiration-1-body</code> so Inter wins over your
          global serif rules, and the layout is full width (your main site uses <code>body max-width:
          42rem</code>, which made the old page feel nothing like ethereum.org).
        </div>
        <p>
          The <strong>visual mirror</strong> above uses the same rough ingredients as ethereum.org’s public
          marketing UI: Inter, purple primary, soft radial hero, sticky translucent nav, icon toolbar,
          quad CTA tiles, stat band, and app cards, built with <strong>generic SVG</strong> (no EF
          trademarks or proprietary illustrations).
        </p>

        <h2 id="inspiration-1-architecture">Architecture &amp; toolchain</h2>
        <p>
          Official stack documentation lives in{' '}
          <a href="https://github.com/ethereum/ethereum-org-website/blob/dev/docs/stack.md">
            docs/stack.md
          </a>
          .
        </p>

        <div className="inspiration-1__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Choice</th>
              </tr>
            </thead>
            <tbody>
              {STACK_ROWS.map(([a, b]) => (
                <tr key={a}>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Repository layout (simplified)</h3>
        <ul>
          <li>
            <code>app/</code>: App Router entrypoints, API routes, layouts.
          </li>
          <li>
            <code>src/components/</code>: shared React building blocks.
          </li>
          <li>
            <code>src/layouts/</code>: Docs, Tutorial, marketing shells.
          </li>
          <li>
            <code>public/content/</code>: MD/MDX source.
          </li>
          <li>
            <code>src/styles/</code>: <code>colors.css</code>, <code>semantic-tokens.css</code>,{' '}
            <code>global.css</code>.
          </li>
          <li>
            <code>src/intl/</code>: locale JSON; Crowdin.
          </li>
        </ul>

        <h2 id="inspiration-1-philosophy">Design philosophy (inferred)</h2>
        <ul>
          <li>
            <strong>Open &amp; legible.</strong> Neutral grays, purple primary, blue / pink / teal accents.
          </li>
          <li>
            <strong>Educational.</strong> Comfortable line height (~1.6), clear heading steps.
          </li>
          <li>
            <strong>Accessible.</strong> Radix primitives; visible focus on links in upstream{' '}
            <code>global.css</code>.
          </li>
          <li>
            <strong>Dark mode.</strong> Selector-based <code>.dark</code> token swap.
          </li>
        </ul>

        <h2 id="inspiration-1-tokens">Design tokens &amp; color</h2>
        <p>
          HSL triplets in <code>colors.css</code>; semantic aliases in <code>semantic-tokens.css</code>.
        </p>
        <div className="inspiration-1__swatches" aria-hidden>
          <span className="inspiration-1__swatch" style={{ background: '#6c24df' }} />
          <span className="inspiration-1__swatch" style={{ background: '#945af4' }} />
          <span className="inspiration-1__swatch" style={{ background: '#4473ef' }} />
          <span className="inspiration-1__swatch" style={{ background: '#f6109e' }} />
          <span className="inspiration-1__swatch" style={{ background: '#0f9971' }} />
          <span className="inspiration-1__swatch" style={{ background: '#222222' }} />
        </div>

        <h2 id="inspiration-1-type">Typography</h2>
        <p>
          Upstream uses <strong>Inter</strong> for body and headings; <strong>IBM Plex Mono</strong> for
          code, mirrored here.
        </p>

        <div className="inspiration-1__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Size (mobile → lg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>h1</td>
                <td>text-4xl → lg:text-5xl</td>
              </tr>
              <tr>
                <td>h2</td>
                <td>text-3xl → lg:text-4xl</td>
              </tr>
              <tr>
                <td>h3</td>
                <td>text-2xl → lg:text-3xl</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="inspiration-1__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Leading</th>
              </tr>
            </thead>
            <tbody>
              {TYPO_SCALE.map(([n, s, l]) => (
                <tr key={n}>
                  <td>
                    <code>{n}</code>
                  </td>
                  <td>{s}</td>
                  <td>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="inspiration-1-components">UI component stack</h2>
        <p>
          Production site: <strong>shadcn/ui</strong> + <strong>Radix</strong>. The chrome above is a
          static facsimile (buttons are links; dropdowns not wired). Z-index ladder from their Tailwind
          config:
        </p>
        <div className="inspiration-1__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Z_INDEX.map(([k, v]) => (
                <tr key={k}>
                  <td>
                    <code>{k}</code>
                  </td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="inspiration-1-content">Content &amp; i18n</h2>
        <ul>
          <li>MDX/Markdown in <code>public/content/</code>.</li>
          <li>Crowdin + <code>src/intl/</code>.</li>
          <li>Algolia DocSearch.</li>
        </ul>

        <h2 id="inspiration-1-ux">UX patterns</h2>
        <ul>
          <li>Hero + 4-up CTA tiles.</li>
          <li>Labeled sections + stat strip.</li>
          <li>App carousel / cards with metadata chips.</li>
          <li>Soft radial marketing background.</li>
        </ul>

        <h2 id="inspiration-1-retheme">Retheme checklist (your site)</h2>
        <ul className="inspiration-1__checklist">
          <li>Full-width layout route(s); escape global max-width when needed.</li>
          <li>Inter everywhere; IBM Plex Mono for code.</li>
          <li>Purple primary + semantic gray scale as CSS variables.</li>
          <li>Sticky nav + icon actions + mobile menu breakpoint.</li>
          <li>Hero radial + CTA tile grid.</li>
          <li>Stat band + card grid with pills.</li>
          <li>Radix/shadcn for real dropdowns, search modal, and theme toggle.</li>
          <li>License-aware art (commission or use open illustrations).</li>
        </ul>

        <h2 id="inspiration-1-sources">Sources</h2>
        <ul className="inspiration-1__sources">
          <li>
            <a href="https://github.com/ethereum/ethereum-org-website">ethereum/ethereum-org-website</a>
          </li>
          <li>
            <a href="https://raw.githubusercontent.com/ethereum/ethereum-org-website/dev/src/styles/colors.css">
              colors.css
            </a>
          </li>
          <li>
            <a href="https://raw.githubusercontent.com/ethereum/ethereum-org-website/dev/src/styles/semantic-tokens.css">
              semantic-tokens.css
            </a>
          </li>
          <li>
            <a href="https://raw.githubusercontent.com/ethereum/ethereum-org-website/dev/tailwind.config.ts">
              tailwind.config.ts
            </a>
          </li>
          <li>
            <a href="https://ethereum.org/en/">ethereum.org</a>
          </li>
        </ul>
      </main>
    </div>
  )
}
