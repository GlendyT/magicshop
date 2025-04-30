import { test, expect } from "@playwright/test";

test("generate passport and verify details", async ({ page }) => {
  await page.goto("http://localhost:3000/vpassport");

  await page.getByRole("textbox", { name: "Your Name" }).click();
  await page.getByRole("textbox", { name: "Your Name" }).fill("glendy");

  await page.getByRole("button", { name: "Generate" }).click();

  await expect(page.getByRole("button", { name: "Restart" })).toBeVisible({
    timeout: 30000,
  });
  await expect(page.getByRole("button", { name: "Restart" })).toBeEnabled({
    timeout: 30000,
  });
});
