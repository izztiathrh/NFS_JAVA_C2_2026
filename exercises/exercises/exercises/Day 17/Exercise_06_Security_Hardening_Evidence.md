# D17 Exercise 06 — Security Hardening Evidence

## Goal

Prove that your API still protects important behaviour.

## Evidence required

Collect evidence for:

1. Missing token returns 401.
2. Wrong role returns 403.
3. Duplicate record returns 409.
4. Invalid input returns 400.
5. Logs do not show JWT tokens or passwords.
6. `.env` is not committed.

## Submission

All evidence below was captured live against `support-desk-api` running locally on `localhost:8080`.

### 1. Missing token returns 401

Request:
```bash
curl -i http://localhost:8080/api/tickets
```
Response:
```json
{"timestamp":"2026-08-15T03:45:10.584Z","status":401,"error":"Unauthorized","path":"/api/tickets"}
```
`HTTP_STATUS: 401`

### 2. Wrong role returns 403

Request: `POST /api/tickets` (creating a ticket requires `ADMIN`) using a JWT for a `USER`-role account.
Response:
```json
{"timestamp":"2026-08-15T03:51:18.302Z","status":403,"error":"Forbidden","path":"/api/tickets"}
```
`HTTP_STATUS: 403`

### 3. Duplicate record returns 409

Request: `POST /api/auth/register` twice with the same email.
Response (second call):
```json
{"timestamp":"2026-08-15T03:51:18.471Z","status":409,"error":"Conflict","path":"/api/auth/register"}
```
`HTTP_STATUS: 409` — enforced in `AuthService.register()` via `existsByEmailIgnoreCase`.

### 4. Invalid input returns 400

Request: `POST /api/tickets` as `ADMIN` with an empty body `{}`.
Response:
```json
{"message":"priority priority is required; description description is required; category category is required; title title is required"}
```
`HTTP_STATUS: 400` — from `@Valid` bean validation on `CreateTicketRequest`.

### 5. Logs do not show JWT tokens or passwords

Checked the request-timing log lines from `RequestLoggingFilter` for every request above (including the register/login calls that carried real emails, passwords, and JWTs in the request/response bodies):

```
requestId=a4503bea method=GET path=/api/tickets status=401 durationMs=1
requestId=e934ebf3 method=POST path=/api/tickets status=403 durationMs=56
requestId=a4d3e6ec method=GET path=/api/tickets/000000000000000000000000 status=404 durationMs=26
requestId=4c383e4e method=POST path=/api/auth/register status=409 durationMs=7
requestId=e6605cb5 method=POST path=/api/auth/login status=200 durationMs=96
requestId=2dfb53e3 method=POST path=/api/tickets status=400 durationMs=16
```

Confirmed: `RequestLoggingFilter` only ever logs `requestId`, `method`, `path`, `status`, and `durationMs` — it never touches headers or the request/response body, so passwords, JWTs, and the `Authorization` header cannot leak through it, no matter what the request contains.

**One gap found during this check:** Spring Boot itself logs a line at startup —
```
Using generated security password: 369084f1-b9dc-4ec9-9ef0-8788e17eaa92
```
This is Spring Security's default auto-generated fallback account, unrelated to the app's real JWT-based login. It isn't used anywhere (the app never authenticates through it — `SecurityConfig` fully replaces the default auth flow with `JwtAuthenticationFilter`), but it is a password string appearing in the console log. Since it's dead/unused, the fix is cosmetic — excluding `UserDetailsServiceAutoConfiguration` would silence it — but it's worth noting as the one place a "password" literally showed up in logs.

### 6. `.env` is not committed

```bash
$ git check-ignore -v support-desk-api/.env
support-desk-api/.gitignore:3:.env    support-desk-api/.env

$ git log --all --oneline -- support-desk-api/.env
(no output — .env has never been committed)

$ git status --porcelain support-desk-api/.env
(no output — not tracked, nothing pending)
```
`.env` is listed in `support-desk-api/.gitignore` and has no history in the repo — confirmed never committed.