/** Somente esta branch pode habilitar a demonstração pública sem acesso Git. */
export const previewBranch = 'codex/e2-preview';
export const isPreviewDemo = (env: Record<string, string | undefined> = process.env) =>
  env.CF_PAGES_BRANCH === previewBranch;
