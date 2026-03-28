import { siteMeta } from './siteMeta'

/** Canonical JSON-LD graph for the home page (same URLs as meta tags). */
export function getHomeJsonLdGraph(origin: string) {
  const personId = `${origin}/#person`
  const pageUrl = `${origin}/`
  const profileImage = `${origin}/profile_avatar.jpg`
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
        publisher: { '@id': personId },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: siteMeta.ogTitle,
        description: siteMeta.jsonLdSitePageDescription,
        isPartOf: { '@id': `${origin}/#website` },
        about: { '@id': personId },
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
        '@id': personId,
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
