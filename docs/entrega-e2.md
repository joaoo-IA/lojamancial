# E2 local — base visual e modelos para revisão

Estado: implementada/verificada localmente; aguarda revisão do responsável. Nenhum commit, push, publicação, purge ou envio à Cloudflare autorizado nesta entrega. E1 continua com aceite de cache pendente. Origem e limites em [ADR-005](decisoes/ADR-005-E2-local-com-E1-pendente.md).

## Abrir a entrega
- Vitrine: http://127.0.0.1:4324/
- Componentes, categorias e medidas: http://127.0.0.1:4324/demonstracao/
- Produto com duas imagens e guia: http://127.0.0.1:4324/produto/d2000000-0000-4000-8000-000000000001/
- Administração local: http://127.0.0.1:4324/admin/
- Catálogo JSON: http://127.0.0.1:4324/catalogo.json
- Teste E1 oculto (404): http://127.0.0.1:4324/produto/eeb4c465-f836-4163-9e90-bf42cbebabf9/

A prévia usa checkout isolado artifacts/e2-workspace no commit-base f8fbe157, sem novo commit. Astro dev na 4324 e proxy Decap fs na 8082, somente loopback. Salvar no painel local altera somente os arquivos desse checkout, não o GitHub/Cloudflare. O botão Entrar local não testa OAuth; acesso público protegido permanece com a implementação existente. O texto padrão Publicar/Publicado do Decap não significa deploy local ou remoto concluído.

## Conteúdo e organização
- 8 produtos visíveis: original mais 7 novos exemplos, cinco categorias e dez ilustrações vetoriais próprias em duas tonalidades. Original e produto oculto E1 não foram editados. O produto adicional não versionado do responsável foi preservado na pasta principal e excluído desta réplica, sem remoção ou correção implícita.
- Tokens de cores/fontes/espaçamento, componentes Header, ProductCard, Gallery e MeasureTable, layout e estilos compartilhados. Sem nova dependência, banco ou custo.
- Cards e galeria em 4:5 com object-fit contain: preserva peças inteiras e evita distorção. Grade de quatro/três/duas colunas; produto em duas/uma coluna conforme espaço. Os rascunhos orientam conteúdo e hierarquia; no celular o menu vira gaveta modal e seções empilham. Não copiar as fotos dos PDFs para uso comercial.
- Galeria: foto principal existente preservada + até cinco adicionais com alt. Categorias por ID estável; compatibilidade fixa com categorias antigas permite renomear sem editar registros originais. Excluir categorias pelo CMS desativado; ocultar tira o atalho, sem ocultar automaticamente produtos.
- Guias com tabela em cm e aviso de valores fictícios. Novidade, destaque e ordem preparados. Modelos de banners preparados, lista vazia; composição/renderização dos banners pertence à E3.
- CMS: Produtos, Categorias, Guias de medidas, Informações da loja e Banners. Campos ordenados por assunto, listas recolhíveis para fotos/variações/medidas, ajuda sobre preço em centavos e limite de imagem. Marca/atendimento/entrega alimentam o layout; WhatsApp permanece vazio até definição real.

## Verificações atuais
- npm run build: 32 arquivos sem erros/avisos/hints; 24 testes passaram; build estático de 14 páginas e verify-output aprovados. Não foram instaladas dependências.
- Regressão de OAuth, cache/URL canônica e validações anteriores preservada. Testes novos: compatibilidade/ocultação, renomear categoria sem quebrar vínculos antigos e novos, categoria/guia ausente bloqueiam build, alt obrigatório/limite de galeria.
- Navegador: vitrine/produto/demonstração em 320/390/768/1440 px; sem rolagem horizontal do documento. Cards em 2/2/3/4 colunas; detalhe em 1/1/2/2. Categorias legíveis e tabela responsiva. Teclado: Escape fecha menu, foco retorna ao acionador e aria-expanded é restaurado. Troca de miniatura altera imagem, alt e estado pressionado; guia abre corretamente.
- Painel local: cinco coleções carregadas; formulário do produto mostra campos antigos e novos; informações/medidas carregadas. Em 390 px, root positivo (736 px), documento 390 px e 20 inputs/textareas no guia. Renomeação temporária de categoria salva pelo CMS fs foi refletida nos dois produtos de conjuntos; restauração conferida no arquivo e na vitrine. Nenhuma gravação remota.
- Saída de produção não contém local_backend. IDs/arquivos do original e teste oculto comparados com HEAD sem mudanças. HTTP local e integridade JSON/diff registrados em artifacts/e2/verificacao.json.
- Capturas e medições em artifacts/e2/. Não houve auditoria de acessibilidade completa nem teste em aparelhos físicos.

## Roteiro curto
1. Abrir vitrine, variar a largura, conferir textos/imagens/cards e abrir/fechar Menu por teclado.
2. Abrir Conjunto Ritmo, trocar miniatura e abrir Guia de medidas; os valores são fictícios.
3. Abrir demonstração, conferir cinco categorias e tabela em tela estreita.
4. No painel local clicar Entrar; abrir Produtos, Categorias, Medidas e Informações da loja. Salvar aqui não publica produção; se editar para revisão, registrar o que deseja manter antes da futura preparação do commit.

## Limites e E3
A inicial atual é uma composição representativa, não a inicial completa. Categorias levam a exemplos; busca/filtro/rotas de categoria pertencem à E4. Cores/tamanhos são apresentados, sem seleção de compra; produto/WhatsApp em E5 e carrinho em E6. Políticas/páginas em E7. Não há venda, número de WhatsApp ou medidas comerciais. OAuth, publicação dos novos modelos e funcionamento em Cloudflare não foram repetidos nesta etapa local; headers no-store no Astro dev não comprovam CDN.

Após revisão e autorização própria de publicação da E2, a E3 usará os mesmos tokens/cards/menu/galeria/modelos para compor banner principal estático, atalhos de categorias, novidades, conjuntos, como comprar e rodapé com informações administráveis. Ajustes de layout refinam os rascunhos sem trocar a organização aprovada. E1 permanece aberta e requer comprovação canônica antes de aceite final, independentemente da revisão visual E2.


## Autorização E2 Preview — 24/11/2026

O responsável autorizou commit/push exclusivamente na branch codex/e2-preview e publicação Preview, sem merge/push na main ou mudanças da conta. A autorização local anterior foi ampliada somente para essa prévia. Painel demonstrativo em memória, sem OAuth/GitHub; alterações não publicam a vitrine. E1 continua pendente. Ver [preview-e2.md](preview-e2.md) e [ADR-006](decisoes/ADR-006-E2-preview-isolado.md). Deploy/conferência em andamento; não declarar publicado antes de sucesso e HTTP/browser remotos.
