# E2 — pré-visualização pública isolada

Autorização do responsável em 24/11/2026: disponibilizar E2 exclusivamente em Preview, com commit/push em branch dedicada, sem push/merge na main, mudanças de conta, purge ou envio à Cloudflare. Ver [ADR-006](decisoes/ADR-006-E2-preview-isolado.md).

## Destino e integração conferidos
Branch: codex/e2-preview. Repositório: joaoo-IA/lojamancial.
Painel Pages inspecionado somente em leitura: npm run build, saída dist, produção main, publicação automática habilitada e Preview selecionado para todas as branches não Production. Formulário aberto para leitura e cancelado sem salvar.
Há uma integração Workers Builds separada com falha anterior. A branch de produção desse Worker também foi conferida como main; não foi modificada nem corrigida nesta entrega.

## Isolamento do painel
Somente CF_PAGES_BRANCH=codex/e2-preview seleciona o backend test-repo incluído no Decap fixado. A configuração demonstrativa não contém repo, branch, base_url ou endpoint OAuth GitHub.
Seed por lista explícita: sete exemplos E2, categorias, guia fictício, informações ilustrativas, banners vazios e dez imagens E2. Registros original/E1 e teste local do responsável não fazem parte do editor demonstrativo.
Edições e uploads ficam na memória da aba. Não geram commit, deploy, gravação no servidor ou mudança da vitrine. Recarregar restaura os exemplos. É uma demonstração dos formulários, não substitui a administração real comprovada na E1.
O painel informa esse limite; CSP restringe conexões à própria origem. Middleware de OAuth recusa hosts distintos de lojamancial.pages.dev, impedindo autenticação de Preview mesmo se bindings estiverem incorretos. Não foram alterados secrets, permissões, callbacks ou configurações Cloudflare.
A URL Preview é pública, com conteúdo ilustrativo e noindex; não é confidencial. Não inserir dados reais.

## Preservação e verificação
Baseline de produção registrada por HTTP antes do push: build-info/catalogo/inicial; SHA f8fbe1578804d0ee3d95411e99d88b25d0fbf9ef. Evidência local ignorada em artifacts/e2-preview/baseline.json. Comparar novamente após deploy.
Original e teste oculto permanecem byte a byte iguais a HEAD; a pendência cache E1 continua aberta. Regras de cache E1 não mudaram; E2 acrescenta somente a regra da nova rota de demonstração já revisada localmente.
Testes de isolamento: ativação somente na branch dedicada, seed sem registros E1/original, OAuth Preview bloqueado antes do próximo handler e produção encaminhada normalmente. Executar também tipos/testes/build e verificador da saída para Preview e para main.
Nenhuma instalação nova. Credenciais ficam fora do código e dos relatórios; varredura do stage antes do commit. Cache/support e documentos locais fora da E2 não entram automaticamente no stage.

## Conferência remota e limites
Após sucesso do check Cloudflare Pages, conferir build-info com branch/SHA, inicial, catálogo (oito produtos), demonstração (cinco categorias/medidas), produto/galeria, menu móvel e painel/edição em memória. Testar OAuth 403 em Preview. Comparar baseline de produção e refs main.
Commit e URL serão informados ao responsável no relato final e em evidência local após publicação. O registro pós-publicação não gera novo commit automático.

## Verificação local antes do envio

37 arquivos sem erros/avisos/hints, 28 testes aprovados e builds/verificadores para main e codex/e2-preview aprovados. O build main mantém backend GitHub e seed vazio; Preview usa test-repo e sete cópias. Editor demonstrativo e biblioteca abertos no navegador; alteração temporária de preço salva e restauração ao recarregar comprovadas. Stage revisado por lista explícita e padrões de credenciais; originais/E1 e dependências fora do stage.
