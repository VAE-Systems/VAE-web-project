import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

const prerenderRoutes = [
  '/',
  '/services/setup',
  '/services/betreuung',
  '/services/beratung',
  '/leistungen/strategie',
  '/leistungen/infrastruktur',
  '/leistungen/betreuung',
  '/ressourcen/faq',
  '/ressourcen/blog',
  '/ressourcen/case-studies',
  '/about/referenzen',
  '/case-studies',
  '/ueber-uns/werte',
  '/ueber-uns/design-handwerk',
  '/ueber-uns/leitung',
  '/ueber-uns/team',
  '/wissen/transparenz-open-source',
  '/wissen/klare-projektkommunikation',
  '/wissen/vendor-lock-in-vermeiden',
  '/wissen/handwerkskunst-statt-schnellschuss',
  '/wissen/skalierbare-architektur',
  '/contact',
  '/impressum',
  '/privacy',
  '/privacy/settings',
]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'production'
      ? null // TEMPORÄR DEAKTIVIERT - Prerendering hängt
      : /*prerender({
          routes: ['/', '/services/beratung', '/contact'],
          renderer: new Renderer({
            headless: true,
            renderAfterTime: 1500,
            maxConcurrentRoutes: 2,
          }),
        })*/
        null,
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
