/**
 * PANDA (Pemetaan Anak melalui Diagnostik Awal) v1.0
 * File: /service-worker.js
 * Deskripsi: Service Worker PWA untuk manajemen offline caching aset statis.
 * Developer: MB
 * Build: 02 Juli 2026
 */

const CACHE_NAME = "panda-v1.0-build-02072026";

// Daftar aset statis yang wajib dikunci di memori cache lokal browser
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./admin.html",
  "./guru.html",
  "./walikelas.html",
  "./manifest.json",
  "./assets/js/api.js",
  "https://yanuar-moga.github.io/app/sipanda/assets/logo_sipanda.png",
  "https://cdn.jsdelivr.net/npm/sweetalert2@11"
];

// 1. Event Install: Membuat penyimpanan cache dan mengunduh semua aset utama
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Mendaftarkan berkas statis ke Cache Storage");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Event Activate: Membersihkan cache versi lama jika ada pembaruan build aplikasi
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Menghapus Cache Usang:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Event Fetch: Strategi Cache First, Network Fallback untuk aset statis, 
// namun Network Only untuk request REST API GAS agar data dashboard selalu aktual.
self.addEventListener("fetch", (event) => {
  // Jangan sekali-kali meng-cache request POST ke REST API Google Apps Script
  if (event.request.method === "POST" || event.request.url.includes("script.google.com")) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Kembalikan dari cache jika ada
      }
      
      // Jika tidak ada di cache, ambil dari jaringan internet
      return fetch(event.request).then((networkResponse) => {
        // Jangan cache response yang tidak valid
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }

        // Gandakan response untuk disimpan ke cache secara dinamis
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    }).catch(() => {
      // Fallback jika internet mati total dan aset tidak ada di cache
      if (event.request.mode === "navigate") {
        return caches.match("./index.html");
      }
    })
  );
});
