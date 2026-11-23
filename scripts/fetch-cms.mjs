// Executado uma vez na preparação; nenhum código do pacote é executado.
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
const version='3.18.0';
const metadataResponse=await fetch('https://registry.npmjs.org/decap-cms/'+version,{signal:AbortSignal.timeout(30000)});
if(!metadataResponse.ok)throw new Error('Falha ao consultar distribuição oficial do Decap.');
const metadata=await metadataResponse.json();
const expectedUrl='https://registry.npmjs.org/decap-cms/-/decap-cms-'+version+'.tgz';
if(metadata.dist.tarball!==expectedUrl)throw new Error('Origem inesperada.');
const response=await fetch(expectedUrl,{signal:AbortSignal.timeout(60000)});
if(!response.ok)throw new Error('Falha ao obter distribuição.');
const archive=Buffer.from(await response.arrayBuffer());
const integrity='sha512-'+createHash('sha512').update(archive).digest('base64');
if(integrity!==metadata.dist.integrity)throw new Error('Integridade inválida.');
const tar=gunzipSync(archive);let js;
const notices=[];
for(let offset=0;offset+512<=tar.length;){
 const name=tar.subarray(offset,offset+100).toString().replace(/\0.*$/s,'');
 const size=parseInt(tar.subarray(offset+124,offset+136).toString().replace(/\0.*$/s,'').trim()||'0',8);
 if(!name)break;
 const content=tar.subarray(offset+512,offset+512+size);
 if(name==='package/dist/decap-cms.js')js=content;
 if(/(?:LICENSE|NOTICE)/i.test(name)&&size<2000000)notices.push([name.replaceAll('/','_'),content]);
 offset+=512+Math.ceil(size/512)*512;
}
if(!js?.length)throw new Error('Distribuição JS ausente.');
await mkdir('vendor',{recursive:true});
await writeFile('vendor/decap-cms.js',js);
for(const [name,content] of notices)await writeFile('vendor/'+name,content);
await writeFile('vendor/manifest.json',JSON.stringify({package:'decap-cms',version,tarball:expectedUrl,integrity,sha384:createHash('sha384').update(js).digest('base64')},null,2)+'\n');
console.log('Distribuição oficial Decap '+version+' verificada e salva. Bytes: '+js.length);
