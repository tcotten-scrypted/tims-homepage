import { useEffect } from 'react'

import { SITE_ORIGIN, siteMeta } from '../seo/siteMeta'

const PERSON_ID = 'https://www.cotten.io/#person'

/** Structured data for search; canonical URL from window at runtime. */
export function HomeJsonLd() {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : SITE_ORIGIN
    const pageUrl = `${origin}/`
    const profileImage = `${origin}/profile_avatar.png`
    const ogImage = `${origin}/og-image.jpg`

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: siteMeta.ogSiteName,
          description: siteMeta.metaDescription,
          publisher: { '@id': PERSON_ID },
          inLanguage: 'en-US',
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: siteMeta.ogTitle,
          description: siteMeta.metaDescription,
          isPartOf: { '@id': `${origin}/#website` },
          about: { '@id': PERSON_ID },
          inLanguage: 'en-US',
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: ogImage,
            width: 1200,
            height: 630,
            caption: siteMeta.ogImageAlt,
          },
        },
        {
          '@type': 'Person',
          '@id': PERSON_ID,
          name: 'Tim Cotten',
          url: pageUrl,
          image: profileImage,
          description: siteMeta.metaDescription,
          jobTitle: 'Founder & CEO',
          email: 'mailto:tim@cotten.io',
          sameAs: [
            'https://www.linkedin.com/in/timcotten',
            'https://x.com/CottenIO',
            'https://warpcast.com/cottenio',
            'https://scrypted.ai',
            'https://delu.la',
            'https://blog.cotten.io',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Scrypted',
            url: 'https://scrypted.ai',
          },
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'George Mason University',
          },
          knowsAbout: [
            'Autonomous agents',
            'Smart contracts',
            'ERC-8004',
            'x402',
            'AI in games',
            'Scrypted Network',
            'Delula',
            'Solidity',
            'Machine learning',
          ],
        },
      ],
    }

    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-home-jsonld', '')
    el.textContent = JSON.stringify(graph)
    document.head.appendChild(el)
    return () => {
      document.querySelectorAll('script[data-home-jsonld]').forEach((s) => s.remove())
    }
  }, [])

  return null
}
