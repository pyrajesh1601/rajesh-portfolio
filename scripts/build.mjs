import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { PROFILE } from '../server/profile.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(await readFile(resolve(root, '.openai/hosting.json'), 'utf8'));
if (manifest.static) throw new Error('Remove static configuration for the server build.');
const files = {
  '/index.html': 'text/html; charset=utf-8',
  '/chatbot.js': 'text/javascript; charset=utf-8',
  '/chatbot.css': 'text/css; charset=utf-8',
  '/assets/rajesh-noir-v2.png': 'image/png',
  '/assets/rajesh-signal-v2.png': 'image/png',
  '/Rajesh-Resume.pdf': 'application/pdf'
};
const assets = {};
for (const [path, type] of Object.entries(files)) assets[path] = { type, data: (await readFile(resolve(root, 'dist', '.' + path))).toString('base64') };
const chat = (await readFile(resolve(root, 'server/chat.mjs'), 'utf8')).replace("import { PROFILE } from './profile.mjs';", '');
const worker = `\nexport default { async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname === '/api/chat') return handleChat(request, env);
  if (!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405});
  const asset = ASSETS[url.pathname === '/' ? '/index.html' : url.pathname];
  if (!asset) return new Response('Not found', {status:404});
  const headers = {'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Cache-Control':asset.type.startsWith('image/')?'public, max-age=86400':'no-cache'};
  return new Response(request.method === 'HEAD' ? null : Uint8Array.from(atob(asset.data), c=>c.charCodeAt(0)), {headers});
}};`;
await mkdir(resolve(root, 'dist/server'), { recursive: true });
await mkdir(resolve(root, 'dist/.openai'), { recursive: true });
await writeFile(resolve(root, 'dist/server/index.js'), `const ASSETS=${JSON.stringify(assets)};\nconst PROFILE=${JSON.stringify(PROFILE)};\n${chat}${worker}`);
await writeFile(resolve(root, 'dist/.openai/hosting.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('Built self-contained portfolio Worker with Gemini endpoint. No environment secrets included.');
