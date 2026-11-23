# Roteiro de demonstração — um produto ilustrativo

## Preparação

Confirmar uma conta administrativa autorizada, conexão GitHub/Pages, OAuth configurado e uma sessão visitante independente. Todos os dados e imagens desta prova são ilustrativos. Não criar vendas.

## Cadastro

Para demonstrar cadastro sem aumentar o catálogo: começar com a coleção vazia em uma publicação de preparação autorizada (arquivar o arquivo demonstrativo localmente fora do conteúdo e preservar sua cópia), ou cadastrar o único produto nesta prova antes de incluir o registro ilustrativo. Não simular cadastro apenas editando o JSON pelo terminal. Qualquer preparação ainda não executada deve constar como pendente.

Entrar em /administracao/, abrir /admin/ e autenticar no GitHub. Produtos > Novo produto. Nome: Conjunto Essencial. Preço: 14990. Foto: ilustração grafite. Uma variação Preto / M e peças Top e legging. Publicar.

Registrar commit da edição e check do Cloudflare. Em sessão sem login, conferir nome, foto e R$ 149,90.

## Editar preço e foto

Editar o mesmo ID. Alterar preço para 15990 e escolher conjunto-claro.svg na biblioteca; atualizar também a descrição acessível da imagem. Publicar. Após sucesso do mesmo commit, conferir R$ 159,90 e a nova imagem na sessão visitante. O ID não deve mudar.

## Ocultar e reativar

Desativar Visível na vitrine e publicar. Após sucesso: inicial sem produto, catálogo JSON sem o ID e URL direta retornando 404. O registro continua no painel. Reativar e publicar para deixar a prova pronta para revisão.

## Falha de publicação

Os testes locais exercitam a rejeição de conteúdo inválido. A demonstração de falha real no Cloudflare deve usar uma branch de preview com dado ilustrativo inválido e preservar main e a última versão válida. Registrar o commit e check falho; corrigir e mostrar novo build bem-sucedido. Essa demonstração depende de configurar o projeto e não deve ser marcada como executada sem evidência.

## Acesso

Visitante não deve conseguir gravar. Conta fora da lista e conta sem permissão de escrita devem receber negativa no OAuth. Os testes automatizados usam identidades fictícias; a verificação remota exige contas adequadas e participação do responsável. Não compartilhar credenciais nem criar contas de terceiros.

## Revisão

Anotar o que foi verificado de fato e o que ficou pendente em verificacao.md. Parar após esta prova para revisão; não completar catálogo, carrinho ou checkout.
