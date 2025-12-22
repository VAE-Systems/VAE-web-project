/**
 * @copyright 2025 VAE Systems UG (haftungsbeschränkt)
 * @license PROPRIETARY
 * Admin Debug Page - Internal tool for website crawling and KI analysis
 *
 * ONLY AVAILABLE IN DEVELOPMENT MODE
 *
 * Usage:
 * - Dev: http://localhost:3000/admin/debug
 * - Production: Not accessible (route hidden)
 */

import { useSelfCrawl } from '@/hooks/useSelfCrawl'
import { ArrowRight, Download, Loader, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface CrawlStats {
  totalPages: number
  successPages: number
  failedPages: number
  crawlTime: number
}

export const AdminDebugPage = () => {
  const { crawlData, isLoading, error, startCrawl, downloadJSON, downloadMarkdown } = useSelfCrawl()
  const [stats, setStats] = useState<CrawlStats | null>(null)

  const handleCrawl = async () => {
    const startTime = Date.now()

    startCrawl({
      baseUrl: window.location.origin,
      paths: [
        '/',
        '/leistungen/strategie',
        '/leistungen/infrastruktur',
        '/leistungen/betreuung',
        '/ressourcen/faq',
        '/ueber-uns/werte',
        '/contact',
      ],
      includeMetadata: true,
      includeStructuredData: true,
    })

    // Stats nach Crawl
    setTimeout(() => {
      const crawlTime = Date.now() - startTime
      if (crawlData) {
        setStats({
          totalPages: crawlData.length,
          successPages: crawlData.filter(p => p.content).length,
          failedPages: crawlData.filter(p => !p.content).length,
          crawlTime,
        })
      }
    }, 500)
  }

  return (
    <div className="from-bg-primary min-h-screen bg-gradient-to-br to-bg-darker py-16 dark:from-bg-dark dark:to-bg-darker">
      <div className="mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-vae-turquoise" />
            <span className="text-sm font-medium text-vae-turquoise">Admin Debug Mode</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-text-light">Website Self-Crawl</h1>
          <p className="text-text-secondary">
            Crawle deine Website und exportiere die Inhalte für KI-Analyse mit Claude/ChatGPT
          </p>
        </div>

        {/* Warning */}
        <div className="mb-8 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500" />
          <div className="text-sm">
            <p className="font-medium text-amber-700 dark:text-amber-400">Development Only</p>
            <p className="mt-1 text-amber-600 dark:text-amber-300">
              Diese Seite ist nur im Development-Modus verfügbar. Sie ist nicht in Production accessible.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-bg-secondary bg-white/50 p-8 backdrop-blur dark:bg-bg-dark/50">
          {/* Crawl Button */}
          <div className="mb-8">
            <button
              onClick={handleCrawl}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-vae-turquoise to-vae-turquoise/80 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-vae-turquoise/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Crawling...</span>
                </>
              ) : (
                <>
                  <span>🤖 Crawl meine Website</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm text-red-700 dark:text-red-400">
                <strong>Fehler:</strong> {error}
              </p>
            </div>
          )}

          {/* Stats */}
          {stats && crawlData && (
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/50 p-4 dark:bg-white/10">
                <p className="text-sm text-text-secondary">Seiten gecrawlt</p>
                <p className="text-2xl font-bold text-vae-turquoise">{stats.totalPages}</p>
              </div>
              <div className="rounded-lg bg-white/50 p-4 dark:bg-white/10">
                <p className="text-sm text-text-secondary">Crawl-Zeit</p>
                <p className="text-2xl font-bold text-vae-turquoise">{(stats.crawlTime / 1000).toFixed(2)}s</p>
              </div>
              <div className="rounded-lg bg-white/50 p-4 dark:bg-white/10">
                <p className="text-sm text-text-secondary">Erfolgreich</p>
                <p className="text-2xl font-bold text-green-500">{stats.successPages}</p>
              </div>
              <div className="rounded-lg bg-white/50 p-4 dark:bg-white/10">
                <p className="text-sm text-text-secondary">Fehler</p>
                <p className="text-2xl font-bold text-red-500">{stats.failedPages}</p>
              </div>
            </div>
          )}

          {/* Download Options */}
          {crawlData && crawlData.length > 0 && (
            <div className="space-y-3">
              <p className="mb-3 text-sm font-medium text-text-secondary">Daten exportieren:</p>
              <button
                onClick={downloadJSON}
                className="flex w-full items-center gap-2 rounded-lg border border-bg-secondary bg-white/30 px-4 py-3 text-text-light transition-all hover:bg-white/50 dark:bg-white/10 dark:hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
                <span>JSON Download</span>
                <span className="ml-auto text-xs text-text-secondary">{crawlData.length} Pages</span>
              </button>
              <button
                onClick={downloadMarkdown}
                className="flex w-full items-center gap-2 rounded-lg border border-bg-secondary bg-white/30 px-4 py-3 text-text-light transition-all hover:bg-white/50 dark:bg-white/10 dark:hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
                <span>Markdown Download</span>
                <span className="ml-auto text-xs text-text-secondary">Für Claude/ChatGPT</span>
              </button>
            </div>
          )}

          {/* Instructions */}
          {!crawlData && (
            <div className="space-y-4 text-sm text-text-secondary">
              <h3 className="font-medium text-text-light">So funktioniert's:</h3>
              <ol className="list-inside list-decimal space-y-2">
                <li>Klicke auf "Crawl meine Website"</li>
                <li>Warte, bis der Crawl abgeschlossen ist</li>
                <li>Downloade die Daten als JSON oder Markdown</li>
                <li>Paste die Markdown in Claude/ChatGPT</li>
                <li>Lasse die KI deine Website analysieren und Verbesserungen vorschlagen</li>
              </ol>
            </div>
          )}
        </div>

        {/* Content Preview */}
        {crawlData && crawlData.length > 0 && (
          <div className="mt-8 rounded-2xl border border-bg-secondary bg-white/50 p-8 backdrop-blur dark:bg-bg-dark/50">
            <h3 className="mb-4 text-lg font-semibold text-text-light">Gecrawlte Seiten</h3>
            <div className="space-y-3">
              {crawlData.map((page, i) => (
                <div key={i} className="rounded-lg bg-white/30 p-3 dark:bg-white/10">
                  <p className="text-sm font-medium text-vae-turquoise">{page.title}</p>
                  <p className="mt-1 text-xs text-text-secondary">{page.url}</p>
                  <p className="mt-1 text-xs text-text-muted">{page.content.split('\n').length} Zeilen Inhalt</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDebugPage
