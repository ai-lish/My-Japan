// service-worker.js
// Standard Phase 2 PWA Service Worker with Same-Origin Filters & Navigation Timeout Fallback.
const CACHE_NAME = 'my-japan-cache-v3';
const PRECACHE_ASSETS = [
 './index.html',
 './manifest.webmanifest'
];

self.addEventListener('install', event => {
 event.waitUntil(
 caches.open(CACHE_NAME).then(cache => {
 return cache.addAll(PRECACHE_ASSETS).catch(error => {
 console.warn('[SW Precache Skipped Local Debug env]:', error);
 });
 }).then(() => self.skipWaiting())
 );
});

self.addEventListener('activate', event => {
 event.waitUntil(
 caches.keys().then(cacheNames => {
 return Promise.all(
 cacheNames.map(cache => {
 if (cache !== CACHE_NAME) {
 console.log('[SW Cleaning old cache]:', cache);
 return caches.delete(cache);
 }
 })
 );
 }).then(() => self.clients.claim())
 );
});

self.addEventListener('fetch', event => {
 const url = new URL(event.request.url);

 // 1. 排除規則：動態 API、認證、以及 Firebase 核心 SDK 請求決不進行快取
 if (url.pathname.startsWith('/api/')) return;
 if (url.pathname.startsWith('/auth/')) return;
 if (url.pathname.includes('firebase') || url.href.includes('firebase')) return;

 // 2. 限定同源：只攔截 same-origin 靜態資源，防範外部 CDN 與 API 污染
 if (url.origin !== self.location.origin) return;

 // 3. 處理導航請求 (Navigation request) - Network-First 加上 2.5 秒超時降級
 if (event.request.mode === 'navigate') {
 event.respondWith(
 networkFirstWithTimeout(event.request, 2500)
 );
 return;
 }

 // 4. 快取優先僅限本地核心靜態檔案 (HTML/CSS/JS/manifest/icons)
 const isStaticAsset = /\.(html|css|js|json|webmanifest|png|jpg|jpeg|gif|svg|ico|woff2|woff|ttf|eot)$/i.test(url.pathname);
 if (isStaticAsset) {
 event.respondWith(
 caches.match(event.request).then(cachedResponse => {
 if (cachedResponse) {
 return cachedResponse;
 }
 return fetch(event.request).then(networkResponse => {
 if (networkResponse.status === 200) {
 return caches.open(CACHE_NAME).then(cache => {
 cache.put(event.request, networkResponse.clone());
 return networkResponse;
 });
 }
 return networkResponse;
 });
 })
 );
 }
});

// Network-First with Timeout Fallback function
function networkFirstWithTimeout(request, timeoutMs) {
 return new Promise((resolve, reject) => {
 const timeoutId = setTimeout(() => {
 // 網路超時：立即 fallback 至本機快取中的 index.html 避免白屏
 caches.match('./index.html').then(cachedResponse => {
 if (cachedResponse) {
 resolve(cachedResponse);
 } else {
 reject(new Error('Network timeout and no offline cache available.'));
 }
 });
 }, timeoutMs);

 fetch(request)
 .then(networkResponse => {
 clearTimeout(timeoutId);
 if (networkResponse.status === 200) {
 const responseClone = networkResponse.clone();
 caches.open(CACHE_NAME).then(cache => {
 cache.put(request, responseClone);
 });
 }
 resolve(networkResponse);
 })
 .catch(err => {
 clearTimeout(timeoutId);
 // 網路中斷失敗：立即回退至快取中的 index.html
 caches.match('./index.html').then(cachedResponse => {
 if (cachedResponse) {
 resolve(cachedResponse);
 } else {
 reject(err);
 }
 });
 });
 });
}
