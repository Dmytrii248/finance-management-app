// const CACHE_NAME = "version-1";
// const urlsToCache = ["./index.html"];

// self.addEventListener("install", async () => {
//   const cache = await caches.open(CACHE_NAME);
//   await cache.addAll(urlsToCache);
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       if (response && event.request.url !== "http://localhost:8080/") {
//         return response;
//       }
//       return fetch(event.request)
//         .then(function (response) {
//           if (!response || response.status !== 200 || response.type !== "basic")
//             return response;

//           const responseToCache = response.clone();
//           caches.open(CACHE_NAME).then(function (cache) {
//             if (event.request.url.startsWith("http"))
//               cache.put(event.request, responseToCache);
//           });
//           return response;
//         })
//         .catch((err) => {
//           if (response) return response;
//           return Promise.reject(err);
//         });
//     })
//   );
// });
