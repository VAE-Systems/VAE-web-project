import React, { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
  canonicalPath?: string
  jsonLd?: object | object[]
  noIndex?: boolean
  openGraph?: Partial<{ type: string; image: string; locale: string }>
}

const BASE_URL = 'https://vae.systems'

const Seo: React.FC<SeoProps> = ({ title, description, canonicalPath, jsonLd, noIndex, openGraph }) => {
  useEffect(() => {
    document.title = title
    const ensureMeta = (name: string, attr: 'name' | 'property', content: string) => {
      if (!content) return
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    ensureMeta('description', 'name', description)
    ensureMeta('og:title', 'property', title)
    ensureMeta('og:description', 'property', description)
    ensureMeta('og:type', 'property', openGraph?.type || 'website')
    if (openGraph?.image) ensureMeta('og:image', 'property', openGraph.image)
    ensureMeta('og:site_name', 'property', 'VAE Systems')
    if (noIndex) ensureMeta('robots', 'name', 'noindex, nofollow')
    const canonicalUrl = canonicalPath ? `${BASE_URL}${canonicalPath}` : undefined
    if (canonicalUrl) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonicalUrl)
    }
    const existing = document.head.querySelectorAll('script[data-seo-jsonld]')
    existing.forEach(n => n.remove())
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoJsonld = 'true'
      script.text = JSON.stringify(jsonLd, null, 2)
      document.head.appendChild(script)
    }
  }, [title, description, canonicalPath, JSON.stringify(jsonLd)])
  return null
}

export default Seo
