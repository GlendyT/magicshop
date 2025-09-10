import { test, expect } from "@playwright/test";

test("generate passport and verify details", async ({ page }) => {
  await page.goto("http://localhost:3000/vpassport");

  await page.getByTestId("form").click();
  await page.getByText("get your passport").click();
  await page.getByText("/15").click();
  await page.getByTestId("form").locator("div").first().click();
  await page.getByRole("textbox", { name: "Your Name" }).click();
  await page.getByRole("textbox", { name: "Your Name" }).fill("taehyung");
  await page.getByTestId("form").getByTestId("button").click();
  // await page.getByRole('img', { name: 'vpassport' }).nth(1).click();
  //await page.getByText("Republic of ARMY").click();
  await page.getByRole("img", { name: "vpassport" }).nth(3).click();
  // const download7Promise = page.waitForEvent("download");
  // await page.getByRole("button", { name: "Download" }).click();
  // const download7 = await download7Promise;
  // await page.getByRole("button", { name: "Restart" }).click();
});
