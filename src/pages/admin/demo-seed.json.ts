import { isPreviewDemo } from '../../lib/preview';
import { previewSeed } from '../../lib/preview-seed';
export function GET() {
  return Response.json(isPreviewDemo() ? previewSeed() : {files: [], media: []});
}
