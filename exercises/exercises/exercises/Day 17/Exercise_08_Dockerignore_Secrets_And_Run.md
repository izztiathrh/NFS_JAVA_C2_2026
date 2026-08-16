# D17 Exercise 08 — .dockerignore, Secrets and Run

## Goal

Run your backend container safely.

## Tasks

1. Create `.dockerignore`.
2. Create `.env.example` with placeholder values.
3. Create local `.env` but do not commit it.
4. Run your backend container.
5. Check health/readiness.
6. Inspect Docker logs.

## Required exclusions in `.dockerignore`

```dockerignore
.env
.env.*
!.env.example
secrets/
target/
node_modules/
*.log
```

## Run example

```bash
docker run --rm --name support-desk-api-day17 \
  --env-file .env \
  -e SPRING_PROFILES_ACTIVE=docker \
  -p 8080:8080 \
  support-desk-api:day17
```

## Submission

### 1. `.dockerignore` (support-desk-api/.dockerignore)

```dockerignore
.env
.env.*
!.env.example
secrets/
target/
node_modules/
*.log
.git
.idea
.vscode
```

### 2. `.env.example` (support-desk-api/.env.example)

```env
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
JWT_SECRET=change-this-to-a-random-32-character-minimum-secret
```

### 3. Local `.env`

Created locally at `support-desk-api/.env` with real values, never committed — it's listed in both `support-desk-api/.gitignore` and the `.dockerignore` above, so it's excluded from both git and the Docker build context.

### 4 & 5. Docker run evidence + health/readiness check

Ran (adapted from the exercise's example — added `--env-file .env` for real credentials and an explicit Mongo URI override, since MongoDB runs on the host machine, not inside Docker):

```bash
docker run -d --name support-desk-api-day17 \
  --env-file .env \
  -e SPRING_PROFILES_ACTIVE=docker \
  -e SPRING_MONGODB_URI="mongodb://<user>:<pass>@host.docker.internal:27017/support_desk_db?authSource=admin" \
  -p 8080:8080 \
  support-desk-api:day17
```

Container came up and connected to Mongo:
```text
Monitor thread successfully connected to server with description ServerDescription{address=host.docker.internal:27017, type=STANDALONE, ... state=CONNECTED, ok=true, ...}
```

Health and readiness checked against the running container:
```bash
$ curl -s -w "\nHTTP_STATUS:%{http_code}\n" http://localhost:8080/api/health
{"status":"UP","service":"support-desk-api"}
HTTP_STATUS:200

$ curl -s -w "\nHTTP_STATUS:%{http_code}\n" http://localhost:8080/api/readiness
{"service":"support-desk-api","status":"READY","database":"CONNECTED"}
HTTP_STATUS:200
```

```bash
$ docker ps --filter "name=support-desk-api-day17"
CONTAINER ID   IMAGE                    STATUS          PORTS
4747e37da82e   support-desk-api:day17   Up 34 seconds   0.0.0.0:8080->8080/tcp
```

### 4. Safe log example (from `docker logs support-desk-api-day17`)

```text
requestId=a225e9d5 method=GET path=/api/health status=200 durationMs=80
requestId=b326f25c method=GET path=/api/readiness status=200 durationMs=12
```

Grepped the full container log output for the real `MONGO_PASSWORD` value and the real `JWT_SECRET` value — zero matches. The only "password"-looking line in the logs is Spring Security's own auto-generated dev fallback password (`Using generated security password: ...`), which is unrelated to any real credential and unused by the app's actual JWT login flow (documented already in Exercise 06).

### 5. Why real secrets are not committed

Real secrets (`MONGO_PASSWORD`, `JWT_SECRET`, etc.) live only in the local `.env` file, which is excluded from git via `.gitignore` and from the Docker build context via `.dockerignore`. If they were committed, anyone with repo access (now or in the future, since git history is permanent) could read the database credentials and the JWT signing key — the JWT key in particular would let an attacker forge valid auth tokens for any user, including admins. `.env.example` exists instead so teammates know which variables are required, with placeholder (non-functional) values only. Real values are passed in at runtime via `--env-file` or `-e`, kept out of the image layers entirely.