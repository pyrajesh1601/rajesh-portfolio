// Checks the built container without credentials or a Gemini request.
const base = 'http://127.0.0.1:10000';
let ready = false;
for (let attempt = 0; attempt < 45; attempt++) {
  try {
    const response = await fetch(base + '/api/health', { signal: AbortSignal.timeout(2000) });
    const health = await response.json();
    if (response.ok && health.backend === 'spring-boot' && health.geminiConfigured === false) { ready = true; break; }
  } catch {}
  await new Promise(resolve => setTimeout(resolve, 1000));
}
if (!ready) throw new Error('Container health check failed.');
const page = await fetch(base + '/');
if (!page.ok || !(await page.text()).includes('id="root"')) throw new Error('React entry point is missing.');
const resume = await fetch(base + '/Rajesh-Resume.pdf');
if (!resume.ok || !resume.headers.get('content-type')?.includes('pdf')) throw new Error('Resume asset is missing.');
const response = await fetch(base + '/api/chat', {
  method: 'POST', headers: { Origin: 'https://portfolio.example', 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [] })
});
const error = await response.json();
if (response.status !== 400 || error.code !== 'INVALID_MESSAGES') throw new Error('Render profile origin or API validation failed.');
console.log('Container passed: health, React page, resume, HTTPS-origin handling and API validation.');
