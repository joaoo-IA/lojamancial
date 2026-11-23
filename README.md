# LOJA — prova da administração

Escopo aprovado em 23/11/2026: um produto ilustrativo, Astro/TypeScript, Decap CMS, GitHub e Cloudflare Pages. Sem vendas, carrinho ou banco nesta etapa.

## Executar localmente

Requer Node 24.22.3 ou superior compatível.

1. `npm ci --ignore-scripts`
2. `npm run build`
3. `npm run preview -- --port 4321`

Vitrine: http://localhost:4321/ · acesso: /administracao/ · painel: /admin/ · versão ativa e acompanhamento: /publicacao/.

Para editar arquivos locais com o Decap: criar .env com `CMS_LOCAL_BACKEND=true`, executar `npm run cms:local` e, em outro terminal, `npm run dev`. Use localhost no navegador. O servidor Decap precisa permanecer em loopback. O dev atualiza a página a partir dos arquivos locais: isso não demonstra autenticação GitHub nem publicação Cloudflare. O build ignora o modo local e verifica que ele não entrou no resultado.

## Publicação real e demonstração

Ver [Configurar Cloudflare e OAuth](docs/configuracao-cloudflare.md), [roteiro de demonstração](docs/roteiro-demonstracao.md) e [evidências atuais](docs/verificacao.md).

Publicar no Decap gera commit na main. O GitHub aciona o Cloudflare Pages conectado. A publicação só está confirmada quando o check conclui com sucesso para aquele commit e a vitrine exibe o mesmo commit ativo. Falha mantém a última versão válida.

## Comandos

- `npm run check`: tipos Astro/TypeScript.
- `npm test`: conteúdo e cenários positivos/negativos de OAuth usando respostas fictícias.
- `npm run build`: prepara distribuição fixada do CMS, checa tipos, testa, gera e verifica saída.
- `npm run verify:flows`: percorre alterações do único produto com builds locais, restaurando o conteúdo ao final. Não substitui a demonstração remota.

Segredos OAuth ficam apenas no Cloudflare. Nunca enviar senhas ou tokens no chat. O frontend do CMS é público; a escrita é protegida pelo GitHub e pela autorização OAuth. A lista de administradores controla novos logins; remover definitivamente acesso exige revogar permissões/tokens no GitHub, pois uma sessão já autorizada pode conservar o token.

## Referências oficiais

- [Astro](https://docs.astro.build/)
- [Backend GitHub Decap](https://decapcms.org/docs/github-backend/)
- [UUID estável](https://decapcms.org/docs/widgets/uuid/)
- [Cloudflare Pages e GitHub](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [OAuth GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
