import { test } from "@playwright/test";

test("generate RPS", async ({ page }) => {
  await page.goto("http://localhost:3000/rps");

  await page.getByTestId("title").click();
  await page.getByRole("heading", { name: "Rock-Paper-Scissors" }).click();
  await page.getByTestId("form").locator("div").first().click();
  await page.getByRole("textbox", { name: "write one name" }).click();
  await page.getByRole("textbox", { name: "write one name" }).fill("glendy");
  await page.getByText("Choose Your Oponent").click();
  await page.getByTestId("radio-options").click();
  await page.getByTestId("radio-options").getByText("RM").click();
  await page.getByTestId("form").getByTestId("button").click();
  await page.getByTestId("card-rps").click();
  await page.getByText("glendy side, press here").click();
  await page.getByTitle("Rock").click();
  await page.getByTitle("Paper").click();
  await page.getByTitle("Siccors").click();

});
