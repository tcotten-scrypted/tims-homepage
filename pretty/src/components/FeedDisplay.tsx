import { useEffect, useRef, useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import {
  QuotedTweet,
  TweetBody,
  TweetContainer,
  TweetInfo,
  TweetInReplyTo,
  TweetNotFound,
  TweetSkeleton,
  enrichTweet,
  formatNumber,
  getMediaUrl,
  useTweet,
} from 'react-tweet'
import type { MediaDetails } from 'react-tweet/api'
import 'react-tweet/theme.css'

import type { HomeFeedItem } from '../feed/homeFeed'
import { HOME_FEED_PROFILE } from '../feed/homeFeed'

type EnrichedTweet = ReturnType<typeof enrichTweet>

/** Tweet fetches with index < this run immediately; rest wait for viewport (reduces critical request chain). */
const DEFAULT_EAGER_TWEET_COUNT = 1

function mediaPeekSrc(media: MediaDetails): string {
  if (media.type === 'photo') return getMediaUrl(media, 'small')
  return media.media_url_https
}

function FeedTweetMediaPeek({ tweet }: { tweet: EnrichedTweet }) {
  const list = tweet.mediaDetails
  if (!list?.length) return null
  const first = list[0]
  const more = list.length - 1

  return (
    <div className="home-feed-tweet__media-peek" aria-hidden>
      <img
        src={mediaPeekSrc(first)}
        alt=""
        className="home-feed-tweet__media-peek-img"
        loading="lazy"
        decoding="async"
      />
      {first.type !== 'photo' ? (
        <span className="home-feed-tweet__media-peek-badge" aria-hidden>
          {first.type === 'animated_gif' ? 'GIF' : 'Video'}
        </span>
      ) : null}
      {more > 0 ? (
        <span className="home-feed-tweet__media-peek-more" aria-hidden>
          +{more}
        </span>
      ) : null}
    </div>
  )
}

/** Plain links + text in initial HTML for no-JS users and simple HTTP clients (see prerender). */
function HomeFeedStaticFallback({ items }: { items: HomeFeedItem[] }) {
  const xHandle = HOME_FEED_PROFILE.handle.replace(/^@/, '')
  return (
    <noscript>
      <div className="home-feed__static-fallback">
        <p className="home-feed__static-fallback-kicker">Open updates directly (JavaScript off)</p>
        <ul className="home-feed__static-fallback-list">
          {items.flatMap((item) =>
            item.kind === 'link'
              ? [
                  <li key={item.url}>
                    <a href={item.url}>{item.title}</a>
                    {item.description ? <> — {item.description}</> : null}
                  </li>,
                ]
              : item.ids.map((id) => (
                  <li key={id}>
                    <a href={`https://x.com/${xHandle}/status/${id}`}>Post on X ({id})</a>
                  </li>
                )),
          )}
        </ul>
      </div>
    </noscript>
  )
}

function FeedLinkTile(props: Extract<HomeFeedItem, { kind: 'link' }>) {
  const { url, title, description, image, siteName } = props
  return (
    <a
      className="home-feed-tile home-feed-tile--link light"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="home-feed-tile__post">
        <div className="home-feed-tile__main">
          <div className="home-feed-tile__clip">
            <span className="home-feed-link-tile__inner">
              <span className="home-feed-link-tile__media">
                <img src={image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="home-feed-link-tile__body">
                {siteName ? <span className="home-feed-link-tile__site">{siteName}</span> : null}
                <span className="home-feed-link-tile__title">{title}</span>
                <span className="home-feed-link-tile__desc">{description}</span>
              </span>
            </span>
            <div className="home-feed-tile__fade" aria-hidden />
          </div>
        </div>
      </div>
    </a>
  )
}

/** SSR + first client paint: same grid/cell/tile shell as live feed, no useTweet (SWR breaks prerender). */
function FeedTweetTileShell({ ids }: { ids: string[] }) {
  return (
    <article className="home-feed-tile home-feed-tile--tweet light" aria-label="X post preview">
      {ids.map((id, i) => (
        <div
          key={id}
          className={i > 0 ? 'home-feed-tweet-unit home-feed-tweet-unit--follows' : 'home-feed-tweet-unit'}
        >
          <div className="home-feed-tile__post home-feed-tile__post--placeholder">
            <div className="home-feed-tile__main">
              <div className="home-feed-tile__clip">
                <TweetSkeleton />
                <div className="home-feed-tile__fade" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      ))}
    </article>
  )
}

function FeedPrerenderShell({ items }: { items: HomeFeedItem[] }) {
  return (
    <div className="home-feed__grid">
      {items.map((item) => (
        <div key={item.kind === 'tweet' ? item.ids.join('-') : item.url} className="home-feed__cell">
          {item.kind === 'tweet' ? (
            <FeedTweetTileShell ids={item.ids} />
          ) : (
            <FeedLinkTile {...item} />
          )}
        </div>
      ))}
    </div>
  )
}

function CompactTweetAuthorRow({ tweet }: { tweet: EnrichedTweet }) {
  const { user } = tweet
  return (
    <div className="home-feed-tweet__author-row">
      <img
        className="home-feed-tweet__author-avatar"
        src={user.profile_image_url_https}
        alt=""
        width={26}
        height={26}
      />
      <span className="home-feed-tweet__author-handle">@{user.screen_name}</span>
    </div>
  )
}

function TweetPlaceholderShell({ showTopBorder }: { showTopBorder?: boolean }) {
  return (
    <div className={showTopBorder ? 'home-feed-tweet-unit home-feed-tweet-unit--follows' : 'home-feed-tweet-unit'}>
      <div className="home-feed-tile__post home-feed-tile__post--placeholder">
        <div className="home-feed-tile__main">
          <div className="home-feed-tile__clip">
            <TweetSkeleton />
            <div className="home-feed-tile__fade" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Defers mounting (and useTweet / SWR) until the tile nears the viewport so dozens of tweets
 * on /latest do not chain off the main bundle.
 */
function LazyCompactFeedTweet({ id, showTopBorder }: { id: string; showTopBorder?: boolean }) {
  const [active, setActive] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active) return
    const el = rootRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin: '280px 0px', threshold: 0 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [active])

  if (active) {
    return <CompactFeedTweet id={id} showTopBorder={showTopBorder} />
  }

  return <div ref={rootRef}>{TweetPlaceholderShell({ showTopBorder })}</div>
}

/** X preview: compact avatar + @handle (no Follow), body, media peek, quoted, time. */
function CompactFeedTweet({ id, showTopBorder }: { id: string; showTopBorder?: boolean }) {
  const { data, error, isLoading } = useTweet(id)

  if (isLoading) {
    return <TweetPlaceholderShell showTopBorder={showTopBorder} />
  }

  if (error || !data) {
    return (
      <div className={showTopBorder ? 'home-feed-tweet-unit home-feed-tweet-unit--follows' : 'home-feed-tweet-unit'}>
        <div className="home-feed-tile__post home-feed-tile__post--placeholder">
          <div className="home-feed-tile__main">
            <div className="home-feed-tile__clip">
              <TweetNotFound error={error} />
              <div className="home-feed-tile__fade" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const tweet = enrichTweet(data)
  const likes = formatNumber(tweet.favorite_count)
  const comments = formatNumber(tweet.conversation_count)

  return (
    <div
      className={
        showTopBorder
          ? 'home-feed-tweet-unit home-feed-tweet-unit--follows home-feed-tweet-unit--tweet-click'
          : 'home-feed-tweet-unit home-feed-tweet-unit--tweet-click'
      }
    >
      <div className="home-feed-tile__post home-feed-tile__post--tweet-click">
        <div className="home-feed-tile__main">
          <a
            className="home-feed-tile__post-link"
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open post on X"
          />
          <div className="home-feed-tile__clip">
            <TweetContainer>
              <div className="home-feed-tile__post-stack">
                {tweet.in_reply_to_status_id_str ? <TweetInReplyTo tweet={tweet} /> : null}
                <div className="home-feed-tweet__inner">
                  <div className="home-feed-tweet__author">
                    <CompactTweetAuthorRow tweet={tweet} />
                  </div>
                  <TweetBody tweet={tweet} />
                  <FeedTweetMediaPeek tweet={tweet} />
                  {tweet.quoted_tweet ? <QuotedTweet tweet={tweet.quoted_tweet} /> : null}
                  <TweetInfo tweet={tweet} />
                </div>
              </div>
            </TweetContainer>
            <div className="home-feed-tile__fade" aria-hidden />
          </div>
          <div className="home-feed-tile__stats home-feed-tile__stats--overlay" role="group" aria-label="Post engagement">
            <span className="home-feed-tile__stat">
              <Heart className="home-feed-tile__stat-icon" size={14} strokeWidth={2} aria-hidden />
              <span className="home-feed-tile__stat-value">{likes}</span>
              <span className="home-feed-tile__stat-sr">likes</span>
            </span>
            <span className="home-feed-tile__stat">
              <MessageCircle className="home-feed-tile__stat-icon" size={14} strokeWidth={2} aria-hidden />
              <span className="home-feed-tile__stat-value">{comments}</span>
              <span className="home-feed-tile__stat-sr">comments</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeedTweetTile({
  ids,
  eagerFromIndex,
  eagerTweetCount,
}: {
  ids: string[]
  eagerFromIndex: number
  eagerTweetCount: number
}) {
  return (
    <article className="home-feed-tile home-feed-tile--tweet light" aria-label="X post preview">
      {ids.map((id, i) => {
        const globalIdx = eagerFromIndex + i
        const eager = globalIdx < eagerTweetCount
        return eager ? (
          <CompactFeedTweet key={id} id={id} showTopBorder={i > 0} />
        ) : (
          <LazyCompactFeedTweet key={id} id={id} showTopBorder={i > 0} />
        )
      })}
    </article>
  )
}

function FeedItems({ items, eagerTweetCount }: { items: HomeFeedItem[]; eagerTweetCount: number }) {
  let tweetIdIndex = 0
  return (
    <div className="home-feed__grid">
      {items.map((item) => {
        const key = item.kind === 'tweet' ? item.ids.join('-') : item.url
        if (item.kind === 'link') {
          return (
            <div key={key} className="home-feed__cell">
              <FeedLinkTile {...item} />
            </div>
          )
        }
        const eagerFrom = tweetIdIndex
        tweetIdIndex += item.ids.length
        return (
          <div key={key} className="home-feed__cell">
            <FeedTweetTile
              ids={item.ids}
              eagerFromIndex={eagerFrom}
              eagerTweetCount={eagerTweetCount}
            />
          </div>
        )
      })}
    </div>
  )
}

function FeedHydratedBody({ items, eagerTweetCount }: { items: HomeFeedItem[]; eagerTweetCount: number }) {
  const [live, setLive] = useState(false)
  useEffect(() => setLive(true), [])
  if (!live) return <FeedPrerenderShell items={items} />
  return <FeedItems items={items} eagerTweetCount={eagerTweetCount} />
}

export type FeedDisplayProps = {
  items: HomeFeedItem[]
  /**
   * First N tweet API fetches (by order in `items`, counting each thread id) run on mount.
   * Lower = shorter critical path; higher = snappier above-the-fold previews. Default 1.
   */
  eagerTweetCount?: number
}

/**
 * Prerender/SSR: one tile per feed item (same dimensions as live grid); tweet slots use TweetSkeleton.
 * After mount, swaps to SWR-backed tiles without changing column layout.
 */
export function FeedDisplay({ items, eagerTweetCount = DEFAULT_EAGER_TWEET_COUNT }: FeedDisplayProps) {
  return (
    <>
      <HomeFeedStaticFallback items={items} />
      <FeedHydratedBody items={items} eagerTweetCount={eagerTweetCount} />
    </>
  )
}
