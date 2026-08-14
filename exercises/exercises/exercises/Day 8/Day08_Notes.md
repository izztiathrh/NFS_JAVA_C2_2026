# Day 8 Notes

## 1. Which query parameters did you implement?

`status`, `priority`, and `category` on `GET /api/tickets` (only one filter is applied at a time, all tickets are returned when none are provided).

## 2. Which fields did you index?

`status`, `priority`, `category`, `createdBy`, and `createdAt` on the `Ticket` model, using `@Indexed`, with `spring.data.mongodb.auto-index-creation=true` so they are created automatically on startup.

## 3. Why should an API use pagination?

Returning the entire ticket collection in one response gets slower and heavier as data grows. Pagination limits each response to a small page (e.g. 5 tickets), which keeps responses fast and avoids sending unnecessary data over the network.

## 4. What log messages appear when you call the filtering endpoint?

`Fetching tickets with filters status=..., priority=..., category=...` is logged in `TicketService.getAllTickets(...)`, showing exactly which filter values were requested.

## 5. What endpoint proves your sorting works?

`GET /api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc` — comparing the order of results against the same request with `direction=asc` shows the sort order flipping, proving sorting is applied.
