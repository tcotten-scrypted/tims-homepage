import { Link } from 'react-router-dom'
import './demo-palette-1.css'

export function DemoPalette1Page() {
  return (
    <div className="demo-palette-1">
      <header className="demo-palette-1__top">
        <span className="demo-palette-1__brand">Demo · Palette 1</span>
        <nav>
          <Link to="/">← Home</Link>
        </nav>
      </header>

      <main className="demo-palette-1__main">
        <h1 className="demo-palette-1__title">Palette 1 sample</h1>
        <p className="demo-palette-1__lede">
          Lavender base, glassy surfaces, and accent for actions. Tokens live on{' '}
          <code>.demo-palette-1</code> so the home page stays unchanged.
        </p>

        <h2 className="demo-palette-1__section-title">Swatches</h2>
        <div className="demo-palette-1__swatches">
          <div
            className="demo-palette-1__swatch"
            style={{ background: 'var(--color-bg)' }}
            title="bg"
          />
          <div
            className="demo-palette-1__swatch"
            style={{ background: 'var(--color-bg-2)' }}
            title="bg-2"
          />
          <div
            className="demo-palette-1__swatch"
            style={{ background: 'var(--color-accent)' }}
            title="accent"
          />
          <div
            className="demo-palette-1__swatch"
            style={{ background: 'var(--color-surface)' }}
            title="surface"
          />
          <div
            className="demo-palette-1__swatch"
            style={{ background: 'var(--color-surface-strong)' }}
            title="surface-strong"
          />
          <div
            className="demo-palette-1__swatch"
            style={{ background: 'var(--color-pill-bg)' }}
            title="pill-bg"
          />
        </div>

        <h2 className="demo-palette-1__section-title">Typography</h2>
        <div className="demo-palette-1__card">
          <h3>Heading sample</h3>
          <p>
            Body copy uses <strong>--color-fg-muted</strong> for secondary
            lines. Links pick up <a href="#demo">accent underlines</a>.
          </p>
        </div>

        <h2 className="demo-palette-1__section-title">Buttons</h2>
        <div className="demo-palette-1__row">
          <button type="button" className="demo-palette-1__btn demo-palette-1__btn--primary">
            Primary
          </button>
          <button type="button" className="demo-palette-1__btn demo-palette-1__btn--ghost">
            Ghost
          </button>
          <button type="button" className="demo-palette-1__btn demo-palette-1__btn--ghost">
            Cancel
          </button>
        </div>

        <h2 className="demo-palette-1__section-title">Pills</h2>
        <div className="demo-palette-1__row">
          <span className="demo-palette-1__pill">Label</span>
          <span className="demo-palette-1__pill">Seed</span>
          <span className="demo-palette-1__pill">Agent UX</span>
        </div>

        <h2 className="demo-palette-1__section-title">Surfaces</h2>
        <div className="demo-palette-1__card">
          <h3>Default surface</h3>
          <p>--color-surface with --color-stroke</p>
        </div>
        <div className="demo-palette-1__card demo-palette-1__card--strong">
          <h3>Strong surface</h3>
          <p>--color-surface-strong with --color-stroke-strong</p>
        </div>

        <h2 className="demo-palette-1__section-title">Form controls</h2>
        <div className="demo-palette-1__card demo-palette-1__card--strong">
          <label className="demo-palette-1__toggle" htmlFor="demo-check">
            <input id="demo-check" type="checkbox" defaultChecked />
            Remember preference
          </label>
          <div style={{ marginTop: '0.85rem' }}>
            <input
              className="demo-palette-1__input"
              type="text"
              placeholder="Search or filter…"
              aria-label="Demo text field"
            />
          </div>
        </div>

        <h2 className="demo-palette-1__section-title">Scrim</h2>
        <div className="demo-palette-1__scrim-demo">
          <div className="demo-palette-1__scrim-demo-bg">
            Content underneath — scrim + blur on top.
          </div>
          <div className="demo-palette-1__scrim-layer">
            <div className="demo-palette-1__scrim-card">Modal-style panel</div>
          </div>
        </div>
      </main>
    </div>
  )
}
