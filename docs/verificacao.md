# Verificação da prova administrativa

Data: 23/11/2026. Estado: implementação local validada; integração e demonstração remotas pendentes.

## Ambiente e origem

Windows; projeto C:/Users/Acer/OneDrive/Área de Trabalho/loja.manancial. Node 24.22.3 já fornecido pelo Codex, selecionado no PATH somente dos comandos; npm 10.8.2. Nenhuma configuração global do Node foi alterada. Instalação como usuário comum, sem hooks npm.

Repositório fornecido pelo responsável: https://github.com/joaoo-IA/lojamancial.git, branch main. A API oficial GitHub confirmou que ele é público. OAuth padrão public_repo; não foi alterada a visibilidade.

## Resultados atuais

| Comando/verificação | Resultado |
| --- | --- |
| npm run build | Sucesso: integridade do Decap, astro check, testes, geração estática e verificação da saída |
| astro check, incluído no build | 22 arquivos, zero erros, zero avisos e zero sugestões |
| npm test, incluído no build | 12 testes aprovados: conteúdo e autorização OAuth com respostas fictícias |
| node scripts/verify-flows.mjs | Sucesso: alterar preço/foto, ocultar e excluir rota gerada, rejeitar preço inválido e restaurar original |
| Testes de catálogo durante edição/ocultação | Aprovados: fixtures de teste independem dos produtos editáveis |
| Validação do lockfile | Todas as entradas de pacotes têm versão; @types/estree fixado para corrigir entrada incompleta |
| npm ci --dry-run --ignore-scripts --no-fund --no-audit --offline | Concluiu antes da correção final da entrada sem versão; não é evidência de execução Linux |
| HTTP local com astro preview em 127.0.0.1:4321 | 200 para vitrine, acesso, painel, config, publicações, versão, catálogo, foto e distribuição CMS; produto inexistente retornou 404 |
| Configuração gerada | backend GitHub joaoo-IA/lojamancial, main, public_repo, sem local_backend no build |
| Produto final | Um produto ilustrativo visível, preço 14990 centavos e imagem grafite, restaurado após teste |

O teste de conteúdo inválido interrompeu o build local como esperado. Isso não comprova um deploy falho no Cloudflare nem a preservação remota da última versão; esses cenários exigem o ambiente conectado.

## Instalação: histórico e correções

A primeira tentativa usou TypeScript 7, incompatível com o peer declarado de @astrojs/check. Fixado TypeScript 6.0.3, sem force nem legacy-peer-deps.

A instalação completa do pacote Decap trouxe dependências desnecessárias à distribuição pronta; foi interrompida e substituída pela distribuição oficial 3.18.0, obtida do registro npm, conferida pelo SHA-512 do tarball e SHA-384 do JS e acompanhada dos avisos de licença.

Downloads e operações de instalação foram lentos neste ambiente. Uma instalação parcial deixou arquivos e entradas de lockfile incompletos. O lock foi reconciliado, as dependências reinstaladas via npm ci e a entrada de tipos restante fixada explicitamente. O build final e os fluxos acima passaram após as correções. Permanecem avisos de depreciação em dependências do servidor Decap local; ele não é instalado como serviço nem publicado nas Functions.

## Acesso administrativo

Implementado OAuth com origem fixa, state, PKCE, cookie Secure/HttpOnly/SameSite=Lax, lista explícita de logins e checagem de escrita no repositório. Os testes cobrem negativa para conta fora da lista, falta de escrita, callback inválido e indisponibilidade do provedor. São testes com mocks, sem contas ou tokens reais.

A página do painel e sua configuração são públicas. A escrita depende do GitHub. public_repo ainda pode alcançar outros repositórios públicos acessíveis ao administrador; não é permissão exclusiva para este projeto. Uma conta removida da lista de novos logins pode conservar token prévio: revogar permissões/tokens no GitHub para retirar o acesso definitivamente.

Sem variáveis do ambiente OAuth, o endpoint bloqueia o login; sem endereço oficial de build, o painel mostra configuração pendente.

## Publicação e identificação

/publicacao/ mostra commit, ambiente, branch e horário da versão servida, com links aos checks GitHub e ao painel Cloudflare. Ela declara que não consulta automaticamente o estado do último deploy. Sucesso exige check concluído para o mesmo commit e conferência da versão ativa; erro exige consulta aos logs oficiais. Ausência de check não é sucesso.

## Não executado e dependências

- Projeto Cloudflare Pages ainda depende da conexão pelo responsável, que já possui conta.
- Aplicativo OAuth, secrets, origem oficial e logins autorizados ainda precisam ser configurados.
- Cadastro e edição pelo Decap autenticado no GitHub, publicação automática remota e confirmação em sessão visitante não foram demonstrados.
- Negativas de acesso em contas reais e falha de deploy remoto não foram exercitadas.
- Ferramenta de navegador falhou na criação de aba e após reset; não houve inspeção visual ou teste interativo em celular/computador.
- Não houve auditoria completa de segurança, teste Linux ou carga.
- Nenhum pagamento, estoque, carrinho, WhatsApp ou catálogo completo foi implementado nesta prova.

Próximo passo: seguir configuracao-cloudflare.md, obter o endereço pages.dev, configurar OAuth e executar roteiro-demonstracao.md. Parar para revisão do responsável antes de completar a loja.
