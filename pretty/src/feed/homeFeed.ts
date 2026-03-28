/**
 * Curated homepage feed: X posts (react-tweet) and manual link cards (static OG-style fields).
 * Order: newest first (as listed). Add `link` entries to `HOME_FEED_ITEMS` anytime.
 */
export type HomeFeedTweetItem = {
  kind: 'tweet'
  /** Single post or thread: list ids top to bottom */
  ids: string[]
}

export type HomeFeedLinkItem = {
  kind: 'link'
  url: string
  title: string
  description: string
  /** Absolute URL to preview image */
  image: string
  siteName?: string
}

export type HomeFeedItem = HomeFeedTweetItem | HomeFeedLinkItem

/** Curated X posts (status id only), newest first */
const TWEET_IDS = [
  '2036149030812569934',
  '2033540418713845837',
  '2033343460137177303',
  '2032815289168003432',
  '1993090409611063329',
  '1991860057588535618',
  '1990404883548188781',
  '1975581664907612389',
  '1972316372064428070',
  '1956016095388950783',
  '1932510764394328102',
  '1923467817262723180',
  '1922643984305869039',
  '1913805755028734424',
  '1912859446625116568',
  '1905268871176593800',
  '1894510962197299695',
  '1894422391700205629',
  '1883259180825608519',
  '1867245562095153644',
  '1864113091123847484',
  '1859723005968122371',
  '1858696941540147593',
  '1857645420731859182',
  '1841536180321714415',
  '1817069457707024398',
  '1813680575821332756',
  '1792485178956304632',
  '1790757336916676960',
  '1790427362166731056',
  '1743410008468152560',
] as const

export const HOME_FEED_ITEMS: HomeFeedItem[] = [
  ...TWEET_IDS.map((id) => ({ kind: 'tweet' as const, ids: [id] })),
  // Example manual card:
  // {
  //   kind: 'link',
  //   url: 'https://blog.cotten.io/...',
  //   title: 'Post title',
  //   description: 'One-line summary for the card.',
  //   image: 'https://blog.cotten.io/.../og-image.jpg',
  //   siteName: 'blog.cotten.io',
  // },
]

/** How many feed tiles to show on the home page before linking to /latest */
export const HOME_FEED_PREVIEW_COUNT = 4

export function getHomeFeedPreviewItems(): HomeFeedItem[] {
  return HOME_FEED_ITEMS.slice(0, HOME_FEED_PREVIEW_COUNT)
}

export const HOME_FEED_PROFILE = {
  name: 'Tim Cotten',
  handle: '@CottenIO',
  avatarSrc: '/profile_avatar.png',
  xUrl: 'https://x.com/CottenIO',
} as const
