#!/usr/bin/env node
/**
 * VAE Website Crawler → Desktop Markdown Export
 *
 * Crawlt die gesamte VAE Website und exportiert sie als Markdown
 * auf den Desktop für KI-Analysen (Claude, ChatGPT)
 *
 * Liest automatisch alle aktiven URLs aus der sitemap.xml
 *
 * Usage:
 *   node scripts/crawl-to-desktop.js
 *   node scripts/crawl-to-desktop.js --url=https://vae.systems
 */

import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONFIG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const USE_LOCAL = process.argv.includes('--local')
const BASE_URL = 'https://vae.systems' // Only for reference in output
const DESKTOP_PATH = path.join(
  process.env.HOME,
  'Desktop',
  `vae-website-crawl-${new Date().toISOString().split('T')[0]}.md`
)
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml')
const DIST_PATH = path.join(__dirname, '../dist')

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SITEMAP PARSER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseRoutesFromSitemap() {
  console.log(`📄 Reading sitemap from: ${SITEMAP_PATH}`)
  const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8')
  const routes = []

  // Extract all <loc> tags
  const locMatches = sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)

  for (const match of locMatches) {
    const url = match[1]
    // Extract path from full URL (remove https://vae.systems)
    const route = url.replace(/^https?:\/\/vae\.systems/, '') || '/'
    routes.push(route)
  }

  console.log(`✅ Found ${routes.length} routes in sitemap\n`)
  return routes
}

const ROUTES = parseRoutesFromSitemap()

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function extractMainContent(dom) {
  const doc = dom.window.document

  // Remove non-content elements
  const selectorsToRemove = [
    'script',
    'style',
    'nav',
    'header',
    'footer',
    '[role="navigation"]',
    '.skip-link',
    '.skip-to-content',
    'button[aria-label*="Menü"]',
    'button[data-theme-toggle]',
  ]

  selectorsToRemove.forEach(selector => {
    doc.querySelectorAll(selector).forEach(el => el.remove())
  })

  // Get main content
  const main = doc.querySelector('main') || doc.querySelector('[role="main"]') || doc.body

  return main.textContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
}

function extractMetadata(dom) {
  const doc = dom.window.document
  const metadata = {}

  // Title
  metadata.title = doc.querySelector('title')?.textContent || ''

  // Description
  metadata.description = doc.querySelector('meta[name="description"]')?.content || ''

  // Open Graph
  doc.querySelectorAll('meta[property^="og:"]').forEach(meta => {
    const property = meta.getAttribute('property')
    const content = meta.getAttribute('content')
    if (property && content) metadata[property] = content
  })

  // Twitter
  doc.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
    const name = meta.getAttribute('name')
    const content = meta.getAttribute('content')
    if (name && content) metadata[name] = content
  })

  return metadata
}

function extractHeadings(dom) {
  const doc = dom.window.document
  const headings = []

  doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    const level = parseInt(heading.tagName[1])
    const text = heading.textContent.trim()
    if (text) {
      headings.push({ level, text })
    }
  })

  return headings
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN CRAWLER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function crawlPage(route) {
  // Read directly from dist/ folder (prerendered HTML)
  const htmlPath = route === '/' ? path.join(DIST_PATH, 'index.html') : path.join(DIST_PATH, route, 'index.html')

  console.log(`📂 Reading: ${route}`)

  try {
    if (!fs.existsSync(htmlPath)) {
      console.warn(`⚠️  Not found: ${htmlPath}`)
      return null
    }

    const html = fs.readFileSync(htmlPath, 'utf8')
    const dom = new JSDOM(html)
    const url = `${BASE_URL}${route}`

    const metadata = extractMetadata(dom)
    const headings = extractHeadings(dom)
    const content = extractMainContent(dom)

    return {
      url,
      route,
      title: metadata.title,
      description: metadata.description,
      headings,
      content,
      metadata,
    }
  } catch (error) {
    console.error(`❌ Error reading ${route}:`, error.message)
    return null
  }
}

function formatPageAsMarkdown(page) {
  if (!page) return ''

  let md = `\n${'='.repeat(80)}\n\n`
  md += `# ${page.title || 'Untitled Page'}\n\n`
  md += `**URL:** ${page.url}\n`
  md += `**Route:** ${page.route}\n\n`

  if (page.description) {
    md += `**Description:** ${page.description}\n\n`
  }

  if (page.headings.length > 0) {
    md += `## Headings Structure\n\n`
    page.headings.forEach(h => {
      md += `${'  '.repeat(h.level - 1)}- ${h.text}\n`
    })
    md += `\n`
  }

  md += `## Content\n\n`
  md += page.content
  md += `\n\n`

  if (Object.keys(page.metadata).length > 0) {
    md += `## Metadata\n\n`
    md += '```json\n'
    md += JSON.stringify(page.metadata, null, 2)
    md += '\n```\n'
  }

  return md
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RUN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function main() {
  console.log('🚀 VAE Website Crawler (Local Build)')
  console.log(`📁 Reading from: ${DIST_PATH}`)
  console.log(`💾 Output: ${DESKTOP_PATH}`)
  console.log(`📄 Routes: ${ROUTES.length}\n`)

  // Check if dist/ exists
  if (!fs.existsSync(DIST_PATH)) {
    console.error('❌ dist/ folder not found!')
    console.error('   Run: npm run build')
    process.exit(1)
  }

  let markdown = `# VAE Systems Website Crawl\n\n`
  markdown += `**Generated:** ${new Date().toISOString()}\n`
  markdown += `**Base URL:** ${BASE_URL}\n`
  markdown += `**Total Pages:** ${ROUTES.length}\n\n`
  markdown += `---\n\n`
  markdown += `## Table of Contents\n\n`

  const pages = []

  // Crawl all pages
  for (const route of ROUTES) {
    const page = await crawlPage(route)
    if (page) {
      pages.push(page)
      markdown += `- [${page.title}](#${page.route.replace(/\//g, '')})\n`
    }
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  markdown += `\n---\n\n`

  // Append all pages
  pages.forEach(page => {
    markdown += formatPageAsMarkdown(page)
  })

  // Write to desktop
  fs.writeFileSync(DESKTOP_PATH, markdown, 'utf8')

  console.log(`\n✅ Crawl complete!`)
  console.log(`📊 Successfully crawled: ${pages.length}/${ROUTES.length} pages`)
  console.log(`💾 Saved to: ${DESKTOP_PATH}`)
  console.log(`📏 File size: ${(fs.statSync(DESKTOP_PATH).size / 1024).toFixed(2)} KB`)
}

main().catch(console.error)
