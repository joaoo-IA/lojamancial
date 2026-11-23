import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { carregarCatalogo, publicados } from '../src/lib/catalogo.ts';
const all=carregarCatalogo();const visible=publicados(all);
const home=await readFile('dist/index.html','utf8');const catalog=JSON.parse(await readFile('dist/catalogo.json','utf8'));
assert.deepEqual(catalog.produtos.map(p=>p.id),visible.map(p=>p.id));
for(const p of all){const marker='data-product-id="'+p.id+'"';if(p.visivel){assert.ok(home.includes(marker));await access('dist/produto/'+p.id+'/index.html');}else{assert.ok(!home.includes(marker));await assert.rejects(access('dist/produto/'+p.id+'/index.html'));}}
const config=JSON.parse(await readFile('dist/admin/config.json','utf8'));
assert.equal(config.backend.repo,'joaoo-IA/lojamancial');assert.equal(config.backend.branch,'main');assert.ok(!('local_backend' in config),'Servidor local não pode constar no build publicado');
await access('dist/404.html');await access('dist/vendor/decap-cms.js');
const build=JSON.parse(await readFile('dist/build-info.json','utf8'));assert.ok(build.commit);assert.ok(build.geradoEm);
console.log('Saída verificada: visibilidade, rotas, catálogo, CMS remoto e versão ativa.');
