import { test } from "@playwright/test";

test("generate passport and verify details", async ({ page }) => {
  await page.goto("http://localhost:3000/vpassport");

  await page.getByTestId("form").click();
  await page.getByText("get your passport").click();
  await page.getByText("/15").click();
  await page.getByTestId("form").locator("div").first().click();
  await page.getByRole("textbox", { name: "Your Name" }).click();
  await page.getByRole("textbox", { name: "Your Name" }).fill("taehyung");
  await page.getByTestId("form").getByTestId("button").click();
});
