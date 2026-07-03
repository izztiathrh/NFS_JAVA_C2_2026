# Day 5 Exercise 5.2: REST API Design — Event Booking System

## 1. API Specification Table

| Resource | Method | Endpoint | Purpose | Request Body Needed? | Success Status | Possible Error Status |
|---|---|---|---|---|---:|---:|
| Events | GET | `/events` | View all available events | No | 200 OK | 500 Internal Server Error |
| Events | GET | `/events/{eventId}` | View details of one event | No | 200 OK | 404 Not Found |
| Bookings | POST | `/bookings` | Create a new booking for an event | Yes | 201 Created | 400 Bad Request, 404 Not Found, 409 Conflict |
| Bookings | GET | `/bookings` | View all bookings | No | 200 OK | 500 Internal Server Error |
| Bookings | GET | `/bookings/{bookingId}` | View details of one booking | No | 200 OK | 404 Not Found |
| Bookings | PATCH | `/bookings/{bookingId}` | Cancel an existing booking | Yes | 200 OK | 404 Not Found, 409 Conflict |

---

## 2. Request Body Planning

| Endpoint | Request Body Description |
|---|---|
| `POST /bookings` | The id of the event being booked, the attendee's name/identifier, and the number of seats requested. |
| `PATCH /bookings/{bookingId}` | The new status for the booking (e.g. `"CANCELLED"`). |

---

## 3. Error Planning

| Error Case | Related Endpoint | Suitable Status Code | Explanation |
|---|---|---:|---|
| Required field missing (e.g. `eventId` not provided) | `POST /bookings` | 400 Bad Request | The request body is missing data the server needs to create the booking, so it cannot be processed. |
| Event does not exist | `POST /bookings` | 404 Not Found | The `eventId` in the request body does not match any existing event. |
| Booking does not exist | `GET /bookings/{bookingId}`, `PATCH /bookings/{bookingId}` | 404 Not Found | The `bookingId` in the URL does not match any existing booking. |
| Event is fully booked | `POST /bookings` | 409 Conflict | The event has no remaining capacity, so the new booking conflicts with the event's current state. |
| Booking is already cancelled | `PATCH /bookings/{bookingId}` | 409 Conflict | The booking is already in a cancelled state, so cancelling it again conflicts with its current state. |

---

## 4. Why These Endpoint Names Follow REST Principles

- **Resource-style URLs, not action-style.** Every endpoint is named after a noun (`events`, `bookings`), never a verb — `/bookings` instead of `/createBooking` or `/cancelBooking`. The action being performed comes from the HTTP method, not from words in the URL.
- **HTTP methods carry the meaning.** `GET` always reads data without changing anything, `POST` creates a new resource under a collection (`/bookings`), and `PATCH` performs a partial update to an existing resource's state (cancelling changes its `status`, it doesn't replace the whole booking or delete the record).
- **Collections vs. single resources are distinguished by the URL shape**, not by separate verbs: `/events` returns the collection, `/events/{eventId}` returns one item from that collection. The same pattern is reused for `/bookings` and `/bookings/{bookingId}`, so the API is predictable — a client can guess the shape of a new endpoint before reading docs.
- **Cancelling is modeled as a state change, not a deletion.** A booking should still exist and be viewable (e.g. for history/audit) after it's cancelled, so `PATCH .../{bookingId}` with a `status` update is more accurate than `DELETE`, which would imply the record disappears entirely.
