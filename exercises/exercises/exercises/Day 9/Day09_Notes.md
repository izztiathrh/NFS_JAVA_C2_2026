# Day 9 Notes

## 1. What is authentication?

Authentication is proving *who you are* — for example, logging in with an email and password to get a JWT that identifies you on future requests.

## 2. What is authorisation?

Authorisation is checking *what you're allowed to do* once you're identified — for example, whether your role (USER or ADMIN) permits creating a ticket.

## 3. What does 401 mean?

401 Unauthorized means the request has no valid identity at all — no token, or an invalid/expired token. The server doesn't know who you are.

## 4. What does 403 mean?

403 Forbidden means the server knows who you are (you're authenticated), but your role doesn't have permission for that action — e.g. a USER token trying to create a ticket, which is ADMIN-only.

## 5. Why do we hash passwords?

So that even if the database is leaked or read by someone unauthorized, the real passwords are never exposed — the hash (BCrypt in this project) can't practically be reversed back into the original password.

## 6. Where is the JWT placed in an HTTP request?

In the `Authorization` header, as `Authorization: Bearer <token>`.
