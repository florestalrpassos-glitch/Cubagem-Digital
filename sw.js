const CACHE_NAME = 'conserva-v1';
// Liste aqui todos os arquivos que o app precisa para abrir
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icone.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
];

// Instalação: Salva os arquivos no Cache Permanente
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Interceptação: Entrega o que está no cache mesmo sem internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
