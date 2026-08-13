// Minimal service worker — just enough to make this page installable.
// It doesn't need to cache anything special since Firestore handles
// its own offline persistence.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // Pass-through — no custom caching needed.
});
