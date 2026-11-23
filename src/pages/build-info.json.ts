import { buildInfo } from '../lib/publicacao';
export function GET() { return Response.json(buildInfo); }
