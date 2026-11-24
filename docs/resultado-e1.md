# Resultado E1 — quatro gravações autorizadas

Estado: quatro publicações pelo CMS realizadas; aceite da ocultação pendente por HTML antigo em cache na URL canônica. Não iniciar E2 antes da revisão/resolução. Execução em 23/11/2026 (Brasília); horários de build UTC estão nas evidências.

## Autorização e execução

O responsável autorizou explicitamente as quatro publicações da sequência, com deploy/conferência e apresentação do resultado antes da próxima. Ver ADR-004. Todos os dados foram gravados pelo formulário do Decap público autenticado; nenhum JSON do catálogo foi editado pelo terminal. Imagens escolhidas da biblioteca existente, sem upload ou exclusão.

Produto: Conjunto Prova E1, ID eeb4c465-f836-4163-9e90-bf42cbebabf9. Variação estável: fb86f96c-e20e-4575-af4e-02c9c5816aee, Cinza/M. Categoria Conjuntos, peças Top e legging, descrição ilustrativa sem oferta de venda.

| Etapa | Commit | Check Cloudflare Pages | Resultado |
| --- | --- | --- | --- |
| 1 | [8c939d2](https://github.com/joaoo-IA/lojamancial/commit/8c939d2daa9795b1681c86ab63894b82a2ceb972) | success | Cadastro a R$ 149,90 e imagem grafite; HTML/JSON e navegador conferidos. |
| 2 | [cdc4ac8](https://github.com/joaoo-IA/lojamancial/commit/cdc4ac85a64ac8cb875cdf1f56149ec22e0dc7e9) | success | Preço R$ 159,90; apenas precoCentavos mudou; IDs e foto preservados. |
| 3 | [38e3335](https://github.com/joaoo-IA/lojamancial/commit/38e3335c698830ccf9b3c66f5f0be3237fb30d1f) | success | Ilustração clara e alt novo; apenas foto/fotoAlt mudaram; preço/IDs preservados. |
| 4 | [0c39657](https://github.com/joaoo-IA/lojamancial/commit/0c3965752db8ea3b346bf57e7654b2219f488a57) | success | visivel=false gravado; apenas visivel mudou. Início/JSON sem o teste; detalhe com query retorna 404, mas URL canônica ainda retorna HTML antigo 200 em cache. |

Os três primeiros resultados foram apresentados ao responsável antes da alteração seguinte. Após o quarto deploy foi inicialmente informado 404, porque o verificador consultava a URL com query. A conferência posterior da URL exata sem parâmetros mostrou o problema; o relato foi corrigido imediatamente em commentary. O artefato etapa-4.json também foi corrigido para não indicar aceite indevido.

## Evidências e verificações

- Cada commit altera somente src/content/produtos/eeb4c465-f836-4163-9e90-bf42cbebabf9.json. Quatro commits encontrados em origin/main e quatro checks Pages concluídos com sucesso.
- Após cada deploy: comparar SHA ativo em build-info.json, produto no catálogo público e HTML de início/detalhe; confirmar valor, imagem e variação. Conferência pública sem token. Capturas de cadastro, preço e foto em artifacts/e1.
- Comparados JSONs versionados por SHA: etapa 2 muda apenas precoCentavos; etapa 3 somente foto e fotoAlt; etapa 4 somente visivel. ID de produto e variação preservados.
- Produto original 2be769c7-13f6-4edf-bbf3-e23e3c5b6f20 comparado integralmente ao snapshot público inicial: intacto, visível a R$ 149,90 e com imagem grafite.
- Produto de teste permanece no painel com estado Salvo, visibilidade desligada, R$ 159,90 e imagem clara; não foi excluído ou reativado.
- Teste local untracked a6398c21-beed-4eae-84db-ef2f88123d64.json preservado fora das quatro publicações. Somente fetch atualizou origin/main; checkout local não recebeu pull, preservando alterações documentais e conteúdo local.
- Nenhuma instalação, alteração de aplicação ou push manual nesta execução. Os commits foram criados pelo CMS, como autorizado. Documentação/evidências finais permanecem locais, sem publicação adicional.

## Pendência confirmada: URL sem parâmetros

Versão ativa final: 0c3965752db8ea3b346bf57e7654b2219f488a57; gerada em 2026-11-24T02:02:02.929Z (23/11/2026, 23h02min02s Brasília).

Conferência final dos endereços canônicos:

- /: 200, versão 0c396575, sem ID do teste, Cache-Control public, max-age=0, must-revalidate.
- /catalogo.json: 200, sem ID do teste, Cache-Control no-cache.
- /build-info.json: 200, SHA final, Cache-Control no-store.
- /produto/eeb4c465-f836-4163-9e90-bf42cbebabf9/: 200 com HTML do commit anterior 38e3335c e o produto antigo; CF-Cache-Status HIT, Age observado 173, Cache-Control public, s-maxage=604800. Reproduzido via HTTP sem token e em aba nova do navegador.
- O mesmo detalhe com ?etapa=4: 404 com Cache-Control no-store e conteúdo Página indisponível. Isso confirma a saída nova para essa consulta, mas não satisfaz o aceite da URL canônica.

O problema observado é conteúdo antigo servido por cache; a origem exata da política s-maxage ainda deve ser identificada. Não afirmar que o simples refresh resolve, nem usar query como solução final. A documentação Pages recomenda avaliar cache e regras que entreguem conteúdo antigo, mas o site usa pages.dev: não orientar purge de uma zona própria sem verificar aplicabilidade.

Inspeção de public/_headers: painel/publicações/build-info têm no-store; catálogo no-cache; não há regra específica de cache para páginas de produto. Isso é um ponto a avaliar, não prova por si só de qual camada emitiu s-maxage.

## Correção proposta — ainda não implementada/autorizada

Investigar a política aplicada ao HTML público e a invalidação de URLs removidas. Preparar localmente uma política de revalidação/não armazenamento apropriada para HTML mutável, conservando cache de imagens/arquivos versionados; evitar regras Cache-Control conflitantes. Verificar como remover a resposta antiga já existente na camada identificada. Não contratar recurso ou enfraquecer segurança.

Depois da revisão local e aprovação própria, publicar a correção e conferir de novo os endereços exatos sem parâmetros, inclusive preço/foto e item oculto, com verificador que não dependa de cache-buster para aceitar o resultado. Qualquer nova gravação CMS/deploy além das quatro precisa de nova autorização. Não reativar o produto para testar por iniciativa própria.

## Links

- [Vitrine final](https://lojamancial.pages.dev/)
- [Página do teste — ainda pode exibir cache antigo](https://lojamancial.pages.dev/produto/eeb4c465-f836-4163-9e90-bf42cbebabf9/)
- [Consulta diagnóstica que retorna 404, não substitui o aceite](https://lojamancial.pages.dev/produto/eeb4c465-f836-4163-9e90-bf42cbebabf9/?etapa=4)
- [Catálogo público](https://lojamancial.pages.dev/catalogo.json)
- [Versão/publicações](https://lojamancial.pages.dev/publicacao/)
- [Painel do produto oculto](https://lojamancial.pages.dev/admin/#/collections/produtos/entries/eeb4c465-f836-4163-9e90-bf42cbebabf9)

Fontes oficiais: [Serving Pages/cache](https://developers.cloudflare.com/pages/configuration/serving-pages/), [regras de headers](https://developers.cloudflare.com/pages/configuration/headers/). Evidências públicas sem segredos em artifacts/e1, incluindo cache-final.json e canonicos-finais.json. Testes negativos remotos de acesso e ensaio de falha/recuperação do build não foram executados nesta autorização das quatro gravações.
