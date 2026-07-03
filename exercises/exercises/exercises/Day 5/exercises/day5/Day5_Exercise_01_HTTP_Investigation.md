# Day 5 Exercise 5.1: HTTP Investigation

## Topic
REST request and response behaviour

## Objective
In this exercise, you will inspect how a REST API responds to different types of requests. The purpose is to understand the HTTP conversation before writing JavaScript code.

By the end of this exercise, you should be able to identify:

- HTTP method
- Endpoint URL
- Status code
- Response body type
- Whether the request was successful or failed
- The reason for the success or failure

---

## Scenario
You have been given access to a mock training API. The API contains course offering data.

Your task is to test several API requests and record what happens.

---

## Tools
Use one of the following:

- VS Code REST Client using the provided `.http` file
- Postman
- Insomnia
- Thunder Client
- Browser, for simple `GET` requests only

---

## Instructions
Test at least five different API requests.

Your investigation must include:

1. One successful request that returns a list
2. One successful request that returns one item
3. One request for an item that does not exist
4. One successful create request
5. One failed create request

For each request, record the following information:

| Method | URL | Status Code | Response Type | What Happened? |
|---|---|---:|---|---|
|  |  |  |  |  |

---

## Response Type Guide
Use one of these terms in your table:

- List
- Single object
- Error object
- Empty response

---

## Questions to Answer
After completing your table, answer the following questions:

1. Which request returned a successful list response?
Request #2, GET /api/course-offerings

2. Which request returned a not-found response?
Request #4, GET /api/course-offerings/C999

3. Which request returned a validation error?
Request #6, the "create invalid course offering" POST with empty courseTitle, instructorName, startDate, and capacity: 0

4. What is the difference between a successful response and an error response?
A successful response (2xx, e.g. 200/201) means the server understood the request, found/created what was asked for, and the body contains the actual data (a course, a list, the newly created record). An error response (4xx/5xx) means something went wrong — either the client asked for something that doesn't exist (404), sent invalid data (400), or the server itself failed (500) — and the body contains a message/errors explanation instead of the requested resource.

5. Why is the status code important for frontend developers?
The status code tells the frontend how to handle the response without having to inspect the body first. A 200/201 means "render the data / show success." A 404 means "show a not-found message" rather than trying to render undefined data
---

## Restrictions

- Do not write JavaScript for this exercise.
- Do not modify the mock API.
- Do not only copy the response body. You must explain what the response means.
- Do not submit screenshots only. Your findings must be written in a table.

---

## Submission
Submit one Markdown file or document containing:

1. Your completed investigation table
2. Your answers to the five questions
3. One short reflection: what is one thing you understand better about REST after this exercise?

---

## Completion Checklist
Before submitting, check that you have:

- [ ] Tested at least five requests
- [ ] Included at least one successful list request
- [ ] Included at least one not-found request
- [ ] Included at least one failed create request
- [ ] Recorded the status code for every request
- [ ] Explained what each response means