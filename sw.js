var C="tri-tracker-v3",A=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(A.map(function(u){return fetch(u,{cache:"reload"}).then(function(r){return c.put(u,r);});}));}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C;}).map(function(n){return caches.delete(n);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(function(r){
    var copy=r.clone();caches.open(C).then(function(c){c.put(e.request,copy);});return r;
  }).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match("index.html");});}));
});
