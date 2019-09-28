importScripts('/gravidyne/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/gravidyne/_nuxt/11d98155e9a01e4207e1.js",
    "revision": "d593c22d2fd81627727a87a9569783b3"
  },
  {
    "url": "/gravidyne/_nuxt/c81eed321edc796e902a.js",
    "revision": "f47a0158fae155b295695256b2eef79f"
  },
  {
    "url": "/gravidyne/_nuxt/c9c080fd7f99b516c0d2.js",
    "revision": "a5d9551fa26c9c751968f5a9149ac960"
  },
  {
    "url": "/gravidyne/_nuxt/cd53ff7ceb923814b525.js",
    "revision": "930aa1598b21d98573371a752da4e06a"
  },
  {
    "url": "/gravidyne/_nuxt/fc27a8eff0f2e740c649.js",
    "revision": "e37a6052af2905ea10cf073245e1d763"
  },
  {
    "url": "/gravidyne/_nuxt/feade3064758a335f9fd.js",
    "revision": "72bf1e7f1d054072990c969bca61fb6a"
  }
], {
  "cacheId": "gravidyne",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/gravidyne/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/gravidyne/.*'), workbox.strategies.networkFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('https://fonts.googleapis.com/.*'), workbox.strategies.staleWhileRevalidate({}), 'GET')

workbox.routing.registerRoute(new RegExp('https://fonts.gstatic.com/.*'), workbox.strategies.cacheFirst({}), 'GET')
