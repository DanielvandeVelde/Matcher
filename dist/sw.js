const CACHE_NAME = "MapMatcher-2021"
const urlstoCache = [
  "/css/main.css",
  "/img/pompebled.svg",
  "/js/createLeafletMap.js",
]

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlstoCache))
  )
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
      .catch(() => {
        return caches.match("/offline")
      })
  )
})
