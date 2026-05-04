self.addEventListener('install', () => {
  console.log('Service Worker installed')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  // A basic pass-through fetch handler to satisfy PWA requirements
  event.respondWith(
    fetch(event.request).catch(() => {
      // Return offline fallback if network fails
      return new Response('Offline. Please check your connection.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' }
      })
    })
  )
})
