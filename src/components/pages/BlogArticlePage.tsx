/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  BLOG ARTICLE PAGE                                                        ┃
 * ┃  Editoriale Leseseite: große Typo, viel Luft, klare Blöcke.               ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ AUFBAU
 * ├── Hero        → Kategorie, Titel, Subtitle, Meta (Datum, Lesezeit)
 * ├── HeroImage   → optionaler KI-Bild-Slot, Gradient-Fallback
 * ├── Body        → Block-Renderer (paragraph/heading/list/quote/callout)
 * ├── Related     → Zwei weitere Artikel
 * └── CTA         → Erstgespräch
 *
 * 📍 CONTENT-QUELLE: src/content/blog.ts (Route: /ressourcen/blog/:slug)
 */

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import CtaLink from '@/components/ui/CtaLink'
import Seo from '@/components/ui/Seo'
import { getBlogPost, getRelatedPosts, type BlogBlock } from '@/content/blog'
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from 'lucide-react'
import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧱 BLOCK RENDERER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BlockRenderer: React.FC<{ block: BlogBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <h2 className="mt-14 text-2xl font-semibold text-text-light sm:text-3xl">{block.text}</h2>
    case 'paragraph':
      return <p className="mt-6 text-lg leading-[1.8] text-text-secondary sm:text-xl sm:leading-[1.8]">{block.text}</p>
    case 'list':
      return (
        <ul className="mt-6 space-y-4">
          {block.items.map(item => (
            <li
              key={item}
              className="flex items-start gap-3 text-lg leading-relaxed text-text-secondary sm:text-xl"
            >
              <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <figure className="my-12 border-l-2 border-vae-turquoise pl-6 sm:pl-8">
          <blockquote className="text-2xl font-medium leading-snug text-text-light sm:text-3xl">
            „{block.text}"
          </blockquote>
          {block.author && (
            <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise/80">
              {block.author}
            </figcaption>
          )}
        </figure>
      )
    case 'callout':
      return (
        <aside className="my-10 rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-vae-turquoise">{block.title}</p>
          <p className="mt-3 text-base leading-relaxed text-text-light/90 sm:text-lg">{block.text}</p>
        </aside>
      )
    default:
      return null
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: BlogArticlePage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug) : undefined

  if (!post) return <Navigate to="/ressourcen/blog" replace />

  const related = getRelatedPosts(post.slug)

  return (
    <div className="relative z-0 min-h-[100dvh] bg-white dark:bg-bg-darker">
      <Seo
        title={`${post.title} | VAE Systems Blog`}
        description={post.excerpt}
        canonicalPath={`/ressourcen/blog/${post.slug}`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            inLanguage: 'de',
            author: { '@type': 'Organization', name: 'VAE Systems UG' },
            publisher: { '@type': 'Organization', name: 'VAE Systems UG', url: 'https://vae-systems.com' },
            mainEntityOfPage: `https://vae-systems.com/ressourcen/blog/${post.slug}`,
          },
        ]}
      />

      {/* ── HERO ── */}
      <header className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-sage-50/60 to-white pb-16 pt-28 dark:border-white/5 dark:from-bg-darker dark:to-bg-dark/60 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-100" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(var(--vae-turquoise-rgb),0.10),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(var(--vae-turquoise-rgb),0.05),transparent_40%)]" />
        </div>
        <div className="container-vae relative">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/ressourcen/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-vae-turquoise"
            >
              <ArrowLeft className="h-4 w-4" />
              Alle Artikel
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise">
              {post.category}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] text-text-light sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-text-secondary sm:text-2xl">{post.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-vae-turquoise/70" />
                <time dateTime={post.date}>{post.dateLabel}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-vae-turquoise/70" />
                {post.readingTime} Lesezeit
              </span>
              <span>{post.author}</span>
            </div>
          </div>

          {/* Hero-Bild-Slot: KI-generierte Bilder unter /public/images/blog/ */}
          {post.heroImage && (
            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10">
              <img
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                className="h-auto w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <article className="container-vae py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {post.blocks.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}

          {/* Tags */}
          <div className="mt-14 flex flex-wrap gap-2 border-t border-gray-200 pt-8 dark:border-white/10">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-text-muted dark:border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-sage-50/40 py-16 dark:border-white/5 dark:bg-bg-dark/40 sm:py-20">
          <div className="container-vae">
            <h2 className="text-center text-2xl font-semibold text-text-light sm:text-3xl">Weiterlesen</h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              {related.map(rel => (
                <Link
                  key={rel.slug}
                  to={`/ressourcen/blog/${rel.slug}`}
                  className="group flex flex-col rounded-3xl border border-gray-200 bg-white/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-vae-turquoise/80">
                    {rel.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-text-light group-hover:text-vae-turquoise sm:text-2xl">
                    {rel.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">{rel.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vae-turquoise">
                    Artikel lesen
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="border-t border-gray-200 py-16 dark:border-white/5 sm:py-20">
        <div className="container-vae text-center">
          <h2 className="mx-auto max-w-2xl text-balance text-2xl font-semibold text-text-light sm:text-3xl">
            Wie sieht das für Ihr Unternehmen aus?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            45 Minuten, kostenlos, ohne Sales-Pitch – wir ordnen Ihre Situation gemeinsam ein.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton>
              <CtaLink
                ctaId="contact.schedule_call"
                ctx={{ fromPage: 'blog-article', intent: post.slug }}
                variant="custom"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold"
              >
                Kostenloses Erstgespräch
                <ArrowRight className="h-5 w-5" />
              </CtaLink>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogArticlePage
