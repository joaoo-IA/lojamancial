# Evolução da loja até a V1 — referência aprovada

Data: 23/11/2026. Estado atual: aprovado pelo responsável como referência E0–E8; somente implementação/verificação local da E0 autorizadas. E0 preparada para revisão, com limitação de navegação automatizada descrita em entrega-e0.md. Commit, push, deploy e E1 dependem de aprovações próprias. Histórico das propostas preservado abaixo.

## Referências e decisões preservadas

- Solicitações do responsável nesta conversa prevalecem sobre os dois PDFs.
- Rascunhos_da_Loja.pdf: 15 páginas lidas e renderizadas; organização de início (1–6), catálogo (7), produto (8), carrinho (9), painel (10) e informações (11–15).
- Plano_de_Desenvolvimento_da_Loja.pdf: 3 páginas relidas integralmente. Preservar sua prioridade de provar administração/publicação primeiro, IDs estáveis, valores em centavos e compra sem cadastro.
- Correção aprovada do plano técnico do PDF: Astro + TypeScript + Decap + GitHub + Cloudflare Pages, com catálogo versionado. Next.js, Supabase, Vercel Pro e a estimativa de US$ 45/mês não são a arquitetura atual. Não há justificativa atual para banco.
- Outra divergência: o PDF descreve atualização sem republicar o site; nesta arquitetura, salvar no CMS cria commit e o Cloudflare faz novo build/publicação. A mudança só está concluída quando a versão servida e o conteúdo correspondem à alteração. Não prometer atualização instantânea.
- Manter preto, branco e cinza, nome provisório, imagens ilustrativas substituíveis e nenhuma conta/login para a cliente. GitHub é apenas o acesso administrativo.
- Cada entrega deve ser vista/testada localmente; commit e push dependem de aprovação específica dessa entrega. Gravações reais pelo CMS têm autorização própria, pois geram commits e deploys. Ver ADR-002.

## Balanço do estado real

Versão pública conferida: 49e5b6bce96947726fd08dc5ac3c40b425c3ba55; geração 2026-11-23T23:57:04.946Z. A árvore local já continha registros posteriores à publicação em plano-prova-administracao.md e verificacao.md; foram preservados. Esta revisão só modifica documentação e gera evidências ignoradas pelo Git.

| Área | Implementado | Evidência e limite |
| --- | --- | --- |
| Infraestrutura | Astro/TypeScript, GitHub, Cloudflare Pages, build automático e HTTPS | Commit de correção publicado e identificado por build-info.json; não demonstra gravações feitas pelo CMS. |
| Acesso administrativo | OAuth com origem fixa, state, PKCE, cookie seguro, lista de administradores e checagem de escrita no repositório | Sessão autenticada observada nesta revisão: coleção Produtos e entrada existente carregadas. Negativas de acesso foram testadas com respostas fictícias anteriormente; não houve auditoria completa de segurança. |
| Configuração Decap | Biblioteca inválida removida; Client ID normalizado; coleção Produtos com campos reais | Configuração pública contém apenas Produtos, preview:false e backend.branch=main. Categorias ainda são opções fixas. |
| Formulário | Nome, descrição, preço, categoria, foto, texto acessível, visibilidade, peças e variações montados com dados | Falha visual confirmada: área rolável de altura 0 px recorta os campos. O formulário não é um espaço reservado ainda por construir. |
| Catálogo mínimo | Um produto ilustrativo, ID estável, preço em centavos, foto, combinações cor/tamanho e visibilidade | JSON público contém Conjunto Essencial a R$ 149,90, com uma variação. Um único registro não representa o catálogo completo. |
| Vitrine/produto | Início mínimo, página estática por ID, imagem, descrição e preço | Não há galeria, seleção para compra, medidas, busca, filtros, categorias navegáveis ou carrinho. |
| Publicações | Página com versão ativa, atualização da versão e atalhos para checks oficiais | Não é um monitor automático do último deploy. Salvo/Publicado no CMS não prova publicação concluída. |
| Qualidade | Validação de conteúdo/fotos, visibilidade e rotas; OAuth; build e verificação de saída | Histórico: 14 testes, tipos e build aprovados na última versão de código. Fluxos de preço/foto/ocultação percorridos por script local; não equivalem à prova real pelo CMS. |
| Aparência | Base neutra, variáveis de cor/fonte, estrutura responsiva inicial, foco e link de salto | Revisão histórica em 320/390/1440 px de páginas públicas. Não cobre toda a V1, aparelhos físicos ou auditoria completa de acessibilidade. |

### Diagnóstico da tela em branco

Inspeção somente de leitura no painel autenticado: coleção Produtos lista o registro; abrir a entrada carrega ID, nome, preço 14990, foto e outros campos na árvore de acessibilidade. Screenshot, porém, mostra somente a barra superior e área vazia.

Medições DOM em viewport 1280 × 720: #nc-root tem altura 0 px; o contêiner rolável ancestral dos campos também tem altura 0 px e overflow hidden/auto. Seu ancestral absoluto tem apenas 66 px e overflow hidden. O campo Nome possui dimensões próprias, mas é recortado pelos ancestrais. O código local de src/pages/admin/index.astro aplica position:relative ao #nc-root sem definir altura.

Conclusão: falha de dimensionamento/integração do layout do Decap confirmada. A regra exata a corrigir deve ser isolada e validada na próxima entrega; a evidência atual não autoriza prometer uma correção de uma única linha sem testar coleção, formulário e rolagem. A opção editor.preview=false apenas desliga a prévia do conteúdo; não deveria tornar o formulário invisível.

Não foram digitados campos, enviados arquivos, acionados salvar/publicar ou criados produtos nesta revisão. A indicação ALTERAÇÕES SALVAS foi lida na entrada existente e não representa uma nova gravação do agente. Evidência: artifacts/revisao-v1/editor-altura-zero.jpg.

### O que impede avançar e o que pode esperar

1. Bloqueio atual: corrigir o layout do editor e verificar visualmente os campos/rolagem. Login e leitura já foram observados; não reiniciar a configuração OAuth sem uma nova evidência de falha.
2. Marco ainda aberto: autorização específica e execução real de cadastrar, alterar preço/foto e ocultar pelo CMS, conferindo commit, check Pages e vitrine após cada ação. A autorização de publicação de 49e5b6b já foi consumida para aquela entrega.
3. A revisão dessa prova precede a implementação do restante, conforme decisão anterior. Este planejamento pode avançar agora, mas não muda esse marco.
4. Para lançar e testar WhatsApp real: número comercial correto, região/retirada/entrega, meios de pagamento combinados na conversa, contato/dados do fornecedor, políticas e medidas precisam ser fornecidos/validados. Não impedem o desenvolvimento com dados ilustrativos.
5. Decisão de conjuntos antes da etapa de produto: proposta é uma combinação de cor e tamanho para o conjunto inteiro. Se as peças puderem ter tamanhos independentes, a modelagem e o esforço de produto/carrinho mudam e devem ser aprovados antes dessa etapa.
6. Identidade final, domínio próprio, fotos comerciais, banco, checkout e estoque detalhado não bloqueiam a próxima entrega. Não são dependências do conserto do editor.

## Organização técnica proposta

Preservar a stack e o JSON/Git. Separar src/components para cabeçalho, navegação, cards, galeria, filtros e resumo de pedido; src/lib para catálogo, validação, carrinho e mensagem WhatsApp; src/styles para tokens e estilos comuns; src/pages para rotas. Evitar biblioteca de UI, framework cliente e serviço adicional sem necessidade concreta; usar JavaScript no navegador apenas onde houver interação.

Conteúdo proposto, ainda não implementado:

- src/content/produtos/ID.json: manter IDs existentes; nome, descrição, categoria por ID, preço em centavos, visibilidade, lista ordenada de até seis fotos/alt, medidas ou referência ao guia, peças incluídas, combinações válidas com IDs estáveis e marcação/ordem de novidade e destaque.
- src/content/categorias/ID.json: ID estável, nome, slug, imagem/alt, ordem e visibilidade. Renomear não muda o ID; impedir exclusão de categoria em uso. Proposta: ocultar categoria tira seu atalho da navegação, sem ocultar automaticamente seus produtos.
- src/content/banners/ID.json: imagem por contexto, texto/alt, título, link interno validado, ordem e visibilidade. Começar com um banner principal estático, sem carrossel automático.
- src/content/loja/configuracao.json: nome provisório, WhatsApp, atendimento, entrega/retirada e informações institucionais; somente conteúdo publicável, nunca secrets.
- src/content/paginas/SLUG.json: conteúdo estruturado das páginas informativas e tabelas de medidas. Nada de HTML arbitrário para editar políticas.
- public/media: imagens de origem; gerar versões proporcionais/otimizadas para a vitrine. Preservar as duas ilustrações atuais. Não copiar as fotos dos PDFs para uso comercial.

O CMS deve oferecer Produtos, Categorias, Banners e Informações da loja, além de páginas/guia de medidas conforme o modelo. Tudo deve alimentar a mesma geração da vitrine: edição somente no navegador do administrador não é aceitável.

Migrar o produto ilustrativo sem trocar seu ID nem os IDs válidos de variação. Fazer compatibilidade de leitura temporária quando o modelo passar de uma foto para galeria. Validações devem impedir categoria inexistente, combinações duplicadas, preço inválido, imagens inválidas e links perigosos. O repositório e as fotos são públicos; ocultação retira oferta da vitrine, não torna os arquivos confidenciais.

## Entregas propostas e ordem

Os tempos abaixo são faixas de trabalho técnico, não prazo fechado. Excluem espera por revisão, publicação, contas e conteúdo. Ordem aprovada como referência; somente E0 tem implementação local autorizada. Aprovar a execução de cada próxima entrega separadamente.

### E0 — Editor administrativo visível e utilizável (2–4 h)

- Resultado visível: abrir produto existente e nova entrada mostra o formulário completo, com rolagem e ações acessíveis.
- Funções: corrigir somente dimensionamento/posicionamento do painel, incluindo a convivência com a barra de ajuda. Preservar OAuth, dados, campos e fluxos de publicação.
- Dependências: código atual; modo local controlado do Decap em loopback para revisar formulário sem reaproveitar tokens de produção. A prévia estática sozinha não executa OAuth/Functions. Confirmar o bind local antes de iniciar esse modo.
- Pronto quando: campos e área rolável têm dimensões positivas; todos os campos, lista de variações e controle de imagem são alcançáveis com mouse/teclado; testar coleção, entrada existente e nova entrada em desktop e celular. Comparar screenshot com a evidência em branco. Sem gravações remotas nesta entrega.
- Revisão: demonstração local; depois autorização específica de commit/push. Após deploy, repetir a conferência autenticada pública. Não chamar prova completa de catálogo de concluída aqui.

### E1 — Encerrar a prova real de administração (2–4 h, mais esperas externas)

- Resultado visível: uma alteração administrativa realmente aparece na vitrine pública a cada publicação; ocultação retira o produto da oferta e da URL direta.
- Funções: cadastrar um produto ilustrativo, editar preço e foto, ocultar; usar o acompanhamento de publicação já existente.
- Dependências: E0 publicada e revisada; sessão administrativa; autorização separada da sequência de conteúdo e seu destino.
- Preparação proposta: preservar o exemplo existente e cadastrar um produto de teste identificado. Isso deixa dois registros temporariamente; se for necessário somente um visível, incluir a ocultação do exemplo na autorização de preparação. Não excluir/arquivar o original por iniciativa própria. Estado final/reativação também precisa estar na sequência autorizada.
- Pronto quando: registrar IDs, commits e checks Pages; após cada sucesso, conferir conteúdo em sessão visitante, comparar SHA e verificar nome, preço e foto. Ao ocultar: painel conserva o registro, vitrine e JSON público omitem e URL direta dá 404. Confirmar que salvar e concluir publicação são estados diferentes.
- Falha/recuperação: testar erro de conteúdo local; a demonstração de build remoto falho e preservação da versão válida deve ocorrer em branch Preview autorizada, nunca introduzindo erro na main. Esse teste não exige automaticamente outro OAuth App se for feito por commit controlado da branch. Negativas remotas de acesso precisam de conta apropriada e participação do responsável; testes fictícios continuam identificados como tais.
- Marco: revisar os resultados antes de iniciar E2. A prévia OAuth isolada anterior continua uma alternativa, não uma infraestrutura já implantada ou uma exigência automática para corrigir CSS.

### E2 — Base visual, dados completos e administração organizada (10–16 h)

- Resultado visível: páginas locais de referência com cabeçalho, menu mobile, cards proporcionais, tipografia consistente e formulários organizados por assunto no CMS.
- Funções: componentes/tokens; modelos de produto, categorias, galeria e medidas; coleções de categorias/informações; migrar o exemplo; preparar destaques e configuração. Conservar valores internos em centavos, com rótulos e ajuda inequívocos para quem edita preços.
- Dependências: prova E1 aceita; proposta de campos revisada. Categorias iniciais: Conjuntos, Blusas, Tops, Leggings e Shorts.
- Pronto quando: mesma identidade visual em componentes públicos; imagens sem distorção e recortes indevidos; navegação com teclado; layout em 320/390/768/1440 px; ID do exemplo preservado; categorias renomeáveis sem quebrar referências; conteúdo válido gera vitrine e inválido falha com indicação útil. Formulários locais e saída da loja usam a mesma estrutura.

### E3 — Início completo e banners administráveis (8–14 h)

- Resultado visível: cabeçalho/banner, compre por categoria, novidades, conjuntos, como comprar e rodapé, na ordem dos rascunhos 1–6.
- Funções: navegação mobile/desktop, banner e seu destino, cards de categoria, seções com produtos visíveis, ordenação manual de destaque/novidade e links corretos. Campos de banner, textos e dados do rodapé vêm do CMS.
- Dependências: E2; galeria e conteúdo ilustrativo. Seções sem conteúdo devem ter tratamento coerente, sem espaços vazios enormes.
- Pronto quando: editar localmente banner/categoria/destaque atualiza a página local; ocultos não entram nas seções; links levam ao catálogo/filtro correto; imagens e títulos mantêm hierarquia e proporção nas quatro larguras. A atualização real publicada só se verifica após autorização de publicação e, se houver edição CMS remota, da sequência correspondente.

### E4 — Catálogo com busca e filtros (6–10 h)

- Resultado visível: grade de produtos com quantidade de resultados, busca, categoria/tamanho/cor e limpar filtros; ordenação simples por novidade e preço.
- Funções: busca local adequada a 15–20 produtos, filtros combináveis, estado na URL, abrir/fechar filtros no celular e estados sem resultados/sem produtos.
- Dependências: E2; E3 integra os atalhos; conjunto ilustrativo pequeno cobrindo categorias e combinações.
- Pronto quando: buscar e voltar preserva a seleção; cor e tamanho precisam corresponder à mesma combinação existente (não combinar vermelho/P com azul/M e aceitar vermelho/M). Filtro mostra somente publicados; contagem e ordenação corretas; uso por teclado/celular sem rolagem horizontal. Não adicionar serviço de busca pago.

### E5 — Produto completo e pedido individual (8–14 h)

- Resultado visível: galeria com miniaturas, preço, peças incluídas, medidas, seleção de cor/tamanho/quantidade e botão de pedido pelo WhatsApp.
- Funções: até seis fotos ordenadas, texto acessível, guia de medidas por tipo de peça, combinações válidas, quantidade inteira positiva e gerador reutilizável de mensagem individual. O botão de carrinho só passa a funcionar com E6; não publicar botão inoperante como função pronta.
- Dependências: E2/E4, regra de tamanhos dos conjuntos, número comercial para testar o link real. Desenvolvimento ilustrativo não depende de obter fotos finais.
- Pronto quando: escolher variação é obrigatório, mesmo que haja uma única opção; mudanças de cor limpam tamanho incompatível; mensagens incluem produto, cor, tamanho, quantidade, valor unitário e subtotal corretos; conferir o catálogo atual antes de abrir o chat. Guia não apresenta medidas fictícias como verdadeiras. Item oculto não pode ser pedido pela URL antiga.
- O link preenche a mensagem: a cliente toca em Enviar. Não há envio automático, pagamento, frete calculado, reserva de estoque nem confirmação de venda.

### E6 — Carrinho persistente e pedido múltiplo (10–16 h)

- Resultado visível: sacola com contador, lista de itens e variações, alterar quantidade/remover, subtotal e mensagem organizada no WhatsApp.
- Funções: localStorage com versão/validação; chave por produto + variação; somar a mesma combinação e manter combinações diferentes em linhas separadas; manter estado ao recarregar/fechar o navegador.
- Dependências: E5 e catálogo JSON atual; número comercial para teste real. Preço salvo é uma referência antiga, não autoridade para o pedido.
- Pronto quando: duas variações do mesmo produto coexistem; quantidades/subtotais exatos em centavos; persistência e carrinho vazio; recuperação de armazenamento inválido/bloqueado com aviso. Antes de WhatsApp e ao retomar navegação, reconciliar com catálogo atual: avisar preço alterado, impedir pedido de produto/variação oculto/removido e solicitar revisão. Sem confirmação silenciosa de novos preços. Se não puder conferir o catálogo, explicar a falha e oferecer nova tentativa.
- Mensagem final enumera cada combinação e seu subtotal, além do subtotal dos produtos. Frete/entrega/pagamento permanecem a combinar. Testar link e composição em celular e computador; não enviar a mensagem pelo usuário.

### E7 — Informações e conteúdo da loja (5–9 h)

- Resultado visível: Entrega e retirada, Trocas, Guia de medidas, Privacidade e Atendimento integrados ao rodapé e ao produto; Como comprar explica o fluxo final.
- Funções: conteúdo editável no CMS com estrutura simples, dados de atendimento e WhatsApp coerentes; tabelas de medidas legíveis e acesso aos canais corretos.
- Dependências: estrutura E2 e fluxo E5/E6; dados/políticas validados pelo responsável antes de liberar vendas.
- Pronto quando: não prometer Correios/retirada/prazos que a operação não oferece; informações iguais em produto, carrinho e páginas; tabela no celular e teclado; privacidade corresponde ao carrinho no dispositivo, hospedagem e WhatsApp realmente usados. Não inventar número de pedido, porque a V1 não registra pedidos no servidor.

### E8 — Aceite integrado, operação e preparação de lançamento (6–12 h)

- Resultado visível: percurso completo consistente em celular/computador; painel administra produtos, categorias, banners e informações com reflexo real na loja após build.
- Funções: revisar mensagens, carregamento, acessibilidade, desempenho de imagens, links, estados de erro, metadados de produto, sitemap e instruções operacionais. Separar atalhos administrativos da navegação da cliente.
- Dependências: E2–E7; conteúdo e operação aprovados. Produtos ilustrativos permanecem até uma decisão específica de trocar para conteúdo comercial.
- Pronto quando: matriz abaixo aprovada; demonstrar edição e publicação de cada tipo de conteúdo, com autorização de gravação; orientação de backup do repositório e fotos, recuperação de versão e revogação de acesso. Conferir diferenças entre última edição e versão efetivamente ativa.
- A versão atual é noindex. Remover avisos de prova/noindex somente em publicação de lançamento aprovada com conteúdo adequado; não indexar produtos fictícios. Domínio próprio é opcional; HTTPS em pages.dev já existe.

Estimativa total indicativa das propostas E0–E8: 57–99 horas técnicas. As maiores incertezas são o layout do CMS em diferentes telas, os campos/medidas de conjuntos, tratamento de imagens, reconciliação do carrinho e disponibilidade de conteúdo/validação externa. Não converter essa faixa em prazo fechado antes da E1.

## Direção visual e ajustes dos rascunhos

- Preservar sequência de seções, preto/branco/cinza e hierarquia dos esboços; a identidade final será aplicada por tokens de cor, tipografia e espaçamento.
- Rascunhos são referências de composição, não capturas finais. No celular: cabeçalho compacto, menu acessível, duas colunas de produtos quando legíveis e uma coluna em telas muito estreitas. No desktop: conteúdo com largura máxima, grade de até quatro colunas e filtros laterais quando houver espaço.
- Fotos de cards em proporção 4:5, miniaturas consistentes; produto com foto e informações lado a lado no desktop, empilhados no celular. Evitar reproduzir as duas colunas estreitas do rascunho 8 em celular de 320/390 px, porque reduz texto e controles demais.
- Uniformizar respiros, bordas discretas e hierarquia de títulos/preços. Usar fonte de sistema inicialmente, sem dependência paga. Nomes/textos longos precisam caber sem quebrar a composição.
- Informar cores por texto além das amostras; controles com foco visível, rótulos e alvos de toque adequados; painéis de filtro e menu devolvem o foco ao fechar.
- Banner inicial estático e legível, com imagem ilustrativa; sem carrossel automático na V1. Não distorcer foto para preencher banner; definir recorte por dispositivo e contraste do texto.
- O painel do rascunho 10 orienta agrupamento de Produtos/Categorias/Banners/Informações. A solução escolhida usa as coleções e formulários nativos do Decap; não inclui copiar exatamente sua tabela, modal e alternadores inline. Um painel totalmente sob medida muda o escopo/custo e não é necessário para administrar de verdade.

## Matriz mínima de aceite da V1

| Cenário | Evidência esperada |
| --- | --- |
| Responsividade | Revisão visual/funcional em 320, 390, 768 e 1440 px; pelo menos navegador móvel real e desktop antes de vendas; sem campos invisíveis ou conteúdo cortado. |
| Busca/filtros | Categoria/cor/tamanho combinados na mesma variação; limpar, sem resultados, navegação de volta e URLs coerentes. |
| Variação obrigatória | Pedido e adicionar bloqueados antes da escolha válida; quantidade inteira positiva. |
| Duas variações | Mesmo produto, combinações diferentes em linhas distintas; repetição da mesma combinação soma. |
| Valores | Unitários/subtotais em centavos, quantidades corretas e total igual à soma, sem incluir frete inventado. |
| Persistência | Recarregar/fechar/reabrir no mesmo navegador; tratar JSON antigo/corrompido e indisponibilidade de armazenamento. |
| Catálogo alterado | Preço modificado exige revisão; item oculto/removido e variação excluída não são enviados. URL de oculto dá 404; não tratar ocultação como confidencialidade de arquivos. |
| WhatsApp | Mensagens individual e múltipla codificadas corretamente com acentos; testar mobile e desktop, abertura do chat e texto, sem envio automático. |
| Administração | Criar/editar/ocultar produto, alterar foto, categoria, banner e informação; comparar commit da edição, check e saída pública após cada alteração autorizada. |
| Acesso | Visitante não grava; login fora da lista e sem escrita bloqueado; tokens não entram em código/log/relatório; revogação documentada e testada conforme contas disponíveis. |
| Publicação com erro | Rejeição de dados inválidos e orientação acionável; falha remota/recuperação em Preview quando autorizada, preservando produção válida. |
| Operação | Atendimento, número comercial, medidas, entrega e políticas aprovados; backup/exportação e procedimento de recuperação demonstrados. |

## Custos e manutenção

Sem novo serviço pago proposto. Astro/TypeScript/Decap continuam no projeto; GitHub guarda conteúdo e imagens, Cloudflare Pages serve a vitrine e Functions fazem OAuth. Endereço gratuito atual: https://lojamancial.pages.dev. A hipótese de operação dentro das franquias gratuitas continua adequada ao catálogo de 15–20 produtos; nenhuma cobrança ou mudança de plano foi contratada.

Limites oficiais reconferidos: Pages Free permite 500 builds/mês, um por vez, até 20.000 arquivos e 25 MiB por arquivo. Cada commit do CMS pode consumir um build, inclusive commits de mídia. Arquivos estáticos têm requisições gratuitas sem limite; Functions compartilham a franquia Workers Free de 100.000 requisições/dia. São limites da conta, não um crédito exclusivo da loja. O upload local da prova mantém limite mais restrito de 5 MB por foto; para a V1, otimizar tamanho antes da publicação e evitar acúmulo de originais enormes no Git.

Domínio próprio e renovação anual são opcionais, com preço conforme extensão/registrador na contratação. Fotos finais, identidade, e-mail profissional e trabalho de desenvolvimento/manutenção têm custo separado se contratados. Não adicionar analytics, banco, storage externo ou serviço de busca por padrão. Pagamento integrado, conta de cliente, estoque detalhado, automações e cálculo de frete ficam para futuras etapas.

As quotas não são uma garantia de disponibilidade ilimitada; acompanhar uso e alterações de condições antes de lançamento. Se o volume/edição exigir outra arquitetura, apresentar comparação e pedir decisão; não migrar automaticamente para planos pagos.

Fontes oficiais consultadas nesta revisão:

- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/functions/pricing/
- https://www.cloudflare.com/plans/developer-platform/
- https://decapcms.org/docs/github-backend/
- https://decapcms.org/docs/configuration-options/

## Proposta para a próxima decisão

Aprovar somente E0 como próxima implementação: consertar e demonstrar o formulário local, preservando catálogo, OAuth e infraestrutura. Depois da visualização, solicitar autorização específica para seu commit/push. Só então preparar a autorização da sequência E1. As demais entregas ficam registradas como roteiro proposto para revisão, sem iniciar o desenvolvimento da loja completa nesta conversa.


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
