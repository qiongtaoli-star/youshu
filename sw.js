// Service Worker - 有数·资产记录
const CACHE_NAME = 'youshu-v1';
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

// 拦截请求 - 离线优先
self.addEventListener('fetch', event => {
  // 仅处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // 如果缓存中有，直接返回
      if (response) {
        return response;
      }

      // 否则尝试网络请求
      return fetch(event.request)
        .then(response => {
          // 验证响应
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // 克隆响应
          const responseToCache = response.clone();

          // 缓存成功的响应
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // 离线且缓存中无资源，返回缓存的 HTML
          return caches.match('./index.html');
        });
    })
  );
});
