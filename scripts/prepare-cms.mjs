import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const manifest=JSON.parse(await readFile('vendor/manifest.json','utf8'));
const bytes=await readFile('vendor/decap-cms.js');
if(manifest.version!=='3.18.0'||createHash('sha384').update(bytes).digest('base64')!==manifest.sha384)throw new Error('Integridade da distribuição Decap inválida.');
await mkdir('public/vendor',{recursive:true});
await copyFile('vendor/decap-cms.js','public/vendor/decap-cms.js');
console.log('Decap '+manifest.version+' preparado; integridade conferida.');

await copyFile('vendor/package_dist_decap-cms.js.LICENSE.txt','public/vendor/decap-cms.js.LICENSE.txt');
