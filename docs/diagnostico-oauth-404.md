# Diagnóstico do login GitHub — 23/11/2026

Estado: investigação em andamento; correção preparada somente localmente. Nenhum novo commit, push ou teste de gravação pelo CMS autorizado ou executado.

## Código e rotas

O CMS publicado usa backend GitHub, repositório joaoo-IA/lojamancial, branch main e base_url https://lojamancial.pages.dev. auth_endpoint=api/oauth/auth resolve para /api/oauth/auth?provider=github. A Function functions/api/oauth/[action].ts delega a server/oauth.ts; _routes.json inclui /api/oauth/*.

A origem aceita, o callback enviado e a origem do retorno ao painel são https://lojamancial.pages.dev. Callback enviado: https://lojamancial.pages.dev/api/oauth/callback. O callback cadastrado no OAuth App ainda depende de conferência na conta do responsável.

## Client ID efetivamente publicado

Inspeção HTTP direta, sem sessão, cookie ou segredo do responsável: o endpoint responde 302 para https://github.com/login/oauth/authorize. Envia o Client ID público informado pelo responsável acrescido de LF (U+000A) no final: 21 caracteres; o valor esperado tem 20. O valor normalizado coincide exatamente com o ID informado. A causa observável é o valor efetivo de configuração com LF e sua transmissão sem normalização pelo código original.

Não foi comprovado se o valor foi salvo com LF, se uma configuração de outro ambiente foi editada ou se outra implantação foi repetida. A leitura pública não permite distinguir essas hipóteses. Nenhuma variável secreta foi consultada.

## Etapa do 404 e limites das evidências

A captura fornecida mostra uma página 404 do GitHub, mas não expõe a URL completa. O início do fluxo da loja responde 302, não 404. A evidência aponta para o passo de autorização no GitHub; a captura sozinha não demonstra a query exata daquela tentativa.

Comparação HTTP sem sessão: tanto a URL emitida quanto a versão com o ID normalizado responderam 302 para /login no GitHub. Portanto não foi possível reproduzir o 404 autenticado nem provar que remover LF resolve todo o login. A presença do LF permanece um defeito confirmado.

O Client Secret é enviado somente na troca posterior do código por token. Uma mistura de Secret entre aplicativos não explica, por si só, o primeiro redirecionamento de autorização. O sucesso da troca e as permissões da conta continuam sem validação real.

## Interações já realizadas

- O responsável informou que gerou um novo Secret no aplicativo escolhido, substituiu GITHUB_CLIENT_SECRET em Production e fez deploy. Registrado como relato, sem acesso ao segredo e sem prova independente da correspondência do par.
- Em seguida, confirmou salvar novamente GITHUB_CLIENT_ID em Production com o valor exato de 20 caracteres e executar Retry deployment com sucesso.
- A conferência pública imediatamente posterior ainda retornou LF e build-info com commit d7737a0df28f37d5c5bb0ea79fcaa9e4ee07086d e geração 2026-11-23T23:12:49.370Z. Não foi possível confirmar que esse retry atualizou a URL de produção. Foi solicitado somente o link dos detalhes da implantação para identificar projeto/ambiente; sem pedir logs ou variáveis.
- O responsável autorizou explicitamente joaoo-IA como administrador nesta solicitação. Isso não comprova o valor efetivo de ADMIN_GITHUB_USERS nem dispensa a checagem de escrita no repositório.

A escolha entre os dois OAuth Apps existentes deve usar o Client ID, não o nome repetido. Ainda falta confirmar que o Secret substituído foi gerado nesse mesmo aplicativo e que o callback cadastrado corresponde exatamente ao informado acima. Não criar outro aplicativo nem rotacionar novamente sem necessidade demonstrada.

## Correção local revisável

server/oauth.ts normaliza apenas as extremidades do Client ID com trim(), valida o identificador e usa o mesmo resultado na autorização e na troca de código. ID vazio ou com espaços internos é bloqueado antes de consultar o GitHub. Nenhum ID real foi fixado no código; Secret permanece inalterado. Estado, PKCE, cookie seguro, verificação de origem e verificações de administrador/escrita foram preservados.

tests/oauth.test.mjs acrescenta regressões para LF/CR/tab/espaço nas extremidades, consistência do ID e callback nas duas etapas e bloqueio de ID vazio/com espaço interno. As credenciais dos testes são fictícias.

A correção anterior do Decap em src/pages/admin/config.json.ts continua local. A resposta pública ainda contém media_library.name=default; o relato de tela de entrada não comprova que essa configuração tenha sido corrigida no artefato publicado. HEAD continua d7737a0.

## Revisão e próximos critérios

Prévia de interface: http://127.0.0.1:4321/admin/. Não executa Pages Functions nem comprova o ciclo OAuth; usar somente para revisar o carregamento da configuração e a tela inicial. Não salvar produtos enquanto a sequência de publicação não estiver explicitamente autorizada.

Próximo passo operacional: identificar a implantação que recebeu a nova configuração e repetir a conferência pública do ID. Depois conferir o aplicativo existente pelo ID, o callback registrado e a origem do Secret, sem revelar o segredo. Login completo depende de interação autenticada e ambiente HTTPS publicado.

A proposta de prévia isolada permanece em revisao-local-e-previa-oauth.md; não foi criada. backend.branch ainda é main, portanto uma URL Preview isolada não basta para testar gravações com segurança. Antes de usar a prévia, parametrizar e bloquear gravações em main e configurar OAuth para o alias estável exato.

Depois da revisão local, solicitar autorização específica dos arquivos e destino do próximo commit/push. Antes dos testes pelo CMS, solicitar autorização separada para cadastrar um único produto ilustrativo, alterar preço/foto e ocultar, registrando cada commit, check do Cloudflare Pages e versão realmente servida. A loja completa continua fora desta entrega.

## Fontes oficiais

- [GitHub — etapas e parâmetros OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [GitHub — erros na troca por token](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-oauth-app-access-token-request-errors)
- [Cloudflare — variáveis e secrets de Pages Functions](https://developers.cloudflare.com/pages/functions/bindings/)

## Resultado das verificações locais

Node 24.22.3; npm run build aprovado: 22 arquivos sem erros/avisos, 14 testes aprovados e saída estática validada. Artefato local recomposto com PUBLIC_SITE_URL público correto; validação da saída repetida aprovada. git diff --check sem erro de whitespace. Nenhuma dependência instalada; nenhum commit/push ou gravação pelo CMS.

Os detalhes fornecidos posteriormente pelo responsável identificam a implantação 7b1604dd-20ad-42d0-bb5d-b719e3caec0a, concluída às 20h13, compatível com o build já observado. Solicitada uma nova execução com novo ID e horário posterior; confirmação pendente.


## Nova implantação confirmada — 23/11/2026, 20h33

O responsável forneceu os detalhes de 391add8c-7d36-4202-847f-da7b4b9ab22a, Production/main, commit d7737a0, concluída com sucesso às 20h33. HTTP em https://lojamancial.pages.dev/build-info.json confirmou geração 2026-11-23T23:33:19.334Z; portanto a nova implantação chegou à origem pública. A Function de autorização ainda respondeu 302 com Client ID de 21 caracteres, incluindo LF final, e callback correto. Isso supera a hipótese de que somente a versão anterior estivesse sendo consultada. Não comprova se o retry reutilizou configuração anterior ou se o valor salvo no projeto ainda contém LF. Nenhuma nova rotação de Secret é indicada pelas evidências desta etapa. Nenhuma correção local foi publicada.


## Client ID corrigido em produção — 23/11/2026, 20h41

Após o responsável informar nova correção e publicação, a conferência HTTP de /api/oauth/auth?provider=github confirmou 302 para github.com/login/oauth/authorize, Client ID com exatamente 20 caracteres, sem LF e idêntico ao informado. Callback: https://lojamancial.pages.dev/api/oauth/callback. /build-info.json confirmou geração 2026-11-23T23:41:58.049Z, branch main e commit d7737a0. Resolvido o defeito observável de formatação do ID no redirecionamento de produção. Isso ainda não comprova o login autenticado, a correspondência do Secret nem a autorização de escrita. Próximo passo: teste somente de login pelo responsável no painel oficial e relato do resultado; operações de catálogo continuam aguardando autorização própria. Correções locais de código permanecem sem commit/push.
