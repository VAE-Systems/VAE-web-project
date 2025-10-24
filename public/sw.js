/**
 * Service Worker for PWA functionality
 *
 * Handles caching, offline support, and background sync
 */

const CACHE_NAME = 'vae-systems-v1'
const STATIC_CACHE = 'vae-static-v1'
const DYNAMIC_CACHE = 'vae-dynamic-v1'

// Files to cache immediately
const STATIC_FILES = ['/', '/manifest.json', '/App_Logo_light.svg']

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('[SW] Install event')
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE)
        console.log('[SW] Caching static files')
        await cache.addAll(STATIC_FILES)
      } catch (error) {
        console.error('[SW] Error caching static files:', error)
      }
      // Opportunistic font caching (local Inter fonts if present)
      try {
        const fontCache = await caches.open(STATIC_CACHE)
        const fontUrls = [
          '/fonts/inter/Inter-Variable.woff2',
          '/fonts/inter/Inter-Regular.woff2',
          '/fonts/inter/Inter-SemiBold.woff2',
        ]
        await Promise.all(
          fontUrls.map(async url => {
            try {
              await fontCache.add(url)
            } catch {
              /* ignore missing fonts */
            }
          })
        )
      } catch (e) {
        /* ignore */
      }
    })()
  )
  // Force activation
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate event')
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        // Take control of all clients
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) return

  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Return cached API response if available
          return caches.match(request)
        })
    )
    return
  }

  // Handle static assets
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request)
        .then(response => {
          // Don't cache non-successful responses
          if (!response.ok) return response

          const responseClone = response.clone()

          // Cache the response
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone)
          })

          return response
        })
        .catch(() => {
          // Return offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/') || new Response('Offline', { status: 503 })
          }
        })
    })
  )
})

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag)

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

// Push notifications
self.addEventListener('push', event => {
  console.log('[SW] Push received:', event)

  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: '/App_Logo_light.svg',
      badge: '/App_Logo_light.svg',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click:', event)

  event.notification.close()

  event.waitUntil(self.clients.openWindow(event.notification.data?.url || '/'))
})

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  console.log('[SW] Periodic sync:', event.tag)

  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent())
  }
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate event')
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        // Take control of all clients
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) return

  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Return cached API response if available
          return caches.match(request)
        })
    )
    return
  }

  // Handle static assets
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request)
        .then(response => {
          // Don't cache non-successful responses
          if (!response.ok) return response

          const responseClone = response.clone()

          // Cache the response
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone)
          })

          return response
        })
        .catch(() => {
          // Return offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/') || new Response('Offline', { status: 503 })
          }
        })
    })
  )
})

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag)

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Implement background sync logic here
    // e.g., retry failed API calls, sync offline data
    console.log('[SW] Performing background sync')
  } catch (error) {
    console.error('[SW] Background sync failed:', error)
  }
}

// Push notifications
self.addEventListener('push', event => {
  console.log('[SW] Push received:', event)

  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: '/App_Logo_light.svg',
      badge: '/App_Logo_light.svg',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click:', event)

  event.notification.close()

  event.waitUntil(self.clients.openWindow(event.notification.data?.url || '/'))
})

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  console.log('[SW] Periodic sync:', event.tag)

  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent())
  }
})

async function syncContent() {
  try {
    // Implement periodic content sync
    console.log('[SW] Syncing content')
  } catch (error) {
    console.error('[SW] Content sync failed:', error)
  }
}
