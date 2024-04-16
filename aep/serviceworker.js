// This cache will contain our site content. You could have other caches for
// other purposes such as application assets and images.
var contentCacheName = 'shanks-pwa-cache';

// Put all of your caches into an array so we can add other types of caches later.
var cacheNames = [contentCacheName];

// We will give the web page this offline page if we are off the network and
// the page it asks for is not available in the cache.
var offlinePage = 'offline-page-pwa.html';

// This will be the pages that get cached when the service worker is installed.
var filesToCache = [
  offlinePage,
  '/aep/dist/css/style.css'
];

//logic to share query parameter data in the PWA STARTS 

// our fake endpoint to store data
const SHARED_DATA_ENDPOINT = '/query';

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  const {
    request,
    request: {
      url,
      method,
    },
  } = event;
  if  (url.match(SHARED_DATA_ENDPOINT)) {
    if (method === 'POST') {
      request.json().then(body => {
        caches.open(SHARED_DATA_ENDPOINT).then(function(cache) {
          return cache.put(SHARED_DATA_ENDPOINT, new Response(JSON.stringify(body)));
        });
    }).catch(err=>{}); 
      return new Response('{}');
    } else {
      event.respondWith(
        caches.open(SHARED_DATA_ENDPOINT).then(function(cache) {
          return cache.match(SHARED_DATA_ENDPOINT).then(function (response) {
            return response || new Response('{}');;
          }) || new Response('{}');
        })
      );
    }
  } else {
    var e=event;
    e.respondWith(
    caches.open(contentCacheName).then(function(cache) {
      return fetch(e.request)
      .then(function(response){
        // If the fetch to the network is successful cache the response and return
        // it to the page.
        //console.log('[ServiceWorker] Updating cache', e.request.url);
        //cache.put(e.request.url, response.clone()); don't cache network calls
        return response;
      })
      .catch(function() {
        // If the fetch to the network fails either give the user the cached cached
        // response if it is available or fallback to the offline page.
        //console.log('[ServiceWorker] Using response from cache', e.request.url);
        return cache.match(e.request).then(function(cachedResponse) {
          if (cachedResponse) {
            return cachedResponse;
          } else {
            //console.log('[ServiceWorker] Using offline page from cache');
            return cache.match(offlinePage);
          }
        });
      });
    })
  );
  }
});

// During installation of service worker precache the files that we know we want cached.
self.addEventListener('install', function(e) {
e.waitUntil(
    caches.open(contentCacheName)
    .then(function(cache) {
        console.log('[ServiceWorker] Caching');
        return cache.addAll(filesToCache)
            .catch(error => {
                // Log specific error for diagnosis
                console.error('[ServiceWorker] Failed to cache resources', error);
                throw error;  // Re-throwing the error to ensure the service worker installation fails if caching fails
            });
    })
    .catch(error => {
        console.error('[ServiceWorker] Error during cache open', error);
    })
);
});
