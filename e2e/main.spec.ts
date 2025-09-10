import { test, expect } from "@playwright/test";

test("Check all the links from the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.locator(".min-h-screen > .flex").click();
  await page.getByRole("link", { name: "Polaroid" }).nth(1).click();
  await page.getByRole("link", { name: "Photobooth" }).nth(1).click();
  await page.getByRole("link", { name: "Sugaverse" }).nth(1).click();
  await page.getByRole("link", { name: "Hobipalooza" }).nth(1).click();
  await page.getByRole("link", { name: "VPassport" }).nth(1).click();
  await page.getByRole("link", { name: "Hobisback" }).nth(1).click();
  await page.getByRole("link", { name: "(V)irthday" }).nth(1).click();
  await page.getByRole("link", { name: "Love Notes" }).nth(1).click();
  await page.getByRole("link", { name: "Seokjin" }).nth(1).click();
  await page.getByRole("link", { name: "RPS" }).nth(1).click();
  await page.getByRole("link", { name: "Festa" }).nth(1).click();
  await page.getByRole("link", { name: "Tetris" }).nth(1).click();
});

test("Check all the side links from the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.locator(".flex > div").first().click();
  await page.locator(".fixed > div").first().click();
  await page.getByRole("link", { name: "logo" }).click();
  await page.getByRole("link", { name: "Polaroid" }).first().click();
  await page.getByRole("link", { name: "Photobooth" }).first().click();
  await page.getByRole("link", { name: "Sugaverse" }).first().click();
  await page.getByRole("link", { name: "Hobipalooza" }).first().click();
  await page.getByRole("link", { name: "VPassport" }).first().click();
  await page.getByRole("link", { name: "Hobisback" }).first().click();
  await page.getByRole("link", { name: "(V)irthday" }).first().click();
  await page.getByRole("link", { name: "Love Notes" }).first().click();
  await page.getByRole("link", { name: "Seokjin" }).first().click();
  await page.getByRole("link", { name: "RPS" }).first().click();
  await page.getByRole("link", { name: "Festa" }).first().click();
  await page.getByRole("link", { name: "Tetris" }).first().click();
});

test("Check all the footer links from the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByText("If you run into technical").click();
  const page2Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "@Beyond_ARMY_" }).click();
  const page2 = await page2Promise;

  await page
    .locator("div")
    .filter({ hasText: "Programmed by TTechDesigners" })
    .nth(2)
    .click();
  await page.getByRole("button", { name: "Dark mode" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "Programmed by TTechDesigners" })
    .click();
  const page1 = await page1Promise;
});
