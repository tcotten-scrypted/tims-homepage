import { useEffect, useState } from 'react'
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

type EnrichedTweet = ReturnType<typeof enrichTweet>

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

function FeedSkeleton({ count }: { count: number }) {
  return (
    <div className="home-feed__grid" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="home-feed-tile home-feed-tile--skeleton light">
          <div className="home-feed-tweet-unit">
            <div className="home-feed-tile__post">
              <div className="home-feed-tile__main">
                <div className="home-feed-tile__clip">
                  <TweetSkeleton />
                  <div className="home-feed-tile__fade" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
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

/** X preview: compact avatar + @handle (no Follow), body, media peek, quoted, time. */
function CompactFeedTweet({ id, showTopBorder }: { id: string; showTopBorder?: boolean }) {
  const { data, error, isLoading } = useTweet(id)

  if (isLoading) {
    return (
      <div className={showTopBorder ? 'home-feed-tweet-unit home-feed-tweet-unit--follows' : 'home-feed-tweet-unit'}>
        <div className="home-feed-tile__post">
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

  if (error || !data) {
    return (
      <div className={showTopBorder ? 'home-feed-tweet-unit home-feed-tweet-unit--follows' : 'home-feed-tweet-unit'}>
        <div className="home-feed-tile__post">
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

function FeedTweetTile({ ids }: { ids: string[] }) {
  return (
    <article className="home-feed-tile home-feed-tile--tweet light" aria-label="X post preview">
      {ids.map((id, i) => (
        <CompactFeedTweet key={id} id={id} showTopBorder={i > 0} />
      ))}
    </article>
  )
}

function FeedItems({ items }: { items: HomeFeedItem[] }) {
  return (
    <div className="home-feed__grid">
      {items.map((item) => (
        <div key={item.kind === 'tweet' ? item.ids.join('-') : item.url} className="home-feed__cell">
          {item.kind === 'tweet' ? (
            <FeedTweetTile ids={item.ids} />
          ) : (
            <FeedLinkTile {...item} />
          )}
        </div>
      ))}
    </div>
  )
}

function FeedHydratedBody({ items, skeletonCount }: { items: HomeFeedItem[]; skeletonCount: number }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])
  if (!ready) return <FeedSkeleton count={skeletonCount} />
  return <FeedItems items={items} />
}

export type FeedDisplayProps = {
  items: HomeFeedItem[]
  /** Skeleton tiles while client-only tweet mount prepares */
  skeletonCount?: number
}

export function FeedDisplay({ items, skeletonCount }: FeedDisplayProps) {
  const n = skeletonCount ?? Math.min(4, Math.max(1, items.length))
  return <FeedHydratedBody items={items} skeletonCount={n} />
}
