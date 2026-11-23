# Configurar Cloudflare Pages e acesso administrativo

Estado: procedimento preparado; executar somente na conta da loja. Não há segredo neste documento.

## Pages conectado ao GitHub

1. No Cloudflare, abrir Workers & Pages > Create application > Pages > Connect to Git.
2. Conectar GitHub e selecionar somente o repositório joaoo-IA/lojamancial. A concessão de acesso precisa ser realizada/revisada pelo responsável.
3. Branch de produção: main. Build: npm run build. Diretório: dist. Root: raiz do repositório.
4. Definir NODE_VERSION=24.22.3. Não usar o Node 20 global deste computador.
5. Habilitar publicação automática de main. Para a prova inicial, desabilitar previews de outras branches ou manter o OAuth restrito ao endereço oficial; não autorizar origens arbitrárias.
6. O primeiro build pode ser feito sem OAuth: a vitrine funciona e o login retorna uma mensagem de configuração pendente.
7. Anotar o endereço real atribuído pelo Pages. Não presumir que lojamancial.pages.dev esteja disponível.

## Configuração pública de build

Após obter a URL, configurar no ambiente de produção do Pages:

- PUBLIC_SITE_URL: origem HTTPS oficial, sem subcaminho, por exemplo o endereço pages.dev atribuído.
- PUBLIC_CLOUDFLARE_PROJECT_URL: URL exata do projeto no painel Cloudflare, para o atalho Publicações.
- CMS_GITHUB_SCOPE: repo para repositório privado; public_repo somente se o repositório for público.

Não configurar CMS_LOCAL_BACKEND=true no Cloudflare. O build de produção também força sua exclusão.

## Aplicativo OAuth GitHub

Na conta responsável, criar um OAuth App com nome identificável da loja, homepage igual à origem oficial e callback exatamente ORIGEM/api/oauth/callback.

A autorização envolve permissão sensível e precisa de revisão do responsável. O backend Decap com OAuth usa scope repo em repositório privado, que pode alcançar outros repositórios acessíveis ao usuário. Não é um token restrito somente a este projeto. Para público, public_repo reduz parte do alcance, mas também abrange outros repositórios públicos do administrador. Não publicar repositório apenas para contornar permissões.

No ambiente de Functions de produção do Pages, configurar:

- SITE_URL: mesma origem HTTPS usada em PUBLIC_SITE_URL.
- GITHUB_CLIENT_ID: identificador do aplicativo.
- GITHUB_CLIENT_SECRET: segredo, inserir como secret diretamente no Cloudflare.
- ADMIN_GITHUB_USERS: logins GitHub autorizados, separados por vírgula. Confirmar os responsáveis antes de preencher; o proprietário do repositório não é automaticamente designado administrador.
- CMS_GITHUB_SCOPE: igual ao configurado no build.

Não incluir esses segredos em arquivos do repositório, configuração pública do CMS ou saída de comandos. Não enviar valores ao chat. Após alterar bindings/variáveis, republicar e validar /api/oauth/auth?provider=github.

A autenticação verifica origem fixa, state e PKCE, login na lista e permissions.push=true no repositório. O token é entregue somente à janela de mesma origem que iniciou o login. O código não registra tokens.

## Como identificar sucesso ou erro

- Abrir /publicacao/ e usar Ver alterações e checks no GitHub.
- Encontrar o commit da edição do CMS na main. O check do Cloudflare pode estar em execução, concluído com sucesso ou falho.
- Abrir Details para acessar o build correspondente no Cloudflare. Conferir ambiente Production e SHA do commit.
- Após sucesso, atualizar /publicacao/: o SHA ativo deve coincidir. Confirmar o conteúdo em outra sessão.
- Em falha, a versão ativa continuará anterior. Abrir os logs, corrigir e gerar nova edição/publicação.
- Ausência de check não é sucesso: revisar conexão Git, regras de branches/build e eventuais instruções de skip.
- Não expor logs com segredos. Não inserir conteúdo malicioso para produzir um erro de propósito.

Verificação em 23/11/2026: a API oficial GitHub informou visibility=public para joaoo-IA/lojamancial. Nesta prova, usar CMS_GITHUB_SCOPE=public_repo no build e nas Functions. Isso não restringe o token a um único repositório público; revisar a concessão na tela do GitHub.
