import { test, expect } from "@playwright/test";

test("generate passport and verify details", async ({ page }) => {
  await page.goto("http://localhost:3000/vpassport");

  // Fill in the name field
  await page.getByRole("textbox", { name: "Your Name" }).click();
  await page.getByRole("textbox", { name: "Your Name" }).fill("glendy");

  // Click on the Generate button
  await page.getByRole("button", { name: "Generate" }).click();

  // (Optional) Click on the Restart button and assert the form is reset
  await expect(page.getByRole("button", { name: "Restart" })).toBeVisible({
    timeout: 30000,
  });
  await expect(page.getByRole("button", { name: "Restart" })).toBeEnabled({
    timeout: 30000,
  });
});
