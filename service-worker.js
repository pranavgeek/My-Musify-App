const cacheName = "cacheAssets-v10";

self.addEventListener("install", (event) => {
  console.log("[SW] Install!:", event);

  self.skipWaiting();

  event.waitUntil(
    caches
      .open(cacheName)
      .then(function (cache) {
        cache.addAll([
          "/",
          "/index.html",
          "/js/script.js",
          "/main.css",
          "/Icon/music-icon.png",
          "/manifest.webmanifest",
          "/magic.js"
        ]);
      })
      .cache((error) => {
        console.log("Cache Failed:", error);
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activate:", event);

  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedRes = fetch(event.request).then((networkRes) => {
          cache.put(event.request, networkRes.clone());
          return networkRes;
        });
        return cachedResponse || fetchedRes;
      });
    })
  );
});
