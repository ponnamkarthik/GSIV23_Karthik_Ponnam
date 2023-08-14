self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('movie-cache')
            .then(cache => cache.addAll(['/', '/index.html', '/static/js/bundle.js', '/icons/icon-192x192.png']))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
