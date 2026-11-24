/** A demonstração pública não inicia OAuth, mesmo com bindings Preview incorretos. */
export async function onRequest(context: {request: Request; next: () => Promise<Response>}) {
  if (new URL(context.request.url).hostname !== 'lojamancial.pages.dev') {
    return new Response('OAuth indisponível nesta prévia demonstrativa.', {
      status: 403,
      headers: {'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store'}
    });
  }
  return context.next();
}
