# D17 Exercise 04 — Performance and Index Review

## Goal

Review which fields should be indexed in the Support Desk project.

## Think about

- ticket number
- status
- priority
- category
- createdBy
- createdAt

## Tasks

1. List fields used for filtering.
2. List fields used for sorting.
3. List fields that should be unique.
4. List fields used in reports.
5. Use Compass or mongosh to check current indexes.

## Submission

### 1. Fields used for filtering

- `status` — `TicketRepository.findByStatus()`, used by `GET /api/tickets?status=`
- `priority` — `findByPriority()`
- `category` — `findByCategory()`

### 2. Fields used for sorting

- `createdAt` — default `sortBy` value on `GET /api/tickets/paged`. The endpoint actually accepts any field name in `sortBy`, so it isn't restricted to `createdAt`, but that's the field used in practice.

### 3. Fields that should be unique

- No `ticketNumber` field exists in `Ticket.java` yet — the model currently has no ticket number at all. If one is added later, it should be `@Indexed(unique = true)`.
- `User.email` is effectively unique today, but only enforced in application code (`AuthService.register()` checks `existsByEmailIgnoreCase` before saving, returning `409 Conflict` if it already exists). There is **no unique index in MongoDB** backing this, so two concurrent registration requests with the same email could both pass the check before either write completes — a race condition. This should get a real unique index.

### 4. Fields used in reports

- `status`, `priority`, `category` — closest thing to reporting today (e.g. count of OPEN tickets, tickets by priority).
- `createdBy`, `createdAt` — would matter for reports like "tickets created by user X" or "tickets created this week", but there is no dedicated reporting endpoint yet.

### 5. Current indexes (checked live via `mongosh` on `support_desk_db.tickets`)

```text
_id_        (default)
category    (single-field)
priority    (single-field)
status      (single-field)
createdBy   (single-field)
createdAt   (single-field)
```

This matches the `@Indexed` annotations on `Ticket.java` exactly — Spring created them automatically because `spring.data.mongodb.auto-index-creation=true`.

### Tuning notes / gaps found

1. All indexes are single-field. If reports commonly filter by combinations like `status + priority`, a compound index `{status: 1, priority: 1}` would be more efficient than scanning two separate single-field indexes.
2. `createdAt` is stored as a `String` (`LocalDate.now().toString()`), not a real date type. Sorting works today only because ISO date strings happen to sort correctly as text, but it can't support proper date-range queries (e.g. "tickets from the last 7 days"). Should switch to `Instant`/`LocalDate` if reporting expands.
3. `User.email` needs a **unique index** in MongoDB, not just an application-level existence check, to close the registration race condition.
4. If a ticket number field is added, it should be indexed as unique from the start.

