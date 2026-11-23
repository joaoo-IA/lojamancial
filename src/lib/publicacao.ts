import { execFileSync } from 'node:child_process';
export const repository = 'joaoo-IA/lojamancial';
function revision(): string {
  if (process.env.CF_PAGES_COMMIT_SHA) return process.env.CF_PAGES_COMMIT_SHA;
  try { return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return 'local-sem-commit'; }
}
export const buildInfo = {
  commit: revision(), geradoEm: new Date().toISOString(),
  ambiente: process.env.CF_PAGES === '1' ? 'cloudflare' : 'local',
  branch: process.env.CF_PAGES_BRANCH || 'local'
};
