import { test, expect } from "@playwright/test";

test("generate RPS", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "RPS" }).nth(1).click();
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
  await page.getByText("glendywins").click();
  await page.getByText("RMwins").click();
  await page.getByText("Turns left").click();
  await page.getByText("RM side").click();
  await page.locator("div:nth-child(4) > div").first().click();
  await page.getByText("Thanks for playing the game").click();
  await page.getByText("Rock-Paper-Scissors").click();
  await page.getByText("Keep supporting BTS projects").click();
  const download12Promise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download12 = await download12Promise;
  await page.getByRole("button", { name: "Hide" }).click();
  await page.getByRole("button", { name: "Show your Gift 🎁" }).click();
  await page.getByRole("button", { name: "Restart" }).click();
});
