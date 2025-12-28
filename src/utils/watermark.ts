/**
 * @copyright 2025 VAE Systems UG (haftungsbeschränkt)
 * @license PROPRIETARY
 *
 * Watermark Utility - Adds "VAE Systems © 2025" watermark to critical images
 * Prevents easy copying of design assets
 *
 * Unauthorized copying, modification, or use for training AI models is prohibited.
 * All rights reserved.
 *
 * Contact: juliangoertz@vae.systems
 */

import React from 'react'

export const applyWatermark = (
  imageUrl: string,
  options?: {
    text?: string
    opacity?: number
    position?: 'center' | 'bottom-right' | 'bottom-left'
    fontSize?: number
  }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageUrl

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Draw original image
      ctx.drawImage(img, 0, 0)

      // Watermark text
      const text = options?.text || '© VAE Systems 2025'
      const fontSize = options?.fontSize || Math.min(img.width, img.height) * 0.05
      const opacity = options?.opacity ?? 0.3

      // Style watermark
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      ctx.fillStyle = `rgba(0, 255, 165, ${opacity})`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Position watermark
      let x = canvas.width / 2
      let y = canvas.height / 2

      if (options?.position === 'bottom-right') {
        x = canvas.width - fontSize * 4
        y = canvas.height - fontSize
      } else if (options?.position === 'bottom-left') {
        x = fontSize * 4
        y = canvas.height - fontSize
      }

      ctx.fillText(text, x, y)

      // Return watermarked image as data URL
      resolve(canvas.toDataURL('image/png'))
    }

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`))
    }
  })
}

/**
 * React Hook für Watermark-Images
 * Usage:
 * const watermarkedUrl = useWatermarkedImage('/images/design.png')
 * <img src={watermarkedUrl} />
 */
export const useWatermarkedImage = (imageUrl: string, options?: Parameters<typeof applyWatermark>[1]) => {
  const [watermarkedUrl, setWatermarkedUrl] = React.useState<string>(imageUrl)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (!imageUrl) return

    setIsLoading(true)
    applyWatermark(imageUrl, options)
      .then(setWatermarkedUrl)
      .catch(() => setWatermarkedUrl(imageUrl)) // Fallback to original
      .finally(() => setIsLoading(false))
  }, [imageUrl, options])

  return { watermarkedUrl, isLoading }
}

/**
 * CSS-basierter Watermark (leichter zu bypass aber schöner)
 * Usage:
 * <img className="watermark-image" src="..." />
 */
export const watermarkCSS = `
  .watermark-image {
    position: relative;
  }

  .watermark-image::after {
    content: '© VAE Systems 2025';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 2rem;
    font-weight: bold;
    color: rgba(0, 255, 165, 0.2);
    pointer-events: none;
    white-space: nowrap;
    z-index: 10;
  }
`
