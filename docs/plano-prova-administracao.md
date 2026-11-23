# Prova funcional da administração

Estado: implementação local validada; integração Cloudflare/OAuth, demonstração remota e revisão pendentes.

## Origem e limites

Em 23/11/2026, o responsável aprovou Astro, TypeScript, Cloudflare Pages e Decap CMS e autorizou começar por um único produto ilustrativo. Deve cadastrar, editar preço e foto e ocultar pelo painel, refletir na vitrine após publicação automática, demonstrar acesso e estados da publicação. Depois haverá revisão antes de completar a loja.

Repositório informado pelo responsável: https://github.com/joaoo-IA/lojamancial.git, branch main; comandos de envio fornecidos pelo responsável nesta conversa.

## Escopo

- Vitrine mínima com produto ilustrativo; sem carrinho, checkout, identidade final ou banco.
- CMS GitHub, publicação simples na main, formulários e imagens locais versionadas.
- OAuth restrito a administradores explicitamente configurados e com escrita no repositório.
- Versão ativa identificável e links aos checks e ao painel de deploy.
- Testes proporcionais de catálogo, saída e autenticação, com limites documentados.

## Dependências externas

Conexão GitHub/Cloudflare e criação/configuração OAuth em contas da loja. Nenhuma conta, segredo ou autorização deve ser simulada. Falhas locais não comprovam resultado remoto. Não avançar ao catálogo completo antes da revisão.

## Aceite

Registrar cadastro, preço, troca de foto, ocultação e republicação em navegador independente; registrar commit e resultado Cloudflare correspondentes. Demonstrar erro sem derrubar a última versão válida, preferindo ambiente de preview. Validar login permitido e negativa para visitante/usuário sem acesso.

## Estado da execução

Ver docs/verificacao.md. Pendências e resultados serão atualizados ao final da etapa.
