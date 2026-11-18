const CACHE_NAME = 'v1-cache-app';

const IMAGE_CACHE_NAME = 'imagenes-supabase-v1';

const STATIC_ASSETS = ['/'];

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cacheando recursos estáticos');
      return cache.addAll(STATIC_ASSETS);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (
            cache !== CACHE_NAME &&
            cache !== IMAGE_CACHE_NAME
          ) {
            return caches.delete(cache);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (
    event.request.method !== 'GET' ||
    !event.request.url.startsWith('http')
  ) {
    return;
  }

  const url = new URL(event.request.url);

  // Solo cachear imágenes reales
  if (
    url.pathname.startsWith('/_next/image') ||
    (
      url.hostname.includes('supabase.co') &&
      event.request.destination === 'image'
    )
  ) {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then(
            (networkResponse) => {
              if (
                networkResponse &&
                (
                  networkResponse.status === 200 ||
                  networkResponse.type === 'opaque'
                )
              ) {
                const responseToCache =
                  networkResponse.clone();

                caches
                  .open(IMAGE_CACHE_NAME)
                  .then((cache) => {
                    cache.put(
                      event.request,
                      responseToCache
                    );
                  });
              }

              return networkResponse;
            }
          );
        })
    );

    return;
  }

  // No cachear API/Auth de Supabase
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  // Network First
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200
        ) {
          const responseToCache =
            networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(
              event.request,
              responseToCache
            );
          });
        }

        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse =
          await caches.match(event.request);

        if (cachedResponse) {
          return cachedResponse;
        }

        const cachedPage =
          await caches.match(url.pathname);

        if (cachedPage) {
          return cachedPage;
        }

        return caches.match('/');
      })
  );
});