vae-black:         #050505    /* hsl(0, 0%, 2%) */
vae-black-soft:    #0F0F0F    /* hsl(0, 0%, 6%) */
vae-black-lighter: #1A1A1A    /* hsl(0, 0%, 10%) */

bg-darker:         #0A0A0A    /* hsl(0, 0%, 4%) - Dunkelster BG */
bg-dark:           #141414    /* hsl(0, 0%, 8%) - Standard dunkler BG */
bg-secondary:      #1F1F1F    /* hsl(0, 0%, 12%) - Sekundärer BG *//** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // VAE Design System - Colors from Reference
      colors: {
        // VAE Brand Colors
        'vae-black': 'hsl(0, 0%, 2%)',
        'vae-black-soft': 'hsl(0, 0%, 6%)',
        'vae-black-lighter': 'hsl(0, 0%, 10%)',
        
        // VAE Turquoise Palette
        'vae-turquoise': {
          DEFAULT: 'hsl(157, 100%, 47%)', // #00ffa5 - Main brand color
          50: 'hsl(157, 100%, 95%)',      // Ultra light
          100: 'hsl(157, 100%, 85%)',     // Very light
          200: 'hsl(157, 100%, 75%)',     // Light
          300: 'hsl(157, 100%, 65%)',     // Medium light
          400: 'hsl(157, 100%, 55%)',     // Medium
          500: 'hsl(157, 100%, 47%)',     // Main color (DEFAULT)
          600: 'hsl(157, 100%, 40%)',     // Medium dark
          700: 'hsl(157, 100%, 35%)',     // Dark
          800: 'hsl(157, 100%, 30%)',     // Very dark
          900: 'hsl(157, 100%, 25%)',     // Ultra dark
          'light': 'hsl(157, 100%, 60%)', // Shorthand for light variant
          'dark': 'hsl(157, 100%, 35%)',  // Shorthand for dark variant
        },
        
        // Background Colors
        'bg-dark': 'hsl(0, 0%, 8%)',
        'bg-darker': 'hsl(0, 0%, 4%)',
        'bg-secondary': 'hsl(0, 0%, 12%)',
        
        // Text Colors
        'text-light': 'hsl(0, 0%, 95%)',
        'text-muted': 'hsla(0, 0%, 80%, 0.8)',
        'text-secondary': 'hsla(0, 0%, 100%, 0.7)',
      },
      
      // Typography
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
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
