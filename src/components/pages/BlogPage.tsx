/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  BLOG PAGE (Listing)                                                      ┃
 * ┃  Interner Blog: Featured-Artikel + Magazin-Grid. Kein externer Link.      ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ AUFBAU
 * ├── Hero      → Eyebrow, große Headline, ein Satz
 * ├── Featured  → Neuester/featured Artikel als breite Karte
 * └── Grid      → Übrige Artikel, 2-spaltig
 *
 * 📍 CONTENT-QUELLE: src/content/blog.ts — neuer Artikel = neues Objekt dort.
 */

import Seo from '@/components/ui/Seo'
import { blogContent, sortedBlogPosts } from '@/content/blog'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogPage: React.FC = () => {
  const featured = sortedBlogPosts.find(post => post.featured) ?? sortedBlogPosts[0]
  const rest = sortedBlogPosts.filter(post => post.slug !== featured?.slug)

  return (
    <div className="relative z-0 min-h-[100dvh] bg-white text-gray-900 dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="Blog – Souveräne Technologie, klar erklärt | VAE Systems"
        description="Methoden, Einordnungen und Werkzeuge aus echten Projekten: Self-Hosting, lokale KI und digitale Souveränität – geschrieben für Entscheider."
        canonicalPath="/ressourcen/blog"
      />

      {/* ── HERO ── */}
      <header className="accent-section relative overflow-hidden border-b border-vae-turquoise/25 bg-vae-turquoise pb-16 pt-28 text-white dark:border-white/5 dark:bg-bg-darker dark:text-text-light sm:pb-20 sm:pt-36">
        {/* Firefly-Bild: aufgeschlagenes Buch, das zu Netzlinien zerfällt – jetzt deutlicher sichtbar */}
        <div
          className="pointer-events-none absolute inset-0 opacity-75 mix-blend-multiply dark:opacity-55 dark:mix-blend-normal"
          style={{
            backgroundImage: 'url(/images/heroes/blog-buch.webp)',
            backgroundPosition: 'center 30%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-vae-turquoise/0 bg-[linear-gradient(180deg,rgba(15,118,110,0.18)_0%,rgba(15,118,110,0.08)_42%,rgba(15,118,110,0.26)_100%)] dark:bg-[linear-gradient(180deg,rgba(6,10,9,0.82)_0%,rgba(6,10,9,0.64)_42%,rgba(6,10,9,0.90)_100%)]"
          aria-hidden
        />
        <div className="container-vae relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/90 dark:text-vae-turquoise/80">
              {blogContent.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {blogContent.heading}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              {blogContent.description}
            </p>
          </div>
        </div>
      </header>

      <main className="container-vae py-16 sm:py-20">
        {/* ── FEATURED ── */}
        {featured && (
          <Link
            to={`/ressourcen/blog/${featured.slug}`}
            className="group relative block overflow-hidden rounded-[32px] border border-gray-200 bg-gradient-to-br from-sage-50/70 via-white to-sage-50/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 dark:hover:shadow-[0_30px_90px_-50px_rgba(0,255,165,0.45)] dark:border-white/10 dark:from-white/[0.04] dark:via-bg-dark/40 dark:to-white/[0.02] sm:p-12"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(var(--vae-turquoise-rgb),0.08),transparent_50%)]" />
            </div>
            <div className="relative max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-vae-turquoise/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-vae-turquoise">
                  Neuester Artikel
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-text-muted">
                  {featured.category}
                </span>
              </div>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-[1.12] text-text-light transition-colors group-hover:text-vae-turquoise sm:text-4xl lg:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary sm:text-xl">{featured.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-vae-turquoise/70" />
                  {featured.dateLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-vae-turquoise/70" />
                  {featured.readingTime}
                </span>
                <span className="inline-flex items-center gap-2 font-semibold text-vae-turquoise">
                  Artikel lesen
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* ── GRID ── */}
        {rest.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {rest.map(post => (
              <Link
                key={post.slug}
                to={`/ressourcen/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl border border-gray-200 bg-white/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-vae-turquoise/80">
                  {post.category}
                </p>
                <h3 className="mt-4 text-balance text-2xl font-semibold leading-snug text-text-light transition-colors group-hover:text-vae-turquoise sm:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-text-secondary sm:text-lg">{post.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-vae-turquoise/70" />
                    {post.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-vae-turquoise/70" />
                    {post.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default BlogPage
