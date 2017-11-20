this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('remember-v2').then(function(cache) {
      return cache.addAll([
        "./Index-css/clean.css",
        "./Index-css/fonts.css",
        "./Index-css/sizes.css",
        "./Index-css/colors.css",
        "./Index-css/decorations.css",
        "./Index-css/code-colors.css",
        "./Index-css/fonts(1).css",
        "./Index-css/sizes(1).css",
        "./Index-css/colors(1).css",
        "./Index-css/code-colors.css",
        "./Index-css/decorations(1).css",
        "./src/excel-2007.css",
        "./Index-css/font-awesome/css/font-awesome.min.css"
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
