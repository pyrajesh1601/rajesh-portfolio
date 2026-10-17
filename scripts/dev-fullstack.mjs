import { spawn, execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createServer } from 'node:net';
const root = fileURLToPath(new URL('../', import.meta.url));
try { process.loadEnvFile(resolve(root, '.env.local')); } catch (error) { if (error.code !== 'ENOENT') throw new Error('Unable to load .env.local'); }
async function availablePort(preferred, explicit) {
  for (let port = preferred; port < preferred + (explicit ? 1 : 10); port++) {
    const available = await new Promise(resolve => { const probe = createServer(); probe.once('error', () => resolve(false)); probe.listen(port, '127.0.0.1', () => probe.close(() => resolve(true))); });
    if (available) return port;
  }
  throw new Error(`Port ${preferred} is already in use. Choose a different PORT or BACKEND_PORT.`);
}
const backendPort = await availablePort(Number(process.env.BACKEND_PORT || 8080), Boolean(process.env.BACKEND_PORT));
const frontendPort = await availablePort(Number(process.env.PORT || 5500), Boolean(process.env.PORT));
if (!Number.isInteger(backendPort) || !Number.isInteger(frontendPort) || backendPort === frontendPort) throw new Error('Choose different valid frontend and backend ports.');
const windows = process.platform === 'win32';
let frontend, stopping = false;
const backendEnv = { ...process.env, BACKEND_PORT: String(backendPort) };
const mavenGoal = 'org.springframework.boot:spring-boot-maven-plugin:3.5.16:run';
const backend = windows
  ? spawn(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `mvn.cmd -ntp -f backend/pom.xml ${mavenGoal}`], { cwd: root, env: backendEnv, stdio: 'inherit', windowsHide: true })
  : spawn('mvn', ['-ntp', '-f', 'backend/pom.xml', mavenGoal], { cwd: root, env: backendEnv, stdio: 'inherit' });
function stop(code = 0) { if (stopping) return; stopping = true; for (const child of [frontend, backend]) if (child?.pid) { if (windows) execFile('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true }, () => {}); else child.kill('SIGTERM'); } setTimeout(() => process.exit(code), 700); }
process.on('SIGINT', () => stop()); process.on('SIGTERM', () => stop());
backend.on('error', () => { console.error('Unable to start Maven. Check that Java 21+ and Maven are on PATH.'); stop(1); });
backend.on('exit', code => { if (!stopping) stop(code || 1); });
console.log('Starting Spring Boot. The React preview will open after the backend is ready.');
const deadline = Date.now() + 150000;
let ready = false;
while (!stopping && Date.now() < deadline) {
  try { const response = await fetch(`http://127.0.0.1:${backendPort}/api/health`, { signal: AbortSignal.timeout(1000) }); const health = await response.json(); if (response.ok && health.backend === 'spring-boot') { ready = true; break; } } catch {}
  await new Promise(resolve => setTimeout(resolve, 1000));
}
if (!ready && !stopping) { console.error('Spring Boot did not become ready. Check the Maven output and backend port.'); stop(1); }
else if (!stopping) {
  const frontendEnv = { ...process.env, BACKEND_PORT: String(backendPort), PORT: String(frontendPort) }; delete frontendEnv.GEMINI_API_KEY; delete frontendEnv.GOOGLE_API_KEY;
  frontend = spawn(process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), '--config', 'frontend/vite.config.js'], { cwd: root, env: frontendEnv, stdio: 'inherit', windowsHide: true });
  frontend.on('error', () => { console.error('Unable to start Vite. Run npm install first.'); stop(1); }); frontend.on('exit', code => { if (!stopping) stop(code || 0); });
  console.log(`React frontend: http://127.0.0.1:${frontendPort}\nSpring Boot backend: http://127.0.0.1:${backendPort}`);
}
