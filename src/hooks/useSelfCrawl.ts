/**
 * @copyright 2025 VAE Systems UG (haftungsbeschränkt)
 * @license PROPRIETARY
 *
 * Internal Website Crawler - Crawl your own website content for internal KI analysis
 * Export to JSON for processing with Claude/ChatGPT
 *
 * Unauthorized copying, modification, or use for training AI models is prohibited.
 * All rights reserved.
 *
 * Contact: juliangoertz@vae.systems
 */

import React, { useState } from 'react'

interface CrawlConfig {
  baseUrl: string
  paths: string[]
  includeMetadata?: boolean
  includeStructuredData?: boolean
}

interface PageContent {
  url: string
  title: string
  description: string
  h1: string | null
  headings: Array<{
    level: number
    text: string
  }>
  content: string
  metadata: Record<string, string>
  timestamp: string
}

/**
 * Crawl internal pages and extract content for KI analysis
 */
export const crawlWebsite = async (config: CrawlConfig): Promise<PageContent[]> => {
  const results: PageContent[] = []

  for (const path of config.paths) {
    try {
      const url = new URL(path, config.baseUrl).toString()
      const response = await fetch(url)

      if (!response.ok) {
        console.warn(`Failed to crawl ${url}: ${response.statusText}`)
        continue
      }

      const html = await response.text()
      const doc = new DOMParser().parseFromString(html, 'text/html')

      const pageContent: PageContent = {
        url,
        title: doc.querySelector('title')?.textContent || '',
        description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        h1: doc.querySelector('h1')?.textContent || null,
        headings: Array.from(doc.querySelectorAll('h2, h3, h4')).map(el => ({
          level: parseInt(el.tagName[1]),
          text: el.textContent || '',
        })),
        content: extractMainContent(doc),
        metadata: extractMetadata(doc),
        timestamp: new Date().toISOString(),
      }

      results.push(pageContent)
    } catch (error) {
      console.error(`Error crawling ${path}:`, error)
    }
  }

  return results
}

/**
 * Extract main content from page (removes scripts, styles, etc.)
 */
const extractMainContent = (doc: Document): string => {
  const clone = doc.cloneNode(true) as Document

  // Remove script, style, nav, footer
  const removeSelectors = ['script', 'style', 'nav', 'footer', '[role="navigation"]', '.header', '.navbar']

  removeSelectors.forEach(selector => {
    clone.querySelectorAll(selector).forEach(el => el.remove())
  })

  // Get main content
  const main = clone.querySelector('main') || clone.querySelector('[role="main"]')
  const text = (main || clone.body).textContent || ''

  // Clean up whitespace
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
}

/**
 * Extract metadata (og:, twitter:, etc.)
 */
const extractMetadata = (doc: Document): Record<string, string> => {
  const metadata: Record<string, string> = {}

  // Open Graph
  doc.querySelectorAll('meta[property^="og:"]').forEach(meta => {
    const property = meta.getAttribute('property') || ''
    const content = meta.getAttribute('content') || ''
    metadata[property] = content
  })

  // Twitter
  doc.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
    const name = meta.getAttribute('name') || ''
    const content = meta.getAttribute('content') || ''
    metadata[name] = content
  })

  return metadata
}

/**
 * Export crawled data as JSON for KI processing
 */
export const exportCrawlData = (pages: PageContent[]): string => {
  return JSON.stringify(
    {
      crawlDate: new Date().toISOString(),
      totalPages: pages.length,
      pages,
    },
    null,
    2
  )
}

/**
 * Export as markdown for better KI ingestion
 */
export const exportCrawlAsMarkdown = (pages: PageContent[]): string => {
  return pages
    .map(
      page => `
# ${page.title}

**URL:** ${page.url}
**Description:** ${page.description}

## Headings
${page.headings.map(h => `${'#'.repeat(h.level + 1)} ${h.text}`).join('\n')}

## Content
${page.content}

## Metadata
\`\`\`json
${JSON.stringify(page.metadata, null, 2)}
\`\`\`

---
`
    )
    .join('\n')
}

/**
 * React Hook für Website-Crawl
 */
export const useSelfCrawl = () => {
  const [crawlData, setCrawlData] = React.useState<PageContent[] | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const startCrawl = async (config: CrawlConfig) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await crawlWebsite(config)
      setCrawlData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadJSON = () => {
    if (!crawlData) return
    const json = exportCrawlData(crawlData)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `website-crawl-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadMarkdown = () => {
    if (!crawlData) return
    const markdown = exportCrawlAsMarkdown(crawlData)
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `website-crawl-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    crawlData,
    isLoading,
    error,
    startCrawl,
    downloadJSON,
    downloadMarkdown,
  }
}
