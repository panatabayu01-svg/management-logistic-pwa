const CACHE_NAME = 'management-logistic-v4';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/Panata_Icon_192.png'
];


/* =========================================================
   INSTALL
========================================================= */

self.addEventListener('install', event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => cache.addAll(SHELL))

      .then(() => self.skipWaiting())

  );

});


/* =========================================================
   ACTIVATE
   Hapus cache versi lama
========================================================= */

self.addEventListener('activate', event => {

  event.waitUntil(

    caches.keys()

      .then(keys => {

        return Promise.all(

          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))

        );

      })

      .then(() => self.clients.claim())

  );

});


/* =========================================================
   FETCH
   Google Apps Script :
   SELALU ONLINE / TIDAK DICACHE
========================================================= */

self.addEventListener('fetch', event => {

  const request = event.request;
  const url = new URL(request.url);


  /* -------------------------------------------------------
     GOOGLE APPS SCRIPT
     Jangan gunakan cache
  ------------------------------------------------------- */

  if (
    url.hostname.includes('script.google.com') ||
    url.hostname.includes('googleusercontent.com')
  ) {

    event.respondWith(

      fetch(request, {
        cache: 'no-store'
      })

    );

    return;
  }


  /* -------------------------------------------------------
     FILE GITHUB / PWA
  ------------------------------------------------------- */

  if (url.origin === self.location.origin) {

    /* index.html harus mengambil versi terbaru */

    if (
      url.pathname.endsWith('/') ||
      url.pathname.endsWith('/index.html')
    ) {

      event.respondWith(

        fetch(request, {
          cache: 'no-store'
        })

        .then(response => {

          /* Simpan versi terbaru */

          const responseClone = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(request, responseClone);
            });

          return response;

        })

        .catch(() => {

          return caches.match(request);

        })

      );

      return;
    }


    /* -----------------------------------------------------
       File lain tetap boleh menggunakan cache
    ----------------------------------------------------- */

    event.respondWith(

      caches.match(request)

        .then(cached => {

          return cached || fetch(request);

        })

    );

  }

});
