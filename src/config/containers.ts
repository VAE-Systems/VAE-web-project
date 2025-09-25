// Responsive Container Configuration
// Based on content analysis and optimal reading widths

export const containerConfig = {
  // Default container for most content
  default: 'max-w-7xl', // 1280px - good for general layouts

  // Content-specific containers
  content: {
    // Reading content (articles, about pages)
    reading: 'max-w-4xl', // 896px - optimal for reading

    // Hero sections with text
    hero: 'max-w-5xl', // 1024px - good for hero text + space

    // Wide content (dashboards, showcases)
    wide: 'max-w-6xl', // 1152px - for rich content

    // Narrow forms and focused content
    narrow: 'max-w-2xl', // 672px - forms, contact info

    // Text blocks and descriptions
    text: 'max-w-3xl', // 768px - optimal for text blocks

    // Small text annotations
    annotation: 'max-w-md', // 448px - for small helper text

    // Medium content blocks
    medium: 'max-w-xl', // 576px - for medium content
  },

  // Responsive patterns
  padding: {
    mobile: 'px-4',
    tablet: 'sm:px-6',
    desktop: 'lg:px-8',
  },
}

// Current usage analysis from grep results:
export const currentContainerUsage = {
  'max-w-xl': 'Hero subtitle text', // 576px
  'max-w-md': 'Small helper text', // 448px
  'max-w-5xl': 'Services hero', // 1024px
  'max-w-3xl': 'Hero descriptions', // 768px
  'max-w-4xl': 'Content pages', // 896px
  'max-w-2xl': 'Contact intro', // 672px
  'max-w-6xl': 'About grid', // 1152px
  'max-w-7xl': 'Default container', // 1280px
}

// Recommendations for optimal responsive design:
export const recommendations = {
  // Use consistent containers for similar content types
  consistency: [
    'Hero sections: max-w-5xl for main content',
    'Reading content: max-w-4xl for articles/about',
    'Text blocks: max-w-3xl for descriptions',
    'Forms: max-w-2xl for contact/newsletter',
    'Helper text: max-w-md for annotations',
  ],

  // Responsive breakpoints align with content
  breakpoints: [
    'Mobile: full width with px-4 padding',
    'Tablet: constrained width with sm:px-6',
    'Desktop: max container with lg:px-8',
  ],
}
