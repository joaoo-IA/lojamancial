import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/** Lista explícita: nunca percorre segredos, arquivos do responsável ou registros E1. */
export function previewSeed(root = process.cwd()) {
  const folders = ['categorias', 'medidas', 'loja', 'produtos'];
  const files: {path: string; content: string}[] = [];
  for (const folder of folders) {
    for (const name of readdirSync(join(root, 'src/content', folder)).sort()) {
      if (!name.endsWith('.json')) continue;
      if (folder === 'produtos' && !name.startsWith('d2000000-')) continue;
      files.push({path: 'src/content/' + folder + '/' + name,
        content: readFileSync(join(root, 'src/content', folder, name), 'utf8')});
    }
  }
  const media = readdirSync(join(root, 'public/media')).filter(n => /^e2-[a-z-]+\.svg$/.test(n))
    .map(name => ({path: 'public/media/' + name, url: '/media/' + name}));
  return { files, media };
}
