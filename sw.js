/* ProtegeAI 1.3 — cache apenas dos arquivos públicos do aplicativo. Nunca armazenar o cofre/backup em Cache Storage. */
const CACHE='protegeai-shell-v1.7.0';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('protegeai-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 const path=new URL(request.url).pathname;
 const scopePath=new URL(self.registration.scope).pathname;
 if(!path.startsWith(scopePath))return;
 const relative=path.slice(scopePath.length);
 if(!['','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png'].includes(relative))return;
 event.respondWith((async()=>{
  try{const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE);await cache.put(request,response.clone())}return response}
  catch{const hit=await caches.match(request);return hit||Response.error()}
 })());
});
