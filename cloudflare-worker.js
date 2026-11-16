// Proxy de vídeo para Cloudflare Workers (arquivo único, sem pastas).
const ALLOWED = ['dbonline.tech-cdn.top'];

export default {
  async fetch(request) {
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': 'Content-Range,Accept-Ranges,Content-Length' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: { ...cors, 'Access-Control-Allow-Headers': 'Range' } });
    let target;
    try { target = new URL(new URL(request.url).searchParams.get('url')); }
    catch (e) { return new Response('URL inválida', { status: 400 }); }
    if (!ALLOWED.includes(target.hostname)) return new Response('Servidor não permitido', { status: 403 });
    const headers = new Headers({ 'User-Agent': 'Mozilla/5.0' });
    const range = request.headers.get('Range');
    if (range) headers.set('Range', range);
    const up = await fetch(target.toString(), { headers, redirect: 'follow' });
    const out = new Headers(up.headers);
    for (const k in cors) out.set(k, cors[k]);
    out.set('Accept-Ranges', 'bytes');
    return new Response(up.body, { status: up.status, headers: out });
  },
};
