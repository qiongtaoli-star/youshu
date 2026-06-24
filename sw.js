// Service Worker - 有数·资产记录
const CACHE_NAME = 'youshu-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

// 安装事件 - 缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.log('缓存资源部分失败，这是正常的（图标可能还未上传）:', err);
        // 仅缓存 HTML 和 manifest
        return cache.addAll([
          './',
          './index.html',
          './manifest.json'
        ]);
      });
    })
  );
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// 拦截请求
self.addEventListener('fetch', event => {
  // 仅处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  const isNavigation = event.request.mode === 'navigate' ||
    (event.request.destination === 'document');

  // 页面文档：网络优先（保证用户始终拿到最新版本），离线时回退到缓存
  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put('./index.html', responseToCache));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // 静态资源：缓存优先，未命中再走网络并回填缓存
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
