import { ExternalLink } from 'lucide-react'

import { FRIENDS_PILLS } from '../friends/friends'

export function HomeFriendsSection() {
  return (
    <section id="friends" className="home-section" aria-labelledby="friends-heading">
      <div className="home-main__prose home-main__prose--wide">
        <p className="home-section__kicker">Friends</p>
        <h2 id="friends-heading">People & peers</h2>
        <p className="home-section__lede home-friends__lede">
          Folks I trade ideas with — links go to their public profiles.
        </p>

        <ul className="home-friends__grid" role="list">
          {FRIENDS_PILLS.map((f) => (
            <li key={f.name} className="home-friends__cell">
              <a
                className="home-friend-pill"
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="home-friend-pill__row">
                  <span className="home-friend-pill__name">{f.name}</span>
                  <ExternalLink className="home-friend-pill__icon" size={16} strokeWidth={2} aria-hidden />
                </span>
                <span className="home-friend-pill__bio">{f.bio}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
