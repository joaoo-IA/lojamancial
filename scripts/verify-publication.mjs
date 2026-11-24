import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
// Aceite sempre na URL canônica. Query/cache-buster não comprova publicação.
export async function verifyPublication({base,commit,id,visible,price,photo},fetcher=fetch){
 const read=async path=>{const r=await fetcher(base+path,{cache:'no-store',signal:AbortSignal.timeout(15000)});return {status:r.status,text:await r.text()};};
 const info=await read('/build-info.json');assert.equal(info.status,200);assert.equal(JSON.parse(info.text).commit,commit);
 const cat=await read('/catalogo.json');assert.equal(cat.status,200);const p=JSON.parse(cat.text).produtos.find(p=>p.id===id);
 const home=await read('/');assert.equal(home.status,200);assert.ok(home.text.includes(commit.slice(0,8)),'Início em versão antiga');assert.equal(home.text.includes('data-product-id="'+id+'"'),visible);
 const detail=await read('/produto/'+id+'/');assert.equal(detail.status,visible?200:404,'Status canônico incorreto; possível cache antigo');assert.ok(detail.text.includes(commit.slice(0,8)),'Detalhe/404 em versão antiga');
 if(visible){assert.ok(p);assert.equal(p.precoCentavos,price);assert.equal(p.foto,photo);assert.ok(detail.text.includes(photo),'Foto HTML antiga');const value=(price/100).toFixed(2).replace('.',',');assert.ok(detail.text.includes(value),'Preço HTML antigo');}else assert.equal(p,undefined);
 return {commit,id,visible,detailStatus:detail.status,canonical:true};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const [commit,id,state,price,photo]=process.argv.slice(2);assert.ok(commit&&id&&['hidden','visible'].includes(state),'Uso: node scripts/verify-publication.mjs SHA ID hidden|visible [CENTAVOS FOTO]');
 console.log(await verifyPublication({base:'https://lojamancial.pages.dev',commit,id,visible:state==='visible',price:Number(price),photo}));
}
