/**
 * Single source for HTML meta, Open Graph, Twitter, and JSON-LD copy.
 * Injected into index.html via Vite (see vite.config.ts); keep tokens in sync.
 * Align `public/site.webmanifest` `short_name` / `description` / `name` with this file.
 */
export const SITE_ORIGIN = 'https://cotten.io' as const

export const siteUrls = {
  canonical: `${SITE_ORIGIN}/`,
  ogImage: `${SITE_ORIGIN}/og-image.jpg`,
  profileImage: `${SITE_ORIGIN}/profile_avatar.jpg`,
} as const

/** PWA `name` (install prompt). */
export const manifestName = 'Tim Cotten' as const

/** PWA `short_name` (home screen label). */
export const manifestShortName = "Tim Cotten's Home Page" as const

/** Shared blurb: manifest `description`, meta description, OG/Twitter body, JSON-LD site/page/person. */
export const siteSummary =
  "Tim Cotten | Builds Autonomous AI Agents. Founder of Scrypted: a network for discovery, fuzzy verification, and attention auctions. Delula and Sidelines. Ex-EA, Ex-Mythic. ERC-8004, x402 contributor; adjunct at George Mason University." as const

/** Subpage <title> / share title for /latest and /updates (keep in sync with scripts/prerender.mjs). */
export const latestUpdatesHtmlTitle = 'Latest updates | Tim Cotten | Builds Autonomous AI Agents'

export const siteMeta = {
  /** <title> / og:title (tab + share headline; matches siteSummary lead) */
  htmlTitle: 'Tim Cotten | Builds Autonomous AI Agents',

  /** Primary meta description */
  metaDescription: siteSummary,

  /** Open Graph / Twitter headline */
  ogTitle: 'Tim Cotten | Builds Autonomous AI Agents',

  /** og:site_name: site brand, not the page title */
  ogSiteName: 'cotten.io',

  /** Open Graph / Twitter body (same story as manifest) */
  ogDescription: siteSummary,

  ogImageAlt:
    'Tim Cotten builds autonomous AI agents; founder of Scrypted (discovery, fuzzy verification, attention auctions). Delula and Sidelines. Ex-EA, Ex-Mythic; ERC-8004 and x402; George Mason adjunct.',

  /** WebSite + WebPage JSON-LD */
  jsonLdSitePageDescription: siteSummary,

  /** Person JSON-LD (same narrative) */
  jsonLdPersonDescription: siteSummary,

  /** Keep in sync with `site.webmanifest` `description` */
  manifestDescription: siteSummary,

  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',

  author: 'Tim Cotten',
  ogLocale: 'en_US',
  twitterSite: '@CottenIO',
  twitterCreator: '@CottenIO',

  knowsAbout: [
    'Autonomous AI agents',
    'Scrypted Network',
    'Discovery',
    'Fuzzy verification',
    'Attention auctions',
    'Delula',
    'Sidelines',
    'ERC-8004',
    'x402',
    'Game AI',
    'George Mason University',
  ] as const,
} as const
