# ADR-006 — E2 publicada somente em Preview

Origem: autorização explícita do responsável em 24/11/2026 para commit/push apenas dos arquivos necessários em branch exclusiva e Preview Cloudflare Pages, com verificação remota e produção preservada.

Decisão: branch codex/e2-preview; manter main e seus recursos intactos. Painel público demonstrativo com backend test-repo, dados ilustrativos permitidos por lista explícita e gravações somente em memória da aba. Não usar OAuth/token de produção para a prévia. Não ampliar acesso ou alterar a conta.

Limites: sem push/merge na main, alteração de registros originais/E1 ou política de cache E1, purge, envio ao suporte ou correção da integração Workers existente. Se for necessária mudança capaz de afetar produção, interromper e pedir autorização própria. Não contratar serviço.

Riscos e limites: URL pública não é sigilo; somente exemplos. Edições não atualizam a vitrine compartilhada nem persistem após recarga. A comprovação de publicação real via CMS da E1 permanece com aceite de cache pendente. Detalhes e verificação em [preview-e2.md](../preview-e2.md).
