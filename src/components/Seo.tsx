import React, { useEffect } from 'react'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

/**
 * SEO Component for meta tags and structured data
 */
const Seo: React.FC<SeoProps> = ({
  title = 'VAE Systems - KI-Architektur & Automatisierung',
  description = 'Professionelle KI-Architektur für skalierbare Lösungen. Multi-Tenancy, Security & Provider-Agnostik.',
  image = '/og/vae-og.png',
  url,
  type = 'website',
}) => {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      const element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (element) {
        element.content = content
      } else {
        const newElement = document.createElement('meta')
        newElement.setAttribute('property', property)
        newElement.content = content
        document.head.appendChild(newElement)
      }
    }

    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', image.startsWith('http') ? image : `https://vae.systems${image}`)
    updateMetaTag('og:url', url ? `https://vae.systems${url}` : 'https://vae.systems')
    updateMetaTag('og:type', type)
  }, [title, description, image, url, type])

  return null
}

export default Seo
