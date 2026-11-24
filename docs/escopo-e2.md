# E2 — escopo para a próxima entrega local

Estado vigente: execução local autorizada explicitamente pelo responsável, mantendo E1 pendente. E2 preparada para revisão; publicação não autorizada. Ver ADR-005 e entrega-e2.md. Plano E0–E8 continua a referência aprovada.

## Resultado visível

Uma base visual neutra consistente, com cabeçalho, navegação desktop/mobile, cards com fotos proporcionais e organização dos formulários de conteúdo. Demonstrar localmente componentes e dados ilustrativos; a inicial completa com todas as seções e banners é E3.

## Funções e organização

- Tokens de preto/branco/cinza, tipografia de sistema, espaçamentos, largura máxima e botões/foco consistentes.
- Cabeçalho e menu móvel acessível, cards 4:5 sem distorção, estados vazios e estrutura de rodapé.
- Produto com ID e variações estáveis; adaptar foto única para galeria ordenada (até seis imagens/alt), descrição, preço em centavos, peças incluídas e medidas/referência ao guia. Manter compatibilidade na migração.
- Categorias por ID estável: Conjuntos, Blusas, Tops, Leggings e Shorts, com nome/slug/ordem/imagem/visibilidade. Renomear preserva vínculos; impedir exclusão de categoria em uso.
- Configuração pública da loja e campos de destaque/novidade; preparar modelos para banners. Formulários Decap organizados por assunto, com validações e ajuda para valores em centavos.
- Não adicionar banco ou serviço pago; preservar compra sem cadastro. Não implementar checkout, carrinho ou WhatsApp nesta entrega: pertencem a E5/E6.

## Revisão e conclusão

Prévia local de componentes e modelos; conferir 320/390/768/1440 px, teclado, foco e menu, títulos longos, proporção das imagens, ausência de corte/rolagem horizontal. Categorias renomeáveis sem quebrar produtos; IDs e visibilidade preservados; dados inválidos rejeitados com indicação útil. Tipos/testes/build proporcionais aprovados.

Produto original preservado e teste E1 continua oculto. Arquivo de teste adicional salvo somente localmente pelo responsável não será excluído, enviado ou corrigido por inferência; trabalhar com base isolada se necessário. Dados novos serão ilustrativos identificados e substituíveis. Cada entrega é visualizada/testada antes de autorização própria para commit/push. Gravações remotas pelo CMS precisam de autorização separada.

Após aceite/publicação da E2, E3 completa a inicial dos rascunhos: banner, categorias, novidades, conjuntos, como comprar e rodapé administrável. Busca/filtros em E4; produto/WhatsApp em E5; carrinho em E6; páginas informativas em E7; aceite integrado em E8.
