const CACHE_NAME = 'lettercraft-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/kannada-data.js',
  './js/english-data.js',
  './js/themes.js',
  './js/pdf-handler.js',
  './js/ai.js',
  './js/app.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js',
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@300;400;500;600;700;800&family=Noto+Serif:wght@400;600;700&family=Roboto:wght@300;400;500;700;900&family=Inter:wght@300;400;500;600;700;800&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          return new Response('Network error. Some resources require internet.');
        });
      })
  );
});
