import { getHomeJsonLdGraph } from '../seo/homeJsonLdGraph'
import { SITE_ORIGIN } from '../seo/siteMeta'

const jsonLd = JSON.stringify(getHomeJsonLdGraph(SITE_ORIGIN))

/**
 * Inline JSON-LD so it appears in prerendered HTML (crawlers) as well as after hydration.
 */
export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      data-home-jsonld=""
      // Safe: fixed structured data from siteMeta / graph builder only.
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  )
}
