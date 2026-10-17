# K Rajesh — React + Spring Boot portfolio

The local migration uses React 19 + Vite, Java 21 + Spring Boot 3.5, Maven, and Google Gemini. It preserves the existing design, portraits, smooth scrolling, loader, carousel, contact modal and assistant. No database is needed.

The existing hosted Sites version remains on its original Worker backend. This migration is local-only until a Java-capable host is selected.

## Run in VS Code

Install Node.js 22.12+ (or a current LTS), Java 21+ (Java 25 is supported), and Maven 3.6.3+. Open this project folder and run:

```powershell
npm install
npm run dev
```

Open the React URL printed in the terminal, normally **http://127.0.0.1:5500**. The command starts Spring Boot, waits for its health check, and then starts Vite. If a default port is occupied, it selects a free one. Explicit `PORT` and `BACKEND_PORT` values are respected. Ctrl+C stops the two processes it started.

During development, `/api` calls pass through Vite to Spring Boot. Live Server and Python's static server do not run this backend.

The ignored `.env.local` at the project root stores `GEMINI_API_KEY`. `GEMINI_MODEL` defaults to `gemini-3.8-flash`. The launcher passes the key only to Java; it is removed from the Vite process environment. Restart after editing environment variables. Never use a `VITE_` prefix for an API key. `.env.example` documents configuration names without secrets.

## Edit

See [project structure](docs/PROJECT-STRUCTURE.md) for where each part belongs.

- `frontend/src/App.jsx`: React page composition, navigation, and modal state.
- `frontend/src/sections/`: Hero, About, Projects, Expertise and other page sections.
- `frontend/src/components/`: reusable layout and UI components.
- `frontend/src/features/`: assistant and interactive hero components.
- `frontend/src/styles/global.css`, `frontend/src/features/chat/chatbot.css`: the existing visual design.
- `frontend/public/`: active portrait pair and downloadable resume.
- `backend/src/main/resources/profile.json`: verified facts the assistant may use. Update this when your resume changes.
- `backend/src/main/resources/assistant-instructions.txt`: rules for grounded answers and unknown facts.
- `backend/src/main/java/dev/rajesh/portfolio/chat/`: REST controller, chat service, Gemini client, validation, origin checks, rate limiter, and safe errors.
- `backend/src/test/`: 14 Java tests covering the endpoint and provider integration with a local test server. They use no live API key.

The assistant identifies itself as AI, not Rajesh. It is instructed to use only resume-backed facts and acknowledge unknown details. Visitor questions and bounded recent conversation are sent to Google Gemini. Chats stay in browser memory; New chat clears the conversation. AI answers can still be mistaken.

## Test and build

For Render setup, the Docker build, verification, future updates, and troubleshooting, follow [the deployment walkthrough](docs/DEPLOYMENT.md).

```powershell
npm test
npm run build
npm start
```

`npm test` runs the retained legacy tests and the Java tests. `npm run build` builds React into `build/frontend/`, then packages React and Spring Boot into **`backend/target/portfolio-1.0.0.jar`**. `npm start` loads `.env.local` and runs that JAR, normally at **http://127.0.0.1:8080**. Set `BACKEND_PORT` if that port is occupied. Both the built frontend and `/api/chat` are then served by Java on one origin; Node is not needed to serve the production artifact.

For a direct Java deployment, set `GEMINI_API_KEY` and an optional `GEMINI_MODEL` in the host's secret settings, then run:

```text
java -jar backend/target/portfolio-1.0.0.jar
```

The Java app accepts `BACKEND_PORT` or the host's `PORT`. It does not load `.env.local` automatically when launched directly with `java`; the npm scripts load it locally. Never copy that file into a deployment image or JAR.

## Existing hosted version

`legacy/` retains the previously deployed plain-JavaScript version. Its source assets live in `legacy/public/`, its Worker logic in `legacy/server/`, and its tooling in `legacy/scripts/`. `npm run dev:legacy` previews it; `npm run build:legacy` generates the ignored `dist/` deployment bundle. Changes under `frontend/` or `backend/` do not alter the current hosted site. The `.openai/hosting.json` identity and hosted access policy are preserved.

Once Java hosting is available, the packaged JAR can serve the whole site, or a frontend host can proxy `/api` to the Java service. An ordinary Spring Boot JAR cannot run inside the existing JavaScript Worker runtime.

The Java per-process rate limiter is a best-effort safeguard, not a distributed spending cap. Use provider quota/billing controls for broad public access.
