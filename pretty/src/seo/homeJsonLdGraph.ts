import { siteMeta } from './siteMeta'

const PERSON_ID = 'https://www.cotten.io/#person'

/** Canonical JSON-LD graph for the home page (same URLs as meta tags). */
export function getHomeJsonLdGraph(origin: string) {
  const pageUrl = `${origin}/`
  const profileImage = `${origin}/profile_avatar.png`
  const ogImage = `${origin}/og-image.jpg`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: siteMeta.ogSiteName,
        description: siteMeta.jsonLdSitePageDescription,
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: siteMeta.ogTitle,
        description: siteMeta.jsonLdSitePageDescription,
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
        description: siteMeta.jsonLdPersonDescription,
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
        knowsAbout: [...siteMeta.knowsAbout],
      },
    ],
  }
}
