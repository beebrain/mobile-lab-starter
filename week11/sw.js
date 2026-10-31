// service worker แม่แบบของวิชา (ไม่ต้องแก้ไฟล์นี้)
// มีเน็ต: ดึงไฟล์ใหม่จากเซิร์ฟเวอร์เสมอ แล้วเก็บสำเนาไว้
// ไม่มีเน็ต: ใช้สำเนาที่เก็บไว้ หน้าร้านจึงเปิดได้แม้ออฟไลน์
const CACHE = "shop-cache";

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        const copy = response.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(event.request, copy);
        });
        return response;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});
