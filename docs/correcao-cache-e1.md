# Correção local de cache — pendência E1

Estado: investigação e correção local autorizadas; revisão pendente. Nenhum commit/push/deploy, gravação CMS ou limpeza de cache nesta entrega.

## Evidências anteriores à alteração

Comparadas URLs exatas e consultas já usadas na prova, por HTTP sem token. Arquivo artifacts/cache-e1/remoto-antes.json:

| URL do produto | HTTP | Versão no HTML | Preço/foto | Cache |
| --- | --- | --- | --- | --- |
| sem parâmetros | 200 | 38e3335c | 159,90/clara | HIT; s-maxage=604800; Age 746 |
| ?etapa=1 | 200 | 8c939d2d | 149,90/grafite | HIT; s-maxage=604800; Age 1026 |
| ?etapa=2 | 200 | cdc4ac85 | 159,90/grafite | HIT; s-maxage=604800; Age 908 |
| ?etapa=3 | 200 | 38e3335c | 159,90/clara | HIT; s-maxage=604800; Age 771 |
| ?etapa=4 | 404 | 0c396575 | Página indisponível | no-store; sem HIT/Age |

As variantes preservam revisões diferentes, incluindo preço e imagem antigos: o risco não se limita à ocultação. Não usar query como solução ou prova de atualização. A aba nova da revisão anterior também reproduziu o HTML antigo: não é somente uma página já aberta na memória do navegador.

Pesquisa no código versionado não encontrou s-maxage, registro de service worker ou caches.open. A política de sete dias não foi declarada no projeto. O cabeçalho público informa servidor cloudflare e cache compartilhado HIT, mas isso não identifica sozinho quem aplicou s-maxage ou toda a cadeia de intermediários. Não afirmar que há uma Cache Rule de zona configurada sem inspecioná-la; pages.dev não é domínio próprio da loja.

## Build anterior à alteração de headers

Reproduzido origin/main 0c396575 em artifacts/cache-e1/build, a partir de git archive, sem incluir o teste local untracked inválido. Dependências existentes acessadas por junction local; nenhuma instalação. Conteúdo de origem preservado.

npm run build baseline aprovado: tipos (22 arquivos), 14 testes, geração e verificação da saída. O registro de teste existe no conteúdo com visivel=false; sua página não existe em dist/produto; início e catálogo o omitem; original continua gerando página. Há dist/404.html e getStaticPaths só inclui publicados. Portanto o build não está gerando indevidamente a oferta oculta.

Causa comprovada da divergência observada: resposta HTML de revisão anterior retida em cache compartilhado, apesar de a publicação nova estar correta. A origem administrativa exata da política do cache ainda depende de inspeção remota; a correção local abaixo impede armazenamento das futuras respostas na política emitida pelo projeto, mas não prova que caches antigos serão removidos.

## Correção local

public/_headers: no-store em Cache-Control, CDN-Cache-Control e Cloudflare-CDN-Cache-Control somente para /, /produto/* e /404.html. Não adicionar política global de cache a /*, evitando conflito com painel/catalogo e mantendo cache de media/vendor/_astro. A política também evita armazenar um 404 novo que poderia interferir numa reativação futura. Headers padrão de segurança e OAuth não mudaram.

scripts/verify-publication.mjs: aceite somente na URL canônica sem query. Compara SHA ativo, versão do início e detalhe/404, presença no catálogo/início, preço, foto e status HTTP. Nunca aceitar somente JSON correto ou uma URL com parâmetro. CLI: node scripts/verify-publication.mjs SHA ID hidden|visible [CENTAVOS FOTO].

Regressões: tests/cache.test.mjs confere política única por rota e preservação de cache dos assets; tests/publication.test.mjs rejeita o falso positivo de detalhe antigo apesar de JSON atual, testa preço/foto atuais e ausência de query. São testes de configuração/verificador; não emulam o CDN real.

## Verificações finais

Patch copiado para a réplica isolada do estado remoto. npm run build final passou: 25 arquivos sem erros/avisos, 20 testes aprovados, build e verify-output aprovados. dist/_headers idêntico ao arquivo corrigido; backend local continua excluído; ID/variações/preço/foto/visibilidade mantidos.

Prévia isolada ativa em http://127.0.0.1:4323/. Verificador contra a prévia passou com URL exata do teste retornando 404 e versão atual; catálogo e início sem o teste. Esta prévia Astro NÃO aplica _headers como Cloudflare: comprova saída e rotas, não invalidação/política de CDN.

Verificador contra a produção atual rejeitou corretamente o HTML 200 antigo. Evidência artifacts/cache-e1/verificador-remoto.txt. Reativação lógica conferida apenas em memória com cópia do registro visivel=true e os mesmos IDs; nenhum arquivo alterado e nenhuma reativação real no CMS. Original local comparado byte a byte com HEAD; teste local extra preservado. Nenhum produto em src/content foi modificado por esta entrega.

## Revisão local

- Vitrine: http://127.0.0.1:4323/
- Produto original: http://127.0.0.1:4323/produto/2be769c7-13f6-4edf-bbf3-e23e3c5b6f20/
- Teste oculto: http://127.0.0.1:4323/produto/eeb4c465-f836-4163-9e90-bf42cbebabf9/ (404)
- Catálogo: http://127.0.0.1:4323/catalogo.json

Os servidores da revisão anterior permanecem independentes. Esta cópia é somente para saída pública, não usar seu painel para gravação. Não há mudança visual de layout nesta correção.

## Próximo passo e ações Cloudflare

1. Após revisão, solicitar autorização específica para commit/push do patch/testes/verificador/documentação, um deploy sem gravar catálogo.
2. Conferir a configuração de cache aplicável ao projeto Pages e qualquer camada intermediária, somente leitura e sem pedir secrets. Comparar headers emitidos após deploy nas URLs exatas (sem query), antes de qualquer purge.
3. Se a resposta antiga persistir, identificar a camada responsável e apresentar a limpeza específica das URLs afetadas para autorização; não executar Purge Everything nem indicar zona de domínio próprio para pages.dev por suposição. Purge de build cache não é limpeza do conteúdo CDN.
4. Se necessário alterar alguma regra remota, apresentar primeiro sua configuração atual e a mudança exata. Não contratar planos ou migrar arquitetura por causa disso.
5. Aceite: URL do teste 404, início/catálogo sem o teste, original preservado, versão final consistente. Preço/foto atuais devem ser conferidos em URLs canônicas; para repetir uma sequência publicada ou reativar, obter autorização própria dos dados e estado final. Não repetir gravações CMS dentro da autorização só de código.

A E1 continua pendente de validação remota desta correção. E2 permanece não iniciada. A política local não é promessa de purge retroativo ou comprovação da correção no CDN.

Fontes: https://developers.cloudflare.com/pages/configuration/serving-pages/ e https://developers.cloudflare.com/pages/configuration/headers/ (headers estáticos, combinação de regras e cache Pages).


## Autorisation de publication du correctif / autorização de publicação

O responsável revisou a prévia e autorizou commit/push do patch de cache, verificador, testes e documentação na main, com um deploy e validação remota. Não autorizou purge nem novas gravações CMS. Antes do commit, main recebeu fast-forward dos quatro commits CMS já publicados; produto local adicional preservado fora do stage. Código do patch permanece igual ao build isolado aprovado (20 testes, tipos e saída). Conferência remota e investigação da origem da política ainda pendentes após deploy.
