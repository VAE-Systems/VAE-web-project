/**
 * Tailwind Config (cleaned)
 * Removed stray color lines that broke JS parsing.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // VAE Design System - Colors from Reference
      colors: {
        // VAE Brand Colors
        'vae-black': 'hsl(0, 0%, 2%)',
        'vae-black-soft': 'hsl(0, 0%, 6%)',
        'vae-black-lighter': 'hsl(0, 0%, 10%)',

        // VAE Turquoise Palette - Theme-aware
        'vae-turquoise': {
          DEFAULT: 'hsl(var(--color-vae-turquoise) / <alpha-value>)', // #00ffa5 - Main brand color
          50: 'hsl(var(--color-vae-turquoise) / 0.05)',      // Ultra light
          100: 'hsl(var(--color-vae-turquoise) / 0.1)',     // Very light
          200: 'hsl(var(--color-vae-turquoise) / 0.2)',     // Light
          300: 'hsl(var(--color-vae-turquoise) / 0.3)',     // Medium light
          400: 'hsl(var(--color-vae-turquoise) / 0.4)',     // Medium
          500: 'hsl(var(--color-vae-turquoise) / <alpha-value>)',     // Main color (DEFAULT)
          600: 'hsl(var(--color-vae-turquoise) / 0.6)',     // Medium dark
          700: 'hsl(var(--color-vae-turquoise) / 0.7)',     // Dark
          800: 'hsl(var(--color-vae-turquoise) / 0.8)',     // Very dark
          900: 'hsl(var(--color-vae-turquoise) / 0.9)',     // Ultra dark
          'light': 'hsl(var(--color-vae-turquoise) / 0.6)', // Shorthand for light variant
          'dark': 'hsl(var(--color-vae-turquoise) / 0.7)',  // Shorthand for dark variant
        },

        // Background Colors - Theme-aware
        'bg-dark': 'hsl(var(--color-bg-dark) / <alpha-value>)',
        'bg-darker': 'hsl(var(--color-bg-darker) / <alpha-value>)',
        'bg-secondary': 'hsl(var(--color-bg-secondary) / <alpha-value>)',

        // Text Colors - Theme-aware
        'text-light': 'hsl(var(--color-text-light) / <alpha-value>)',
        'text-muted': 'hsl(var(--color-text-muted) / <alpha-value>)',
        'text-secondary': 'hsl(var(--color-text-secondary) / <alpha-value>)',
      },

      // Typography
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },

      // Responsive Typography Scale with clamp()
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)', '1.25'],
        'sm': ['clamp(0.875rem, 0.8rem + 0.25vw, 1rem)', '1.5'],
        'base': ['clamp(1rem, 0.9rem + 0.3vw, 1.125rem)', '1.5'],
        'lg': ['clamp(1.125rem, 1rem + 0.4vw, 1.25rem)', '1.5'],
        'xl': ['clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)', '1.25'],
        '2xl': ['clamp(1.5rem, 1.3rem + 0.7vw, 2rem)', '1.25'],
        '3xl': ['clamp(2rem, 1.7rem + 1vw, 2.5rem)', '1.25'],
        '4xl': ['clamp(2.5rem, 2rem + 1.3vw, 3rem)', '1.25'],
        '5xl': ['clamp(3rem, 2.5rem + 1.8vw, 4rem)', '1.25'],
        '6xl': ['clamp(4rem, 3rem + 2.5vw, 5rem)', '1.25'],
      },

      // Custom line heights
      lineHeight: {
        'tight': '1.25',
        'normal': '1.5',
        'loose': '1.75',
      },

      // Custom letter spacing
      letterSpacing: {
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },

      // Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px hsl(157, 100%, 47%)' },
          '100%': { boxShadow: '0 0 20px hsl(157, 100%, 47%), 0 0 30px hsl(157, 100%, 47%)' },
        },
      },

      // Backdrop filters
      backdropBlur: {
        'xs': '2px',
      },

      // Container
      container: {
        center: true,
        padding: '2rem',
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1200px',
        },
      },
    },
  },
  plugins: [],
}
