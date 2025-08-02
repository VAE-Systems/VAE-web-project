/** @type {import('tailwindcss').Config} */
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
          DEFAULT: 'hsl(157, 100%, 47%)', // #00ffa5
          50: 'hsl(157, 100%, 95%)',
          100: 'hsl(157, 100%, 85%)',
          200: 'hsl(157, 100%, 75%)',
          300: 'hsl(157, 100%, 65%)',
          400: 'hsl(157, 100%, 55%)',
          500: 'hsl(157, 100%, 47%)', // Main color
          600: 'hsl(157, 100%, 40%)',
          700: 'hsl(157, 100%, 35%)',
          800: 'hsl(157, 100%, 30%)',
          900: 'hsl(157, 100%, 25%)',
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
