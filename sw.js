const CACHE_NAME = 'sushi-guide-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  'https://source.unsplash.com/random/600x400/?nigiri,sushi',
  'https://source.unsplash.com/random/600x400/?gunkan,sushi',
  'https://source.unsplash.com/random/600x400/?maki,sushi',
  'https://source.unsplash.com/random/600x400/?japanese,side,dish'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});