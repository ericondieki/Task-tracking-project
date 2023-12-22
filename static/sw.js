self.addEventListener('install', e => {
    e.waitUntil(
        caches.open("stats").then(cache => {
            return cache.addAll(["/login.html", "/public/mydecor.css", "/public/logos.png" ])
        })
    );
});

self.addEventListener('fetch', e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`);
})