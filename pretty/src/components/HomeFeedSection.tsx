import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

import {
  getHomeFeedPreviewItems,
  HOME_FEED_ITEMS,
  HOME_FEED_PREVIEW_COUNT,
  HOME_FEED_PROFILE,
} from '../feed/homeFeed'
import { FeedDisplay } from './FeedDisplay'

const previewItems = getHomeFeedPreviewItems()
const previousUpdatesCount = Math.max(0, HOME_FEED_ITEMS.length - HOME_FEED_PREVIEW_COUNT)

export function HomeFeedSection() {
  return (
    <section id="updates" className="home-section home-section--muted" aria-labelledby="updates-heading">
      <div className="home-main__prose home-main__prose--wide">
        <p className="home-section__kicker">Latest</p>
        <h2 id="updates-heading">Updates</h2>

        <div className="home-feed__card">
          <div className="home-feed__card-head">
            <img
              className="home-feed__avatar"
              src={HOME_FEED_PROFILE.avatarSrc}
              width={40}
              height={40}
              alt=""
            />
            <div className="home-feed__card-head-text">
              <p className="home-feed__card-name">{HOME_FEED_PROFILE.name}</p>
              <p className="home-feed__card-handle">{HOME_FEED_PROFILE.handle}</p>
            </div>
            <a
              className="home-feed__card-profile"
              href={HOME_FEED_PROFILE.xUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow me on 𝕏
              <ExternalLink size={14} strokeWidth={2} aria-hidden />
            </a>
          </div>
          <div className="home-feed__card-body">
            <FeedDisplay items={previewItems} eagerTweetCount={2} />
            {previousUpdatesCount > 0 ? (
              <p className="home-feed__more">
                Read previous <Link to="/latest">updates ({previousUpdatesCount})</Link>.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
