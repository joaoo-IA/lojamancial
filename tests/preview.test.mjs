import test from 'node:test';
import assert from 'node:assert/strict';
import {isPreviewDemo} from '../src/lib/preview.ts';
import {previewSeed} from '../src/lib/preview-seed.ts';
import {onRequest} from '../functions/api/oauth/_middleware.ts';

test('demonstração só é habilitada na branch E2 dedicada', () => {
  assert.equal(isPreviewDemo({CF_PAGES_BRANCH:'codex/e2-preview'}),true);
  for(const env of [{},{CF_PAGES_BRANCH:'main'},{CF_PAGES_BRANCH:'outra-preview'}])
    assert.equal(isPreviewDemo(env),false);
});
test('seed do painel contém somente réplicas ilustrativas E2', () => {
  const seed=previewSeed();
  const products=seed.files.filter(f=>f.path.startsWith('src/content/produtos/'));
  assert.equal(products.length,7);
  assert(products.every(f=>f.path.includes('d2000000-')));
  assert(!seed.files.some(f=>/2be769c7|eeb4c465|a6398c21|\.env/.test(f.path)));
  assert.equal(seed.media.length,10);
  seed.files.forEach(f=>assert.doesNotThrow(()=>JSON.parse(f.content)));
});
test('OAuth é bloqueado em aliases Preview antes de acessar bindings/GitHub', async () => {
  for(const host of ['codex-e2-preview.lojamancial.pages.dev','hash.lojamancial.pages.dev']){
    const response=await onRequest({request:new Request('https://'+host+'/api/oauth/auth?provider=github'),
      next:()=>{throw Error('não pode iniciar OAuth');}});
    assert.equal(response.status,403);
    assert.equal(response.headers.get('Set-Cookie'),null);
  }
});
test('guard preserva o caminho original da produção',async()=>{
  const response=await onRequest({request:new Request('https://lojamancial.pages.dev/api/oauth/auth'),
    next:async()=>new Response('encaminhado')});
  assert.equal(await response.text(),'encaminhado');
});
