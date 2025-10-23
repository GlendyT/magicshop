import {  test } from "@playwright/test";

test("Generate a Photobooth", async ({ page }) => {
  await page.goto("http://localhost:3000/photobooth");
  await page.locator("#print").click();
  await page.locator('[data-test-id="Photo"] div').click();
  await page.locator('[data-test-id="Photo2"] div').click();
  await page.locator('[data-test-id="Photo3"] div').click();
  await page
    .locator('[data-test-id="Photo"]')
    .getByRole("heading", { name: "Click to Add Your Photo" })
    .click();
  await page
    .locator('[data-test-id="Photo2"]')
    .getByRole("heading", { name: "Click to Add Your Photo" })
    .click();
  await page
    .locator('[data-test-id="Photo3"]')
    .getByRole("heading", { name: "Click to Add Your Photo" })
    .click();
  await page.getByTestId("Logo").click();
  await page.getByRole("img", { name: "logoarmy" }).click();
});
