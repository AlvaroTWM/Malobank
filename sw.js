/* Malo Bank: service worker para jugar sin internet */
const VERSION = 'malobank-v1';
const CORE = ['/', '/index.html', '/manifest.webmanifest', '/favicon.png', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png', '/og.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Las analíticas siempre van a la red y nunca se guardan
  if (url.pathname.startsWith('/_vercel/')) return;

  // La página: primero la red (para recibir versiones nuevas), si no hay internet, la copia guardada
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('/index.html', copy)); return r; })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Tipografías de Google: usar la copia guardada y actualizarla en segundo plano
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(VERSION).then(c => c.match(req).then(hit => {
        const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
        return hit || net;
      }))
    );
    return;
  }

  // Resto de archivos propios: primero la copia guardada
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return r;
    })));
  }
});
