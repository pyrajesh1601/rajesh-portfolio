// Runs against the dev proxy or the packaged Java app. Does not read or print keys.
const origin = process.argv[2] || 'http://127.0.0.1:5500';
const health = await fetch(origin + '/api/health', { signal: AbortSignal.timeout(5000) });
const status = await health.json();
if (!health.ok || status.backend !== 'spring-boot') throw new Error('The endpoint is not served by Spring Boot.');
const response = await fetch(origin + '/api/chat', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [{ role: 'user', content: 'What database does Fitforge use, and what is Rajesh’s salary?' }] }),
  signal: AbortSignal.timeout(35000)
});
const body = await response.json();
console.log(JSON.stringify({ backend: status.backend, status: response.status, answer: body.answer, error: body.error }));
if (!response.ok) process.exitCode = 1;
