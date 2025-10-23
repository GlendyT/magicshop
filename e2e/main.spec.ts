import { test } from "@playwright/test";

test("Check all the links from the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole('link', { name: 'Polaroid' }).nth(1).click();
});

test("Check all the footer links from the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByText("If you run into technical").click();
});
