# Revisão local do Decap e proposta da prova OAuth

Data: 23/11/2026. Estado: correção local disponível para revisão; prévia publicada separada é R — proposta. Não houve aprovação de novo commit, push ou sequência de gravações pelo CMS.

## Abrir agora

Servidor de revisão iniciado no computador do responsável, limitado a loopback:

- Vitrine: http://127.0.0.1:4321/
- Painel: http://127.0.0.1:4321/admin/
- Orientações: http://127.0.0.1:4321/administracao/
- Identificação da versão: http://127.0.0.1:4321/publicacao/

Comando usado: npm run preview -- --port 4321, com Node 24.22.3 fornecido pelo Codex. A aplicação usa o build local já verificado, que contém a correção não commitada. O servidor será mantido para a revisão solicitada. O endereço funciona apenas neste computador enquanto o processo estiver ativo.

## O que conferir nesta revisão

1. A vitrine exibe o produto ilustrativo e a imagem.
2. Em /admin/, aparece Entrar com o GitHub, sem Missing external media library 'default'.
3. Os links de vitrine, orientações e publicações abrem.
4. Esta etapa revisa a interface e o carregamento do CMS. Nenhuma gravação será executada pelo agente.

A correção remove a seleção global media_library.name=default. A biblioteca local é implícita; o campo da foto mantém limite de 5 MB.

## O que funciona e o que ainda depende do ambiente publicado

Funciona localmente: renderização estática, carregamento da configuração corrigida, tela inicial do Decap e navegação pública.

O build anterior desta mesma correção passou em tipos, 12 testes e geração/verificação de saída. Nesta revisão foram conferidos o build existente, respostas HTTP 200 e o botão do CMS no navegador; não foi necessário instalar dependências ou repetir o build.

Login completo não foi validado nesta prévia. O servidor astro preview não executa Pages Functions. Além disso, a implementação atual de OAuth exige HTTPS, origem fixa, cookie Secure e postMessage para a mesma origem. O callback configurado na produção não corresponde ao endereço loopback desta revisão. GitHub admite callbacks loopback em outros cenários, mas isso não torna este fluxo atual funcional no preview estático.

O backend local de arquivos do Decap não foi ativado; ele não comprovaria login GitHub nem publicação automática. Nenhum token, Client Secret ou sessão foi copiado para a prévia.

## Prévia HTTPS proposta — ainda não criada

Branch proposta: codex/prova-catalogo.

O Cloudflare Pages documenta um alias estável por branch. Pela regra documentada de normalização, o alias previsto é codex-prova-catalogo.lojamancial.pages.dev. Esse endereço ainda precisa ser confirmado no painel após um push autorizado; não é uma prévia já disponível.

Antes de executar o CMS nessa prévia, preparar uma nova entrega local para revisão:

- Parametrizar backend.branch no CMS: ele está hardcoded como main hoje.
- Usar CMS_GITHUB_BRANCH=codex/prova-catalogo no ambiente Preview e manter a produção em main.
- Validar que a configuração de preview não pode gravar em main; ausência ou divergência da branch deve bloquear a configuração de teste.
- Configurar PUBLIC_SITE_URL e SITE_URL para a mesma origem HTTPS do alias estável.
- Usar um OAuth App separado para a prova, com homepage no alias e callback exatamente ALIAS/api/oauth/callback.
- Manter os secrets desse aplicativo apenas no ambiente Preview do Cloudflare, sem alterar o callback ou os secrets da produção.
- Manter o acesso administrativo explícito e o escopo public_repo, sujeitos à autorização do responsável.
- Conferir a configuração gerada e a branch antes de qualquer publicação pelo CMS.

Compatibilidade verificada por documentação e leitura do código: o alias estável é adequado ao callback exato; SITE_URL, base_url do CMS, origem da janela do painel e callback precisam coincidir. Usar o alias estável em vez do endereço com hash do deploy. Isso preserva a verificação de origem e o cookie Secure. A compatibilidade efetiva ainda exige o teste real de login, depois da publicação autorizada.

## Sequência proposta para autorização própria

Antes de executar, apresentar novamente os valores e obter autorização específica para:

1. Entrar no painel com a conta GitHub autorizada — sem gravar catálogo.
2. Preparar somente o catálogo da prévia, preservando a referência inicial. Se necessário, ocultar o exemplo anterior na branch de teste para manter um único produto visível.
3. Cadastrar um novo produto ilustrativo, foto grafite, preço de exemplo R$ 149,90 e uma variação.
4. Aguardar a publicação automática da branch de teste e conferir a vitrine pública dessa prévia, sem autenticação.
5. Alterar o mesmo produto para R$ 159,90 e foto clara; publicar e conferir.
6. Ocultar esse produto; publicar e conferir a ausência na vitrine, no JSON e a URL direta indisponível.
7. Reativação ou outras alterações finais somente se incluídas expressamente na autorização.

Salvar pelo CMS gera commits na branch configurada e pode gerar commits de mídia. A autorização dessa sequência deverá nomear a branch e o ambiente. Ela não autoriza merge em main nem atualização da produção.

## Fontes oficiais

- [Cloudflare — aliases de prévia](https://developers.cloudflare.com/pages/configuration/preview-deployments/#preview-aliases)
- [GitHub — regras de redirect e callback](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#redirect-urls)
- [Decap — backend GitHub](https://decapcms.org/docs/github-backend/)

## Próxima entrega

Depois do retorno sobre a visualização local, definir o escopo e o destino do próximo commit/push. A preparação do isolamento da prévia deve ser apresentada localmente antes da sua publicação. Autenticação real e sequência de alterações continuam pendentes.
