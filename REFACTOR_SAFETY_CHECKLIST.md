# Support Desk Ticket — AI Sharing & Refactor Safety Checklist

Use this before sending code to an AI assistant, and again before merging a refactor.

## 1. Files safe to share with AI

### `support-desk-api/` — Spring Boot backend
- `pom.xml`
- `src/main/java/**/*.java` (controllers, services, DTOs, model, repository, exception, config)
- `src/main/resources/application.properties`
- `src/test/java/**/*.java`
- `request/*.http` and `src/main/java/**/supportdesk.http`

### `support-desk-ui/` — React frontend
- `package.json`
- `vite.config.js`, `playwright.config.js`
- `index.html`, `README.md`
- `src/**/*.{js,jsx,css}` (components, pages, contexts, api helpers, services)
- `src/test/**` and component `*.test.jsx` files
- `e2e/*.spec.js`

### Project root
- `README.md`, `HELP.md`, `pom.xml`
- `exercises/**/*.md` (learning notes — no secrets)

## 2. Files that must NOT be shared (exclude from any paste / zip / Git push)

- `node_modules/` (UI dependencies — size + noise)
- `support-desk-api/target/`, `support-desk-ui/dist/`, `test-results/`
- `support-desk-ui/.workbuddy-ai/` (workspace memory)
- `.git/`, `.idea/`, `.vscode/` personal settings
- Any `.env`, `.env.local`, `.env.*` (none present today, but check)
- `mvnw`, `mvnw.cmd`, `.mvn/wrapper/maven-wrapper.jar` (regeneratable)
- `package-lock.json` unless the AI specifically needs exact versions
- `bin/`, `Demo.class`, scratch output

## 3. Secrets / tokens / strings that must be redacted before sharing

These are currently hardcoded — strip or replace with placeholders before any AI paste:

| Location | What to redact |
| --- | --- |
| `support-desk-api/src/.../controller/AuthController.java` | `SEED_EMAIL = "support@example.com"`, `SEED_PASSWORD = "support123"`, `SEED_USER = "Support Agent"`, the literal token `"demo-token-support-desk"` |
| `support-desk-ui/e2e/day15-smoke.spec.js` | The login email + password strings the Playwright test fills in |
| `support-desk-api/src/.../service/TicketService.java` | Seed `createdBy` addresses (`amir@`, `siti@`, `hafiz@example.com`) — treat as PII if user is real |
| `support-desk-api/src/.../supportdesk.http`, `request/day06-tickets.http` | Replace any real email addresses with `user@example.com` |
| `support-desk-ui/services/httpClient.js` | The `STORAGE_KEY` is fine; do not paste contents of `window.localStorage` |

> General rule: if you wouldn't put it on a public gist, replace it with `YOUR_EMAIL_HERE` / `YOUR_PASSWORD_HERE` before pasting.

## 4. Behaviour that must NOT change during the refactor

Preserve exactly:

- **Endpoint paths**
  - `POST /api/auth/login` — body `{ email, password }`, returns `{ token, user }`
  - `GET /api/v1/tickets` — returns `TicketResponse[]`
  - `GET /api/v1/tickets/{id}` — returns one `TicketResponse`
  - `POST /api/v1/tickets` — body matches `CreateTicketRequest`, returns the created `TicketResponse`
  - `PUT /api/v1/tickets/{id}` — body matches `UpdateTicketRequest`, returns updated `TicketResponse`
- **Response field names**: `id`, `title`, `description`, `category`, `priority`, `status`, `createdBy`, `createdAt`
- **Enum values**: priorities `HIGH` / `MEDIUM` (and others used by the UI), statuses `OPEN` / `IN_PROGRESS` etc.
- **Error shape**: `{ "message": "..." }` — the UI's `readErrorMessage` in `src/api/tickets.js` expects this
- **Auth**: requests send `Authorization: Bearer <token>`; UI stores token in `localStorage` under key `support-desk-auth` and reads `parsed.token`
- **Seed data**: `T001`–`T003` must still load on startup so day06/day15 demos keep working
- **Ticket ID format**: created tickets follow `T%03d` (e.g. `T004`)
- **Default values on create**: missing `createdBy` → `"web-user"`; missing `status` → `"OPEN"`; `createdAt` → today's date
- **Proxy config**: Vite still forwards `/api` → `http://localhost:8080` in both `server` and `preview`
- **Spring Boot version**: parent BOM `4.1.0`, Java 21

## 5. Proving the refactor is safe — run all of these

### Backend (must pass)
- `./mvnw test` — runs `SupportDeskApiApplicationTests`
- Manual smoke against `support-desk-api/request/day06-tickets.http` — expect:
  - `GET /api/health` → 200
  - `GET /api/about` → 200
  - `GET /api/tickets` → 200, list contains `T001`–`T003`
  - `GET /api/tickets/T001` → 200
  - `GET /api/tickets/T999` → 404 with `{ message: "Ticket T999 was not found" }`
  - Valid `POST /api/tickets` → 201/200, returns new ticket with id `T004`
  - Invalid `POST /api/tickets` (empty body) → 400 with validation message
  - `POST /api/auth/login` with seed credentials → `{ token, user }`
  - `POST /api/auth/login` with wrong password → 401 `{ message: "Invalid email or password" }`

### Frontend unit tests (must pass)
- `npm test` — covers `src/utils/tickets.test.js`, `TicketSummaryCards.test.jsx`, `TicketFormWizard.test.jsx`, `ProtectedRoute.test.jsx`

### End-to-end (must pass against a running stack)
- `npm run test:e2e` — runs `e2e/day15-smoke.spec.js`: login → tickets list → create ticket → success toast

### Build (must succeed)
- `./mvnw -f support-desk-api/pom.xml package`
- `npm run build` inside `support-desk-ui/`

If any one of the above regresses, do not merge the refactor.
