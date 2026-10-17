import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  server: { host: '127.0.0.1', port: Number(process.env.PORT || 5500), strictPort: true, proxy: { '/api': { target: `http://127.0.0.1:${process.env.BACKEND_PORT || 8080}`, changeOrigin: false } } },
  build: { outDir: fileURLToPath(new URL('../build/frontend', import.meta.url)), emptyOutDir: true, sourcemap: false }
});
