import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FeedDisplay } from '../components/FeedDisplay'
import { HomeNav } from '../components/HomeNav'
import { HOME_FEED_ITEMS, HOME_FEED_PROFILE } from '../feed/homeFeed'
import '../site.css'
import '../styles/home-shell.css'

export default function LatestUpdatesPage() {
  useEffect(() => {
    document.body.classList.add('home-shell')
    return () => document.body.classList.remove('home-shell')
  }, [])

  return (
    <div id="top">
      <main id="main-content" className="home-main home-main--subpage" lang="en">
        <section className="home-section home-section--muted" aria-labelledby="latest-updates-heading">
          <div data-critters-container>
            <HomeNav />
            <div className="home-main__prose home-main__prose--wide">
              <p className="home-section__kicker">Latest</p>
              <h1 id="latest-updates-heading">Latest updates</h1>
              <p className="home-feed__intro">
                Full feed from{' '}
                <a href={HOME_FEED_PROFILE.xUrl} target="_blank" rel="noopener noreferrer">
                  {HOME_FEED_PROFILE.handle}
                </a>
                , plus curated links. Each X tile opens the post in a new tab.
              </p>
              <p className="home-subpage__back">
                <Link to="/">← Back to home</Link>
              </p>
            </div>

            <div className="home-feed__card home-feed__card--flat">
              <div className="home-feed__card-body home-feed__card-body--flush">
                <FeedDisplay items={HOME_FEED_ITEMS} eagerTweetCount={0} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer meta">
        <p>
          <Link to="/">Tim Cotten</Link>
          {' · '}
          <a href={HOME_FEED_PROFILE.xUrl} target="_blank" rel="noopener noreferrer">
            X
          </a>
        </p>
        <p>© 2026 Tim Cotten</p>
      </footer>
    </div>
  )
}
