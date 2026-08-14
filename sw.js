// ============================================================
// MY PASSBOOK - SERVICE WORKER
// Update version whenever you deploy a major app update.
// ============================================================

const CACHE_VERSION = "my-passbook-v2";

// Install the new service worker immediately
self.addEventListener("install", (event) => {
  console.log("[SW] Installing:", CACHE_VERSION);

  // Do not wait for old app instances to close
  self.skipWaiting();
});

// Activate immediately and remove old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating:", CACHE_VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION) {
            console.log("[SW] Removing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Take control of all currently open pages
  self.clients.claim();
});

// Always fetch the latest files from GitHub Pages/network.
// This avoids the installed PWA being stuck on an old index.html.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
