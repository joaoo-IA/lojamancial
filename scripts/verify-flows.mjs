// Integração local com builds; não representa operação pelo painel nem deploy remoto.
import { readFile, writeFile, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const file='src/content/produtos/2be769c7-13f6-4edf-bbf3-e23e3c5b6f20.json';
const original=await readFile(file);
const p=JSON.parse(original);
const require=createRequire(import.meta.url);
const astroPackage=require.resolve('astro/package.json');
const bin=JSON.parse(readFileSync(astroPackage,'utf8')).bin;
const astroCli=resolve(dirname(astroPackage),typeof bin==='string'?bin:bin.astro);
const astro=()=>execFileSync(process.execPath,[astroCli,'build'],{stdio:'inherit'});
const verify=()=>execFileSync(process.execPath,['scripts/verify-output.mjs'],{stdio:'inherit'});
async function save(value){await writeFile(file,JSON.stringify(value,null,2)+'\n');}
try {
 await save({...p,precoCentavos:15990,foto:'/media/conjunto-claro.svg',fotoAlt:'Ilustração de conjunto cinza claro'});
 execFileSync(process.execPath,['--test','tests/catalogo.test.mjs'],{stdio:'inherit'});
 astro();verify();
 const catalog=JSON.parse(await readFile('dist/catalogo.json','utf8'));
 assert.equal(catalog.produtos[0].precoCentavos,15990);
 assert.equal(catalog.produtos[0].foto,'/media/conjunto-claro.svg');
 console.log('PASSOU: preço e foto alterados na saída pública.');
 await save({...p,visivel:false});
 execFileSync(process.execPath,['--test','tests/catalogo.test.mjs'],{stdio:'inherit'});
 astro();verify();
 assert.deepEqual(JSON.parse(await readFile('dist/catalogo.json','utf8')).produtos,[]);
 await assert.rejects(access('dist/produto/'+p.id+'/index.html'));
 console.log('PASSOU: produto oculto fora da vitrine, JSON e rota.');
 await save({...p,precoCentavos:-1});
 let rejected=false;try{astro();}catch{rejected=true;}
 assert.ok(rejected,'Conteúdo inválido deveria interromper o build.');
 console.log('PASSOU: conteúdo inválido bloqueia o build local.');
} finally {
 await writeFile(file,original);
 execFileSync(process.execPath,['--test','tests/catalogo.test.mjs'],{stdio:'inherit'});
 astro();verify();
 console.log('Conteúdo ilustrativo original restaurado e saída regenerada.');
}
