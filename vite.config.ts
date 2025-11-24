import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Bundle analyzer (only in build mode with ANALYZE=true)
    process.env.ANALYZE === 'true' &&
      visualizer({
        filename: 'dist/bundle-report.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@design-system': fileURLToPath(new URL('./src/design-system', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "@/styles/globals.css";',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Nur in Dev
    cssCodeSplit: true,
    reportCompressedSize: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React (most used)
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation libraries (lazy-loadable)
          'lib-framer': ['framer-motion'],
          'lib-gsap': ['gsap'],
          // Heavy 3D libraries (rarely used, load on-demand)
          'lib-three': ['three'],
          'lib-ogl': ['ogl'],
          // UI essentials
          'ui-icons': ['lucide-react'],
        },
        // Better file naming for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    chunkSizeWarningLimit: 400, // Optimiert für bessere Performance
    assetsInlineLimit: 2048, // Reduziert: nur sehr kleine Assets inline (2KB statt 4KB)
  },
}))
