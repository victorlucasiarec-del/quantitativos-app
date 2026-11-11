/* Service worker – Quantitativos de Campo (gerado pelo build; não editar à mão)
   Cada versão tem um cache próprio com TODOS os arquivos (nomes com hash). O app só é servido do cache da
   versão ativa: index.html e scripts nunca se misturam entre versões. A versão nova só passa a valer depois
   que o cache novo inteiro foi baixado (install); até lá, a versão anterior continua funcionando offline. */
const VERSAO_CACHE="quantcampo-46f7064061";
const ARQUIVOS=["./index.html", "./app.32141e634b.js", "./jszip.acc7e41455.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(VERSAO_CACHE).then(c=>c.addAll(ARQUIVOS.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("quantcampo")&&k!==VERSAO_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  const escopo=new URL(self.registration.scope).pathname;
  const caminho=url.pathname.startsWith(escopo)?"./"+url.pathname.slice(escopo.length):null;
  const chave=req.mode==="navigate"||caminho==="./"?"./index.html":caminho;
  if(!chave||!ARQUIVOS.includes(chave))return;
  e.respondWith(caches.open(VERSAO_CACHE).then(c=>c.match(new Request(chave))).then(r=>r||fetch(req)));
});
