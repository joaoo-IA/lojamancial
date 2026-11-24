# Prova funcional da administração

Estado atual: correção local de cache E1 pronta para revisão; tipos/build/20 testes aprovados em réplica isolada. E1 aguarda publicação autorizada, diagnóstico da configuração remota e aceite canônico sem cache antigo. E2 não iniciada.

## Origem e limites

Em 23/11/2026, o responsável aprovou Astro, TypeScript, Cloudflare Pages e Decap CMS e autorizou começar por um único produto ilustrativo. Deve cadastrar, editar preço e foto e ocultar pelo painel, refletir na vitrine após publicação automática, demonstrar acesso e estados da publicação. Depois haverá revisão antes de completar a loja.

Repositório informado pelo responsável: https://github.com/joaoo-IA/lojamancial.git, branch main; comandos de envio fornecidos pelo responsável nesta conversa.

## Escopo

- Vitrine mínima com produto ilustrativo; sem carrinho, checkout, identidade final ou banco.
- CMS GitHub, publicação simples na main, formulários e imagens locais versionadas.
- OAuth restrito a administradores explicitamente configurados e com escrita no repositório.
- Versão ativa identificável e links aos checks e ao painel de deploy.
- Testes proporcionais de catálogo, saída e autenticação, com limites documentados.

## Dependências externas

Conexão GitHub/Cloudflare e criação/configuração OAuth em contas da loja. Nenhuma conta, segredo ou autorização deve ser simulada. Falhas locais não comprovam resultado remoto. Não avançar ao catálogo completo antes da revisão.

## Aceite

Registrar cadastro, preço, troca de foto, ocultação e republicação em navegador independente; registrar commit e resultado Cloudflare correspondentes. Demonstrar erro sem derrubar a última versão válida, preferindo ambiente de preview. Validar login permitido e negativa para visitante/usuário sem acesso.

## Estado da execução

Ver docs/verificacao.md. Pendências e resultados serão atualizados ao final da etapa.

## Revisão e publicação por entrega

A autorização de envio da entrega inicial é histórica e não autoriza novas alterações. Seguir [ADR-002](decisoes/ADR-002-Revisao-e-publicacao-por-entrega.md). A confirmação da visualização não autoriza commit/push. Cada sequência de teste que grave pelo CMS exige autorização específica antes de começar.

## Andamento desta revisão

- Concluído: correção local da biblioteca; tipos, 12 testes e build aprovados na validação anterior; servidor iniciado; HTTP e tela de entrada conferidos nesta revisão.
- Pendente: visualização pelo responsável; escolha/revisão da prévia isolada; autorizações de publicação; login completo e operações pelo CMS.
- Próxima entrega: preparar e apresentar localmente o isolamento da prévia OAuth, antes de seu commit/push, conforme [proposta](revisao-local-e-previa-oauth.md). A definição do destino da correção atual também será submetida à aprovação específica após a visualização.


## Atualização do diagnóstico OAuth

Ver [diagnóstico atual](diagnostico-oauth-404.md). Concluídos: inspeção das rotas e do redirecionamento público; LF final no Client ID confirmado; correção defensiva e regressões preparadas localmente. O responsável confirmou substituição do Secret e novo deploy, depois nova gravação do ID em Production e retry. A URL pública ainda não comprovou a aplicação dessa configuração; foi solicitado o link da implantação. Administrador joaoo-IA foi explicitamente autorizado nesta solicitação.

Pendentes: identificar a implantação ativa e confirmar ID sem LF; conferir o aplicativo existente e seu callback; login autenticado, aprovação específica de commit/push e autorização separada da sequência CMS. Próxima entrega: revisão da correção OAuth/Decap e resolução da configuração publicada antes da prova real do catálogo. Não iniciar as páginas completas da loja.

Atualização: implantação ativa identificada como 391add8c, Production/main, geração às 20h33min19s em 23/11/2026. O ID efetivamente emitido continua com LF; pendente distinguir configuração salva de configuração usada no retry. Correções locais continuam sem commit/push. Login e prova real do catálogo permanecem pendentes.


## Client ID corrigido em produção — 23/11/2026, 20h41

Após o responsável informar nova correção e publicação, a conferência HTTP de /api/oauth/auth?provider=github confirmou 302 para github.com/login/oauth/authorize, Client ID com exatamente 20 caracteres, sem LF e idêntico ao informado. Callback: https://lojamancial.pages.dev/api/oauth/callback. /build-info.json confirmou geração 2026-11-23T23:41:58.049Z, branch main e commit d7737a0. Resolvido o defeito observável de formatação do ID no redirecionamento de produção. Isso ainda não comprova o login autenticado, a correspondência do Secret nem a autorização de escrita. Próximo passo: teste somente de login pelo responsável no painel oficial e relato do resultado; operações de catálogo continuam aguardando autorização própria. Correções locais de código permanecem sem commit/push.


## Bloqueio atual do painel — configuração Decap

Após o Client ID ser corrigido, a captura do responsável mostrou Missing external media library default. Comparação HTTP atual: painel e config.json responderam 200 tanto localmente quanto em produção; somente a produção mantém media_library.name=default. A configuração local não contém esse seletor; ambas preservam 5242880 bytes como limite da foto. A correção local não foi publicada por decisão explícita anterior. O teste de login sugerido dependia dessa correção e foi prematuro.

Prévia para revisão: http://127.0.0.1:4321/admin/. Código de aplicação permanece igual ao verificado anteriormente com 14 testes, tipos e build aprovados; nesta conferência foram feitos apenas inspeção do diff e HTTP, sem repetir testes ou instalar dependências. Próxima entrega submetida à revisão: correção Decap, normalização defensiva do Client ID, regressões e documentação local; eventual commit/push para main aciona produção e exige aprovação específica. Nenhuma gravação pelo CMS está incluída nessa aprovação. Depois da publicação autorizada, conferir primeiro o carregamento do painel e então testar login; sequência real de cadastro/preço/foto/ocultação continua pendente de autorização própria.


## Autorização específica desta entrega — 23/11/2026

O responsável declarou: Autorizo o commit e o push dessas correções para a main e o deploy. Depois confira o painel público e me envie o link funcionando. Escopo: correção da seleção inválida de biblioteca do Decap, normalização defensiva do Client ID nas duas etapas OAuth, testes de regressão e documentação já apresentada. Destino: main de joaoo-IA/lojamancial, acionando o Cloudflare Pages de produção. Esta autorização vale somente para essa entrega e não inclui salvar produtos ou imagens pelo CMS.

Verificações locais anteriores desta mesma versão de código: 22 arquivos sem erros/avisos, 14 testes e build aprovados. Na revisão de publicação: diff e destino conferidos; origin/main atualizado sem divergência; não houve instalação de dependências ou mudança de produtos. Próximo critério: confirmar o commit servido em build-info.json e observar o painel público sem o erro de configuração. Login real e prova do catálogo continuam como etapas próprias.


## Resultado da publicação autorizada — 23/11/2026

Commit 49e5b6bce96947726fd08dc5ac3c40b425c3ba55 criado e enviado para origin/main com sucesso. Check Cloudflare Pages completed/success; build-info.json confirmou esse commit em produção e geração 2026-11-23T23:57:04.946Z (20h57min04s em Brasília). Nenhum produto ou imagem foi alterado.

HTTP: config pública sem media_library global inválida, limite de foto 5242880 bytes preservado, backend main/origem oficial corretos; autorização respondeu 302 com Client ID exato de 20 caracteres e callback correto. Navegador real, aba do painel público recarregada: botão Entrar com o GitHub visível, sem erro de configuração. Captura e resumo sem credenciais em artifacts/visual/2026-11-23-publicacao-49e5b6b (ignorado pelo Git).

Concluído: commit, push, deploy e conferência da tela de acesso públicos. Pendente: entrada completa no painel pelo responsável e sequência de cadastro/preço/foto/ocultação, com autorização própria antes de gravar. Próxima entrega: validar a sessão do CMS e apresentar a sequência de teste para aprovação. Este registro pós-publicação permanece local, sem segundo commit/push automático. As autorizações desta entrega não se estendem a futuras alterações.


## Revisão de andamento e proposta de evolução — 23/11/2026

Solicitação do responsável: inspecionar o estado real, conferir o editor em branco e propor entregas até a V1 completa, sem nova implementação. Foram relidos integralmente os dois PDFs (15 + 3 páginas); os 15 rascunhos foram renderizados e revistos. A proposta completa consta em [plano-evolucao-v1.md](plano-evolucao-v1.md), com estado de proposta, dependências e critérios de aceite. A prova original permanece o marco ativo.

Evidência nova: sessão do painel público autenticada; coleção Produtos lista o exemplo; a entrada carrega campos e dados no DOM/árvore de acessibilidade. Screenshot permanece em branco porque #nc-root e o contêiner rolável do formulário têm altura 0 px; área ancestral absoluta de 66 px com overflow hidden recorta os campos. Código do painel aplica position:relative ao root sem altura. Confirmada falha de layout; não é formulário ainda ausente do projeto. preview:false desliga somente a prévia, não o formulário. Não foram alterados campos ou acionados salvar/publicar.

Concluído nesta revisão: leitura/inspeção, acesso autenticado de leitura, confirmação do commit público 49e5b6b e diagnóstico visual. Pendente: corrigir dimensionamento, revisar localmente e autorizar sua publicação; depois autorizar e executar prova real de cadastro/preço/foto/ocultação e respectivos builds. Próxima entrega recomendada E0 (2–4 h), ainda aguardando decisão do responsável. E1 encerra a prova; E2–E8 são evolução proposta, não trabalho já autorizado.

Verificações desta revisão: git status e diff preservados, leitura de arquivos, HTTP de build-info/catalogo/config, inspeção DOM somente de leitura, captura do editor, extração integral com pypdf e renderização Poppler dos rascunhos. PyMuPDF não está instalado no runtime; usada a alternativa já disponível, sem instalar dependências. Poppler emitiu avisos de fontes Symbol/ArialUnicode, mas gerou as 15 páginas; todas foram conferidas em folhas de contato e produto/painel também em imagem ampliada. Histórico de 14 testes/build continua identificado como anterior; não se repetiu infraestrutura/testes pois aplicação não foi alterada.

Nenhuma gravação pelo CMS, alteração de aplicação/produto, instalação, commit ou push nesta revisão. Evidências ignoradas pelo Git em artifacts/revisao-v1; nenhum token/secret consultado.


## E0 local — implementação para revisão

O responsável aprovou E0–E8 como referência e autorizou implementar somente E0 localmente (ADR-003). Corrigidas altura do root/documento e largura/barra do editor em telas estreitas, no único arquivo de aplicação src/pages/admin/index.astro. Build final, tipos, 14 testes e conferência da saída aprovados. Local ativo em http://127.0.0.1:4322/ e /admin/, com proxy fs somente loopback na 8081. Conteúdo/IDs e limite de 5 MB preservados. Sem commit/push/deploy ou gravação CMS.

Entrega, capturas, roteiro e limites em [entrega-e0.md](entrega-e0.md). Observados listagem, edição, nova entrada, controles e foco/rolagem em desktop e mobile. O retorno após descartar entrada não salva não foi confirmado pela ferramenta por timeout; o roteiro manual inclui esse passo. E0 aguarda revisão/aceite; publicação e repetição autenticada pública pendentes. E1 ainda sem execução; E2–E8 aprovadas como referência e não iniciadas.


## Aceite local e autorização de publicação E0

O responsável confirmou a revisão local dos campos/controles e autorizou explicitamente commit e push da E0 e documentação para main, acompanhamento do deploy e conferência do editor publicado. Autorização desta entrega; não abrange gravações E1. Produto local adicional a6398c21-beed-4eae-84db-ef2f88123d64.json encontrado como untracked na retomada: preservado, não staged/não publicado. Ele não informa variacoes e não foi incluído na validação/build histórico da E0; não corrigir ou remover por inferência. A validação Cloudflare usará somente conteúdo versionado.

Implementação de aplicação mantém-se idêntica à versão local já verificada com tipos, 14 testes e build aprovados. Revisão atual: Git/diff conferidos, main sem divergência de origin/main; nenhuma dependência instalada. Publicação em andamento.


## E0 publicada e conferida; E1 preparada

Commit 03af6523a19cdb7a31d707fcfe06cea5b6800189 criado e enviado para main sob autorização específica. Check Cloudflare Pages completed/success; produção confirmou o commit e geração 2026-11-24T01:49:35.286Z (23/11/2026, 22h49min35s em Brasília). No navegador público autenticado, entrada original carregada com formulário visível, 11 campos input/textarea, root 673,5 px e largura 1280 px numa viewport 1280 × 720. Captura em artifacts/e0-publicada/editor-publico.jpg. Nenhum campo alterado ou ação de salvar/publicar executada. HTTP confirmou que catálogo público continua com apenas o produto original a 14990 centavos.

E0 aceita localmente pelo responsável e publicada; reflexos de gravação do CMS na vitrine continuam por comprovar na E1. Sequência E1 proposta em sequencia-e1-para-autorizacao.md: quatro publicações separadas (cadastro, preço, foto, ocultação), produto novo ilustrativo e original preservado. Aguardar autorização própria. Registro pós-deploy e sequência preparados somente localmente; não houve segundo commit/push. O produto untracked do teste local foi preservado sem publicação.


## E1: quatro gravações concluídas; aceite de cache pendente

Sequência autorizada executada inteiramente pelo CMS: 8c939d2 cadastro; cdc4ac8 preço; 38e3335 foto/alt; 0c39657 ocultação. Cada commit teve check Pages success, conferência e relato ao responsável antes da operação seguinte. Original e IDs preservados; teste ficou cadastrado, oculto, R$ 159,90 e foto clara.

Pendência: o início e JSON público atuais omitem o teste; detalhe consultado com query retorna 404, mas a URL canônica sem parâmetros ainda serve HTML anterior com 200, CF-Cache-Status HIT e s-maxage=604800. Portanto não considerar o aceite de ocultação concluído. Relato inicial foi corrigido e evidências registradas em [resultado-e1.md](resultado-e1.md). Investigar política/invalidação de cache e submeter correção local antes de qualquer publicação adicional. Não foi feita quinta gravação/deploy. E2 ainda não iniciada.


## Correção local da pendência de cache E1

Investigação/local autorizadas pelo responsável; nenhum commit/push, deploy, gravação CMS ou purge. Comparações mostraram versões antigas de preço/foto e URL oculta ainda 200 por cache compartilhado. Build isolado de origin/main comprovou saída correta antes da mudança. Aplicada localmente política no-store ao HTML mutável e adicionado verificador que exige URL canônica; 20 testes, tipos e build final aprovados na réplica isolada. Prévia em http://127.0.0.1:4323/. Produto original, IDs e teste oculto preservados.

Relatório em [correcao-cache-e1.md](correcao-cache-e1.md). A origem administrativa da política de cache ainda requer inspeção; patch local não comprova remoção retroativa. Próximo: revisão do patch e autorização própria de commit/push/deploy; eventuais purge/alterações remotas ou novas gravações CMS dependem de autorização específica. E1 permanece pendente de validação remota, E2 não iniciada.


## Autorisation de publication du correctif / autorização de publicação

O responsável revisou a prévia e autorizou commit/push do patch de cache, verificador, testes e documentação na main, com um deploy e validação remota. Não autorizou purge nem novas gravações CMS. Antes do commit, main recebeu fast-forward dos quatro commits CMS já publicados; produto local adicional preservado fora do stage. Código do patch permanece igual ao build isolado aprovado (20 testes, tipos e saída). Conferência remota e investigação da origem da política ainda pendentes após deploy.
