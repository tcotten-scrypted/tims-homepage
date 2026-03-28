import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

import { siteMeta, siteUrls } from './src/seo/siteMeta'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function injectSiteMeta(): Plugin {
  return {
    name: 'inject-site-meta',
    transformIndexHtml(html) {
      const map: Record<string, string> = {
        '%SITE_HTML_TITLE%': siteMeta.htmlTitle,
        '%SITE_META_DESCRIPTION%': siteMeta.metaDescription,
        '%SITE_CANONICAL_URL%': siteUrls.canonical,
        '%SITE_OG_TITLE%': siteMeta.ogTitle,
        '%SITE_OG_SITE_NAME%': siteMeta.ogSiteName,
        '%SITE_OG_DESCRIPTION%': siteMeta.ogDescription,
        '%SITE_OG_URL%': siteUrls.canonical,
        '%SITE_OG_IMAGE%': siteUrls.ogImage,
        '%SITE_OG_IMAGE_ALT%': siteMeta.ogImageAlt,
        '%SITE_TWITTER_TITLE%': siteMeta.ogTitle,
        '%SITE_TWITTER_DESCRIPTION%': siteMeta.ogDescription,
        '%SITE_TWITTER_IMAGE%': siteUrls.ogImage,
        '%SITE_ROBOTS%': siteMeta.robots,
        '%SITE_AUTHOR%': siteMeta.author,
        '%SITE_OG_LOCALE%': siteMeta.ogLocale,
        '%SITE_TWITTER_SITE%': siteMeta.twitterSite,
        '%SITE_TWITTER_CREATOR%': siteMeta.twitterCreator,
      }
      let out = html
      for (const [token, value] of Object.entries(map)) {
        if (!out.includes(token)) {
          throw new Error(`inject-site-meta: missing token ${token} in index.html`)
        }
        out = out.split(token).join(value)
      }
      return out
    },
  }
}

// boardy-intro-react is a file: dep that may carry its own react@18; React 19 rejects
// those elements (minified error #525). Force one React for the bundle.
const reactRoot = path.resolve(__dirname, 'node_modules/react')
const reactDomRoot = path.resolve(__dirname, 'node_modules/react-dom')

// https://vite.dev/config/
export default defineConfig({
  // '/' so /demo/* deep links resolve /assets/* correctly; './' breaks nested routes.
  base: '/',
  plugins: [react(), injectSiteMeta()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: reactRoot,
      'react/jsx-runtime': path.join(reactRoot, 'jsx-runtime.js'),
      'react/jsx-dev-runtime': path.join(reactRoot, 'jsx-dev-runtime.js'),
      'react-dom': reactDomRoot,
      'react-dom/client': path.join(reactDomRoot, 'client.js'),
    },
  },
  ssr: {
    target: 'node',
    // Bundle React + router into the SSR chunk so react-dom/server shares one dispatcher (no invalid hook call).
    noExternal: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'lucide-react',
      'boardy-intro-react',
    ],
  },
})
