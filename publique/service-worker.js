self.addEventListener("install", (event) => {
  console.log("✅ Service Worker installé.");
  event.waitUntil(
    caches.open("digital-market-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/manifest.json", "/logo.png"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
