import test from 'node:test';
import assert from 'node:assert/strict';
import {handleOAuth} from '../server/oauth.ts';
const env={SITE_URL:'https://loja-exemplo.pages.dev',GITHUB_CLIENT_ID:'client-de-teste',GITHUB_CLIENT_SECRET:'valor-ficticio-de-teste',ADMIN_GITHUB_USERS:'admin-exemplo'};
const base=env.SITE_URL;const state='a'.repeat(64),verifier='b'.repeat(64);
const req=()=>new Request(base+'/api/oauth/callback?code=exemplo&state='+state,{headers:{Cookie:'__Host-loja-oauth='+state+'.'+verifier}});
function mock({login='admin-exemplo',push=true,down=false}={}){let calls=0;return async()=>{calls++;if(down)throw new Error('offline');return Response.json(calls===1?{access_token:'token-ficticio-de-teste'}:calls===2?{login}:{permissions:{push}});};}
test('configuração ausente bloqueia antes de contatar GitHub',async()=>{assert.equal((await handleOAuth(new Request(base+'/api/oauth/auth?provider=github'),{},()=>{throw new Error('não chamar');})).status,503);});
test('origem alternativa e métodos indevidos são bloqueados',async()=>{assert.equal((await handleOAuth(new Request('https://preview.pages.dev/api/oauth/auth?provider=github'),env)).status,403);assert.equal((await handleOAuth(new Request(base+'/api/oauth/auth',{method:'POST'}),env)).status,405);});
test('auth usa state, PKCE e cookie seguro HttpOnly',async()=>{const r=await handleOAuth(new Request(base+'/api/oauth/auth?provider=github'),env);assert.equal(r.status,302);const location=new URL(r.headers.get('Location'));assert.equal(location.origin,'https://github.com');assert.equal(location.searchParams.get('scope'),'public_repo');assert.equal(location.searchParams.get('code_challenge_method'),'S256');assert.equal(location.searchParams.get('code_challenge').length,43);assert.match(r.headers.get('Set-Cookie'),/HttpOnly; Secure; SameSite=Lax/);});
test('callback sem state ou com state diferente não troca código por token',async()=>{for(const request of [new Request(base+'/api/oauth/callback?code=x'),new Request(base+'/api/oauth/callback?code=x&state=errado',{headers:{Cookie:'__Host-loja-oauth='+state+'.'+verifier}})])assert.equal((await handleOAuth(request,env,()=>{throw new Error('não chamar');})).status,403);});
test('usuário fora da lista ou sem escrita recebe negativa sem token no HTML',async()=>{for(const options of [{login:'visitante'},{push:false}]){const r=await handleOAuth(req(),env,mock(options));assert.equal(r.status,403);assert.doesNotMatch(await r.text(),/token-ficticio/);}});
test('admin permitido recebe handshake limitado à origem e state é limpo',async()=>{const r=await handleOAuth(req(),env,mock());assert.equal(r.status,200);assert.match(r.headers.get('Content-Security-Policy'),/default-src 'none'/);assert.match(r.headers.get('Set-Cookie'),/Max-Age=0/);const html=await r.text();assert.match(html,/event.origin!==origin/);assert.match(html,/event.source!==window.opener/);assert.match(html,/authorization:github:success/);});
test('indisponibilidade não expõe credenciais nem detalhes internos',async()=>{const r=await handleOAuth(req(),env,mock({down:true}));assert.equal(r.status,502);assert.doesNotMatch(await r.text(),/valor-ficticio|token-ficticio/);});


test('Client ID com espaços externos usa o mesmo valor limpo na autorização e troca de código', async () => {
 const padded = {...env, GITHUB_CLIENT_ID:' \t'+env.GITHUB_CLIENT_ID+'\r\n'};
 const auth = await handleOAuth(new Request(base+'/api/oauth/auth?provider=github'), padded);
 assert.equal(auth.status,302);
 const location = new URL(auth.headers.get('Location'));
 assert.equal(location.searchParams.get('client_id'),env.GITHUB_CLIENT_ID);
 assert.equal(location.searchParams.get('redirect_uri'),base+'/api/oauth/callback');
 let calls=0;
 const response = await handleOAuth(req(),padded,async (_url,options) => {
  calls++;
  const payload=JSON.parse(options.body);
  assert.equal(payload.client_id,env.GITHUB_CLIENT_ID);
  assert.equal(payload.client_secret,env.GITHUB_CLIENT_SECRET);
  assert.equal(payload.redirect_uri,base+'/api/oauth/callback');
  return Response.json({error:'incorrect_client_credentials'});
 });
 assert.equal(calls,1);
 assert.equal(response.status,403);
 const body=await response.text();
 assert.doesNotMatch(body,/valor-ficticio|token-ficticio/);
});

test('Client ID vazio ou com espaços internos bloqueia antes de contatar GitHub', async () => {
 for (const id of [' \r\n','client de teste','client\nde-teste']) {
  let calls=0;
  const settings={...env,GITHUB_CLIENT_ID:id};
  for (const request of [new Request(base+'/api/oauth/auth?provider=github'),req()]) {
   const response=await handleOAuth(request,settings,async () => {calls++;throw Error('não chamar');});
   assert.equal(response.status,503);
  }
  assert.equal(calls,0);
 }
});
