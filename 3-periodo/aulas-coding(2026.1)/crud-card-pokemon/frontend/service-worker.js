const CACHE_NAME = 'cardpokemon-v1';

const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// INSTALAÇÃO – salva arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cache criado');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ATIVAÇÃO – limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deletando cache antigo:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH – Cache first para assets locais, network first para API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API da PokéAPI: network first, sem cache (dados dinâmicos)
  if (url.hostname === 'pokeapi.co' || url.hostname.includes('raw.githubusercontent')) {
    event.respondWith(
      fetch(event.request).catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } }))
    );
    return;
  }

  // Assets locais: cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});
