import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleChat, jsonResponse } from '../server/chat.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
try { process.loadEnvFile(resolve(root, '.env.local')); } catch (error) { if (error.code !== 'ENOENT') throw new Error('Unable to load .env.local'); }
const publicRoot = resolve(root, 'dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.pdf': 'application/pdf' };
const port = Number(process.env.PORT || 5500);
const server = createServer(async (incoming, outgoing) => {
  try {
    const host = incoming.headers.host;
    if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(host)) { outgoing.writeHead(403); outgoing.end('Unsupported host'); return; }
    const url = new URL(incoming.url, `http://${host}`);
    let response;
    if (url.pathname === '/api/chat') {
      const headers = new Headers();
      for (const [name, value] of Object.entries(incoming.headers)) if (value) headers.set(name, Array.isArray(value) ? value.join(',') : value);
      // Node is a loopback-only preview. Hosted identity headers are never trusted here.
      headers.delete('oai-authenticated-user-id'); headers.delete('cf-connecting-ip');
      response = await handleChat(new Request(url, { method: incoming.method, headers, body: ['GET', 'HEAD'].includes(incoming.method) ? undefined : incoming, duplex: 'half' }), process.env);
    } else {
      let path;
      try { path = decodeURIComponent(url.pathname); } catch { path = ''; }
      const filename = resolve(publicRoot, '.' + (path === '/' ? '/index.html' : path));
      if (!['GET', 'HEAD'].includes(incoming.method) || !filename.startsWith(publicRoot + sep) || path.split('/').some(piece => piece.startsWith('.') || piece === 'server') || !path) response = new Response('Not found', { status: 404 });
      else {
        try {
          if (!(await stat(filename)).isFile()) throw new Error();
          response = new Response(incoming.method === 'HEAD' ? null : await readFile(filename), { headers: { 'Content-Type': mime[extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' } });
        } catch { response = new Response('Not found', { status: 404 }); }
      }
    }
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch { outgoing.writeHead(500, { 'Content-Type': 'application/json' }); outgoing.end(JSON.stringify({ error: 'Unable to serve this request.' })); }
});
server.listen(port, '127.0.0.1', () => { console.log(`Portfolio: http://127.0.0.1:${port}`); console.log(`Gemini configured: ${Boolean(process.env.GEMINI_API_KEY?.trim())}`); });
