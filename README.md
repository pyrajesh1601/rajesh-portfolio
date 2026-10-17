# K Rajesh — portfolio + Gemini assistant

## Run in VS Code

Requires Node.js 22 or newer. Open this project folder and run:

```powershell
npm run dev
```

Open **http://127.0.0.1:5500**. No dependency installation is required. Use this Node server instead of Live Server or Python's static server: the chatbot needs its server-side `/api/chat` endpoint.

The ignored `.env.local` stores `GEMINI_API_KEY`. Optional `GEMINI_MODEL` defaults to `gemini-3.8-flash`, and `PORT` defaults to `5500`. Restart the server after editing environment variables. Never put a key in browser code, screenshots, chat, or source control. `.env.example` documents names only.

## Edit

- `dist/index.html`: portfolio design and existing animations.
- `dist/chatbot.css`, `dist/chatbot.js`: responsive chat panel and conversation UI.
- `server/profile.mjs`: verified facts the assistant may use. Update this when your resume changes.
- `server/chat.mjs`: Gemini request, system instructions, input bounds, timeout and error handling.
- `scripts/dev.mjs`: local Node server; exposes only files inside `dist`, excluding private/server paths.

The assistant identifies itself as AI, not Rajesh. It uses only resume-backed facts and acknowledges unknown details. Visitor questions and bounded recent conversation are sent to Google Gemini. The site does not persist chats; New chat clears in-memory history. AI answers can still be mistaken.

## Check and build

```powershell
npm test
npm run build
```

The build creates a self-contained Worker at `dist/server/index.js`, embedding only the current page, chatbot assets, active portrait pair, and resume. It never reads local environment secrets. The hosting manifest retains the existing private Site identity and uses Worker hosting for `/api/chat`. Runtime `GEMINI_API_KEY` is configured separately as a Sites secret.

The per-process/per-isolate request limiter is a best-effort safeguard, not a distributed spending cap. Set provider quota/billing limits for your Google project before opening the site to a broad audience.
