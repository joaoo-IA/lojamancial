# Sequência E1 — proposta para autorização

Estado atual: quatro publicações autorizadas e executadas; resultado em resultado-e1.md, com pendência de cache na URL canônica. Proposta original preservada abaixo. Ambiente: produção, main de joaoo-IA/lojamancial. E0 publicada no commit 03af6523a19cdb7a31d707fcfe06cea5b6800189.

## Preparação e limites

Usar somente o painel público autenticado para gravar. Não criar/editar o JSON pelo terminal para simular cadastro. Preservar o produto original 2be769c7-13f6-4edf-bbf3-e23e3c5b6f20 e o teste adicional existente somente na pasta local. Não enviar arquivos/imagens novos; escolher as duas ilustrações que já estão na biblioteca.

As quatro ações abaixo devem gerar quatro gravações/publicações lógicas distintas. Esperar e verificar o sucesso de cada uma antes da próxima. Se surgir erro de campo/build, parar, registrar e apresentar a correção necessária; não executar ajustes adicionais silenciosos ou avançar ocultando falhas.

## Dados e quatro publicações propostas

1. Cadastro: criar Conjunto Prova E1; descrição Produto ilustrativo para validar administração e publicação. Sem oferta de venda.; categoria Conjuntos; preço 14990 centavos (R$ 149,90); visível true; foto /media/conjunto-grafite.svg; alt Ilustração de top e legging em cinza grafite.; peças Top e legging; uma variação Cinza / M. IDs de produto e variação gerados pelo CMS, preservados daí em diante. Publicar uma vez. Esperado: dois produtos públicos (original e teste), nova página individual, imagem grafite e R$ 149,90.
2. Preço: no mesmo produto, somente precoCentavos de 14990 para 15990. Publicar e aguardar. Esperado: R$ 159,90 na vitrine, detalhe e JSON; mesma foto e IDs.
3. Foto: no mesmo produto, escolher /media/conjunto-claro.svg; alt Ilustração de top e legging em cinza claro. Manter a variação Cinza / M, IDs, visibilidade e preço 15990. Publicar e aguardar. Esperado: nova imagem e alt na página/JSON, preço R$ 159,90. Imagens são ilustrações genéricas deste teste, não fotos de uma oferta comercial.
4. Ocultação: visivel=false no mesmo produto. Publicar e aguardar. Esperado: produto de teste ausente do início e catálogo público; sua URL direta retorna HTTP 404; registro continua na administração.

## Estado final proposto

Original continua visível a R$ 149,90 e não é alterado. Conjunto Prova E1 permanece cadastrado, oculto, a R$ 159,90 com ilustração clara. Não excluir nem reativar. Reativação, limpeza ou outras publicações precisam de autorização adicional. A prova valida persistência real do CMS e builds, não vendas, WhatsApp ou estoque.

## Evidências por ação

Registrar ID estável, SHA da gravação, resultado do check Cloudflare Pages e horário/SHA servido em build-info.json. Em leitura pública sem token, conferir nome/preço/foto/visibilidade e status HTTP. Não interpretar Salvo/Publicado no CMS como conclusão do deploy. Ausência de check não é sucesso. O check separado Workers Builds não substitui o Pages.

## Links exatos de acompanhamento

- Painel: https://lojamancial.pages.dev/admin/#/collections/produtos
- Vitrine: https://lojamancial.pages.dev/
- Versão/publicações: https://lojamancial.pages.dev/publicacao/
- Dados públicos: https://lojamancial.pages.dev/catalogo.json
- SHA e horário servidos: https://lojamancial.pages.dev/build-info.json
- Commits da main e checks de cada alteração: https://github.com/joaoo-IA/lojamancial/commits/main
- Produto original de controle: https://lojamancial.pages.dev/produto/2be769c7-13f6-4edf-bbf3-e23e3c5b6f20/
- Foto inicial: https://lojamancial.pages.dev/media/conjunto-grafite.svg
- Foto seguinte: https://lojamancial.pages.dev/media/conjunto-claro.svg

O endereço do novo produto só poderá ser informado quando o Decap gerar seu UUID. Antes da primeira publicação, registrar o UUID e fornecer o link exato; não inventar um endereço antecipado. Esse mesmo link será usado no preço, foto e para comprovar 404 após ocultar. Não haverá uma nova página /catalogo/ nesta prova: o catálogo atual é o início e o endpoint JSON acima.

## Aprovação solicitada

Autorizar expressamente estas quatro gravações e publicações pelo CMS em produção/main, com o estado final descrito. A aprovação do commit E0 não é essa autorização. Até a resposta, nenhum formulário de teste será publicado.


## Autorização E1 e início da execução

O responsável autorizou explicitamente as quatro publicações pelo CMS na main, com deploy/conferência e apresentação do resultado de cada uma antes de avançar, mantendo o teste oculto ao final. Execução limitada à sequência aprovada; original e produto local adicional preservados. Cadastro feito pelo formulário público com UUID eeb4c465-f836-4163-9e90-bf42cbebabf9 e variação fb86f96c-e20e-4575-af4e-02c9c5816aee. A primeira publicação 8c939d2 teve sucesso e foi conferida publicamente antes da alteração de preço. Evidências detalhadas e estado final serão registrados ao concluir.


## E1: quatro gravações concluídas; aceite de cache pendente

Sequência autorizada executada inteiramente pelo CMS: 8c939d2 cadastro; cdc4ac8 preço; 38e3335 foto/alt; 0c39657 ocultação. Cada commit teve check Pages success, conferência e relato ao responsável antes da operação seguinte. Original e IDs preservados; teste ficou cadastrado, oculto, R$ 159,90 e foto clara.

Pendência: o início e JSON público atuais omitem o teste; detalhe consultado com query retorna 404, mas a URL canônica sem parâmetros ainda serve HTML anterior com 200, CF-Cache-Status HIT e s-maxage=604800. Portanto não considerar o aceite de ocultação concluído. Relato inicial foi corrigido e evidências registradas em [resultado-e1.md](resultado-e1.md). Investigar política/invalidação de cache e submeter correção local antes de qualquer publicação adicional. Não foi feita quinta gravação/deploy. E2 ainda não iniciada.
