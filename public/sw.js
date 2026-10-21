// Infinity PWA Service Worker
// Network-first for HTML prevents stale app shells after a deployment.
// Versioned Vite assets are cached on first successful load for offline use.
const CACHE_NAME = 'infinity-cache-v2';
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => name.startsWith('infinity-cache-') && name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Never intercept cross-origin requests (for example, hosted fonts or profile photos).
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request, { cache: 'no-cache' });
        if (response && response.ok) {
          await cache.put('/', response.clone());
          await cache.put('/index.html', response.clone());
        }
        return response;
      } catch {
        return (await caches.match(request))
          || (await caches.match('/'))
          || (await caches.match('/index.html'))
          || new Response(
            '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Infinity offline</title></head><body style="font:16px system-ui;padding:24px"><h1>Infinity is offline</h1><p>Open the app while connected to the internet once, then try again.</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 }
          );
      }
    })());
    return;
  }

  // Vite emits fingerprinted files under /assets/. Cache those files after they load
  // successfully so the already-visited version can start without a connection.
  if (
    url.pathname.startsWith('/assets/')
    || request.destination === 'script'
    || request.destination === 'style'
    || request.destination === 'font'
  ) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response && response.ok && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    })());
  }
});
