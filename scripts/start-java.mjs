import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
try { process.loadEnvFile(resolve(root, '.env.local')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const child = spawn('java', ['-jar', resolve(root, 'backend/target/portfolio-1.0.0.jar')], { cwd: root, env: process.env, stdio: 'inherit', windowsHide: true });
child.on('error', () => { console.error('Unable to launch the application. Run npm run build and check Java is installed.'); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code || 0; });
process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
