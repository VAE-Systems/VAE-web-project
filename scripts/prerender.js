/**
 * Pre-render Script
 *
 * Generates static HTML files for all routes before deployment
 * Fixes SEO issues with Client-Side Rendering
 *
 * Usage: node scripts/prerender.js (after npm run build)
 */

import PrerenderSPAPlugin from 'prerender-spa-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routes = [
  '/',
  '/leistungen/strategie',
  '/leistungen/infrastruktur',
  '/leistungen/betreuung',
  '/ressourcen/faq',
  '/ressourcen/blog',
  '/ressourcen/case-studies',
  '/ueber-uns/werte',
  '/ueber-uns/design-handwerk',
  '/ueber-uns/leitung',
  '/contact',
  '/impressum',
  '/privacy',
]

console.log('🔨 Starting pre-rendering for SEO...')
console.log(`📄 Routes to pre-render: ${routes.length}`)

new PrerenderSPAPlugin({
  staticDir: path.join(__dirname, '../dist'),
  routes: routes,
  renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
    renderAfterTime: 3000, // Wait 3 seconds for JS to render
    headless: true,
  }),
}).apply({
  hooks: {
    done: () => {
      console.log('✅ Pre-rendering complete! All routes have static HTML.')
      console.log('📊 Your site is now crawlable by Google & bots.')
    },
    error: error => {
      console.error('❌ Pre-rendering failed:', error)
      process.exit(1)
    },
  },
})
