import { test, expect } from "@playwright/test";

test("Check all the links from the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole('link', { name: 'Polaroid' }).nth(1).click();
});

test("Check all the footer links from the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByText("If you run into technical").click();
  await page
    .locator("div")
    .filter({ hasText: "Programmed by TTechDesigners" })
    .nth(2)
    .click();
  const page1Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "Programmed by TTechDesigners" })
    .click();
  const page1 = await page1Promise;
});
