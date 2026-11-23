export interface OAuthEnv { SITE_URL?: string; GITHUB_CLIENT_ID?: string; GITHUB_CLIENT_SECRET?: string; ADMIN_GITHUB_USERS?: string; CMS_GITHUB_SCOPE?: string }
const repo = 'joaoo-IA/lojamancial';
const cookieName = '__Host-loja-oauth';
const baseHeaders = { 'Cache-Control':'no-store', 'Pragma':'no-cache', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff', 'X-Frame-Options':'DENY' };
const clearCookie = cookieName + '=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
const random = () => Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2,'0')).join('');
const fail = (message: string, status = 400) => new Response(message, {status,headers:{...baseHeaders,'Content-Type':'text/plain; charset=utf-8','Set-Cookie':clearCookie}});
function config(env: OAuthEnv) {
 if (!env.SITE_URL || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.ADMIN_GITHUB_USERS?.trim()) throw new Error('Configuração administrativa incompleta.');
 const site = new URL(env.SITE_URL);
 if (site.protocol !== 'https:' || site.pathname !== '/' || site.search || site.hash || site.username || site.password) throw new Error('Origem inválida.');
 const admins = env.ADMIN_GITHUB_USERS.split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
 if (!admins.length) throw new Error('Sem administradores.');
 const scope = env.CMS_GITHUB_SCOPE || 'public_repo';
 if (!['repo','public_repo'].includes(scope)) throw new Error('Escopo inválido.');
 return {site,admins,scope};
}
async function challenge(verifier: string) {
 const digest = new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
 return btoa(String.fromCharCode(...digest)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
}
function safeJS(value: unknown) { return JSON.stringify(value).replaceAll('<','\\u003c').replaceAll('>','\\u003e').replaceAll('&','\\u0026'); }
function authorizedPage(origin: string, token: string) {
 const nonce = random();
 const message = 'authorization:github:success:' + JSON.stringify({token,provider:'github'});
 const script = `const origin=${safeJS(origin)};const result=${safeJS(message)};if(!window.opener){document.body.textContent='Abra o acesso a partir do painel.';}else{window.addEventListener('message',function receive(event){if(event.origin!==origin||event.source!==window.opener||event.data!=='authorizing:github')return;window.removeEventListener('message',receive);window.opener.postMessage(result,origin);window.close();});window.opener.postMessage('authorizing:github',origin);}`;
 return new Response('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Acesso autorizado</title><body>Autorização concluída. Retornando ao painel.<script nonce="'+nonce+'">'+script+'</script></body></html>', {headers:{...baseHeaders,'Content-Type':'text/html; charset=utf-8','Set-Cookie':clearCookie,'Content-Security-Policy':"default-src 'none'; script-src 'nonce-"+nonce+"'; frame-ancestors 'none'; base-uri 'none'"}});
}
export async function handleOAuth(request: Request, env: OAuthEnv, fetcher: typeof fetch = fetch): Promise<Response> {
 if (request.method !== 'GET') return fail('Método não permitido.',405);
 let settings: ReturnType<typeof config>;
 try { settings = config(env); } catch { return fail('Acesso administrativo ainda não configurado. Consulte o responsável técnico.',503); }
 const url = new URL(request.url);
 if (url.origin !== settings.site.origin) return fail('Use o endereço oficial da administração.',403);
 const callback = settings.site.origin + '/api/oauth/callback';
 if (url.pathname === '/api/oauth/auth') {
  if (url.searchParams.get('provider') !== 'github') return fail('Provedor inválido.');
  const state = random(); const verifier = random();
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.search = new URLSearchParams({client_id:env.GITHUB_CLIENT_ID!,redirect_uri:callback,scope:settings.scope,state,code_challenge:await challenge(verifier),code_challenge_method:'S256',allow_signup:'false'}).toString();
  return new Response(null,{status:302,headers:{...baseHeaders,Location:authorize.href,'Set-Cookie':cookieName+'='+state+'.'+verifier+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600'}});
 }
 if (url.pathname !== '/api/oauth/callback') return fail('Rota inexistente.',404);
 const cookie = request.headers.get('Cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1);
 const [state,verifier] = cookie?.split('.') || [];
 if (!state || !verifier || !/^[a-f0-9]{64}$/.test(state) || !/^[a-f0-9]{64}$/.test(verifier) || state !== url.searchParams.get('state')) return fail('Autorização expirada ou inválida. Volte ao painel e tente novamente.',403);
 const code = url.searchParams.get('code');
 if (!code || url.searchParams.has('error')) return fail('A autorização não foi concluída. Volte ao painel para tentar novamente.',403);
 try {
  const tokenResponse = await fetcher('https://github.com/login/oauth/access_token',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,code,redirect_uri:callback,code_verifier:verifier}),signal:AbortSignal.timeout(10000)});
  if (!tokenResponse.ok) return fail('Não foi possível concluir a autorização GitHub.',502);
  const payload = await tokenResponse.json() as {access_token?:string;error?:string};
  if (!payload.access_token || payload.error) return fail('Autorização recusada pelo GitHub.',403);
  const headers = {Authorization:'Bearer '+payload.access_token,Accept:'application/vnd.github+json','User-Agent':'loja-manancial-oauth'};
  const userResponse = await fetcher('https://api.github.com/user',{headers,signal:AbortSignal.timeout(10000)});
  if (!userResponse.ok) return fail('Não foi possível confirmar a identidade.',403);
  const user = await userResponse.json() as {login?:string};
  if (!user.login || !settings.admins.includes(user.login.toLowerCase())) return fail('Esta conta não está autorizada a administrar a loja.',403);
  const repoResponse = await fetcher('https://api.github.com/repos/'+repo,{headers,signal:AbortSignal.timeout(10000)});
  if (!repoResponse.ok) return fail('Sem acesso ao repositório da loja.',403);
  const repository = await repoResponse.json() as {permissions?:{push?:boolean}};
  if (repository.permissions?.push !== true) return fail('Esta conta não tem permissão de escrita no catálogo.',403);
  return authorizedPage(settings.site.origin,payload.access_token);
 } catch { return fail('Serviço de autenticação indisponível. Tente novamente em instantes.',502); }
}
