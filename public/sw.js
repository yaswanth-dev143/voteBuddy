/**
 * @fileoverview Service Worker for VoterJourney PWA.
 * Implements a Cache-First strategy for offline support.
 * This file is registered from the RootLayout.
 */

const CACHE_NAME = 'voter-journey-v1';
const OFFLINE_PAGE = '/offline';

/**
 * Assets to pre-cache on service worker installation.
 * These are the core assets needed for offline functionality.
 */
const PRECACHE_ASSETS = [
  '/',
  '/plan',
  '/translator',
  '/tracker',
  '/locator',
  '/offline',
  '/manifest.json',
];

// ─── Install ────────────────────────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate ───────────────────────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ─── Fetch (Network-First with Cache Fallback) ──────────────────────────────

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (e.g. Google APIs)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() =>
        // Network failed — try cache, then offline page
        caches.match(event.request).then(
          (cachedResponse) => cachedResponse || caches.match(OFFLINE_PAGE)
        )
      )
  );
});
