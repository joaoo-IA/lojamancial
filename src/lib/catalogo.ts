import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

export interface Produto {
  id: string; nome: string; descricao: string; precoCentavos: number;
  categoria: string; visivel: boolean; foto: string; fotoAlt: string;
  pecasIncluidas: string;
  variacoes: { id: string; cor: string; tamanho: string }[];
}
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function validarProduto(input: unknown): Produto {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Produto inválido.');
  const p = input as Record<string, unknown>;
  if (typeof p.id !== 'string' || !uuid.test(p.id)) throw new Error('ID estável inválido.');
  for (const campo of ['nome', 'descricao', 'categoria', 'fotoAlt', 'pecasIncluidas']) {
    if (typeof p[campo] !== 'string' || !p[campo].trim() || p[campo].length > 2000) throw new Error('Campo inválido: ' + campo);
  }
  if (!Number.isSafeInteger(p.precoCentavos) || Number(p.precoCentavos) < 1 || Number(p.precoCentavos) > 10000000) throw new Error('Preço deve ser inteiro positivo em centavos, até R$ 100.000.');
  if (typeof p.visivel !== 'boolean') throw new Error('Visibilidade inválida.');
  if (typeof p.foto !== 'string' || !/^\/media\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.(png|jpe?g|webp|svg)$/i.test(p.foto)) throw new Error('Foto deve estar na biblioteca local.');
  if (!Array.isArray(p.variacoes) || !p.variacoes.length || p.variacoes.length > 100) throw new Error('Informe ao menos uma variação.');
  const ids = new Set<string>(); const combinacoes = new Set<string>();
  for (const v of p.variacoes) {
    if (!v || typeof v !== 'object' || typeof v.id !== 'string' || !v.id || typeof v.cor !== 'string' || !v.cor.trim() || typeof v.tamanho !== 'string' || !v.tamanho.trim()) throw new Error('Variação inválida.');
    const combinacao = JSON.stringify([v.cor.trim().toLowerCase(), v.tamanho.trim().toLowerCase()]);
    if (ids.has(v.id) || combinacoes.has(combinacao)) throw new Error('Variação duplicada.');
    ids.add(v.id); combinacoes.add(combinacao);
  }
  return p as unknown as Produto;
}
export function validarFoto(foto: string, root = process.cwd()): void {
  const path = resolve(root, 'public', '.' + foto);
  const size = statSync(path).size;
  if (size < 1 || size > 5 * 1024 * 1024) throw new Error('Foto vazia ou maior que 5 MB.');
  const b = readFileSync(path);
  if (foto.endsWith('.svg')) {
    if (!['/media/conjunto-grafite.svg', '/media/conjunto-claro.svg'].includes(foto)) throw new Error('Uploads SVG não são aceitos; use JPG, PNG ou WebP.');
    return;
  }
  const png = b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpg = b[0] === 255 && b[1] === 216 && b[2] === 255;
  const webp = b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP';
  if (!(/\.png$/i.test(foto) && png || /\.jpe?g$/i.test(foto) && jpg || /\.webp$/i.test(foto) && webp)) throw new Error('Formato da foto não corresponde ao arquivo.');
}
export function carregarCatalogo(root = process.cwd()): Produto[] {
  const folder = join(root, 'src/content/produtos'); const ids = new Set<string>();
  return readdirSync(folder).filter(f => f.endsWith('.json')).sort().map(file => {
    const produto = validarProduto(JSON.parse(readFileSync(join(folder, file), 'utf8')));
    if (file !== produto.id + '.json' || ids.has(produto.id)) throw new Error('Arquivo ou ID inconsistente: ' + file);
    ids.add(produto.id); validarFoto(produto.foto, root); return produto;
  });
}
export const publicados = (produtos: Produto[]) => produtos.filter(p => p.visivel);
export const dinheiro = (centavos: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(centavos / 100);
