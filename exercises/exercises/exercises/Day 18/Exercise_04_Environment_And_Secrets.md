# D18 Exercise 04 — Environment and Secrets

Create `.env.example`.

Include placeholders for:

- JWT secret
- frontend port
- backend port
- Mongo host port

Explain why `.env` should not be committed.
- it holds actual secrets (JWT signing key, DB credentials) that differ per environment (local/staging/prod). 
- Committing it would leak those secrets into git history permanently (even if later deleted, anyone with repo access