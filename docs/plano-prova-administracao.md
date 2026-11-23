# Prova funcional da administração

Estado: commit e push para main e deploy das correções Decap/OAuth explicitamente autorizados nesta entrega. Publicação e conferência do painel em andamento. Gravações pelo CMS permanecem sem autorização.

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
