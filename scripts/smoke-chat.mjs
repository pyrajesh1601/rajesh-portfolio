import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleChat } from '../server/chat.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
process.loadEnvFile(resolve(root, '.env.local'));
const response = await handleChat(new Request('http://127.0.0.1:5500/api/chat', {
  method: 'POST', headers: { Origin: 'http://127.0.0.1:5500', 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [{ role: 'user', content: 'Which database does Fitforge use, and what is Rajesh\'s salary?' }] })
}), process.env);
console.log(JSON.stringify({ status: response.status, body: await response.json() }));
if (!response.ok) process.exitCode = 1;
