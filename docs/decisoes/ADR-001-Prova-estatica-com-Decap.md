# ADR-001 - Prova estática com Decap

Data: 23/11/2026. Estado: aprovado no limite da prova funcional.

Origem: aprovação explícita do responsável na conversa, após revisão do plano.

Escolha: Astro + TypeScript; catálogo em JSON no GitHub; Decap CMS; publicação automática no Cloudflare Pages. Não usar banco nesta prova.

Limites: um produto e imagens ilustrativos. Autenticação administrativa real e status de publicação precisam de verificação remota; revisão obrigatória antes de completar a loja.

Riscos: editar no CMS gera commit, mas não garante deploy concluído. O escopo OAuth repo, necessário para repositório privado no backend GitHub, é amplo e não se limita a este repositório; deve ser aceito conscientemente por administradores confiáveis, com 2FA. Não habilitar autoria aberta. Configuração local sem autenticação fica restrita a localhost e não é publicada no modo remoto.

Mitigação: lista explícita de administradores, verificação de permissão GitHub, OAuth com state/PKCE e origem fixa; sem segredos no bundle; build interrompe conteúdo inválido; checks oficiais indicam publicação e versão ativa fica identificável.

Verificação posterior na mesma data: o repositório informado é público. O padrão foi ajustado para public_repo no CMS e no OAuth. O risco de alcance a outros repositórios públicos acessíveis ao administrador permanece; repo só será necessário se houver decisão de tornar o repositório privado.
