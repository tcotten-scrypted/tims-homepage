/** Set `true` to show the Friends block on the home page and in the nav. */
export const HOME_FRIENDS_SECTION_ENABLED = false

/** Sample entries — replace `href` (and copy) with real profiles. */
export type FriendPill = {
  name: string
  bio: string
  href: string
}

export const FRIENDS_PILLS: FriendPill[] = [
  {
    name: 'Morgan Chen',
    bio: 'Graphics & sims; we trade notes on agents, engines, and weird UX.',
    href: 'https://example.com/morgan-chen',
  },
  {
    name: 'Riley Santos',
    bio: 'Founder building voice-first copilots; co-conspirator on hackathon builds.',
    href: 'https://example.com/riley-santos',
  },
  {
    name: 'Dev Moore',
    bio: 'Security + evals for LLM systems; keeps me honest on threat models.',
    href: 'https://example.com/dev-moore',
  },
  {
    name: 'Aisha Khan',
    bio: 'Product design for dev tools; sharp feedback on anything I ship publicly.',
    href: 'https://example.com/aisha-khan',
  },
]
