# ADR-002 — Revisão e autorização por entrega

Data: 23/11/2026. Estado: D — instrução explícita do responsável.

## Origem

O responsável determinou nesta conversa: visualizar e testar cada entrega antes de autorizar commit e push. Uma autorização anterior vale para aquela entrega, não para alterações futuras.

## Limites da autorização

- Preparar a entrega local, apresentar endereço, diff, verificações e limitações.
- A confirmação de que a prévia abriu não autoriza commit nem push.
- Depois da visualização, solicitar aprovação específica com arquivos/escopo, branch de destino e efeito do deploy.
- Aguardar essa aprovação antes de criar o commit ou executar push.
- Antes de operações do CMS que gerem commits ou atualizem vitrine, apresentar os dados e a sequência de alterações e pedir autorização própria para a sequência.
- Aprovar uma correção técnica não autoriza cadastrar/editar/ocultar produtos pelo CMS.
- Aprovar testes numa prévia não autoriza merge ou publicação na produção.

## Marco atual

Concluir a prova de login GitHub, cadastro de um produto ilustrativo, alteração de preço/foto, ocultação e atualização da vitrine a cada publicação. Não completar a loja antes da revisão dessa prova.

## Riscos e mitigação

O backend GitHub do Decap gera commits ao salvar/publicar. Uma URL de preview, sozinha, não isola os dados quando backend.branch continua main. A homologação precisa de branch de conteúdo isolada e configuração de OAuth consistente; permanece proposta, não implementada nesta revisão.

Os comandos de envio fornecidos na entrega inicial são mantidos como histórico, sem autorização permanente.


## Autorização específica desta entrega — 23/11/2026

O responsável declarou: Autorizo o commit e o push dessas correções para a main e o deploy. Depois confira o painel público e me envie o link funcionando. Escopo: correção da seleção inválida de biblioteca do Decap, normalização defensiva do Client ID nas duas etapas OAuth, testes de regressão e documentação já apresentada. Destino: main de joaoo-IA/lojamancial, acionando o Cloudflare Pages de produção. Esta autorização vale somente para essa entrega e não inclui salvar produtos ou imagens pelo CMS.

Verificações locais anteriores desta mesma versão de código: 22 arquivos sem erros/avisos, 14 testes e build aprovados. Na revisão de publicação: diff e destino conferidos; origin/main atualizado sem divergência; não houve instalação de dependências ou mudança de produtos. Próximo critério: confirmar o commit servido em build-info.json e observar o painel público sem o erro de configuração. Login real e prova do catálogo continuam como etapas próprias.
