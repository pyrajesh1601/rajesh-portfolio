# Deploy and understand the portfolio

The deployment target is one free Render Docker web service. The same Java process serves the built React site and `/api/chat`, so the browser uses one HTTPS origin and there is no separate frontend hosting bill or cross-origin API URL to manage. Your previous Sites deployment is independent.

## 1. Accounts and source control

Create a Render account at https://dashboard.render.com/register and complete verification and terms yourself. Connect GitHub and grant repository access to `pyrajesh1601/rajesh-portfolio` when requested. GitHub stores the code; Render obtains a copy to build and run it. Keep access limited to the required repository when the authorization screen offers that choice.

The repository root is the folder containing `package.json`, `Dockerfile`, and `render.yaml`. On your machine it is `sites/rajesh-portfolio`; do not enter that local parent path as Render's Root Directory. The GitHub repository already starts at the portfolio root.

## 2. Understand the deployment files

`Dockerfile` describes a repeatable build and runtime:

1. The Node stage installs exact lockfile dependencies with `npm ci` and builds React into `build/frontend`.
2. The Maven stage uses Java 21, includes those frontend assets, runs backend tests, and produces `portfolio-1.0.0.jar`.
3. The final stage contains a Java runtime and the JAR. It runs as a non-root user and reserves only part of the container memory for the Java heap.

Only the final stage runs in production. Node and Maven are build tools, not servers in the deployed container. The image contains no Gemini key. `.dockerignore` limits the build context to the necessary application sources and explicitly excludes environment files.

`render.yaml` describes the service: Docker runtime, free plan, Singapore region, `main` branch, `/api/health` health check, deployment after CI checks pass, and environment variable names. `sync: false` means the key value is entered privately during service setup, rather than stored in YAML.

`application-render.properties` is enabled by `SPRING_PROFILES_ACTIVE=render`. It listens on `0.0.0.0` at Render's `PORT`, uses `RENDER_EXTERNAL_URL` for the permitted browser origin, and bounds HTTP threads. Render supplies HTTPS at its proxy, then forwards requests to the container over HTTP. An explicit public origin avoids relying on untrusted forwarded headers.

## 3. Create the service

Recommended dashboard path: New → Blueprint, select `pyrajesh1601/rajesh-portfolio` and `main`, and let Render read `render.yaml`. Review that the service is **Free** and enter the Gemini key in Render's private environment input before deploying. Do not enter it in GitHub source, chat, a build command, or a Docker build argument.

Alternatively, create a Web Service manually with these settings:

| Setting | Value |
| --- | --- |
| Repository | `pyrajesh1601/rajesh-portfolio` |
| Branch | `main` |
| Root Directory | Leave blank |
| Language/runtime | Docker |
| Dockerfile Path | `./Dockerfile` |
| Docker build context | Repository root (`.`) |
| Instance plan | Free |
| Region | Singapore, if available |
| Health Check Path | `/api/health` |
| Auto-deploy | After CI checks pass |
| Docker Command | Leave blank; the image supplies its entry point |

Required environment variables:

| Name | Value |
| --- | --- |
| `SPRING_PROFILES_ACTIVE` | `render` |
| `GEMINI_API_KEY` | Your private valid Gemini key |
| `GEMINI_MODEL` | `gemini-3.8-flash`, or another model verified for your account |

Do not copy local `PORT=5500` or `BACKEND_PORT=8080` values into Render. Let the platform supply its port. For the default Render domain, no manual `ALLOWED_ORIGINS` value is required.

## 4. Watch the first deployment

The logs should show frontend compilation, Maven tests, JAR packaging, and then Spring Boot startup. Render checks `/api/health` and assigns a public HTTPS URL. Use the URL returned by Render; service names can receive suffixes, so do not guess it.

The first build may need to download dependencies and container images. A successful build is not yet proof that the running website works: wait for the service to become live and perform the checks below.

## 5. Verify the public app

1. Open the public URL and check the portrait, menu, page sections, and mobile layout.
2. Open `/api/health`. Expect `status: ok`, `backend: spring-boot`, and `geminiConfigured: true`. The last value means a key exists, not that the provider has accepted it.
3. Ask the chatbot a factual question such as “What database does Fitforge use?” and an unknown detail such as salary. Confirm a grounded answer and acknowledgement of the missing information.
4. Test the résumé link. The contact form opens an email draft; it does not send mail from the server.

The local smoke helper can test the deployed API, with the real assigned URL:

```powershell
node scripts/smoke-spring.mjs https://YOUR-ASSIGNED-SERVICE.onrender.com
```

This makes a Gemini request and uses API quota. The service may need to wake before a short health-check timeout succeeds.

## 6. Understand free hosting

Render free web services sleep after 15 minutes without inbound traffic. The next visit has to wake the app, so it can take longer. Free hosting limits may change; consult https://render.com/docs/free. Gemini quota and billing are separate from the hosting plan.

The rate limiter lives in one Java process and resets on restart. Behind a hosting proxy, visitors can share an observed IP, so it is a modest traffic safeguard rather than a per-person or distributed spending control. Set appropriate Gemini project quotas for a public chatbot.

## 7. Publish future changes

Edit and preview locally, then:

```powershell
npm test
git add .
git commit -m "Describe the change"
git push origin main
```

GitHub Actions tests the code and builds the Docker image. With “After CI checks pass” enabled, Render builds and deploys the new commit after checks succeed. Watch both GitHub Actions and Render's deployment logs. Do not assume that a successful push means deployment has finished.

Changing `profile.json`, instructions, frontend content, or the PDF requires a new build. Changing a private key is done in Render's environment settings and requires a restart/redeploy. A direct Java launch does not read your laptop's `.env.local`.

## 8. Troubleshooting and rollback

| Symptom | Check |
| --- | --- |
| Dependency or compilation error | First failing build-log step; correct locally and push |
| No listening port | `SPRING_PROFILES_ACTIVE=render`; leave platform `PORT` intact |
| Chat says not configured | Private `GEMINI_API_KEY` environment setting |
| Chat reports API access error | Key validity, enabled Gemini access, configured model |
| Chat reports a provider limit | Gemini project quota or billing limits |
| Chat returns 403 | Public origin configuration; custom domains need `ALLOWED_ORIGINS` |
| First visit is slow | Free instance waking after inactivity |
| New commit is not deployed | GitHub checks, linked branch, and auto-deploy setting |

To undo a faulty code change, revert its commit locally, test, and push the revert. This produces an auditable new deployment of the earlier behavior. Render's ability to roll back stored deployments depends on the account/plan and retained history.

For a future custom domain, add it in Render, follow its DNS instructions, and set `ALLOWED_ORIGINS` to the full permitted HTTPS origins, comma-separated, including the Render URL if it should still work. No API key belongs in DNS or frontend configuration.

Official references: https://render.com/docs/docker, https://render.com/docs/web-services, https://render.com/docs/blueprint-spec, https://render.com/docs/free.
