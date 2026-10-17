# Project structure

This repository contains one portfolio application. Run npm commands from the repository root; the shared package manifest and lockfile manage the React dependencies and development tooling.

```text
rajesh-portfolio/
├── frontend/
│   ├── public/                 # Portraits and downloadable résumé
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Header, footer, navigation and contact dialogs
│   │   │   └── ui/             # Icons, clock, loader and text effects
│   │   ├── features/
│   │   │   ├── chat/           # Assistant component and its styles
│   │   │   └── hero/           # Interactive portrait and project carousel
│   │   ├── hooks/              # Scroll and animation lifecycle
│   │   ├── sections/           # Hero, about, projects, expertise and stats
│   │   ├── styles/             # Global design styles
│   │   ├── App.jsx             # Page composition and shared state
│   │   └── main.jsx            # React entry point
│   └── vite.config.js          # React build and local API proxy
├── backend/
│   ├── src/main/java/dev/rajesh/portfolio/
│   │   ├── PortfolioApplication.java
│   │   └── chat/               # Chat API, Gemini client and request safeguards
│   ├── src/main/resources/     # Configuration, verified profile and AI instructions
│   ├── src/test/java/          # API, service and Gemini client tests
│   └── pom.xml
├── scripts/                    # Current development, launch and smoke-check tools
├── docs/                       # Architecture and design references
├── legacy/                     # Previous JavaScript site, isolated for maintenance
├── .github/workflows/          # Build and test automation
├── .env.example                # Safe configuration template
├── package.json
└── package-lock.json
```

`build/frontend/`, `backend/target/`, `dist/` and `node_modules/` are generated and excluded from Git. `.env.local` is private local configuration and must never be committed. The root `.openai/` folder identifies the existing Sites deployment; it is retained for legacy hosting.

Keep page sections in `sections/`, feature-specific logic and styles together in `features/`, and reusable presentation components in `components/`. The Java backend uses a feature package (`chat`) because there is currently one backend feature. Add a sibling feature package when another API is introduced rather than scattering chat code across global controller/service folders.

The active application reads facts from `backend/src/main/resources/profile.json`. The legacy Worker has its own archived profile; edit it only when deliberately maintaining the old deployment.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start React and Spring Boot locally |
| `npm run build` | Build React and package the executable Java JAR |
| `npm start` | Run the packaged app with local environment settings |
| `npm test` | Run legacy regression tests and Java tests |
| `npm run smoke` | Exercise the running Spring Boot chatbot with Gemini |
| `npm run dev:legacy` | Preview the archived site |
| `npm run build:legacy` | Generate the old Worker deployment bundle |

Automated tests use a local fake provider and do not require an API key. The smoke command calls Gemini and requires the server to have a valid key.
