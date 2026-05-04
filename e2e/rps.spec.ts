import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("generate RPS", async ({ page }) => {
  await page.goto("http://localhost:3000/rps", { waitUntil: 'networkidle' });

  await page.getByTestId("title").click();
  await page.getByRole("heading", { name: "Rock-Paper-Scissors" }).click();
  await page.getByTestId("form").locator("div").first().click();
  await page.getByRole("textbox", { name: "write one name" }).click();
  await page.getByRole("textbox", { name: "write one name" }).fill("glendy");
  await page.getByText("Choose Your Oponent").click();
  await page.getByTestId("radio-options").click();
  
  // Esperar a que los radio buttons se carguen
  const firstLabel = page.getByTestId("radio-options").locator("label").first();
  await firstLabel.waitFor({ state: 'visible', timeout: 60000 });
  await firstLabel.click({ force: true });
  
  await page.getByTestId("form").getByTestId("button").click();
  await page.getByTestId("card-rps").click();
  await page.getByText("glendy side, press here").click({ force: true });
  await page.getByTitle("Rock").click({ force: true });

});
