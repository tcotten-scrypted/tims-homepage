/**
 * Single source for HTML meta, Open Graph, Twitter, and JSON-LD copy.
 * Injected into index.html via Vite (see vite.config.ts); keep tokens in sync.
 */
export const SITE_ORIGIN = 'https://www.cotten.io' as const

export const siteUrls = {
  canonical: `${SITE_ORIGIN}/`,
  ogImage: `${SITE_ORIGIN}/og-image.jpg`,
  profileImage: `${SITE_ORIGIN}/profile_avatar.png`,
} as const

export const siteMeta = {
  /** <title>: who he is + what he is building (search + tabs) */
  htmlTitle: 'Tim Cotten | Scrypted Network & autonomous AI agents',

  /**
   * Primary meta description (~150-160 chars). Thesis-forward, not a site map.
   * Persona bar: investors want crisp "what"; peers want mechanisms; avoid generic superlatives.
   */
  metaDescription:
    'Tim Cotten: Scrypted Network for autonomous AI agents (discovery & attention markets) and Delula. Former EA game AI; ERC-8004; adjunct, George Mason.',

  /** Open Graph / Twitter headline (share cards) */
  ogTitle: 'Tim Cotten | Scrypted Network & autonomous AI agents',

  /** og:site_name: site brand, not the page title */
  ogSiteName: 'cotten.io',

  /**
   * Open Graph / Twitter body: founder + product thesis for preview panes.
   * Not "what is on this site"; concrete stack, credibility, teaching.
   */
  ogDescription:
    'Founder of Scrypted, building the Scrypted Network: discovery, workflows, and attention markets for autonomous AI agents, with Delula as the live consumer surface on that stack. Former large-scale game AI at EA; ERC-8004 and related standards work; teaches Generative AI in Game Development at George Mason.',

  ogImageAlt:
    'Tim Cotten on cotten.io: video banner with profile and “Builds Autonomous AI Agents” headline.',

  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',

  author: 'Tim Cotten',
  ogLocale: 'en_US',
  twitterSite: '@CottenIO',
  twitterCreator: '@CottenIO',
} as const
