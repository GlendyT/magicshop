import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("generate Festa", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/festa");

  await page.getByRole("textbox", { name: "Your Name" }).click({ force: true });
  await page.getByRole("textbox", { name: "Your Name" }).fill("hola");

  await page.getByTestId("input-content").click({ force: true });
  await page.getByTestId("input-content").fill("hola2");

  await page.getByTestId("radio-options").click({ force: true });
  await page.getByText("JungKook").click({ force: true });
  await page.getByTestId("form").getByTestId("button").click({ force: true });
  await page
    .locator("div")
    .filter({ hasText: /^holafrom hola2$/ })
    .nth(1)
    .click({ force: true });
});
