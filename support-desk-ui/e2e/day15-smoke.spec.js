import { test, expect } from "@playwright/test";

test("smoke test: login, open tickets, create a ticket", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();

  await page.getByLabel("Email").fill("support@example.com");
  await page.getByLabel("Password").fill("support123");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(
    page.getByRole("heading", { name: /welcome back/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /tickets/i }).click();
  await expect(page.getByRole("heading", { name: /tickets/i })).toBeVisible();

  await page.getByRole("link", { name: /create new ticket/i }).click();
  await expect(
    page.getByRole("heading", { name: /create ticket/i }),
  ).toBeVisible();

  await page.getByLabel("Title").fill("Playwright smoke ticket");
  await page.getByLabel("Description").fill("Created by Playwright smoke test");
  await page.getByLabel("Category").fill("Automation");
  await page.getByLabel("Priority").selectOption("HIGH");
  await page.getByLabel("Status").selectOption("OPEN");
  await page.getByRole("button", { name: /create ticket/i }).click();

  await expect(page.getByText(/created successfully/i)).toBeVisible();
});
