import { carregarCatalogo, publicados } from '../lib/catalogo';
export function GET() { return Response.json({ produtos: publicados(carregarCatalogo()) }); }
