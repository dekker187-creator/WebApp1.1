const CACHE_NAME = 'blazor-server-cache-v1';

// Installation: Passiert beim ersten Laden oder bei Updates
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    // Optional: Hier könnten statische Dateien vorab gecached werden
    event.waitUntil(self.skipWaiting());
});

// Aktivierung: Bereinigt alte Caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    event.waitUntil(clients.claim());
});
self.addEventListener('fetch', event => {
    const request = event.request;
    // SignalR-Anfragen und POST-Requests ignorieren
    if (request.url.includes('/_blazor') || request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
self.addEventListener('push', event => {
    const payload = event.data ? event.data.text() : 'Neue Nachricht!';
    event.waitUntil(
        self.registration.showNotification('Blazor App 2', {
            body: payload,
            icon: '/icon-512.png'
        })
    );
});
