
const CACHE_NAME = 'to-do-list-cache-v1';
const OFFLINE_URL = '/to-do-list-zustand-react-typescript/404.html';

// List of files to precache automatically
const urlsToCache = [
  ...[
  "/to-do-list-zustand-react-typescript/assets/details-todo-page-DdMjO9Fx.css",
  "/to-do-list-zustand-react-typescript/assets/details-todo-page.component-DhxpZc6W.js",
  "/to-do-list-zustand-react-typescript/assets/home-page-CLGpiqTm.css",
  "/to-do-list-zustand-react-typescript/assets/home-page.component-CBAJUXqK.js",
  "/to-do-list-zustand-react-typescript/assets/index-aQHlGYWB.css",
  "/to-do-list-zustand-react-typescript/assets/index-D_vsa7b6.js",
  "/to-do-list-zustand-react-typescript/index.html"
],
  OFFLINE_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        // Add all static assets and the offline page to the cache
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches that don't match the current cache name
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle root path requests - redirect to index.html
  const url = new URL(event.request.url);
  const rootPath = '/to-do-list-zustand-react-typescript/';
  const indexPath = '/to-do-list-zustand-react-typescript/index.html';
  
  if (url.pathname === rootPath || url.pathname === rootPath.slice(0, -1) || url.pathname === indexPath) {
    event.respondWith(
      caches.match(indexPath)
        .then((response) => {
          if (response) return response;
          return fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(indexPath, responseToCache);
                });
              }
              return networkResponse;
            })
            .catch(() => caches.match(OFFLINE_URL));
        })
    );
    return;
  }

  event.respondWith(
    // Try to find the resource in the cache first
    caches.match(event.request)
    .then((response) => {
      // If the resource is in the cache, return it
      if (response) {
        return response;
      }

      // If not in cache, try to fetch it from the network
      return fetch(event.request)
        .then((networkResponse) => {
          // Cache successful network responses for future use
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If the network request fails (because we're offline)
          if (event.request.mode === 'navigate') {
            // For navigation requests, serve the offline page (404.html)
            return caches.match(OFFLINE_URL);
          }
          // For other requests, try to match the request URL in cache
          return caches.match(event.request);
        });
    })
  );
});
