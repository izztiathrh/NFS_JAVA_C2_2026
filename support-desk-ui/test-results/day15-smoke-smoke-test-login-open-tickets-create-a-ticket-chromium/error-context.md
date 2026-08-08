# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: day15-smoke.spec.js >> smoke test: login, open tickets, create a ticket
- Location: e2e\day15-smoke.spec.js:3:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /sign in/i })

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - paragraph [ref=e5]: Day 12
    - heading "Login to Asset Tracker" [level=1] [ref=e6]
    - paragraph [ref=e7]: This login calls the Day 9 backend, stores the JWT in localStorage for the demo, and redirects the user to the protected area.
    - generic [ref=e8]:
      - generic [ref=e9]:
        - text: Email
        - textbox "Email" [ref=e10]: support@example.com
      - generic [ref=e11]:
        - text: Password
        - textbox "Password" [active] [ref=e12]: support123
      - button "Login" [ref=e13] [cursor=pointer]
    - generic [ref=e14]:
      - strong [ref=e15]: Seeded admin
      - generic [ref=e16]: admin@example.com / Admin@12345
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("smoke test: login, open tickets, create a ticket", async ({ page }) => {
  4  |   await page.goto("/login");
  5  |   await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();
  6  | 
  7  |   await page.getByLabel("Email").fill("support@example.com");
  8  |   await page.getByLabel("Password").fill("support123");
> 9  |   await page.getByRole("button", { name: /sign in/i }).click();
     |                                                        ^ Error: locator.click: Test timeout of 60000ms exceeded.
  10 | 
  11 |   await expect(
  12 |     page.getByRole("heading", { name: /welcome back/i }),
  13 |   ).toBeVisible();
  14 | 
  15 |   await page.getByRole("link", { name: /tickets/i }).click();
  16 |   await expect(page.getByRole("heading", { name: /tickets/i })).toBeVisible();
  17 | 
  18 |   await page.getByRole("link", { name: /create new ticket/i }).click();
  19 |   await expect(
  20 |     page.getByRole("heading", { name: /create ticket/i }),
  21 |   ).toBeVisible();
  22 | 
  23 |   await page.getByLabel("Title").fill("Playwright smoke ticket");
  24 |   await page.getByLabel("Description").fill("Created by Playwright smoke test");
  25 |   await page.getByLabel("Category").fill("Automation");
  26 |   await page.getByLabel("Priority").selectOption("HIGH");
  27 |   await page.getByLabel("Status").selectOption("OPEN");
  28 |   await page.getByRole("button", { name: /create ticket/i }).click();
  29 | 
  30 |   await expect(page.getByText(/created successfully/i)).toBeVisible();
  31 | });
  32 | 
```