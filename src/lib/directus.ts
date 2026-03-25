/**
 * Directus CMS Client
 *
 * API-Verbindung zur Directus-Instanz auf cms.vae-systems.com.
 * Alle Content-Types sind typisiert.
 *
 * Umgebungsvariablen (in .env):
 *   VITE_DIRECTUS_URL=https://cms.vae-systems.com
 *   VITE_DIRECTUS_TOKEN=dein_public_read_token
 */

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL ?? 'https://cms.vae-systems.com'
const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN ?? ''

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DirectusFile {
  id: string
  filename_disk: string
  title: string | null
  type: string
  width: number | null
  height: number | null
}

export interface BlogPost {
  id: string
  status: 'published' | 'draft' | 'archived'
  date_created: string
  date_updated: string | null
  slug: string
  title: string
  subtitle: string | null
  excerpt: string | null
  body: string
  cover_image: DirectusFile | null
  tags: string[]
  author: string | null
  translations?: BlogPostTranslation[]
}

export interface BlogPostTranslation {
  languages_code: string
  title: string
  subtitle: string | null
  excerpt: string | null
  body: string
}

export interface CaseStudy {
  id: string
  status: 'published' | 'draft'
  date_created: string
  slug: string
  client_name: string
  client_logo: DirectusFile | null
  title: string
  summary: string
  body: string
  metrics: CaseStudyMetric[]
  tags: string[]
  featured: boolean
}

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface FaqItem {
  id: string
  status: 'published' | 'draft'
  sort: number
  category: 'tech' | 'business' | 'projects' | 'career' | 'general'
  question: string
  answer: string
  translations?: FaqTranslation[]
}

export interface FaqTranslation {
  languages_code: string
  question: string
  answer: string
}

// ─── Fetch Helper ─────────────────────────────────────────────────────────────

async function directusFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${DIRECTUS_URL}/items/${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const res = await fetch(url.toString(), {
    headers: {
      ...(DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {}),
    },
    next: { revalidate: 300 }, // 5 min cache (falls SSR/SSG genutzt wird)
  } as RequestInit)

  if (!res.ok) {
    throw new Error(`Directus fetch failed: ${res.status} ${res.statusText} (${endpoint})`)
  }

  const json = await res.json()
  return json.data as T
}

// ─── Blog ──────────────────────────────────────────────────────────────────────

export async function getBlogPosts(lang = 'de'): Promise<BlogPost[]> {
  return directusFetch<BlogPost[]>('blog_posts', {
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    fields: 'id,slug,title,subtitle,excerpt,cover_image.*,tags,author,date_created',
    'deep[translations][_filter][languages_code][_eq]': lang,
  })
}

export async function getBlogPost(slug: string, lang = 'de'): Promise<BlogPost | null> {
  const posts = await directusFetch<BlogPost[]>('blog_posts', {
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    fields: '*,cover_image.*,translations.*',
    'deep[translations][_filter][languages_code][_eq]': lang,
    limit: '1',
  })
  return posts[0] ?? null
}

// ─── Case Studies ──────────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return directusFetch<CaseStudy[]>('case_studies', {
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    fields: 'id,slug,client_name,client_logo.*,title,summary,metrics,tags,featured',
  })
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const items = await directusFetch<CaseStudy[]>('case_studies', {
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    fields: '*,client_logo.*',
    limit: '1',
  })
  return items[0] ?? null
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────

export async function getFaqItems(category?: FaqItem['category'], lang = 'de'): Promise<FaqItem[]> {
  const params: Record<string, string> = {
    'filter[status][_eq]': 'published',
    sort: 'sort',
    fields: 'id,category,question,answer,translations.*',
    'deep[translations][_filter][languages_code][_eq]': lang,
  }
  if (category) {
    params['filter[category][_eq]'] = category
  }
  return directusFetch<FaqItem[]>('faq_items', params)
}

// ─── Asset URL Helper ──────────────────────────────────────────────────────────

export function directusAsset(
  fileId: string,
  transforms: { width?: number; height?: number; quality?: number; format?: string } = {}
): string {
  const url = new URL(`${DIRECTUS_URL}/assets/${fileId}`)
  if (transforms.width) url.searchParams.set('width', String(transforms.width))
  if (transforms.height) url.searchParams.set('height', String(transforms.height))
  if (transforms.quality) url.searchParams.set('quality', String(transforms.quality))
  if (transforms.format) url.searchParams.set('format', transforms.format)
  return url.toString()
}
